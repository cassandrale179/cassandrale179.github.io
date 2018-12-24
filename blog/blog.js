Vue.component('blog-post', {
    props: ['post'],
    template: `
      <div id='card'>
        <h2>{{ post.title }}</h2>
        <h3> {{ post.synopsis }} </h3>
        <h4> Published: {{post.date }} | tags: {{ post.tags }} </h4> 
        <div class='quote' v-html="post.quotes"></div> 
      </div>
    `
  })

var app = new Vue({
    el: '#blog-container',
    data: {
        posts: [
        { 
            id: 1, 
            title: 'Book Review #394', 
            synopsis: 'A band of Shakespeare actors trying to survive in an apocalyptic world', 
            date: '09 December 2018', 
            tags: 'bookreviews', 
            quotes: 'Of all of them there at the bar that night, the bartender was the one who survived the longest. He died three weeks later on the road out of the city. <br> <b> - p. 30</b>'

        },
        { 
            id: 2, 
            title: 'Book Review #393', 
            synopsis: 'Woman found murdered with no evidence. Who is the killer?', 
            date: '09 December 2018', 
            tags: 'bookreviews', 
            quotes: `These people are pissing me off. The neediness of it, all of them jumping up and down and waving their arms and doing their cutest little booty-shakes for the internet:
            <i>Me, look at me, like me, please oh please want me!!!! " </i>
            The because-I'm-worth-it shower (<i>Looking for someone tall, slim, very fit, no smokers, no drugs, no kids, no pets, must have a full time job and own car, must like fusion cuisine, speak at least three languages, enjoy bikram yoga and acid jazz...</i>) is just as bad: ordering their relationships from the online menu because of course you have to have one, same as you have to have the state-of-the-art sound system and a pimped-out new car... No one <i> needs </i> a relationship. The truth is, if you don't exist without someone else, you don't exist at all. <br> <b> - p. 183</b>`
    
        },
        //   { id: 3, title: 'Why Vue is so fun' }
        ]
      }
})
