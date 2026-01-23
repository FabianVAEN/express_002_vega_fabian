const ProductRepository = require('../repositories/productRepository')

class ProductService {
    findAll() {
        const products = ProductRepository.findAll()
        return {
            products,
            total: products.length
        }
    }   

    searchById(id) {
        const numericId = parseInt(id)

        // http status 
        // 200 -> OK
        // 400 -> Algo esta mal del lado del request
        // 404 -> No se encontro el recurso
        // 403 -> Prohibido
        // 401 -> No autorizado
        // 400 -> Bad request
        // 500 -> Error del servidor

        if (isNaN(numericId)) {
            throw {
                status: 400,
                message: "El ID debe ser un número"
            }
        }
        const product = ProductRepository.findById(numericId)
        if (!product) {
            throw {
                status: 404,
                message: `Producto con ID ${numericId} no encontrado`
            }
        }
        return product
    }
    create(newProduct) {
        // 1ra ,amera de hacerlo
        const oldWayDescription = newProduct.description 

        if(!oldWayDescription){
            throw {
                status: 400,
                message: "La descripción es obligatoria"
            }
        }

        const {description, price, stock, sku} = newProduct 
        if (!description || !price || !stock || !sku) {
            throw {
                status: 400,
                message: "Faltan datos obligatorios"
            }
        }

        if(typeof stock !== 'number' || stock < 0){
            throw {
                status: 400,
                message: "El stock debe ser un número válido"
            }
        }

        // Así para todos los campos que queramos validar

        const existingSku = ProductRepository.findBySku(sku)
        if (existingSku) {
            throw {
                status: 400,
                message: `El SKU ${sku} ya existe`
            }
        }

        const savedProduct = ProductRepository.create({
            description,
            price,
            stock,
            sku
        })
        return savedProduct
    }
}

module.exports = new ProductService()