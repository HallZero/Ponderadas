const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'teste', 'teste123', {
    host: 'localhost',
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
    },
    password: {
        type: DataTypes.STRING
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

async function init() {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
}

init();

module.exports = { sequelize, User, Task };