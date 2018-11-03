<template>
    <div class="container-fluid lost-list">
        <b-list-group>
            <b-list-group-item v-for="thing in things.slice((currentPage - 1) * perPage, currentPage * perPage)" :key="thing.id">
                <div class="media">
                    <div class="media-left">
                        <b-img v-if="thing.image" width="75" height="75" :src="thing.image" @click="showImage(thing.image, thing.title)" />
                        <b-img v-if="!thing.image" blank rounded width="75" height="75" blank-color="#777" alt="img" class="m-1" />
                    </div>
                    <div class="media-body" @click="goToObject">
                        <h5><b>{{ thing.title }}</b></h5>
                        <p>{{ thing.description }}</p>
                    </div>
                </div>
            </b-list-group-item>
            <b-pagination align="center" size="md" :total-rows="things.length" v-model="currentPage" :per-page="perPage" style="margin-top: 5px;">
            </b-pagination>
        </b-list-group>
        <b-modal ref="imageModal" id="imageModal" :title="selectedImageTitle">
            <b-img :src="selectedImageSource" />
        </b-modal>
        <div v-if="things.length === 0 && !loading"><br>We have no records</div>
        <b-progress :value="100" variant="danger" striped="striped" class="mb-2" v-if="loading"></b-progress>
    </div>
</template>

<script>
export default {
    data () {
        return {
            perPage: 4,
            currentPage: 1,
            things: [],
            selectedImageSource: '',
            selectedImageTitle: '',
            loading: true
        }
    },
    mounted () {
        let ref = this.$firebase.database().ref('/LostItems')

        ref.on("value", (snapshot) => {
            this.loading = false
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        ref.on("child_added", (snapshot, prevChildKey) => {
            this.loading = false
            var newPost = snapshot.val();
            this.wantsToAdd ? this.things.unshift(newPost) : this.things.push(newPost)
        });
    },
    methods: {
        showImage (src, title) {
            this.$refs.imageModal.show()
            this.selectedImageSource = src
            this.selectedImageTitle = title
        },
        goToObject () {
            console.warn('going to object')
        }
    },
    props: {
        wantsToAdd: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style scoped>
.lost-list {
    text-align: left;
    align-content: left;
    margin-top: 50px;
}
.media-left {
    margin-right: 5px;
}
</style>
