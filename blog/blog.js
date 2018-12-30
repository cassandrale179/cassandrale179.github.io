Vue.component('blog-post', {
    props: ['post'],
    template: `
      <div id='card'>
        <h2>{{ post.book_title }}</h2>
        <h3> {{ post.book_author }} </h3>
        <div v-html="post.review_body"></div> 
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
