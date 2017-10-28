var _ = require('underscore');
var data;
data = require('./617651401610974-output.json');
data = require('./517272935059471-output.json');
data = require('./873530022667755-output.json');

var from = {};

data.forEach(post => {
  post.from = post.from || {};
  let likes = post.likes || {likes: {data: []}};
  if (!from[post.from.id]) {
    from[post.from.id] = {name: post.from.name, posts: 0, likes: 0};
  }
  from[post.from.id].posts += 1;
  from[post.from.id].likes += _.size(likes.data);
  from[post.from.id].ratio = parseInt((from[post.from.id].likes/from[post.from.id].posts).toFixed(2));
});

let out = []
//out = _.groupBy(from, d => d.ratio);
out = _.groupBy(from, d => d.likes);
console.log((out));
console.log(`size = ${_.size(out)}`);
