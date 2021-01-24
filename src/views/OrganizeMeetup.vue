<template>
  <div class="section">
    <h1>Organize an Meetup</h1>
    <form @submit.prevent="submit">
      <input type="text" v-model="title"
        :class="{invalid: $v.title.$error}"
        placeholder="Title of the meeting"
        @input="$v.title.$touch()"> 

      <input type="text" v-model="image"
       placeholder="Image url"
       @input="$v.image.$touch()"
       :class="{invalid: $v.image.$error}">

      <textarea v-model="description" placeholder="Description"></textarea>

      <input type="date"
       v-model="date"
        @input="$v.date.$touch()"
        :class="{invalid: $v.date.$error}">

      <button class="form-button" type="submit">Create Meetup</button>
    </form>
  </div>
</template>

<script>
import { required, minLength, url } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      title: '',
      image: '',
      description: '',
      date: ''
    }
  },
  validations: {
    title: {
      required,
      minLen: minLength(4)
    },
    image: {
      required,
      url
    },
    date: {
      required
    }
  },
  computed: {
    ...mapGetters(['tokenId']),
    ...mapActions(['organizeMeetup', 'fetchMeetups', 'signUpWithLocal'])
  },
  methods: {
    submit() {
       const meetup = {
        title: this.title,
        image: this.image,
        description: this.description,
        date: this.date
       }
      this.$store.dispatch('organizeMeetup', meetup)
      this.$router.push('/')
    }
  },
  async mounted() {
    if (this.tokenId === null && !localStorage.getItem('tokenId') && !localStorage.getItem('userId')) {
      this.$router.push('/sign-up')
    } else {
      this.signUpWithLocal
      this.fetchMeetups
    }
  }
}
</script>

<style scoped>

</style>