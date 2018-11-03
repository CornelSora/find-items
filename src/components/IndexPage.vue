<template>
  <div>
    <addLostItem :displayModal="display" :city="city" />
    <div class="hello">
      <b-btn @click="logout" id="logout">Logout</b-btn>
      <b-btn @click="changeCity" id="logout">Change city</b-btn>
      <b-tabs>
        <b-tab title="I lost">
          <b-btn class="btnLost" variant="primary" @click="displayAddFrom">I lost an item</b-btn> <br/>
          <lostThings :wantsToAdd="isAddClicked" />
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
import lostThings from './LostThings'

export default {
  name: 'IndexPage',
  data () {
    return {
      city: this.$route.params.auto,
      display: false,
      isAddClicked: false
    }
  },
  mounted () {
        console.warn(this.city)
      },
  methods: {
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
      this.isAddClicked = true
    },
    changeCity () {
      this.$router.replace('/cities')
    }
  },
  components: {
    addLostItem,
    lostThings
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
