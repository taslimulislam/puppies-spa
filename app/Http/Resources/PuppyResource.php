<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PuppyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'trait' => $this->trait,
            'imageUrl' => $this->image_url,
            'likedBy' => $this->when(
                $this->relationLoaded('likedBy'),
                fn () => $this->likedBy->pluck('id')->values()->all(),
            ),
            'user' => UserResource::make($this->whenLoaded('user')),
        ];
    }
}
