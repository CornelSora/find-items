<template>
  <div>
    <addLostItem :displayModal="display" />
    <div class="hello">
      <b-btn @click="logout" id="logout">Logout</b-btn>
      <b-btn @click="changeCity" id="logout">Change city</b-btn>
      <b-tabs>
        <b-tab title="I lost">
          <b-btn class="btnLost" variant="primary" @click="displayAddFrom">I lost an item</b-btn>
          <br>We have no records
        </b-tab>
        <b-tab title="I found">
          <br>We have no records
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import addLostItem from './AddLostItem'

export default {
  name: 'IndexPage',
  data () {
    return {
      city: this.$route.query,
      display: false
    }
  },
  methods: {
    mounted () {
      console.warn(city)
    },
    async logout () {
      try {
        await this.$firebase.auth().signOut()
        this.$router.replace('/')
      } catch (e) {
        console.warn(e)
      }
    },
    displayAddFrom () {
      this.display = !this.display
    },
    changeCity () {
      this.$router.replace('/cities')
    }
  },
  components: {
    addLostItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#logout {
  float: right
}
.btnLost {
  float: left;
  margin: 10px;
}
</style>
