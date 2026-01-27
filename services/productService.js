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
        // CORREGIDO: Cambiar description por name
        const { name, price, stock, sku } = newProduct;

        if (!name || !price || !stock || !sku) {
            throw {
                status: 400,
                message: "Faltan datos obligatorios: name, price, stock, sku"
            }
        }

        if (typeof price !== 'number' || price < 0) {
            throw {
                status: 400,
                message: "El precio debe ser un número válido y positivo"
            }
        }

        if (typeof stock !== 'number' || stock < 0) {
            throw {
                status: 400,
                message: "El stock debe ser un número válido y positivo"
            }
        }

        const existingSku = ProductRepository.findBySku(sku);
        if (existingSku) {
            throw {
                status: 400,
                message: `El SKU ${sku} ya existe`
            }
        }

        const savedProduct = ProductRepository.create({
            name,  // CORREGIDO: usar name en lugar de description
            price,
            stock,
            sku
        });
        return savedProduct;
    }

    update(id, productData) {
        const numericId = parseInt(id);

        if (isNaN(numericId)) {
            throw {
                status: 400,
                message: "El ID debe ser un número"
            }
        }

        // Verificar que el producto existe
        const existingProduct = ProductRepository.findById(numericId);
        if (!existingProduct) {
            throw {
                status: 404,
                message: `Producto con ID ${numericId} no encontrado`
            }
        }

        // Validar que si se envía SKU, no duplique uno existente (excepto el propio)
        if (productData.sku && productData.sku !== existingProduct.sku) {
            const productWithSameSku = ProductRepository.findBySku(productData.sku);
            if (productWithSameSku) {
                throw {
                    status: 400,
                    message: `El SKU ${productData.sku} ya existe en otro producto`
                }
            }
        }

        // Validaciones de tipos de datos
        if (productData.price !== undefined) {
            if (typeof productData.price !== 'number' || productData.price < 0) {
                throw {
                    status: 400,
                    message: "El precio debe ser un número válido y positivo"
                }
            }
        }

        if (productData.stock !== undefined) {
            if (typeof productData.stock !== 'number' || productData.stock < 0) {
                throw {
                    status: 400,
                    message: "El stock debe ser un número válido y positivo"
                }
            }
        }

        // Actualizar el producto
        const updatedProduct = ProductRepository.update(numericId, productData);
        return updatedProduct;
    }

    delete(id) {
        const numericId = parseInt(id);

        if (isNaN(numericId)) {
            throw {
                status: 400,
                message: "El ID debe ser un número"
            }
        }

        // Verificar que el producto existe
        const existingProduct = ProductRepository.findById(numericId);
        if (!existingProduct) {
            throw {
                status: 404,
                message: `Producto con ID ${numericId} no encontrado`
            }
        }

        // Eliminar el producto
        const deletedProduct = ProductRepository.delete(numericId);
        return deletedProduct;
    }
}

module.exports = new ProductService()