<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class RecordsFactory extends Factory
{

    public function definition(): array
    {
        $categories = ['Marketing', 'Sales', 'Operations', 'Finance', 'HR'];
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

        return [
            'category' => fake()->randomElement($categories),
            'month' => fake()->randomElement($months),
            'value' => fake()->numberBetween(50, 500),
        ];
    }
}
