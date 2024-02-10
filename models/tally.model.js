module.exports = (sequelize, Sequelize) => {
  const Tally = sequelize.define("tally", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Tally;
};
