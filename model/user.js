module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        pic_url: {
            type:Sequelize.STRING,
            defaultValue:"profile.png"
        },
        age: Sequelize.INTEGER, 
        verify:Sequelize.INTEGER,
        token:Sequelize.STRING,
        code:Sequelize.INTEGER,
        type:Sequelize.INTEGER
    });
    return User
}
