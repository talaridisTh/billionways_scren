<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserQrCode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class QrCodeTestSeeder extends Seeder
{
    public function run(): void
    {
        $user1 = User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
        ]);

        UserQrCode::create([
            'user_id' => $user1->id,
            'qr_token' => 'USER_QR_TOKEN_001',
            'is_active' => true,
            'expires_at' => now()->addDays(30),
        ]);

        $user2 = User::create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'password' => Hash::make('password'),
        ]);

        UserQrCode::create([
            'user_id' => $user2->id,
            'qr_token' => 'USER_QR_TOKEN_002',
            'is_active' => true,
            'expires_at' => now()->addDays(30),
        ]);

        $user3 = User::create([
            'name' => 'Maria Papadopoulos',
            'email' => 'maria@example.com',
            'password' => Hash::make('password'),
        ]);

        UserQrCode::create([
            'user_id' => $user3->id,
            'qr_token' => 'USER_QR_TOKEN_003',
            'is_active' => true,
            'expires_at' => now()->addDays(30),
        ]);

        $expiredUser = User::create([
            'name' => 'Expired User',
            'email' => 'expired@example.com',
            'password' => Hash::make('password'),
        ]);

        UserQrCode::create([
            'user_id' => $expiredUser->id,
            'qr_token' => 'EXPIRED_TOKEN',
            'is_active' => false,
            'expires_at' => now()->subDays(1),
        ]);

        $this->command->info('Created 4 test users with QR codes');
        $this->command->info('Valid tokens: USER_QR_TOKEN_001, USER_QR_TOKEN_002, USER_QR_TOKEN_003');
        $this->command->info('Invalid token: EXPIRED_TOKEN');
    }
}
