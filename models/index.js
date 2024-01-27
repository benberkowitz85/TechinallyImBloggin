const User = require('./user');
const Blog = require('./blog');
const Comments = require('./comments');

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comments, {
  foreignKey: 'user_id'
})
Comments.belongsTo(User, {
  foreignKey: 'user_id'
});

Blog.hasMany(Comments, {
  foreignKey: 'blog_id'
})

Comments.belongsTo(Blog, {
  foreignKey: 'user_id'
});

module.exports = { User, Blog, Comments };