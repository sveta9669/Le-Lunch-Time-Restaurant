module.exports = (sequelize, Sequelize) => {
    const Food = sequelize.define("food", {
        image: Sequelize.STRING,
        title: Sequelize.STRING,
        price: Sequelize.INTEGER,
        type: Sequelize.STRING  
    })
    return Food;
} 