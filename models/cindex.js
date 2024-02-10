dbConfig = require("../config/db.config.js");
Sequelize = require("sequelize");

class CSequelizeDb {

  constructor() {
    this.db = {};
  }

  iniFromConst = () => {

    this.sequelize = new Sequelize(dbConfig.DB, 
        dbConfig.USER, dbConfig.PASSWORD, {

      host: dbConfig.HOST,
      port: dbConfig.PORT,
      dialect: dbConfig.dialect,
      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    });


    this.Sequelize = Sequelize;

    this.ctally = require("./tally.model.js")
                          (this.sequelize, Sequelize);
    this.nTimesLogged = 0; //how many times you logged in
    this.bIsLogged = false;
  }
                       
}

module.exports = {CSequelizeDb};
