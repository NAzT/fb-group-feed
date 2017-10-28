var _ = require("underscore")
var data = require("./output.json")

data.forEach(post => {
  console.log(post.message) 
})
