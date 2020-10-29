
module.exports = (sequelize, Sequelize) => {
    const Commentaires =  sequelize.define('commentaire', {
       'id': {
         type: Sequelize.INTEGER(11),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
       },
       'message': {
         type: Sequelize.STRING,
         allowNull: false,
         required: true
       },
       'articleId': {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        requierd: true
      },
       'userId': {
         type: Sequelize.INTEGER(11),
         allowNull: false,
         requierd: true
       },
/*        'createdAt': {
         allowNull: false,
         type: Sequelize.DATE,
         defaultValue: Sequelize.NOW,
       },
      'updatedAt': {
         allowNull: false,
         type: Sequelize.DATE,
         defaultValue: Sequelize.NOW,
       }, */
   
     }, {
       tableName: 'Commentaire',
       freezeTableName: true
     });
     return Commentaires
   };