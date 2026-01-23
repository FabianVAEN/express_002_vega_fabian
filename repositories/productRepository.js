class ProductRepository {
    constructor() {
        this.products = [
            { id: 1, name: "Laptop", 
                price: 999, 
                stock: 10, 
                sku: "LAP-1234" },
            { id: 2,
                 name: "Celular", 
                 price: 699, 
                 stock: 25, 
                 sku: "SMP-5678" },
            { id: 3,
                 name: "Tablet", 
                 price: 499, 
                 stock: 15, 
                 sku: "TAB-9101" }
        ]
    }

// Todo repositorio debe tener al menos los siguientes parametros

    findAll() {
        return this.products
    }

    findById(id) {
        return this.products.find(product => product.id === id)
    }
    findBySku(sku) {
        return this.products.find(product => product.sku === sku)
    }

    create(product) {
        const newProduct = {
            id: this.products.length + 1,
            ...product
        }
        this.products.push(newProduct)
        return newProduct
    }

    update(id, product) {
        const index = this.products.findIndex(p => p.id === id)
        
        // early stopping
        if (index === -1) 
            return null

        // update 3, {stock: 10, id: 00000}

        this.products[index] = {
            ...this.products[index],
            ...product,
            id
        }

        return this.products[index]
    }

    delete(id) {
        const index = this.products.findIndex(p => p.id === id)
        if (index === -1) return null

        return this.products.splice(index, 1)[0]
    }
}


module.exports = new ProductRepository()