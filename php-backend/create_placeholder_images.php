<?php
// Array of image filenames
$images = [
    'vitamin-d3.jpg',
    'multivitamin.jpg',
    'omega3.jpg',
    'zinc.jpg',
    'magnesium.jpg',
    'probiotic.jpg',
    'vitamin-c.jpg',
    'melatonin.jpg'
];

// Directory to save the images
$targetDir = '../public/images/products/';

// Create directory if it doesn't exist
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Set the image dimensions
$width = 500;
$height = 500;

// Create images
foreach ($images as $index => $filename) {
    $targetPath = $targetDir . $filename;
    
    // Skip if the file already exists
    if (file_exists($targetPath)) {
        echo "File $filename already exists, skipping...<br>";
        continue;
    }
    
    // Create a blank image
    $image = imagecreatetruecolor($width, $height);
    
    // Set background color (light pastel colors for different products)
    $colors = [
        imagecolorallocate($image, 230, 240, 250), // light blue
        imagecolorallocate($image, 250, 230, 240), // light pink
        imagecolorallocate($image, 240, 250, 230), // light green
        imagecolorallocate($image, 250, 250, 230), // light yellow
        imagecolorallocate($image, 240, 230, 250), // light purple
        imagecolorallocate($image, 230, 250, 240), // light mint
        imagecolorallocate($image, 250, 240, 230), // light orange
        imagecolorallocate($image, 230, 230, 250)  // light lavender
    ];
    
    // Fill the background
    imagefill($image, 0, 0, $colors[$index % count($colors)]);
    
    // Set text color (dark gray)
    $textColor = imagecolorallocate($image, 70, 70, 70);
    
    // Product name to display
    $name = ucfirst(str_replace(['-', '.jpg'], [' ', ''], $filename));
    
    // Add the product name text
    $fontSize = 5;
    $fontX = 50;
    $fontY = 250;
    imagestring($image, $fontSize, $fontX, $fontY, $name, $textColor);
    
    // Draw a simple pill or capsule shape
    $shapeColor = imagecolorallocate($image, 70, 70, 70);
    $outlineColor = imagecolorallocate($image, 50, 50, 50);
    
    if ($index % 2 == 0) {
        // Draw a pill/tablet
        imagefilledellipse($image, 250, 150, 200, 80, $shapeColor);
        imageellipse($image, 250, 150, 200, 80, $outlineColor);
    } else {
        // Draw a capsule
        imagefilledrectangle($image, 150, 110, 350, 190, $shapeColor);
        imagerectangle($image, 150, 110, 350, 190, $outlineColor);
        imagefilledellipse($image, 150, 150, 80, 80, $shapeColor);
        imagefilledellipse($image, 350, 150, 80, 80, $shapeColor);
        imageellipse($image, 150, 150, 80, 80, $outlineColor);
        imageellipse($image, 350, 150, 80, 80, $outlineColor);
    }
    
    // Save the image
    imagejpeg($image, $targetPath, 90);
    
    // Free memory
    imagedestroy($image);
    
    echo "Created $filename<br>";
}

echo "All done!";
?> 