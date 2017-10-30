<template>
	<v-container>
		<v-layout row>
			<v-flex xs9 offset-xs1>
				
				
				<v-card  >

					

        <v-card-title primary-title>
        	<v-avatar size="90px" left><img :src="profileImg">
        	</v-avatar>
        	
        	<div><h4> {{userDetails.firstName}} {{userDetails.lastName}}</h4> </div>
        	
        	<div><p></p></div>
        	<v-spacer></v-spacer>
        	<!-- <app-edit-profile right></app-edit-profile> -->
        	
        	
        	</v-card-title>
        	<v-divider></v-divider>
        	

        	<v-card-text>
        		<v-btn flat class="primary--text" ><v-icon>event</v-icon>registered for {{user.registerMeetups.length}} {{users}}Meetups</v-btn> 

        			 <v-container fluid grid-list-sm >
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 v-for="meetup in user.registerMeetups">
<!-- 			
 -->				<v-card color="primary" class="ma-1 grid " style="cursor : pointer"  left :to="'/meetup/' +meetup.id" >
					
								<v-card-media :src="meetup.imageUrl" height="50px" >
        							</v-card-media>
							
							
								<v-card-title primary-title>
									<div class="white--text">
            						<p >
				            			{{meetup.title}}</p>
				            			<div >{{meetup.date}}
							            	<small>{{meetup.time}}</small>
							            ,    {{meetup.location}}</div>
							      </div>

							        </v-card-title>
							  
				</v-card>
				</v-flex>
							</v-layout>
</v-container>


 


        		<v-btn flat class="primary--text" ><v-icon>create</v-icon>created {{creator.length}} meetups</v-btn>
        		<v-container fluid grid-list-sm >
          <v-layout row wrap>
            <v-flex xs12 sm6 md4 v-for="meetup in creator">
<!-- 			
 -->				<v-card color="primary" class="ma-1 grid " style="cursor : pointer"  left :to="'/meetup/' +meetup.id" >
					
								<v-card-media :src="meetup.imageUrl" height="50px" >
        							</v-card-media>
							
							
								<v-card-title primary-title>
									<div class="white--text">
            						<p >
				            			{{meetup.title}}</p>
				            			<div >{{meetup.date}}
							            	<small>{{meetup.time}}</small>
							            ,    {{meetup.location}}</div>
							      </div>

							        </v-card-title>
							  
				</v-card>
				</v-flex>
							</v-layout>
</v-container>
        	</v-card-text>

        	
				</v-card>

			</v-flex>
		</v-layout>
	</v-container>
	
</template>

<script>
	export default{

		data(){

			return {
				user: this.$store.getters.user,
				openTable: false,
								openCreated: false,

				creator: this.$store.getters.meetupsCreator,
				userDetails: this.$store.getters.user.userDetails

				
			}
		},
		computed:{
			users(){
			
			},
			profileImg(){
				if(this.$store.getters.user.userDetails.img === null || this.$store.getters.user.userDetails.img === undefined){
					return 'https://aiaa.nmsu.edu/files/2016/09/noprofile.gif'
				}
				else{
					return this.$store.getters.user.userDetails.img
				}
			}
			// creators(){
			// 	console.log('creator: '+this.$store.getters.meetupsCreator)
			// }
		}
}
</script>