## Personal Website (in progress) 

Link: https://minh-le.com

## Engineering Process
- For this blog, I want to try a different approach. I often used modern frameworks like Angular or React, which always came in with a perfectly set-up environment to deploy on local host. I have also worked extensively with Node.js, which mades stuff especially easy for importing libraries. 
- Now I wanted to do things "minimally". Not a bunch of files that include a lot of config, environment.ts, ..etc. 
I have dabbled a bit in Angular + React, so I am testing out Vue.js. 
- One reason I am choosing Vue.js is how easily integrated it is. You can either have a Vue dev environment set up with the CLI, or honestly, just created a Vue app on client side. 

```javascript
var app = new Vue({
    el: '#blog-container',
    data: {
      posts: []
      ... 
   } 
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
