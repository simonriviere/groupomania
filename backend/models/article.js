
module.exports = (sequelize, Sequelize) => {
 const Articles =  sequelize.define('article', {
    'id': {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'titre': {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    'message': {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    'image': {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
    'userId': {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      requierd: true
    },
    'createdAt': {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
   'updatedAt': {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },

  }, {
    tableName: 'Articles',
    freezeTableName: true
  });
  return Articles
};