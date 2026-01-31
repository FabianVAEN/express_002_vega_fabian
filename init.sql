CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock integer NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO products (name, price, stock, sku) VALUES
('Laptop Dell', 699.99, 10, 'LAP-DELL-001'),
('Mouse Logitech', 25.99, 50, 'MOU-LOG-002'),
('Teclado Logitech', 75.99, 20, 'TEC-LOG-003'),
('Ipad Pro M3', 75.99, 3, 'IPD-APL-004');