-- Delete existing products
DELETE FROM products;

-- Reset auto-increment
ALTER TABLE products AUTO_INCREMENT = 1;

-- Insert new medicine and vitamin products
INSERT INTO products (name, category, description, price, sale_price, rating, reviews, properties, is_new, is_featured, image_url) VALUES
('Vitamin D3 5000IU', 'Vitamins', 'High-potency vitamin D3 supplement for immune support and bone health.', 15.99, NULL, 4.8, 124, '{"size":"60 capsules","usage":"1 daily","vegan":false,"certified":true}', 0, 1, '/images/products/vitamin-d3.jpg'),

('Multivitamin Complex', 'Vitamins', 'Complete daily multivitamin with essential minerals and antioxidants.', 24.99, 19.99, 4.7, 208, '{"size":"90 tablets","usage":"1 daily","vegan":true,"certified":true}', 0, 1, '/images/products/multivitamin.jpg'),

('Omega-3 Fish Oil', 'Supplements', 'Pure fish oil with EPA and DHA to support heart and brain health.', 21.99, NULL, 4.5, 187, '{"size":"120 softgels","usage":"1-2 daily","vegan":false,"certified":true}', 0, 0, '/images/products/omega3.jpg'),

('Zinc Lozenges', 'Immune Support', 'Zinc lozenges with vitamin C for immune system support.', 12.99, 9.99, 4.3, 156, '{"size":"60 lozenges","usage":"1-2 daily","vegan":true,"certified":true}', 1, 0, '/images/products/zinc.jpg'),

('Magnesium Glycinate', 'Minerals', 'Highly absorbable magnesium supplement for muscle and nerve function.', 18.99, NULL, 4.9, 213, '{"size":"120 capsules","usage":"2 daily","vegan":true,"certified":true}', 0, 1, '/images/products/magnesium.jpg'),

('Probiotic 50 Billion CFU', 'Digestive Health', 'High-potency probiotic with multiple strains for gut health.', 29.99, 24.99, 4.6, 178, '{"size":"30 capsules","usage":"1 daily","vegan":true,"certified":true,"refrigerated":true}', 1, 1, '/images/products/probiotic.jpg'),

('Vitamin C 1000mg', 'Vitamins', 'High-dose vitamin C with rose hips for immune support and antioxidant protection.', 16.99, NULL, 4.7, 231, '{"size":"100 tablets","usage":"1-2 daily","vegan":true,"certified":true}', 0, 0, '/images/products/vitamin-c.jpg'),

('Melatonin 5mg', 'Sleep Aid', 'Natural sleep aid to support healthy sleep cycles.', 11.99, 9.99, 4.5, 189, '{"size":"60 tablets","usage":"1 before bedtime","vegan":true,"certified":true}', 0, 0, '/images/products/melatonin.jpg'); 