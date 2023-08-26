const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'teste', 'teste123', {
    host: 'db',
    port: 5432,
    dialect: 'postgres'
});

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
});

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: {
        type: DataTypes.STRING
    },
    done: {
        type: DataTypes.BOOLEAN
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    }
}, {
    // Other model options go here
});

module.exports = { sequelize, User, Task };