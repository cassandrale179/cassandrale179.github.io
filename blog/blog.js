Vue.component('blog-post', {
    props: ['post'],
    template: `
      <div id='card'>
        <h2> {{ post.book_title }} by <u> {{ post.book_author }} </u> </h2>
        <h3> {{ post.book_synopsis }} </h3>  
        <h4> Last updated: {{post.date }} </h4> 
        <div class='notes' v-html="post.review_body"></div> 
        <button> Read More </button> 
        <button class="comment"> Add Comment </button> 
      </div>
    `
  })

var app = new Vue({
    el: '#blog-container',
    data: {
      posts: posts_values 
    }, 
})
