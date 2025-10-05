<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserQrCode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserWithQrCodesSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            ['name' => 'Γιώργος Παπαδόπουλος', 'email' => 'giorgos.papadopoulos@gmail.com', 'phone' => '+30 698 123 4567'],
            ['name' => 'Μαρία Κωνσταντίνου', 'email' => 'maria.konstantinou@outlook.com', 'phone' => '+30 697 234 5678'],
            ['name' => 'Νίκος Αθανασίου', 'email' => 'nikos.athanasiou@yahoo.gr', 'phone' => '+30 694 345 6789'],
            ['name' => 'Ελένη Δημητρίου', 'email' => 'eleni.dimitriou@gmail.com', 'phone' => '+30 699 456 7890'],
            ['name' => 'Κώστας Γεωργίου', 'email' => 'kostas.georgiou@hotmail.com', 'phone' => '+30 693 567 8901'],
            ['name' => 'Σοφία Ιωάννου', 'email' => 'sofia.ioannou@gmail.com', 'phone' => '+30 698 678 9012'],
            ['name' => 'Δημήτρης Νικολάου', 'email' => 'dimitris.nikolaou@yahoo.gr', 'phone' => '+30 697 789 0123'],
            ['name' => 'Αικατερίνη Μιχαήλ', 'email' => 'katerina.michail@outlook.com', 'phone' => '+30 694 890 1234'],
            ['name' => 'Αλέξανδρος Χριστοδούλου', 'email' => 'alexandros.christodoulou@gmail.com', 'phone' => '+30 699 901 2345'],
            ['name' => 'Άννα Σταύρου', 'email' => 'anna.stavrou@hotmail.com', 'phone' => '+30 693 012 3456'],
            ['name' => 'Παναγιώτης Ανδρέου', 'email' => 'panagiotis.andreou@gmail.com', 'phone' => '+30 698 123 4560'],
            ['name' => 'Χριστίνα Παύλου', 'email' => 'christina.pavlou@yahoo.gr', 'phone' => '+30 697 234 5671'],
            ['name' => 'Βασίλης Σάββα', 'email' => 'vasilis.savva@outlook.com', 'phone' => '+30 694 345 6782'],
            ['name' => 'Δέσποινα Χαραλάμπους', 'email' => 'despoina.charalambous@gmail.com', 'phone' => '+30 699 456 7893'],
            ['name' => 'Στέφανος Φιλίππου', 'email' => 'stefanos.filippou@hotmail.com', 'phone' => '+30 693 567 8904'],
            ['name' => 'Ιωάννα Λοΐζου', 'email' => 'ioanna.loizou@gmail.com', 'phone' => '+30 698 678 9015'],
            ['name' => 'Αντώνης Κυριάκου', 'email' => 'antonis.kyriakou@yahoo.gr', 'phone' => '+30 697 789 0126'],
            ['name' => 'Μαρίνα Αντωνίου', 'email' => 'marina.antoniou@outlook.com', 'phone' => '+30 694 890 1237'],
            ['name' => 'Θανάσης Ευαγγέλου', 'email' => 'thanasis.evangelou@gmail.com', 'phone' => '+30 699 901 2348'],
            ['name' => 'Ελισάβετ Πέτρου', 'email' => 'elisavet.petrou@hotmail.com', 'phone' => '+30 693 012 3459'],
        ];

        $subscriptions = ['Basic', 'Premium', 'Premium Plus', 'Gold', 'Silver'];

        foreach ($users as $index => $userData) {
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => Hash::make('password'),
            ]);

            $qrToken = 'QR_' . strtoupper(Str::random(12)) . '_' . str_pad((string)($index + 1), 3, '0', STR_PAD_LEFT);
            
            $expiresAt = rand(0, 10) > 1 
                ? now()->addDays(rand(7, 90)) 
                : now()->addDays(rand(1, 6));

            UserQrCode::create([
                'user_id' => $user->id,
                'qr_token' => $qrToken,
                'is_active' => rand(0, 10) > 0,
                'expires_at' => $expiresAt,
            ]);

            $this->command->info("Created: {$userData['name']} | Token: {$qrToken}");
        }

        $this->command->info("\n✅ Successfully created 20 realistic users with QR codes!");
        $this->command->info("All users have password: 'password'");
    }
}
