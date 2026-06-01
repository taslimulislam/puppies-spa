<?php

namespace Database\Factories;

use App\Models\Puppy;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Puppy>
 */
class PuppyFactory extends Factory
{
    protected $model = Puppy::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->firstName(),
            'trait' => fake()->sentence(),
            'image_url' => '/images/puppies/01.jpg',
        ];
    }
}
