
import * as firebase from 'firebase'



export default {
  state: {
    

      user: null,
      loading: false,
     error: null 
	},

	mutations: {

		registerUserForMeetup(state,payload){
			 const meetup = {id: payload.id, title: payload.title, date:payload.date , 
			 	time: payload.time, 
			 	}
			if(state.user.registerMeetups.findIndex(meetups => meetups.id === meetup.id) >=0){
				return
			}
			state.user.registerMeetups.push(meetup)
			state.user.fbkey[meetup.id]= payload.fbkey
		},
		unRegisterUserForMeetup(state,payload){
			const registerMeetups = state.user.registerMeetups
			registerMeetups.splice(registerMeetups.findIndex(meetup => meetup.id === payload), 1)
			Reflect.deleteProperty(state.user.fbkey , payload)
		},

		
		setUser(state, payload){
			state.user = payload
		},


		setUserDetails(state, payload){
			state.user.userDetails = payload
		},
			updateUserDet(state, payload){
			const userDetails = state.user.userDetails
			if(payload.firstName){
				userDetails.firstName = payload.firstName
			}
			if(payload.lastName){
				userDetails.lastName = payload.lastName
			}
			if(payload.img){
				userDetails.img = payload.img
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
		}

		
	},

	actions: {

		registerUserForMeetup({commit, getters}, payload){
			commit('setLoading', true)
			const user= getters.user
			firebase.database().ref('/users/' + user.id ).child('/registrations/').
			push(payload)
			.then(data =>{
				commit('setLoading', false)
				commit('registerUserForMeetup', {id: payload.id, title: payload.title ,date:payload.date , 
					time:payload.time
				 , fbkey: data.key})
									
			})
			.catch(error =>{
				console.log(error)
				commit('setLoading', false)
			})
		
		},

		unRegisterUserForMeetup({commit, getters}, payload){
			commit('setLoading', true)
			const user = getters.user
			if(!user.fbkey){
				return
			}

			const fbkey =user.fbkey[payload]
				
						

			
			firebase.database().ref('/users/' +user.id + '/registrations/').child(fbkey).remove()
			.then(() =>{

				commit('setLoading', false)
				commit('unRegisterUserForMeetup', payload)

			})
			.catch(error =>{
				console.log(error)
				commit('setLoading', false)
			})


		},

		

		signUserUp({commit, getters}, payload){
			commit('setLoading', true);
			commit('clearError');
			
			firebase.auth().createUserWithEmailAndPassword(payload.email , payload.password)
			.then(
				user => {
					commit('setLoading', false)
					const newUser = {
						id: user.uid,
						registerMeetups: [],

						fbkey: {}
					}
					commit('setUser', newUser);



			})
			.catch(
				error=>{
					commit('setLoading', false);
					commit('setError', error)
					console.log(error)
			})
				
		},
		signUserDetails({commit, getters}, payload){

				const user = getters.user
				let imageUrl
				let key
					firebase.database().ref('/users/' +user.id + '/userDetails/').
			push(payload)
			.then((data)=>{
				key = data.key
				commit('setUserDetails', {
					firstName: payload.firstName, 
					lastName: payload.lastName ,
					img:payload.img , 
					
				  fbkey: data.key})
				
				return key
			})
			.then(key =>{
				
				const fileName = payload.img.name
				const ext = fileName.slice(fileName.lastIndexOf('.'))
				return firebase.storage().ref('profile'+ key + '.'+ ext).put(payload.img)

			})
			.then(fileData => {
				
				imageUrl = fileData.metadata.downloadURLs[0]
				return firebase.database().ref('/users/' +user.id + '/userDetails/')
				.child(key).update({img: imageUrl})
			})
			.then(() => {
				
				commit('setUserDetails', {
					...payload,
					imageUrl: imageUrl,
					id:key
				});
			})
			.catch(error =>{
				console.log(error)
			})


		},

		signUserIn({commit}, payload){
			firebase.auth().signInWithEmailAndPassword(payload.email , payload.password)
			.then(
				user =>{
					const newUser = {
						id: user.uid,
						registerMeetups: [],
						userDetails:[],
						fbkey: {}
					}
					commit('setUser', newUser);
					commit('setLoading', false);
				})
			.catch(
				error => {
					commit('setLoading', false);
					commit('setError', error)
					console.log(error)
				})
		},

		clearError({commit}){
			commit('clearError')
		},

		autoSignin({commit}, payload){
			commit('setUser', {
				id: payload.uid , 
				registerMeetups: [],
				userDetails:[],
						fbkey: {}})
		},
		
		fetchUserData({commit, getters}, payload){
			commit('setLoading', true)
			firebase.database().ref('/users/'+ getters.user.id + '/registrations/').once('value')
			.then(data =>{
				const value = data.val()
				let registerMeetups = []
				let swapedPairs ={}
				for(let key in value){
					registerMeetups.push(value[key])
					swapedPairs[value[key]] = key

				}

				const updatedUser ={
					id: getters.user.id,
					registerMeetups: registerMeetups,
					fbkey: swapedPairs
				}
				commit ('setLoading', false)
				commit('setUser', updatedUser)

			})
			.catch(error =>{
				console.log(error)
				commit('setLoading', false)
			})
		},


		fetchUserDetails({commit, getters}, payload){
			commit('setLoading', true)
			firebase.database().ref('/users/'+ getters.user.id + '/userDetails/').once('value')
			.then(data =>{
				const value = data.val()
				let userDetails = []
				let swapedPairs ={}
				for(let key in value){
					userDetails.push(value[key])
					swapedPairs[value[key]] = key

				}
				
				let firstName = userDetails[0].firstName
				let lastName = userDetails[0].lastName

				let img = userDetails[0].img


				let user = {
					firstName: firstName,
					lastName: lastName,
					img: img,
					 fbkey: swapedPairs
				}

				

				
				commit ('setLoading', false)
				commit('setUserDetails',user )

			})
			.catch(error =>{
				console.log(error)
				commit('setLoading', false)
			})
		},

			updateUserDetails({commit, getters}, payload){
			commit('setLoading', true)
			const updateObj = {}
			if(payload.firstName){
				updateObj.firstName = payload.firstName
			}

			if(payload.lastName){
				updateObj.lastName = payload.lastName
			}

			if(payload.img){
				updateObj.img = payload.img
			}

			


			firebase.database().ref('/users/'+ getters.user.id+'/userDetails/' ).child(payload.fbkey )
			.update(updateObj)
			.then(() =>{
				commit('setLoading', false)
				commit('updateUserDet', payload)

			})
			.catch( error => {
				console.log(error)
				commit('setLoading', false)
			})
		},

		logout({commit}){
			firebase.auth().signOut();
			commit('setUser', null)
		}
	},

	getters: {
		
		

		

		user(state){
			return state.user;
		},
		userDetails(state){
			return state.user.userDetails
		},

		error(state){
			return state.error;
		},

		loading(state){

			return state.loading;
		}
	}
}