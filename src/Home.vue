<template>
	
	<v-container>
		<v-layout row wrap class="mb-2">
			<v-flex xs12 sm6 class="text-sm-right text-xs-center">
				<v-btn large router to="/meetups" class="secondary" dark>Explore Meetups</v-btn>
			</v-flex>
			<v-flex xs12 sm6 class="text-sm-left text-xs-center" >
				<v-btn large router to="/meetup/new" class="secondary" dark>Create Meetup</v-btn>
			</v-flex>
		</v-layout>

		<v-layout row wrap>
			<v-flex xs10 offset-xs1 >
	<v-layout>
		<v-flex xs12 class="text-xs-center" >
			<v-progress-circular indeterminate 
			color="primary" :width=4 
			:size=70 v-if="loading"></v-progress-circular>
		</v-flex>
	</v-layout>
	 <v-carousel interval="3000" style="cursor: pointer" v-if="!loading">
    <v-carousel-item
     transition="fade"
      reverseTransition="fade" 
    v-for="item in meetups" 
    :src="item.imageUrl" 
    :key="item.id" @click="onLoadMeetup(item.id)">
    	 <div class="title mb-1">
    	{{item.title}}
    </div>
    </v-carousel-item>
   
  	 </v-carousel>
				
			</v-flex>
		</v-layout>

		<v-layout row wrap class="mt-2">
			<v-flex xs12 sm12 class="text-xs-center">
				<p>Join Our Awesome Meetups!</p>
			</v-flex>
			
		</v-layout>

	</v-container>
</template>

<script>
	export default{

	  computed: {
	    meetups () {
	      return this.$store.getters.featuredMeetups
	    },

	    loading(){
	    	return  this.$store.getters.loading
	    }
	  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetup/' + id)
    }
  }}

</script>

<style scoped>
	
	.title{
		position: absolute;
		bottom: 50px;
		background-color: rgba(0,0,0,1);
		color: white;
		font-size: 2em;
		padding: 20px;
		opacity: 0.6;


	}
</style>