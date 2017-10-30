<template>
	<v-dialog max-width="350px" persistent v-model="registerDialog">
		<v-btn class="secondary"    dark slot="activator">
			
			{{isRegister}}
			
		</v-btn>

		<v-card>
			<v-container>

			
				<v-layout row>
					<v-flex xs12>
						<v-card-title v-if="userIsRegister" class="secondary--text"><h6>Unregister From Meetup?</h6></v-card-title>
						<v-card-title v-else class="secondary--text"><h6>Register For Meetup?</h6></v-card-title>

					</v-flex>
				</v-layout>
				<v-divider></v-divider>
					<v-layout row>
					<v-flex xs12>
						<v-card-text>
							<v-card-text > You can always change your desicion</v-card-text>
						</v-card-text>
					</v-flex>
				</v-layout>

				<v-layout row>
					<v-flex xs12>
				<v-card-actions>
					<v-btn flat class="accent--text" @click="registerDialog = false">Cancel</v-btn>
					<v-btn flat class="primary" @click="onAgree">Confirm</v-btn>
					

				</v-card-actions>
				</v-flex>
				</v-layout>
			</v-container>

		</v-card>
		
	</v-dialog>
</template>

<script>
	export default{
		props:['meetup'],
		computed: {
			userIsRegister(){

				return this.$store.getters.user.registerMeetups.findIndex((meetupId) =>{
					return meetupId.id === this.meetup.id
				}) >= 0
							},

							isRegister(){
								if(this.userIsRegister){
									return "Unregister"

								}else{
									return "Register"
								}
								console.log('mm:'+this.isRegister)
							}
		},

		data(){
			return {
				registerDialog:false
				// regBtnText:'Register'
			}
		},

		methods:{

			onAgree(){
				if(this.userIsRegister){
					 this.$store.dispatch('unRegisterUserForMeetup', this.meetup.id)
					this.registerDialog = false
					

				}
				else{
					this.$store.dispatch('registerUserForMeetup', this.meetup)
					this.registerDialog = false
					
					console.log('register:'+this.userIsRegister)

				 
				
			}
				}
		}
		}
</script>