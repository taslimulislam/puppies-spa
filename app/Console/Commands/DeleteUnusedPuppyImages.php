<?php

namespace App\Console\Commands;

use App\Models\Puppy;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeleteUnusedPuppyImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'delete-unused-puppy-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up unused puppy images from the storage';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //Find Unused Puppy Images
        $storedImages = Storage::disk('public')->files('puppies');
        $usedImages = Puppy::pluck('image_url')
        ->map(function ($imageUrl) {
            return str_replace('/storage/', '', $imageUrl);
        })
        ->toArray();
        //compare both arrays and find unused images
        $unusedImages = array_diff($storedImages, $usedImages);

        //report unused images
        $totalCount = count($unusedImages);
        if ($totalCount === 0) {
            $this->info('No unused puppy images found.');
            return;
        }
        $this->info("Found $totalCount unused puppy images.");

        //Show firsst 3 images and then + X more
        $firstThree = array_slice($unusedImages, 0, 3);
        foreach ($firstThree as $image) {
            $this->line('- ' . $image);
        }
        if ($totalCount > 3) {
            $remaining = $totalCount - 3;
            $this->line('+ ' . $remaining . ' more...');
        }

        //Ask for confirmation before deletion
        if ($this->confirm('Do you want to delete these unused images?')) {
            foreach ($unusedImages as $image) {
                Storage::disk('public')->delete($image);
                $this->info('Deleted: ' . $image);
            }
            $this->info('Unused puppy images deleted successfully.');
        } else {
            $this->info('Deletion cancelled.');
        }
    }
}
