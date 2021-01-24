<template>
    <div class="section">
         <div class="heading" v-if="user">
            <h1 class="username">User Name: {{ user.username }}</h1>
            <h2 class="user-id">User ID: {{ user.userId }}</h2>
        </div>
        <registered-meetup :user="currentUser"></registered-meetup>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import RegisteredMeetup from '../components/RegisteredMeetup.vue'
export default {
  components: { RegisteredMeetup },
    computed: {
        ...mapActions(['fetchMeetups', 'signUpWithLocal']),
        ...mapGetters(['isLoggedIn', 'currentUser']),
        user() {
          return this.currentUser
        }
    },
  async mounted() {
    await this.signUpWithLocal
    if(!this.isLoggedIn) {
      this.$router.push('/sign-up')
    } else {
      this.fetchMeetups
    }
  }
}
</script>

<style scoped>

.heading {
    -ms-flex-item-align: start;
        align-self: flex-start;
    margin-left: 300px;
}

@media (max-width: 768px) {
  .heading {
    margin-left: 100px;
  }
}

@media (max-width: 425px) {
  .heading {
    margin-left: 20px;
  }
  h1 {
    font-size: 20px;
  }
  h2 {
    font-size: 18px;
  } 
}

@media (max-width: 320px) {
  .heading {
    margin-left: 10px;
  }
  h1 {
    font-size: 19px;
  }
  h2 {
    font-size: 17px;
  }
}
</style>