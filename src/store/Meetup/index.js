
import * as firebase from 'firebase'


export default {
  state: {
    loadedMeetups: [],

     
      loading: false,
     error: null 
	},

	mutations: {

		
		createMeetup(state, payload){
			state.loadedMeetups.push(payload);
		},

		updateMeetup(state, payload){
			const meetup = state.loadedMeetups.find(meetup => {
				return meetup.id === payload.id
			})
			if(payload.title){
				meetup.title = payload.title
			}
			if(payload.description){
				meetup.description = payload.description
			}
			if(payload.date){
				meetup.date = payload.date
			}
			if(payload.time){
				meetup.time = payload.time
			}
		},
		

		setLoading(state, payload){

			state.loading = payload
		},

		setError(state, payload){
			state.error = payload
		},

		clearError(state, payload){
			state.error = null
		},

		setLoadedMeetups(state, payload){
			state.loadedMeetups = payload
		}
	},

	actions: {

		
		

		loadMeetups({commit}){
			commit('setLoading', true)
			firebase.database().ref('meetups').once('value')
			.then(
				(data)=> {

					const meetups =[]
					const obj = data.val();
					for(let key in obj){
						meetups.push({
							id: key,
							title: obj[key].title,
							description: obj[key].description,
							imageUrl: obj[key].imageUrl,
							date: obj[key].date,
							time: obj[key].time,
							location: obj[key].location,
							creatorId: obj[key].creatorId
						})
					}

					commit('setLoadedMeetups', meetups)
					commit('setLoading', false)
				})

			.catch(
				(error) => {

					console.log(error)
					commit('setLoading', true)
				})
		},
		createMeetup({commit, getters}, payload){
			const meetup={
				title: payload.title,

				location: payload.location,
				description: payload.description,
				date: payload.date,
				time: payload.time,
				creatorId : getters.user.id
			}

			let imageUrl
			let key
			firebase.database().ref('meetups').push(meetup)
			.then(
				(data) => {
					 key = data.key;
				
				return key;
					
				})

			.then(key => {
				const fileName = payload.image.name
				const ext = fileName.slice(fileName.lastIndexOf('.'))
				return firebase.storage().ref('meetups/'+ key + '.'+ ext).put(payload.image)
			})
			.then(fileData => {
				imageUrl = fileData.metadata.downloadURLs[0]
				return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
			})
			.then(() => {
				commit('createMeetup', {
					...meetup,
					imageUrl: imageUrl,
					id:key
				});
			})
			.catch((error) => {
				console.log(error)
			})
			
		},

		updateMeetupData({commit}, payload){
			commit('setLoading', true)
			const updateObj = {}
			if(payload.title){
				updateObj.title = payload.title
			}

			if(payload.description){
				updateObj.description = payload.description
			}

			if(payload.date){
				updateObj.date = payload.date
			}

			if(payload.time){
				updateObj.time = payload.time
			}


			firebase.database().ref('meetups').child(payload.id).update(updateObj)
			.then(() =>{
				commit('setLoading', false)
				commit('updateMeetup', payload)

			})
			.catch( error => {
				console.log(error)
				commit('setLoading', false)
			})
		},



		

		clearError({commit}){
			commit('clearError')
		}

		
	},

	getters: {
		
		loadedMeetups(state){

			return state.loadedMeetups.sort((meetupA,meetupB)=> {
				return meetupA.date > meetupB.date;
			})
		},

		meetupsCreator(state, getters){
			const meetups = []
			for(let i=0;i< state.loadedMeetups.length; i++){
				
				if(state.loadedMeetups[i].creatorId == getters.user.id){
					
					meetups.push(state.loadedMeetups[i])
				}
			}
			return meetups
		},

		featuredMeetups(state, getters){
			
			return getters.loadedMeetups.slice(0,5);
		},

		loadedMeetup(state){
			return (meetupId) =>{
				return state.loadedMeetups.find((meetup)=> {
					
					return meetup.id == meetupId;
				})
			}
		},

		

		error(state){
			return state.error;
		},

		loading(state){

			return state.loading;
		}
	}
}