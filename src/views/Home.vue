<template>
  <div class="section">
    <div class="container">
      <div id="organize">
        <router-link class="link" to="/organize-meetup">Organize Meetup</router-link>
      </div>
      <div class="meetups">
        <meetups-slide v-for="(meetup, index) in meetups"
          :key="meetup.id"
          :meetup="meetup"
          :index="index"
          :direction="direction"
          :visableMeetup="visableMeetup"
          @next="next"
          @prev="prev"
          ></meetups-slide>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import MeetupsSlide from '../components/MeetupsSlide.vue'
export default {
  components: {
    MeetupsSlide
  },
  data() {
    return {
      visableMeetup: 0,
      direction: 'right'
    }
  },
  computed: {
    ...mapActions(['fetchMeetups', 'setCurrentUser', 'signUpWithLocal']),
    ...mapGetters(['getMeetups', 'tokenId', 'isLoggedIn']),
    meetups() {
      return this.getMeetups
    },
  },
  methods: {   
    next() {
      if(this.visableMeetup >= this.getMeetups.length - 1) {
        this.visableMeetup = 0
      } else {
        this.visableMeetup++
      }
      this.direction = 'left'
    },
    prev() {
      if(this.visableMeetup <= 0) {
        this.visableMeetup = this.meetups.length - 1
      } else {
        this.visableMeetup--
      }
        this.direction = 'right'
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

.container {
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
      -ms-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
}

#organize {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  margin-bottom: 20px;
}


.link {
  padding: 12px 8px;
  color: white;
  text-decoration: none;
  border-radius: 20px;
  background: #fe8c00;  /* fallback for old browsers */  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-gradient(linear, right top, left top, from(#f83600), to(#fe8c00));
  background: -o-linear-gradient(right, #f83600, #fe8c00);
  background: linear-gradient(to left, #f83600, #fe8c00); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.meetups {
  width: 50%;
  height: 80vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: start;
      -ms-flex-align: start;
          align-items: flex-start;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  overflow: hidden;
  position: relative
}

@media (max-width: 1024px) {
  .meetups {
    width: 80%;
  }
}

@media (max-width: 768px) {
  .meetups {
    margin-top: 100px;
  }
}

@media (max-width: 425px) {
  .meetups {
    width: 90%;
  }
}

@media (max-width: 320px) {
  .meetups {
    width: 95%;
  }
}

</style>
