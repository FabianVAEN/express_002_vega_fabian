const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('products_db','postgres','postgres',{
    host:'172.16.4.91',
    dialect:'postgres', // Dialecto son las intricciones segun la base de datos que usemos
    port: 5437,
    logging: true
})

sequelize.authenticate()
    .then(() => console.log('Conexión exitosa'))
    .catch(err => console.log(`Error de conexión: ${err}`))

module.exports = sequelize