<template>
    <div class="container-fluid lost-list">
        <b-list-group>
            <b-list-group-item
                v-for="thing in things.slice((currentPage - 1) * perPage, currentPage * perPage)"
                :key="thing.id">
                <div class="media">
                    <div class="media-left">
                        <b-img
                            v-if="thing.image"
                            width="75"
                            height="75"
                            :src="thing.image"
                            class="clickable"
                            @click="showImage(thing.image, thing.title)"
                        />
                        <b-img
                            v-if="!thing.image"
                            blank rounded
                            width="75"
                            height="75"
                            blank-color="#777"
                            alt="img" class="m-1"
                        />
                    </div>
                    <div class="media-body clickable" @click="goToObject(thing)">
                        <h5><b>{{ thing.title }}</b></h5>
                        <p>Added at: {{ formatDate(thing.createdAt) }}</p>
                    </div>
                </div>
            </b-list-group-item>
            <div v-if="things.length === 0 && !loading">
                <br>We have no records
            </div>
            <b-progress
                :value="100"
                variant="danger"
                striped="striped"
                class="mb-2"
                v-if="loading">
            </b-progress>
            <b-pagination
                align="center"
                size="md"
                :total-rows="things.length"
                v-model="currentPage"
                :per-page="perPage"
                style="margin-top: 5px;">
            </b-pagination>
        </b-list-group>
        <b-modal ref="imageModal" id="imageModal" :title="selectedImageTitle">
            <b-img :src="selectedImageSource" />
        </b-modal>
        <b-modal ref="thingDetals">
            <thingDetails :lostThing="selectedThing" />
        </b-modal>
    </div>
</template>

<script>
import moment from 'moment'
import thingDetails from './ThingDetails'

export default {
    data () {
        return {
            perPage: 10,
            currentPage: 1,
            things: [],
            selectedImageSource: '',
            selectedImageTitle: '',
            loading: true,
            selectedThing: {}
        }
    },
    mounted () {
        let ref = this.$firebase.database().ref(this.source).orderByChild("city").equalTo(this.city)

        ref.on("value", (snapshot) => {
            this.loading = false
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
        ref.on("child_added", (snapshot, prevChildKey) => {
            this.loading = false
            var newPost = snapshot.val();
            this.things.unshift(newPost)
        });
    },
    methods: {
        showImage (src, title) {
            this.$refs.imageModal.show()
            this.selectedImageSource = src
            this.selectedImageTitle = title
        },
        goToObject (thing) {
            this.selectedThing = thing
            this.$refs.thingDetals.show()
        },
        formatDate (date) {
            return moment((new Date(date)).toString()).format("DD-MM-YYYY")
        }
    },
    props: {
        wantsToAdd: {
            type: Boolean,
            required: false,
            default: false
        },
        city: {
          type: String,
          required: true
        },
        source: {
            type: String,
            required: true
        }
    },
    components: {
        thingDetails
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
.clickable:hover {
    cursor: pointer;
}
</style>
