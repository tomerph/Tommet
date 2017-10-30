<template>
	<v-container >

				<v-layout row wrap v-if="isLoading">
		<v-flex xs12 class="text-xs-center" >
			<v-progress-circular indeterminate 
			color="secondary" :width=4 
			:size=70 ></v-progress-circular>
		</v-flex>
	</v-layout>

		<v-layout>
			<v-flex xs12 sm10 md10 offset-sm1>
				<v-card>
					<v-card-title>
						<h6 class="primary--text">{{meetup.title}}</h6>
						<template v-if="userIsCreator"> <v-spacer></v-spacer>
						<app-edit-details-dialog :meetup="meetup"></app-edit-details-dialog>
						</template>
					</v-card-title>
					<v-card-media :src="meetup.imageUrl" height="300px" >
        							</v-card-media>
        							<v-card-text>
        								<div class="primary--text"><h6>{{meetup.date}}<small> {{meetup.time}}</small> - {{meetup.location}}</h6></div>
        								<hr>
        								
        								<div class="mt-2"><p>{{meetup.description}}</p></div>
        							</v-card-text>
        							<v-card-actions>
        								<v-spacer></v-spacer>
        								 
        								<app-register :meetup="meetup"
        								v-if="userIsAuth && !userIsCreator"></app-register>
        							</v-card-actions>

				</v-card>
				
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default{
		props: ['id'],
		computed: {
			meetup(){
				return this.$store.getters.loadedMeetup(this.id);

			},

			userIsAuth(){
				return this.$store.getters.user !== null && this.$store.getters.user !== undefined
			},

			userIsCreator(){
				if(!this.userIsAuth){
					return false
				}
				return this.$store.getters.user.id == this.meetup.creatorId
			},
			 isLoading(){
	    	return  this.$store.getters.loading
	    }
		}
	}

</script>