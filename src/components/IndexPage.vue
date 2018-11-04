<template>
  <div>
    <addLostItem :displayModal="display" :source="sourceToAdd" :city="city" />
    <div class="hello">
      <b-btn @click="logout" id="logout">Logout</b-btn>
      <b-btn @click="changeCity" id="logout">Change city</b-btn>
      <b-tabs>
        <b-tab title="Lost things">
          <b-btn class="btnLost" variant="primary" @click="displayAddFrom('LostItems')">I lost an item</b-btn> <br/>
          <lostThings :wantsToAdd="isAddClicked" source="/LostItems" :city="city"/>
        </b-tab>
        <b-tab title="Found things">
          <b-btn class="btnLost" variant="primary" @click="displayAddFrom('FoundItems')">I found an item</b-btn> <br/>
          <lostThings :wantsToAdd="isAddClicked" source="/FoundItems" :city="city"/>
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
      isAddClicked: false,
      sourceToAdd: 'LostThings'
    }
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
    displayAddFrom (source) {
      this.sourceToAdd = source
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
