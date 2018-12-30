## Personal Website (in progress) 

Link: https://minh-le.com

## Engineering Process
- **For this blog, I want to try a different approach.** I often used modern frameworks like Angular or React, which always came in with a perfectly set-up environment to deploy on local host. I have also worked extensively with Node.js, which mades stuff especially easy for importing libraries. 
- **Now I wanted to do things "minimally".** Not a bunch of files that include a lot of config, environment.ts, ..etc. 
I have dabbled a bit in Angular + React, so I am testing out Vue.js. 
- **One reason I am choosing Vue.js** is how easily integrated it is. You can either have a Vue dev environment set up with the CLI, or honestly, just created a Vue app on client side. 


### 1. Front-end 

```javascript
Vue.component('blog-post', {
    props: ['post'],
    template: `
      <div>
        <h2>{{ post.book_title }}</h2>
        <h3> {{ post.book_author }} </h3>
        <div v-html="post.review_body"></div> 
      </div>
    `
  })

var app = new Vue({
    el: '#blog-container',
    data: {
      posts: posts_values 
    }, 
})

```
- On the HTML side: 
```html
    <div id="blog-container">
        <blog-post
            v-for="post in posts"
            v-bind:key="post.id"
            v-bind:post="post"
        ></blog-post>
    </div>  
```
  
- That's it. Isn't that awesome?

### 2. Parsing Content
- **Goal**: I want the blog to automatically streamed my Goodreads review. So if I posted a review on my Goodreads, it should automatically uploaded it on my blog.
- **Problem**: Apparently Github is a static webpage, so they won't host any server-side back-end. I tried find a Node wrapper for [Goodreads API](https://github.com/bdickason/node-goodreads), so maybe I can use [Browserify](https://github.com/browserify/browserify) to somehow make Node worked on client-side JavaScript. Then maybe I can make GET request through the wrapper to get my reviews. It turned out to be a huge mess! 
    - I got Browserify to work (but the debugging process was hell 😧. Apparently Chrome Dev Tools still output error message from both bundle.js and the original js file, which I had to filter out).
    - The Goodreads API node wrappper is also error-prone, and apparently I can't even make XML requests due to CORS.  😢  
- **New Approach**: Following the minimal approach, I said f it and threw the Goodreads API + Browserify away. I create a small Expres app on the side, then actually scraped my own data from scratch using [Cheerio](https://github.com/cheeriojs/cheerio). This is simple because 
    ```javascript 
    
    const $ = require('cheerio'); 
    const rp = require('request-promise');  

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
          return id; 
      }); 
      // review_ids = [1291790836, 6832234232...] 
      ```

### 3. Linking it together
- **Sadly, there was NO server side rendering allowed**, so I just wrote all contents to a data.js file, and then use that as a global variables shared by the original blog.js file. This made the reviews automatically load and yay, we are kinda done with the project!
- **The problem is, this website will not automatically updated at all**, unless someone run a triggered script locally to update the data.js file, so the original goal still fell short 😞 but at least this website took less than 4 hours to build ¯\\_(ツ)_/¯   
- Now onto writing the automatical manual script. 
