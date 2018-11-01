<template>
    <b-container class="bodyT">
        <headerPage /> 
        <b-form-input
            type="text"
            placeholder="Search"
            v-model="search" /><br/>
        <b-card-group columns>
            <b-card :title="city.nume"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
                v-for="city in citiesArray" :key="city.auto"
            >
                <b-btn variant="outline-success" @click="btnGoClicked(city.auto)">
                    <span class="goto" to="/sign-up">Search here</span>
                </b-btn>
            </b-card>
        </b-card-group>
    </b-container>
</template>

<script>
import jsonCities from '../utils/cities.json'
import headerPage from './HeaderPage'

export default {
    data () {
        return {
            citiesArray: jsonCities,
            search: ''
        }
    },
    methods: {
        btnGoClicked(city) {
            this.$router.replace(`/home/${city}`)
        }
    },
    watch: {
        search (val) {
            this.citiesArray = jsonCities
            if (!val.trim()) {
                return
            }
            this.citiesArray = this.citiesArray.filter((city) => {
                return city.nume.toLowerCase().startsWith(val.toLowerCase())
            })
        }
    },
    components: {
        headerPage
    }
}
</script>

<style>
.goto:hover {
    color: white
}
.bodyT {
    padding: 10px;
    background: #009fff; /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #009fff, #ec2f4b); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #009fff, #ec2f4b);
}
</style>
