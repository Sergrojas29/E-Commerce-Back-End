
SELECT product_id ,product_name, price, stock, category_id, tag_id, tag_name FROM product INNER JOIN  tag ON product.category_id = tag.category_id;