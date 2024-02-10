module.exports = {
  //HOST: "MSI13700K\\SQLEXPRESS",
  HOST: "localhost",
  PORT: "10433",
  USER: "user1",
  PASSWORD: "x",
  DB: "dbMain",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 2000 //[ms] time to do nothing
  }
};
