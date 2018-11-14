<template>
  <div>
    <headerPage />
    <b-container>
      <p>Let's create a new account!</p>
      <b-form-input
        type="text"
        placeholder="Email"
        v-model="email"
      /><br/>
      <b-form-input
        type="password"
        placeholder="Password"
        v-model="password"
      /><br/>
      <b-btn variant="outline-success" @click="signUp" id="btnRegister">Sign Up</b-btn>
      <span>Or go back to <router-link to="/">login</router-link>.</span>
    </b-container>
  </div>
</template>

<script>
import headerPage from './HeaderPage'

export default {
  name: 'signUp',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async signUp () {
      try {
        const user = await this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        this.$router.replace('cities')
      } catch (e) {
        console.warn(e)
      }
    }
  },
  components: {
    headerPage
  }
}
</script>

<style>

</style>
