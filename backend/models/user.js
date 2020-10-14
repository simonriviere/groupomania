

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        'id': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },
        'email': {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,   
            validate: {
              isEmail : true
              }
          },
          'password': {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i
          }

    }, {
      tableName: 'User',
      freezeTableName: true,
      timestamps: false
    });
  };