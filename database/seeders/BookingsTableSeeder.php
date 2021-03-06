<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\Bookable;
use \App\Models\Booking;

class BookingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bookable::all()->each(function(Bookable $bookable) {
            $booking = Booking::factory()->make();
            $bookings = collect([$booking]);

            for ($i = 0; $i < random_int(1, 20); $i++) {
                $from = (clone $booking->to)->addDays(random_int(1, 14));
                $to = (clone $from)->addDays(random_int(1, 14));
                $bookable_id = random_int(1, 10);

                $booking = Booking::make([
                    'from' => $from,
                    'to' => $to,
                    'bookable_id' => $bookable_id,
                    'price' => random_int(200, 500)
                ]);
                $booking->push($booking);
            }

            $bookable->bookings()->saveMany($bookings);
        });
    }
}
