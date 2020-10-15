const { Sequelize, DataTypes } = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Article', {
        'id': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        'message': {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            unique: true
        },
        'likeArticle': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            requierd: true
        },
        'dislikeArticle': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            requierd: true
        },
        'articleId': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            requierd: true
        },
        'userId': {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            requierd: true
        }
        /* 'dateCreation': {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
       ' dateModification': {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.fn('NOW'),
        },
     */
    }, {
        tableName: 'Article',
        freezeTableName: true
    });
};