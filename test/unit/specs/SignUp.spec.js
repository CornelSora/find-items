import Vue from 'vue'
import router from '@/router'

import Register from '@/components/SignUp'

describe('SignUp.vue', () => {
  it('it should contain data', () => {
    expect(typeof Register.data).to.equal('function')
  })

  it('it should register method', () => {
    expect(typeof Register.methods.signUp).to.equal('function')
  })

  it('it should have email and password for user in data in register', () => {
    expect(Register.data().email != undefined && Register.data().password != undefined).to.equal(true)
  })

  it('it should have register button with Sign Up message', () => {
    const Constructor = Vue.extend(Register)
    const vm = new Constructor({router}).$mount()
    const btnRegister = vm.$el.querySelector('#btnRegister')
    const msg = btnRegister.innerHTML
    expect(msg).to.equal('Sign Up')
  })
})
