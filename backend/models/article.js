const { Sequelize, DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Article', {
    'id': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'titre': {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: true
    },
    'message': {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    'image': {
      type: DataTypes.STRING,
      allowNull: false,
      required: true
    },
    'userId': {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      requierd: true
    },
    'dateCreation': {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },
   ' dateModification': {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn('NOW'),
    },

  }, {
    tableName: 'Article',
    freezeTableName: true
  });
};