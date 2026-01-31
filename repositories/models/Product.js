const { DataTypes } = require('sequelize'); // Sequelize es uno de los muchos ORM que existen para Node.js
const sequelize = require('../../database.js'); // Importamos la instancia de Sequelize configurada

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sku: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    }
},{
    tableName: 'products2',
    freezeTableName: true,
    timestamps: false // si no queremos el created at y updated at
})

module.exports = Product

// Una vez modificado esto nos vamos a nuestro product repositoyORM