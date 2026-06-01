<?php

namespace App\Http\Controllers;

use App\Http\Resources\PuppyResource;
use App\Models\Puppy;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PuppyController extends Controller
{
    public function store(Request $request): PuppyResource
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'trait' => ['required', 'string', 'max:255'],
            'image_url' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:2048'],
        ]);

        $path = $request->file('image_url')->store('puppies', 'public');

        $puppy = Puppy::create([
            'user_id' => $request->user()?->id ?? User::query()->value('id'),
            'name' => $validated['name'],
            'trait' => $validated['trait'],
            'image_url' => Storage::url($path),
        ]);

        $puppy->load(['user', 'likedBy']);

        return new PuppyResource($puppy);
    }

    public function toggleLike(Puppy $puppy, Request $request): PuppyResource
    {
        $userId = $request->user()?->id ?? User::query()->value('id') ?? 1;

        $puppy->likedBy()->toggle($userId);
        $puppy->load(['user', 'likedBy']);

        return new PuppyResource($puppy);
    }
}
