const express = require('express')
const router = express.Router()

const ProductService = require('../services/productService')
const productService = require('../services/productService')

router.get('/',(req,res)=>{
    const result = ProductService.findAll()

    res.json(result)
})

// GET -> para una lectura
// POST -> para cescritura o lectura compleja
// PUT -> para actualizar o edición
// DELETE -> para eliminar  

router.get('/:id',(req,res)=>{
    const result = productService.searchById(req.params.id)
    res.json(result)
})

router.post('/',(req,res)=>{
    const newProduct = productService.create(req.body)
    res.status(201).json(newProduct)
})

router.put('/:id', (req, res) => {
    try {
        const result = productService.update(req.params.id, req.body);
        res.json(result);
    } catch (error) {
        res.status(error.status || 500).json({
            message: error.message || 'Error interno del servidor'
        });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const result = productService.delete(req.params.id);
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