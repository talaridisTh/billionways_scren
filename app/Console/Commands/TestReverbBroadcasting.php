<?php

namespace App\Console\Commands;

use App\Events\TransactionApproved;
use App\Models\ScanSession;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class TestReverbBroadcasting extends Command
{
    protected $signature = 'reverb:test {--user-id=1 : User ID to broadcast to}';

    protected $description = 'Test Reverb broadcasting by sending a test TransactionApproved event';

    public function handle()
    {
        $userId = $this->option('user-id');

        $user = User::find($userId);

        if (!$user) {
            $this->error("User with ID {$userId} not found!");
            $this->info("Available users:");
            User::limit(5)->get()->each(function ($u) {
                $this->line("  - ID: {$u->id} | Name: {$u->name} | Email: {$u->email}");
            });
            return self::FAILURE;
        }

        $this->info("Creating test scan session for user: {$user->name} (ID: {$user->id})");

        $session = ScanSession::create([
            'session_id' => 'test_' . Str::uuid(),
            'user_id' => $user->id,
            'shop_owner_id' => 'test_shop_owner',
            'store_id' => 'test_store',
            'offer_id' => 'test_offer',
            'status' => 'pending',
        ]);

        $session->approve();
        $session->refresh();

        $this->info("✅ Session created: {$session->session_id}");
        $this->info("📡 Broadcasting TransactionApproved event...");

        event(new TransactionApproved($session));

        $this->newLine();
        $this->info("🎉 Event broadcasted successfully!");
        $this->newLine();
        $this->table(
            ['Property', 'Value'],
            [
                ['Channel', "private-user.{$user->id}"],
                ['Event', 'transaction.approved'],
                ['Session ID', $session->session_id],
                ['User ID', $user->id],
                ['User Name', $user->name],
                ['Status', $session->status],
            ]
        );

        $this->newLine();
        $this->info("To listen to this event in Flutter, subscribe to:");
        $this->line("  echo.private('user.{$user->id}').listen('transaction.approved', ...)");

        return self::SUCCESS;
    }
}
