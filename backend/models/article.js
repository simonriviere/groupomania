module.exports = function(sequelize, DataTypes) {
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
        required:true,
        unique: true
      },
      'commentaire': {
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
        requierd:true
      },

    }, {
      tableName: 'Article',
      freezeTableName: true
    });
  };