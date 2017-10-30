import Vue from 'vue'
import Vuex from 'vuex'
import Meetup from './Meetup/index'
import User from './User/index'

// import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
	modules: {
		meetup: Meetup,
		user: User
	}

})
//   state: {
//     loadedMeetups: [],

//       user: null,
//       loading: false,
//      error: null 
// 	},

// 	mutations: {

// 		registerUserForMeetup(state,payload){
// 			const id = payload.id
// 			if(state.user.registerMeetups.findIndex(meetup => meetup.id === id) >=0){
// 				return
// 			}
// 			state.user.registerMeetups.push(id)
// 			state.user.fbkey[id]= payload.fbkey
// 		},
// 		unRegisterUserForMeetup(state,payload){
// 			const registerMeetups = state.user.registerMeetups
// 			registerMeetups.splice(registerMeetups.findIndex(meetup => meetup.id === payload), 1)
// 			Reflect.deleteProperty(state.user.fbkey , payload)
// 		},
// 		createMeetup(state, payload){
// 			state.loadedMeetups.push(payload);
// 		},

// 		updateMeetup(state, payload){
// 			const meetup = state.loadedMeetups.find(meetup => {
// 				return meetup.id === payload.id
// 			})
// 			if(payload.title){
// 				meetup.title = payload.title
// 			}
// 			if(payload.description){
// 				meetup.description = payload.description
// 			}
// 			if(payload.date){
// 				meetup.date = payload.date
// 			}
// 			if(payload.time){
// 				meetup.time = payload.time
// 			}
// 		},
// 		setUser(state, payload){
// 			state.user = payload
// 		},

// 		setLoading(state, payload){

// 			state.loading = payload
// 		},

// 		setError(state, payload){
// 			state.error = payload
// 		},

// 		clearError(state, payload){
// 			state.error = null
// 		},

// 		setLoadedMeetups(state, payload){
// 			state.loadedMeetups = payload
// 		}
// 	},

// 	actions: {

// 		registerUserForMeetup({commit, getters}, payload){
// 			commit('setLoading', true)
// 			const user= getters.user
// 			firebase.database().ref('/users/' + user.id ).child('/registrations/').
// 			push(payload)
// 			.then(data =>{
// 				commit('setLoading', false)
// 				commit('registerUserForMeetup', {id: payload , fbkey: data.key})
				
// 			})
// 			.catch(error =>{
// 				console.log(error)
// 				commit('setLoading', false)
// 			})
		
// 		},

// 		unRegisterUserForMeetup({commit, getters}, payload){
// 			commit('setLoading', true)
// 			const user = getters.user
// 			if(!user.fbkey){
// 				return
// 			}
// 			const fbkey =user.fbkey[payload]
// 			firebase.database().ref('/users/' +user.id + '/registrations/').child(fbkey).remove()
// 			.then(() =>{
// 				commit('setLoading', false)
// 				commit('unRegisterUserForMeetup', payload)
// 			})
// 			.catch(error =>{
// 				console.log(error)
// 				commit('setLoading', false)
// 			})


// 		},

// 		loadMeetups({commit}){
// 			commit('setLoading', true)
// 			firebase.database().ref('meetups').once('value')
// 			.then(
// 				(data)=> {

// 					const meetups =[]
// 					const obj = data.val();
// 					for(let key in obj){
// 						meetups.push({
// 							id: key,
// 							title: obj[key].title,
// 							description: obj[key].description,
// 							imageUrl: obj[key].imageUrl,
// 							date: obj[key].date,
// 							time: obj[key].time,
// 							location: obj[key].location,
// 							creatorId: obj[key].creatorId
// 						})
// 					}

// 					commit('setLoadedMeetups', meetups)
// 					commit('setLoading', false)
// 				})

// 			.catch(
// 				(error) => {

// 					console.log(error)
// 					commit('setLoading', true)
// 				})
// 		},
// 		createMeetup({commit, getters}, payload){
// 			const meetup={
// 				title: payload.title,

// 				location: payload.location,
// 				description: payload.description,
// 				date: payload.date,
// 				time: payload.time,
// 				creatorId : getters.user.id
// 			}

// 			let imageUrl
// 			let key
// 			firebase.database().ref('meetups').push(meetup)
// 			.then(
// 				(data) => {
// 					 key = data.key;
				
// 				return key;
					
// 				})
// 			.then(key => {
// 				const fileName = payload.image.name
// 				const ext = fileName.slice(fileName.lastIndexOf('.'))
// 				return firebase.storage().ref('meetups/'+ key + '.'+ ext).put(payload.image)
// 			})
// 			.then(fileData => {
// 				imageUrl = fileData.metadata.downloadURLs[0]
// 				return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
// 			})
// 			.then(() => {
// 				commit('createMeetup', {
// 					...meetup,
// 					imageUrl: imageUrl,
// 					id:key
// 				});
// 			})
// 			.catch((error) => {
// 				console.log(error)
// 			})
			
// 		},

// 		updateMeetupData({commit}, payload){
// 			commit('setLoading', true)
// 			const updateObj = {}
// 			if(payload.title){
// 				updateObj.title = payload.title
// 			}

// 			if(payload.description){
// 				updateObj.description = payload.description
// 			}

// 			if(payload.date){
// 				updateObj.date = payload.date
// 			}

// 			if(payload.time){
// 				updateObj.time = payload.time
// 			}


// 			firebase.database().ref('meetups').child(payload.id).update(updateObj)
// 			.then(() =>{
// 				commit('setLoading', false)
// 				commit('updateMeetup', payload)

// 			})
// 			.catch( error => {
// 				console.log(error)
// 				commit('setLoading', false)
// 			})
// 		},

// 		signUserUp({commit}, payload){
// 			commit('setLoading', true);
// 			commit('clearError');
// 			console.log(payload.email , payload.password)
// 			firebase.auth().createUserWithEmailAndPassword(payload.email , payload.password)
// 			.then(
// 				user => {
// 					commit('setLoading', false)
// 					const newUser = {
// 						id: user.uid,
// 						registerMeetups: [],
// 						fbkey: {}
// 					}
// 					commit('setUser', newUser);

// 			})
// 			.catch(
// 				error=>{
// 					commit('setLoading', false);
// 					commit('setError', error)
// 					console.log(error)
// 			})
// 		},

// 		signUserIn({commit}, payload){
// 			firebase.auth().signInWithEmailAndPassword(payload.email , payload.password)
// 			.then(
// 				user =>{
// 					const newUser = {
// 						id: user.uid,
// 						registerMeetups: [],
// 						fbkey: {}
// 					}
// 					commit('setUser', newUser);
// 				})
// 			.catch(
// 				error => {
// 					commit('setLoading', false);
// 					commit('setError', error)
// 					console.log(error)
// 				})
// 		},

// 		clearError({commit}){
// 			commit('clearError')
// 		},

// 		autoSignin({commit}, payload){
// 			commit('setUser', {
// 				id: payload.uid , 
// 				registerMeetups: [],
// 						fbkey: {}})
// 		},

// 		fetchUserData({commit, getters}, payload){
// 			commit('setLoading', true)
// 			firebase.database().ref('/users/'+ getters.user.id + '/registrations/').once('value')
// 			.then(data =>{
// 				const value = data.val()
// 				let registerMeetups = []
// 				let swapedPairs ={}
// 				for(let key in value){
// 					registerMeetups.push(value[key])
// 					swapedPairs[value[key]] = key

// 				}

// 				const updatedUser ={
// 					id: getters.user.id,
// 					registerMeetups: registerMeetups,
// 					fbkey: swapedPairs
// 				}
// 				commit ('setLoading', false)
// 				commit('setUser', updatedUser)

// 			})
// 			.catch(error =>{
// 				console.log(error)
// 				commit('setLoading', false)
// 			})
// 		},

// 		logout({commit}){
// 			firebase.auth().signOut();
// 			commit('setUser', null)
// 		}
// 	},

// 	getters: {
		
// 		loadedMeetups(state){

// 			return state.loadedMeetups.sort((meetupA,meetupB)=> {
// 				return meetupA.date > meetupB.date;
// 			})
// 		},

// 		featuredMeetups(state, getters){
			
// 			return getters.loadedMeetups.slice(0,5);
// 		},

// 		loadedMeetup(state){
// 			return (meetupId) =>{
// 				return state.loadedMeetups.find((meetup)=> {
// 					console.log("meetupID:" +meetupId , meetup);
// 					console.log(meetup.id == meetupId)
// 					return meetup.id == meetupId;
// 				})
// 			}
// 		},

// 		user(state){
// 			return state.user;
// 		},

// 		error(state){
// 			return state.error;
// 		},

// 		loading(state){

// 			return state.loading;
// 		}
// 	}
// })