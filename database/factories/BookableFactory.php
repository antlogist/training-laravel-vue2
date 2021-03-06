<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BookableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->city(),
            'description' => $this->faker->text(),
            'price' => random_int(15, 600)
        ];
    }
}
