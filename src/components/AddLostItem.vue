<template>
    <b-modal id="modalPrevent"
                ref="modal"
                title="Add details about item"
                @ok="handleOk"
                @shown="clearName">
        <b-form>
            <b-form-file
                v-model="lostItem.image"
                placeholder="Upload a picture"
                name="pic" accept="image/*"
                ></b-form-file><br/>
            <br/>
            <b-form-input type="text"
                            placeholder="Enter product name"
                            :state="!$v.lostItem.title.$invalid"
                            v-model="lostItem.title"></b-form-input> <br />
            <b-form-input type="text"
                            placeholder="Contact (phone / email)"
                            v-model="lostItem.contact"></b-form-input> <br />
            <b-form-textarea id="textarea1"
                     v-model="lostItem.description"
                     :state="!$v.lostItem.title.$invalid"
                     placeholder="Enter more details"
                     :rows="3"
                     :max-rows="6">
            </b-form-textarea>
        </b-form>
    </b-modal>
</template>

<script>
import { validationMixin } from "vuelidate"
import { required, minLength } from "vuelidate/lib/validators"

export default {
  data () {
    return {
      lostItem: {
          image: "",
          title: "",
          description: "",
          contact: "",
          city: this.city,
          messages: []
      }
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
      if (this.$v.lostItem.$invalid) {
            return
      } else {
          if (this.lostItem.image) {
            let base = await this.getBase64(this.lostItem.image)
            let reduce = await this.reduceImage(base)
            this.lostItem.image = reduce
          } else {
              this.lostItem.image = ''
          }
          let ref = this.$firebase.database().ref()
          let itemsRef = ref.child('LostItems')
          this.lostItem.createdAt = (new Date()).toString()
          itemsRef.push(this.lostItem)
          this.lostItem = {}
          this.$refs.modal.hide()
      }
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
                var x = 0;
                var y = 0;
                var width = 300;
                var height = 150;
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
  mixins: [
    validationMixin
  ],
  validations: {
    lostItem: {
        title: {
            required
        },
        description: {
            required,
            minLength: minLength(3)   
        }
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
      },
      city: {
          type: String,
          required: true
      }
  }
}
</script>