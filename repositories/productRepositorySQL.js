const { Pool } = require('pg');

class ProductRepository {
    constructor() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'products_db',
            password: 'postgres',
            port: 5437
        })
    }

    // Todo repositorio debe tener al menos los siguientes parámetros
    async findAll() {
        // Deberiamos de ejecutar una query que haga una búsqueda de todos los productos
        const result = await this.pool.query('SELECT * FROM products')
        return result.rows
    }

    // Buscar producto por ID
    async findById(id) {
        const result = await this.pool.query('SELECT * FROM products WHERE id = $1', [id])
        return result.rows[0]
    }

    // Buscar producto por SKU
    async findBySku(sku) {
        const result = await this.pool.query('SELECT * FROM products WHERE sku = $1', [sku])
        return result.rows[0]
    }

    // Buscar productos entre rangos de existencia
    async findProductsBetweenExistence(minexistence, maxexistence) {
        const result = await this.pool.query(
            'SELECT * FROM products WHERE stock BETWEEN $1 AND $2 ORDER BY stock ASC',
            [minexistence, maxexistence]
        )
        return result.rows
    }

    // Crear un nuevo producto
    async create(product) {
        const { name, price, stock, sku } = product
        const result = await this.pool.query(
            'INSERT INTO products (name, price, stock, sku) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, stock, sku]
        )
        return result.rows[0]
    }

    // Actualizar un producto existente
    async update(id, product) {
        const fields = []
        const values = []
        let paramCounter = 1

        // Construir dinámicamente la query según los campos a actualizar
        if (product.name !== undefined) {
            fields.push(`name = $${paramCounter}`)
            values.push(product.name)
            paramCounter++
        }
        if (product.price !== undefined) {
            fields.push(`price = $${paramCounter}`)
            values.push(product.price)
            paramCounter++
        }
        if (product.stock !== undefined) {
            fields.push(`stock = $${paramCounter}`)
            values.push(product.stock)
            paramCounter++
        }
        if (product.sku !== undefined) {
            fields.push(`sku = $${paramCounter}`)
            values.push(product.sku)
            paramCounter++
        }

        if (fields.length === 0) return null

        values.push(id)
        const query = `UPDATE products SET ${fields.join(', ')} WHERE id = $${paramCounter} RETURNING *`

        const result = await this.pool.query(query, values)
        return result.rows[0]
    }

    // Eliminar un producto

    async delete(id) {
        const result = await this.pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id])
        return result.rows[0]
    }
}

module.exports = new ProductRepository()