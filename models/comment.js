'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    body: DataTypes.TEXT,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.comment.belongsTo(models.favorite);
      }
    },
    hooks: {
      beforeCreate: function(comment){
        comment.get().body=comment.get().body.toLowerCase();
      }
    }
  });
  return comment;
};