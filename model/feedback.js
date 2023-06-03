module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        email: Sequelize.STRING,
        message:Sequelize.STRING,
        type: Sequelize.STRING
    });
    return Feedback
}
 