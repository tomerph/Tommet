<template>
	
	<v-container>
		<v-layout row v-if="error">
			<v-flex xs12 sm6 offset-sm3 >
				<app-alert @dismiss="onDismiss" :text="error.message"></app-alert>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex xs12 sm6 offset-sm3>
				<h3 class="primary--text text-xs-center"> User Details</h3>
				<v-card-text>
				<v-container>
					<form @submit.prevent="onSignUp">
						<v-layout row>

							<v-flex xs12>
								<v-text-field name="firstName" 
								label="First Name" id="firstName" 
								v-model="firstName" type="text" 
								required></v-text-field>
							</v-flex>
						</v-layout>

						<v-layout>
						<v-flex xs12>
								<v-text-field name="lastName" 
								label="Last Name" id="lastName" 
								v-model="lastName" type="text" 
								required></v-text-field>
							</v-flex>
						</v-layout>

					<!-- 	<v-layout>
						<v-flex xs12>
								<v-text-field name="profilePic" 
								label="Image" id="profilePic" 
								v-model="img" type="text" 
								></v-text-field>
							</v-flex>
						</v-layout> -->

						<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn raised dark class="accent" @click="onPickFile">Upload Image</v-btn>
							<input type="file" style="display: none" 
							ref="fileInput" accept="image/*"
							@change="onFilePick">
							</v-flex>
					</v-layout>
							
							

						

						<v-layout row>
							<v-flex xs12>
								<v-btn  type="submit" class="primary" :disabled="loading || btnDis" :loading="loading" >Complete
								<span slot="loader" class="custom-loader">
							        <v-icon light>cached</v-icon>
							      </span>
							  </v-btn>
							</v-flex>
						</v-layout>
					</form>
				</v-container>
			</v-card-text>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default{
		data(){

			return{
				firstName:'',
				lastName:''
				
			}
		},

		methods: {
			onSignUp(){
				if(!this.img){
					return
				}
				
				
				const userDetails = {
					firstName:this.firstName,
					lastName: this.lastName,
					img: this.img
					
				}
				
				this.$store.dispatch('signUserDetails', userDetails)
				this.$router.push('/');
			},

			onDismiss(){
				console.log('onDismiss');
				this.$store.dispatch('clearError')
			},
				onPickFile(){
				this.$refs.fileInput.click()
				this.imgOpen= true
			},

			onFilePick(event){
				const files = event.target.files
				let fileName = files[0].name
				console.log (fileName)
				if(fileName.lastIndexOf('.') <= 0){
					return alert('please add a valid file!')
				}

				const fileReader = new  FileReader()
				fileReader.addEventListener('load', ()=> {
					this.imageUrl = fileReader.result
					
				})
				fileReader.readAsDataURL(files[0])
				this.img = files[0]
			}
		},

		computed: {
			

			btnDis(){
				return this.password !== this.confirmPassword;
			},

			user(){
				return this.$store.getters.user;
			},

			userDetails(){
				return this.$store.getters.user.userDetails
			},

			error(){
				return this.$store.getters.error;

			},

			loading(){
				return this.$store.getters.loading
			}
		},

		watch: {
			userDetails(value){
				if(value !== null && value !== undefined){
					this.$router.push('/');
				}
			}
		}
	}

</script>

