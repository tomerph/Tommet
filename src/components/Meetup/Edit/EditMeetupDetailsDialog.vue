<template>
	<v-dialog max-width="350px" persistent v-model="editDialog">
		<v-btn  class="accent" fab small  dark slot="activator">
			 <v-icon>edit</v-icon>
		</v-btn>

		<v-card>
			<v-container>

			
				<v-layout row>
					<v-flex xs12>
						<v-card-title class="primary--text"><h6>Edit Meetup</h6></v-card-title>

					</v-flex>
				</v-layout>
				<v-divider></v-divider>
					<v-layout row>
					<v-flex xs12>
						<v-card-text>
							<v-text-field name="title" label="Title" id="title"  required v-model="editetTitle"></v-text-field>
						</v-card-text>
					</v-flex>
				</v-layout>

				<v-layout row>
						<v-flex xs12 >
							<v-text-field name="description" label="Description" id="description"  required multi-line v-model="editedDescription"></v-text-field>
							</v-flex>
					</v-layout>

					<v-layout row>
						<v-flex xs12 >
							<h6 class="primary--text" style="cursor: pointer" @click="openDate = !openDate">Edit Date & Time</h6>
							</v-flex>
					</v-layout>


					<v-layout row v-if="openDate" class="mb-2">
						
						<v-flex xs12 >
					<v-date-picker  v-model="editedDate" style="width: 100%" ></v-date-picker>
						</v-flex>
						</v-layout>
					


						<v-layout v-if="openDate">
						<v-flex xs12 >
					<v-time-picker color="secondary" v-model="editedTime" style="width: 100%"></v-time-picker>
					</v-flex>
					</v-layout>

					
					

					<v-divider></v-divider>

					<v-layout row>
						<v-flex xs12 >
							<v-card-actions>
								
								<v-btn flat color="accent--text"  @click="editDialog = false">Cancel</v-btn>
								<v-btn  color="primary" @click="onSave">Save</v-btn>

							</v-card-actions>
							</v-flex>
					</v-layout>
			</v-container>

		</v-card>
		
	</v-dialog>
</template>

<script>
	export default{
		props: ['meetup'],
		data(){

			return {
				editDialog: false,
				editetTitle: this.meetup.title,
				editedDescription: this.meetup.description,
				openDate: false,
				editedDate: this.meetup.date,
				editedTime: this.meetup.time

			}
		},

		methods: {
			onSave(){
				if(this.editetTitle.trim() === '' || this.editedDescription.trim() === ''){
					return
				}
				this.editDialog = false
				this.$store.dispatch('updateMeetupData', {
					title: this.editetTitle,
					description: this.editedDescription,
					id: this.meetup.id,
					date: this.editedDate,
					time: this.editedTime
				})
			},

			created(){
				this.editedDate = new Date(this.meetup.date)
			}
		}
	}
</script>