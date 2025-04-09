<?php
// Define image URLs for medicine and vitamin products
$imageUrls = [
    'vitamin-d3.jpg' => 'https://placekitten.com/500/500',
    'multivitamin.jpg' => 'https://placekitten.com/501/501',
    'omega3.jpg' => 'https://placekitten.com/502/502',
    'zinc.jpg' => 'https://placekitten.com/503/503',
    'magnesium.jpg' => 'https://placekitten.com/504/504',
    'probiotic.jpg' => 'https://placekitten.com/505/505',
    'vitamin-c.jpg' => 'https://placekitten.com/506/506',
    'melatonin.jpg' => 'https://placekitten.com/507/507',
];

// Directory to save the images
$targetDir = '../public/images/products/';

// Create directory if it doesn't exist
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Download images
foreach ($imageUrls as $filename => $url) {
    $targetPath = $targetDir . $filename;
    
    // Check if file already exists
    if (file_exists($targetPath)) {
        echo "File $filename already exists, skipping...<br>";
        continue;
    }
    
    // Download image
    $image = file_get_contents($url);
    
    if ($image === false) {
        echo "Failed to download $url<br>";
        continue;
    }
    
    // Save image to file
    $result = file_put_contents($targetPath, $image);
    
    if ($result === false) {
        echo "Failed to save $filename<br>";
    } else {
        echo "Successfully saved $filename<br>";
    }
}

echo "Done!";
?> 