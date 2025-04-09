-- Set two more products as featured to balance the second row
UPDATE products
SET is_featured = 1
WHERE name IN ('Vitamin C 1000mg', 'Melatonin 5mg');

-- If the update affects no rows (in case product names were changed), try updating by ID
UPDATE products
SET is_featured = 1
WHERE id IN (7, 8) AND is_featured = 0; 