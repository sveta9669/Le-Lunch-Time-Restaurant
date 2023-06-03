const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('fornode11','root','',{
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

const User = require("./user")(sequelize, Sequelize)
const Food = require("./food")(sequelize, Sequelize)
const Card = require("./card")(sequelize, Sequelize)
const Feedback = require("./feedback")(sequelize, Sequelize)

Card.belongsTo(User, { onUpdate:'CASCADE', onDelete:'CASCADE'})
Card.belongsTo(Food, { onUpdate:'CASCADE', onDelete:'CASCADE'})

User.hasMany(Card)
Food.hasMany(Card)

sequelize.sync()

module.exports = {User,  sequelize, Food, Feedback, Card}