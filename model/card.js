module.exports = (sequelize, Sequelize) => {
    const Card = sequelize.define("card", {
        count: Sequelize.STRING,
        price: Sequelize.INTEGER,
    })
    return Card;
}