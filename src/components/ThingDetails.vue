<template>
    <b-container>
        <center><b-img :src="lostThing.image" />
        <b-img
            v-if="!lostThing || !lostThing.image"
            width="300"
            height="200"
            blank rounded
            blank-color="#777"
        />
        </center>
        <h2><b>{{ lostThing.title }}</b></h2>
        <p><b>Contact:</b> {{ lostThing.contact ? lostThing.contact : "Unkown" }} </p>
        <p><b>Description:</b> {{ lostThing.description }}</p>
    </b-container>
</template>

<script>
export default {
    props: {
        lostThing: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>
