<template>
	
	<v-container>
		<v-layout row>
			<v-flex 10xs offset-xs2>
				
				
			</v-flex>
		</v-layout>
		<v-layout row>
			
			<v-flex xs12>
				<h3  class="primary--text text-xs-center mt-4   mb-4" center>Create New Meetup</h3>
				<form @submit.prevent="onCreate">
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field name="title" label="Title" id="title"  required v-model="title"></v-text-field>
							</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field name="location" label="Location" id="location"  required v-model="location"></v-text-field>
							</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn raised dark class="accent" @click="onPickFile">Upload Image</v-btn>
							<input type="file" style="display: none" 
							ref="fileInput" accept="image/*"
							@change="onFilePick">
							</v-flex>
					</v-layout>
					
					<div>
					<v-layout row v-if="imgOpen">
						<v-flex xs12 sm6 offset-sm3>
							<img :src="imageUrl" height="200px" width="100%"></img>
							</v-flex>
					</v-layout>
				</div>

					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field name="description" label="Description" id="description"  required multi-line v-model="description"></v-text-field>
							</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<a @click="dateOpen = !dateOpen" style="cursor: pointer" class="primary--text">
								<h5>Choose Date and Time</h5></a>
							</v-flex>
					</v-layout>
					
					<div v-if="dateOpen">
					<v-layout row class="mb-3">
						<v-flex xs12 sm6 offset-sm3>
							<v-date-picker v-model="date"></v-date-picker>
							
							</v-flex>
					</v-layout>
						<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-time-picker v-model="time"></v-time-picker>
							
							</v-flex>
					</v-layout>
				</div>

					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn type="submit" :disabled="!formIsValid" class="secondary">Create Meetup</v-btn>
							
							</v-flex>
					</v-layout>

				</form>
				
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script >
	export default{

		data(){

			return{
				title: '',
				location: '',
				imageUrl: '',
				description: '',
				date: new Date(),
				time: '12:00pm',

				dateOpen: false,
				imgOpen: false
				


			}
		},
		computed: {
			formIsValid(){
				return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
;			},

			submitDateTime(){
				const date = new Date(this.date);
				
				console.log(date);
				return date;
			}
		},

		methods: {

			onCreate(){

				if(!this.formIsValid){
					return 
				}
				if(!this.image){
					return
				}
				const meetupData = {

					title: this.title,
					location: this.location,
					image: this.image,
					description: this.description,
					date: this.date,
					time: this.time
					
				}
				
				this.$store.dispatch('createMeetup', meetupData)
				this.$router.push('/meetups')


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
				this.image = files[0]
			}
		}

	}

</script>