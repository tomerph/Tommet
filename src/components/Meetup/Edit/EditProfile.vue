<template>
	<v-dialog max-width="350px" persistent v-model="editDialog">
		<v-btn class="secondary" fab small  dark slot="activator">
			 <v-icon>edit</v-icon>
		</v-btn>

		<v-card>
			<v-container>

			
				<v-layout row>
					<v-flex xs12>
						<v-card-title class="secondary--text"><h6>Edit Profile</h6></v-card-title>
{{fb}}
					</v-flex>
				</v-layout>
				<v-divider></v-divider>
					<v-layout row>
					<v-flex xs12>
						<v-card-text>
							<v-text-field name="firstName" label="First Name" id="firstName"  required v-model="editedFirstName"></v-text-field>
						</v-card-text>
					</v-flex>
				</v-layout>

				<v-layout row>
						<v-flex xs12 >
							<v-text-field name="lastName" label="Last Name" id="lastName"  required  v-model="editedlastName"></v-text-field>
							</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs12 >
							<v-text-field name="image" label="Image" id="image"  required  v-model="editedImage"></v-text-field>
							</v-flex>
					</v-layout>

					



					

					
					

					<v-divider></v-divider>

					<v-layout row>
						<v-flex xs12 >
							<v-card-actions>
								<v-btn flat color="primary" @click="onSave">Save</v-btn>
								<v-btn flat color="primary"  @click="editDialog = false">Cancel</v-btn>

							</v-card-actions>
							</v-flex>
					</v-layout>
			</v-container>

		</v-card>
		
	</v-dialog>
</template>

<script>
	export default{
		
		data(){

			return{
				editDialog: false,
				editedFirstName: this.$store.getters.user.userDetails.firstName,
				editedlastName:this.$store.getters.user.userDetails.lastName,

				editedEmail:'',
				editedImage:this.$store.getters.user.userDetails.img
			}
		},

		methods:{
			onSave(){
				if(this.editedFirstName.trim() === '' || this.editedlastName.trim() === ''){
					return
				}
				console.log(this.$store.getters.user.userDetails.fbkey)
				this.editDialog = false
				this.$store.dispatch('updateUserDetails', {
					firstName: this.editedFirstName,
					lastName: this.editedlastName,
					img: this.editedImage,
					fbkey: this.$store.getters.user.userDetails.fbkey
					
				})
				this.editDialog = false



	}
		},

		computed:{
			fb(){
				console.log(this.$store.getters.user)
			}
		}
	

	
}

		
	
</script>