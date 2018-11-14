<template>
  <div>
    <headerPage />
    <b-container class="test">
      <h3>Sign in</h3>
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
      <b-btn
        variant="outline-success"
        id="btnLogin"
        @click="login(email, password)">Connection</b-btn>
      <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
    </b-container>
  </div>
</template>

<script>
import headerPage from './HeaderPage'

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login (email, password) {
      try {
        const user = await this.$firebase.auth().signInWithEmailAndPassword(email, password)
        this.$router.replace('cities')
        return user
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
