# Product API - Node.js Express

Una API REST simple para gestión de productos con arquitectura en capas.

## Características

- CRUD completo de productos
- Arquitectura en 3 capas (Repository/Service/Controller)
- Validaciones de negocio
- Manejo de errores HTTP
- Persistencia en memoria

## Estructura

```text
express_02/
├── repositories/
│   └── productRepository.js   # Acceso a datos
├── services/
│   └── productService.js      # Lógica y validaciones
├── routes/
│   └── productRoutes.js       # Endpoints y rutas
├── server.js                  # Configuración Express
└── package.json   
```


## Instalación

1. Clona o descarga el proyecto.
2. Instala las dependencias:
   ```bash
   npm install express 
   ```
3. Inicia el servidor
    ```bash
    node server.js
    ```
## Uso 

### Para obtener los productos 
- GET http://localhost:4000/api/products

### Para obtener un producto por ID
- GET http://localhost:4000/api/products/1

### Para crear un producto
- POST http://localhost:4000/api/products

    ```bash
    {
    "name": "Producto Ejemplo",
    "price": 99.99,
    "stock": 50,
    "sku": "SKU-001"
    }
    ```
### Para actualizar un producto 
- PUT http://localhost:4000/api/products/1 el id debe ser correspondiente al producto que se quiere actualizar

    
    {
    "name": "Nombre Actualizado",
    "price": 149.99
    }
  

### Eliminar producto
- DELETE http://localhost:4000/api/products/1

## Modelo de producto 

Modelo base para un producto:

    ```bash
    {
    "id": 1,              // Generado automáticamente
    "name": "Laptop",     // Requerido
    "price": 999.99,      // Requerido, número positivo
    "stock": 10,          // Requerido, número positivo
    "sku": "LAP-1234"     // Requerido, único
    }
    ```

