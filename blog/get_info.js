// libraries  
const $ = require('cheerio'); 
const rp = require('request-promise');  
const xml2js = require('xml2js'); 
const fs = require('fs'); 

// Goodreads configuration variables 
const key = process.env.key; 
const user_id = process.env.user_id; 
const shelf_name = 'bilsdungroman'; 
const shelf_url = 'https://www.goodreads.com/review/list/' + user_id + '?shelf=' +  shelf_name; 
const parser = new xml2js.Parser(); 

// Parse a .html content (shelf_url)
function ParseHTMLContent(){
    rp(shelf_url).then((content) => {
  
      // Get a list all a tags that are within the shelf_url 
      var links = []; 
      $('div[class=value] > a', content).each(function () {
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
  
      // Make an API call to get the json parsing of the reviews then send data to Vue fron end 
      var content_promise_arr = getReviewContent(review_ids); 
      Promise.all(content_promise_arr).then((values) => {
        var json = JSON.stringify(values); 
        fs.writeFile('data.json', json, 'utf8'); 
      }); 
    }).catch((err) => {
        console.log(err) 
    });
}

// Function to get the review content given an url 
// Return an array of that contain promise objects which if resolved, return the content object 
function getReviewContent(review_ids){
    var content_promise_arr = []; 
    review_ids.forEach(id => {
        var p = new Promise((resolve, reject) => {
        var review_url = 'https://www.goodreads.com/review/show.xml?id=' + id + '&key=' + key; 
        rp(review_url).then((content) => {

            // Parse XML file to JSON
            parser.parseString(content, function (err, result) {

                // Get book information 
                var book_obj = result.GoodreadsResponse.review[0].book[0];
                var book_title = book_obj.title;
                var book_author = book_obj.authors[0].author[0].name; 

                // Get reviews information 
                var review_obj = result.GoodreadsResponse.review[0]; 
                var review_body = review_obj.body[0]; 
                var rating = review_obj.rating; 

                var content_object = {
                    'book_title': book_title, 
                    'book_author': book_author, 
                    'review_body': review_body, 
                    'rating': rating 
                }
                resolve(content_object); 
            }); 
        })
    }); 
    content_promise_arr.push(p);       
    }); 
    return content_promise_arr; 
}

// Call functions down here 
ParseHTMLContent(); 
