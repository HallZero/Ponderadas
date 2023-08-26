const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'teste', 'teste123', {
    host: 'localhost',
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

(async () => {
    await sequelize.sync(); // Make sure the table is created

    const test = await User.create({ name: 'teste' }); // Use create() instead of build() + save()

    const users = await User.findAll();

    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
})();
