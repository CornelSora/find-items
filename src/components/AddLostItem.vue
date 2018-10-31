<template>
    <b-modal id="modalPrevent"
                ref="modal"
                title="Submit your name"
                @ok="handleOk"
                @shown="clearName">
        <b-form @submit.stop.prevent="handleSubmit">
            <b-form-file
                v-model="file"
                placeholder="Upload a picture"
                name="pic" accept="image/*"
                ></b-form-file><br/>
            <br/>
            <b-form-input type="text"
                            placeholder="Enter product name"
                            v-model="name"></b-form-input> <br />
            <b-form-input type="text"
                            placeholder="Enter other details"
                            v-model="name"></b-form-input> <br />
            <b-form-input type="text"
                            placeholder="Contact (phone / email)"
                            v-model="name"></b-form-input>
        </b-form>
    </b-modal>
</template>

<script>
import LZW from '../utils/compress'

export default {
  data () {
    return {
      name: '',
      names: [],
      file: ''
    }
  },
  methods: {
    clearName () {
      this.name = ''
    },
    async handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      var ValidImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (ValidImageTypes.indexOf(this.file.type) === -1) {
            alert('Please add only image types (gif, jpeg, png)')
      } else {
          let base = await this.getBase64(this.file)
          console.warn(base)
          let reduce = await this.reduceImage(base)
          console.warn(reduce)
      }
      if (!this.name) {
        alert('Please enter your name')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.names.push(this.name)
      this.clearName()
      this.$refs.modal.hide()
    },
    getBase64 (fileParam) {
        return new Promise ((resolve, reject) => {
            var reader = new FileReader()
            reader.readAsDataURL(fileParam)
            reader.onload = function () {
                resolve(reader.result)
            }
            reader.onerror = function (error) {
                reject(error)
            }
        })
    },
    reduceImage (fileSrc) {
        return new Promise((resolve, reject) => {
            try {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                var x = 188;
                var y = 30;
                var width = 200;
                var height = 137;
                var imageObj = new Image();

                imageObj.onload = function() {
                    context.drawImage(imageObj, x, y, width, height);
                    resolve(canvas.toDataURL())
                };
                imageObj.src = fileSrc;
            } catch (e) {
                reject(e)
            }
        }) 
    }
  },
  watch: {
      displayModal (val) {
        this.$refs.modal.show()
      }
  },
  props: {
      displayModal: {
          type: Boolean,
          required: false,
          default: false
      }
  }
}
</script>