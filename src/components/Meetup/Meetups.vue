<template>
	
	<v-container fluid >
		<v-layout row wrap >
			<v-flex xs10 offset-xs1>
				<h3 class="primary--text text-md-center">Upcoming Meetups</h3>
				
					
					 <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 v-for="meetup in meetups" :key="meetup.id">
				<v-card color="primary" class="ma-1 grid "  left >
					
								<v-card-media :src="meetup.imageUrl" height="130px" >
        							</v-card-media>
							
							
								<v-card-title primary-title>
									<div class="white--text">
            						<h5 >
				            			{{meetup.title}}</h5>
							            	<div >{{meetup.date}}
							            	<small>{{meetup.time}}</small>
							            ,    {{meetup.location}}</div>

							          </div>

							        </v-card-title>
							        <v-card-actions>
							        	<v-btn flat class="accent--text jump" right :to="'/meetup/' +meetup.id">Explore Meetup<v-icon>arrow_forward</v-icon></v-btn>
							        </v-card-actions>
							       
							        
							    
        
				</v-card>
				</v-flex>
							</v-layout>
</v-container>
							
							
		
		
			</v-flex>
			</v-layout>
	

				
			
	</v-container>
</template>

<script>
	export default{

		computed: {
			meetups(){
				return this.$store.getters.loadedMeetups;
			}
		}
	}

</script>