const express = require('express')
const router = express.Router()

const productService = require('../services/productService')

// Definición de rutas para productos
router.get('/', async (req,res)=>{
    const result = await productService.findAll()
    res.json(result)
})

// GET -> para una lectura
// POST -> para cescritura o lectura compleja
// PUT -> para actualizar o edición
// DELETE -> para eliminar  

// Obtener producto por SKU
router.get('/sku/:sku',async (req,res)=>{
    const result = await productService.searchBySKU(req.params.sku)
    res.json(result)
})

// Obtener producto por ID
router.get('/:id',async (req,res)=>{
    const result = await productService.searchById(req.params.id)
    res.json(result)
})

// Obtener productos por su minimo y máximo de existencia
router.get('/existence/:min/:max',async (req,res)=>{
    const result = await productService.findProductsBetweenExistence(req.params.min, req.params.max)
    res.json(result)
})

// Crear un nuevo producto
router.post('/',async (req,res)=>{
    try {
        const newProduct =  await productService.create(req.body)
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        })
    }
})

// Actualizar un producto existente
router.put('/:id', async (req, res) => {
    try {
        const result = await productService.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        const result = await productService.delete(req.params.id);
        res.json({
            message: `Producto con ID ${req.params.id} eliminado exitosamente`,
            product: result
        });
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
});

module.exports = router // En este punto exportamos nuestro archivo