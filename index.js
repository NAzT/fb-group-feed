const group_id = '617651401610974';
//var group_id = "517272935059471"
const axios = require('axios');
const fs = require('fs');
const _ = require('underscore');

let url = `https://graph.facebook.com/v2.10/${group_id}/feed?fields=from,message,link,likes,story,name,updated_time,caption,permalink_url&limit=200&access_token=EAACEdEose0cBAOPDnZC6cWkRWh6tH8J4xJstH0KPpUgxCGxI9nCafi5P5DBocPWJqVZCj8VxjMZBDc9yLwtQ394zzCVkQAkPKDRWwZBLzecHRZATU7Uz0K6vmVIEsUNCBhk7wqTW2M2q6Ww2dnVqs3Uly1k4klC1q5SB4cZBZAZAgSmIifKRTzIX90UZAqrYtbREZD`;

let out = [];
let c = 1;

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
