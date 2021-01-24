<template>
    <div class="section">
        <h1>Sign Up </h1>
        <form @submit.prevent="submit">
            <label>Email</label>
            <input type="email"
             v-model="email"
             :class="{invalid: $v.email.$error}"
             @input="$v.email.$touch()">

            <p class="error-mesage" v-if="$v.email.$error">Must be a valid email</p>


            <label>Username</label>
            <input 
             type="Username"
             v-model="username"
             @input="$v.username.$touch()"
             :class="{invalid: $v.username.$error}">
             
            <p class="error-message" v-if="$v.username.$error">Must me at least 4 characters long</p>


            <label>Password</label>
            <input type="password"
             v-model="password"
             @input="$v.password.$touch()"
             :class="{invalid: $v.password.$error}">

            <p class="error-message" v-if="$v.password.$error">Must be at least 6 characters long</p>

            <button class="form-button">Sign Up</button>
        </form>
    </div>
</template>

<script>
import { email, minLength } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            email: '',
            password: '',
            username: ''
        }
    },
    validations: {
        email: {
            email
        },
        password: {
            minLen: minLength(6)
        },
        username: {
            minLen: minLength(4)
        }
    },
    methods: {
        submit() {
            const formData = {
                email: this.email,
                password: this.password,
                username: this.username
            }
            this.$store.dispatch('signUp', formData)
        }
    }
}
</script>

<style scoped>
p .link {
    color: white;
}
</style>