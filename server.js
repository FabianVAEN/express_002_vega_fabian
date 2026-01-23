const express = require("express")
const app = express()
const PORT = 4000
const productRoutes = require('./routes/productRoutes')


app.use(express.json())

app.get('/',(req,res)=> {
    res.send("test")
})

app.use('/api/products', productRoutes)

app.listen(PORT, ()=>{
    console.log(`Aplicación plicación esta corriendo en el puerto: ${PORT}`)
})
