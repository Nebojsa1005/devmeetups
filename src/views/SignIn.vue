<template>
    <div class="section">
        <h1>Sign In </h1>
        <form @submit.prevent="submit">
            <label>Email</label>
            <input 
                :class="{invalid: $v.userEmail.$error}"
                @input="$v.userEmail.$touch()"
                type="email"
                v-model="userEmail">
            <p class="error-mesage" v-if="$v.userEmail.$error">Must be a valid email</p>

            <label>Password</label>
            <input type="password"
                :class="{invalid: $v.password.$error}"
                @input="$v.password.$touch()"
                v-model="password">
            <p class="error-mesage" v-if="$v.password.$error">Must be more then 6 characters</p>
            <button class="form-button" :disable="$v.$invalid">Signup</button>
        </form>
    </div>
</template>

<script>
import { email, minLength } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            userEmail: '',
            password: ''
        }
    },
    validations: {
        userEmail: {
            email
        },
        password: {
            minLen: minLength(6)
        }
    },
    methods: {
        async submit() {
            const formData = {
                email: this.userEmail,
                password: this.password
            }
            await this.$store.dispatch('signIn', formData)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>


</style>