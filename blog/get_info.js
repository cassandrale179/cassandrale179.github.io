// libraries  
const goodreads = require('goodreads'); 
const express = require('express')
const request = require('request'); 
const $ = require('cheerio'); 
const rp = require('request-promise');  

// global variables 
const app = express()
const port = 3000

// goodreads config
const key = process.env.key; 
const username = process.env.username; 
const user_id = process.env.user_id; 
const shelf_name = 'bilsdungroman'; 
const shelf_url = 'https://www.goodreads.com/review/list/' + user_id + '?shelf=' +  shelf_name; 

// Functo
function ParseHTMLContent(){
    rp(shelf_url).then(function(html){
  
      // Get a list of all links that are within the html page 
      var links = []; 
      $('div[class=value] > a', html).each(function () {
          var link = $(this).attr('href');
          links.push(link);
       }); 
  
      // Filter out links that are reviews and then get their ids 
      var review_links = links.filter(x => x.includes('review/show/'));
      var review_ids = review_links.map(x => { 
          var id = x.substring(x.indexOf('show/') + 'show/'.length, x.length); 
          console.log(id); 
          return id; 
      }); 
  
      // Make an API call to get the review 
      console.log("review_ids", review_ids); 
      getReviewContent(review_ids); 
  
    }).catch(function(err){
        cosole.log(err); 
    });
}


// Function to get the review content given an url 
function getReviewContent(review_ids){
    console.log("this function is called!!!"); 
    review_ids.forEach(id => {
        var review_url = 'https://www.goodreads.com/review/show.xml?id=' + id + '&key=' + key; 
        request(review_url, function (error, response, body) {
            console.log('error:', error); 
            console.log('statusCode:', response && response.statusCode);
            console.log("body", body); 
        }); 
    });
}


// Call all functions here 
ParseHTMLContent(); 


app.listen(port, () =>  console.log(`App listening on port ${port}!`))
