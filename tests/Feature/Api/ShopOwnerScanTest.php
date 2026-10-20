<?php

use App\Events\TransactionApproved;
use App\Events\TransactionRejected;
use App\Models\ScanSession;
use App\Models\User;
use App\Models\UserQrCode;
use Illuminate\Support\Facades\Event;
use Laravel\Sanctum\Sanctum;

beforeEach(function () {
    $this->customer = User::factory()->create();
    $this->otherCustomer = User::factory()->create();
    $this->shopOwner = User::factory()->create();
    $this->shopOwner->forceFill(['is_shop_owner' => true])->save();

    $this->qrCode = UserQrCode::create([
        'user_id' => $this->customer->id,
        'qr_token' => 'customer-token',
        'is_active' => true,
    ]);
});

function createSession(User $user, string $sessionId = 'session-1', array $attributes = []): ScanSession
{
    return ScanSession::create([
        'session_id' => $sessionId,
        'user_id' => $user->id,
        'status' => 'pending',
        'expires_at' => now()->addMinutes(5),
        ...$attributes,
    ]);
}

it('refuses guests on every scan endpoint', function (string $method, string $uri) {
    $this->json($method, $uri)->assertUnauthorized();
})->with([
    ['POST', '/api/shop-owner/scan/validate'],
    ['POST', '/api/shop-owner/scan/approve'],
    ['POST', '/api/shop-owner/scan/reject'],
    ['POST', '/api/user/scan-session'],
    ['GET', '/api/user/scan-session/session-1/status'],
    ['PUT', '/api/user/scan-session/session-1'],
]);

it('lets only shop owners use the scan endpoints', function () {
    Sanctum::actingAs($this->customer);

    $this->postJson('/api/shop-owner/scan/validate', [
        'qr_token' => 'customer-token',
        'session_id' => 'session-1',
    ])->assertForbidden();
});

it('creates the session for the signed in customer whatever user id the request names', function () {
    Sanctum::actingAs($this->customer);

    $this->postJson('/api/user/scan-session', [
        'session_id' => 'session-1',
        'user_id' => $this->otherCustomer->id,
    ])->assertCreated()->assertJsonPath('data.user_id', $this->customer->id);

    expect(ScanSession::find('session-1')->user_id)->toBe($this->customer->id);
});

it('refuses a session id that already exists', function () {
    createSession($this->otherCustomer);

    Sanctum::actingAs($this->customer);

    $this->postJson('/api/user/scan-session', ['session_id' => 'session-1'])
        ->assertUnprocessable()
        ->assertJsonValidationErrors('session_id');
});

it('returns the owner of the scanned code and records the shop owner', function () {
    createSession($this->customer);

    Sanctum::actingAs($this->shopOwner);

    $this->postJson('/api/shop-owner/scan/validate', [
        'qr_token' => 'customer-token',
        'session_id' => 'session-1',
        'store_id' => 'store-9',
    ])
        ->assertOk()
        ->assertJsonPath('data.user_id', (string) $this->customer->id)
        ->assertJsonPath('data.email', $this->customer->email);

    $session = ScanSession::find('session-1');

    expect($session->shop_owner_id)->toBe((string) $this->shopOwner->id)
        ->and($session->store_id)->toBe('store-9');
});

it('refuses an unknown or inactive qr code', function () {
    createSession($this->customer);
    $this->qrCode->update(['is_active' => false]);

    Sanctum::actingAs($this->shopOwner);

    $this->postJson('/api/shop-owner/scan/validate', ['qr_token' => 'customer-token', 'session_id' => 'session-1'])
        ->assertUnprocessable();

    $this->postJson('/api/shop-owner/scan/validate', ['qr_token' => 'unknown', 'session_id' => 'session-1'])
        ->assertUnprocessable();
});

it('refuses a qr code that belongs to someone other than the session owner', function () {
    createSession($this->otherCustomer);

    Sanctum::actingAs($this->shopOwner);

    $this->postJson('/api/shop-owner/scan/validate', ['qr_token' => 'customer-token', 'session_id' => 'session-1'])
        ->assertUnprocessable();

    expect(ScanSession::find('session-1')->shop_owner_id)->toBeNull();
});

it('lets the shop owner who scanned the code approve it', function () {
    Event::fake([TransactionApproved::class]);
    createSession($this->customer, attributes: ['shop_owner_id' => (string) $this->shopOwner->id]);

    Sanctum::actingAs($this->shopOwner);

    $this->postJson('/api/shop-owner/scan/approve', ['session_id' => 'session-1', 'user_id' => $this->customer->id])
        ->assertOk()
        ->assertJsonPath('data.approved', true);

    expect(ScanSession::find('session-1')->status)->toBe('approved');
    Event::assertDispatched(TransactionApproved::class);
});

it('lets the shop owner who scanned the code reject it', function () {
    Event::fake([TransactionRejected::class]);
    createSession($this->customer, attributes: ['shop_owner_id' => (string) $this->shopOwner->id]);

    Sanctum::actingAs($this->shopOwner);

    $this->postJson('/api/shop-owner/scan/reject', ['session_id' => 'session-1', 'user_id' => $this->customer->id])
        ->assertOk();

    expect(ScanSession::find('session-1')->status)->toBe('rejected');
    Event::assertDispatched(TransactionRejected::class);
});

it('hides a session from a shop owner who did not scan it', function () {
    $anotherShopOwner = User::factory()->create();
    $anotherShopOwner->forceFill(['is_shop_owner' => true])->save();
    createSession($this->customer, attributes: ['shop_owner_id' => (string) $this->shopOwner->id]);

    Sanctum::actingAs($anotherShopOwner);

    $this->postJson('/api/shop-owner/scan/approve', ['session_id' => 'session-1', 'user_id' => $this->customer->id])
        ->assertNotFound();

    expect(ScanSession::find('session-1')->status)->toBe('pending');
});

it('refuses to approve an expired session', function () {
    createSession($this->customer, attributes: ['shop_owner_id' => (string) $this->shopOwner->id]);
    $this->travel(6)->minutes();

    Sanctum::actingAs($this->shopOwner);

    $this->postJson('/api/shop-owner/scan/approve', ['session_id' => 'session-1', 'user_id' => $this->customer->id])
        ->assertStatus(410);
});

it('refuses to decide a session twice', function () {
    createSession($this->customer, attributes: ['shop_owner_id' => (string) $this->shopOwner->id, 'status' => 'rejected']);

    Sanctum::actingAs($this->shopOwner);

    $this->postJson('/api/shop-owner/scan/approve', ['session_id' => 'session-1', 'user_id' => $this->customer->id])
        ->assertConflict();
});

it('does not let customers approve their own session', function () {
    createSession($this->customer);

    Sanctum::actingAs($this->customer);

    $this->putJson('/api/user/scan-session/session-1', ['status' => 'approved'])->assertForbidden();

    expect(ScanSession::find('session-1')->status)->toBe('pending');
});

it('lets customers complete their own session', function () {
    createSession($this->customer);

    Sanctum::actingAs($this->customer);

    $this->putJson('/api/user/scan-session/session-1', ['status' => 'completed'])
        ->assertOk()
        ->assertJsonPath('data.status', 'completed');
});

it('shows a customer the status of their own session only', function () {
    createSession($this->customer);
    createSession($this->otherCustomer, 'session-2');

    Sanctum::actingAs($this->customer);

    $this->getJson('/api/user/scan-session/session-1/status')->assertOk()->assertJsonPath('data.status', 'pending');
    $this->getJson('/api/user/scan-session/session-2/status')->assertNotFound();
});

it('reports an expired session without failing', function () {
    createSession($this->customer);
    $this->travel(6)->minutes();

    Sanctum::actingAs($this->customer);

    $this->getJson('/api/user/scan-session/session-1/status')
        ->assertStatus(410)
        ->assertJsonPath('data.status', 'expired');
});
