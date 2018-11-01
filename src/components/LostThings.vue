<template>
    <div class="lost-list">
        <b-list-group>
            <b-list-group-item v-for="thing in things" :key="thing.id">
                <div class="row test">
                    <div class="col">
                        <b-img v-if="thing.image" width="75" height="75" :src="thing.image" />
                        <b-img v-if="!thing.image" blank rounded width="75" height="75" blank-color="#777" alt="img" class="m-1" :src="thing.image" />
                    </div>
                    <div class="col">
                        <h5 class="mt-0 row">{{ thing.title }}</h5> <br/>
                        <p class="row">{{ thing.description }}</p>
                    </div>
                </div>
            </b-list-group-item>
        </b-list-group>
        <div v-if="things.length === 0"><br>We have no records</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            things: []
        }
    },
    mounted () {
        let ref = this.$firebase.database().ref('/LostItems')
        ref.on("value", function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();
            });
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        ref.on("child_added", (snapshot, prevChildKey) => {
            var newPost = snapshot.val();
            this.things.push(newPost)
        });
    }
}
</script>

<style scoped>
.lost-list {
    text-align: left;
    align-content: left;
    margin-top: 50px;
}
.col {
    flex-grow: 0.15;
}
</style>
