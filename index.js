let group_id;
group_id = '617651401610974';
group_id = '517272935059471';
group_id = '873530022667755'; // reactjs
const axios = require('axios');
const fs = require('fs');
const _ = require('underscore');

let c = 1;
let out = [];
let access_token = 'EAACEdEose0cBAOF03VfSihukFkg4wrVAg6y8MdgDstjO05cEQ3mcFXYKkgaIhWWCzhtxspWUBKKD6S9BT61SPPI6r1ilQg8MGirjDhXTG6MpiR6o6EHnXT9JFNEmcmOXzU2HlPX9yxn1WIQbncZAqyYEkR2xOn7znwXe9QoDP5ZBMxKmYaJLTZB5AdeQpX9RljzSTMnCV0AGwLc5J4p'
let url = `https://graph.facebook.com/v2.10/${group_id}/feed?fields=from,message,link,likes,story,name,updated_time,caption,permalink_url&limit=200&access_token=${access_token}`;
console.log (url)

process.stdout.write('processing page: ' + c++);
const get = url => {
  axios.get(url)
    .then(function (response) {
      const next = response.data.paging.next;
      const data = response.data.data;
      process.stdout.cursorTo(0);
      process.stdout.write('processing page: ' + c++);
      if (next) {
        out.push(data);
        get(next);
      }
      else {
        console.log('done');
      }
    })
    .catch(function (error) {
      out = _.flatten(out);
      fs.writeFile(`${group_id}-output.json`, JSON.stringify(out), function (err) {
        if (err) {
          return console.log(err);
        }
        console.log('The file was saved!');
      });
    });

};

get(url);
