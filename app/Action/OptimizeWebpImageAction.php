<?php

namespace App\Action;

use Illuminate\Http\UploadedFile;
use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Str;

class OptimizeWebpImageAction
{
    /**
     * Create a new class instance.
     */
    // public function handle(UploadedFile $input): array
    public function handle(string $input): array
    {
        //image optimization
        $image = Image::read($input);

        //scale down image
        if ($image->width() > 1000) {
            $image->scale(width: 1000);
        }

        $encoded = $image->toWebp(quality: 95)->toString();
        $fileName = Str::random() . '.webp';
        return [
            'fileName' => $fileName,
            'webpString' => $encoded,
        ];
    }
}
