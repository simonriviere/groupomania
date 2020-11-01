module.exports = (sequelize, Sequelize) => {
  const Users =  sequelize.define('user', {
    'id': {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    'nom': {
      type: Sequelize.STRING,
      
    },
    "prenom": {
      type: Sequelize.STRING
    },
    "sexe": {
      type: Sequelize.CHAR(1)
    },
    'pseudo': {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    "imageProfil": {
      type: Sequelize.STRING
    },
    'email': {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    'password': {
      type: Sequelize.STRING(64),
      is: /^[0-9a-f]{64}$/i
    }

  }, {
    tableName: 'User',
    freezeTableName: true,
    timestamps: false
  });
  return Users
};