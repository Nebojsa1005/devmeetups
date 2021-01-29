import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)


let timer 
export default new Vuex.Store({
  state: {
    meetups: null,
    tokenId: null,
    userId: null,
    expiresIn: null,
    isLoggedIn: false,
    currentUser: null,
    errorSignInText: null,
    errorSignUpText: null
  },
  mutations: {
    setMeetups( state, meetups ) {
      state.meetups = meetups
    },
    signUser( state, loginData ) {
      state.tokenId = loginData.idToken
      state.userId = loginData.localId
      state.isLoggedIn = true
    },
    logout( state ) {
      localStorage.removeItem('tokenId')
      localStorage.removeItem('userId')
      localStorage.removeItem('expiresIn')
      state.isLoggedIn = false
      state.tokenId = null
      state.userId = null
      state.expiresIn = null
      state.currentUser = null
      clearTimeout(timer)
    },
    setCurrentUser( state, user ) {
      state.currentUser = user
      if(!state.currentUser.registeredMeetups) {
        state.currentUser.registeredMeetups = []
      }
    },
    unRegister( state, index ) {
      state.currentUser.registeredMeetups.splice(index, 1)
    },
    errorSignIn ( state, error ) {
      state.errorSignInText = error.message.replaceAll('_', " ")
    },
    errorSignUp ( state, error ) {
      state.errorSignUpText = error.message.replaceAll('_', " ")
    }
  },
  actions: {
    //==================MEETUPS
    async fetchMeetups( {commit, state} ) {
      const response = await axios.get('https://meetups-361fa-default-rtdb.firebaseio.com/meetups.json?auth=' + state.tokenId)
      let meetups = []
      for(let key in response.data) {
        const meetup = response.data[key]
        meetup.id = key
        meetups.unshift(meetup)
      }  
      commit('setMeetups', meetups)    
    },
    async organizeMeetup({ state, dispatch }, meetupData) {
      await axios.post('https://meetups-361fa-default-rtdb.firebaseio.com/meetups.json?auth=' + state.tokenId, {
        title: meetupData.title,
        image: meetupData.image,
        description: meetupData.description,
        date: meetupData.date
      })
      dispatch('fetchMeetups')
    },
    //===================AUTH
    async signUp ({ commit, state, dispatch }, formData) {
      const responseData = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXgBncsxFKUpaNh-UUqp8Pfdzrqds3PRQ', {
        method: 'POST', 
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          returnSecureToken	: true
        }) 
      })
      const response = await responseData.json()
      if (response.error) {
        commit('errorSignUp', response.error)
      } else {
        commit('signUser', response)
        await axios.post('https://meetups-361fa-default-rtdb.firebaseio.com/users.json?auth=' + state.tokenId, {
          username: formData.username,
          userId: response.localId
        })
        
        let expirationTime = new Date().getTime() + response.expiresIn * 1000
        localStorage.setItem('tokenId', state.tokenId)
        localStorage.setItem('userId', state.userId)
        localStorage.setItem('expiresIn', expirationTime)
        
        timer = setTimeout(function () {
          commit('logout')
        }, expirationTime)
      }

      dispatch('setCurrentUser')
    },
    signUpWithLocal( {commit, dispatch} ) {
      if(!(localStorage.getItem('tokenId') && localStorage.getItem('userId'))) {
        return
      }
      let expiresIn = localStorage.getItem('expiresIn')
      let expirationTime = new Date().getTime() - Number(expiresIn)
      // let expirationTime = 3000
      commit('signUser', {
        idToken: localStorage.getItem('tokenId'),
        localId: localStorage.getItem('userId')
      })

      timer = setTimeout(function () {
        commit('logout')
      }, expirationTime)

      dispatch('setCurrentUser')
    },
    async signIn({ commit, dispatch }, authData ) {
      const responseData = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXgBncsxFKUpaNh-UUqp8Pfdzrqds3PRQ', {
        method: 'POST',
        body: JSON.stringify({
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
      })
      const response = await responseData.json()
      if (response.error) {
        commit('errorSignIn', response.error)
      } else {
        let expirationTime = new Date().getTime() - response.expiresIn * 1000 
    
        localStorage.setItem('tokenId', response.idToken)
        localStorage.setItem('userId', response.localId)
        localStorage.setItem('expiresIn', expirationTime)
  
        timer = setTimeout(function () {
          commit('logout')
        }, expirationTime)
  
        commit('signUser', response)
        dispatch('setCurrentUser')
      }

    },
    setCurrentUser({ commit, state }) {
      axios.get('https://meetups-361fa-default-rtdb.firebaseio.com/users.json?auth=' + state.tokenId)
      .then(res => {
        for(let user in res.data) {
          if(res.data[user].userId === state.userId) {
            let currUser = res.data[user]
            currUser.id = user
            commit('setCurrentUser', currUser)
          }
        }
      })
    },
    //================REGISTRATION
    registerMeetup({ state, dispatch }, meetup ) {
      const wantedMeetup = state.meetups.filter(el => {
        return el.id === meetup.id
      })
      state.currentUser.registeredMeetups.unshift(wantedMeetup[0])
      dispatch('updateUser', state.currentUser)
    },
    async unRegister({commit, dispatch}, index) {
      await commit('unRegister', index)
      dispatch('updateUser')
    },
    updateUser({ commit, state }) {
      axios.put(`https://meetups-361fa-default-rtdb.firebaseio.com/users/${state.currentUser.id}.json?auth=${state.tokenId}`, state.currentUser)
        .then(res => {
          commit('setCurrentUser', res.data)
        })
    }
  },
  getters: {
    getMeetups( state ) {
      return state.meetups
    },
    tokenId( state ) {
      return state.tokenId
    },
    isLoggedIn( state ) {
      return state.isLoggedIn
    },
    currentUser( state ) {
      return state.currentUser
    },
    errorSignIn ( state ) {
      return state.errorSignInText
    },
    errorSignUp( state ) {
      return state.errorSignUpText
    }
  }
})
