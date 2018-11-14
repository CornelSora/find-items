import Vue from 'vue'
import router from '@/router'

import Login from '@/components/Login'

describe('Login.vue', () => {
  it('it should contain data', () => {
    expect(typeof Login.data).to.equal('function')
  })

  it('it should login method', () => {
    expect(typeof Login.methods.login).to.equal('function')
  })

  it('it should have email and password for user in data in login', () => {
    expect(Login.data().email != undefined && Login.data().password != undefined).to.equal(true)
  })

  it('it should have login button with connection message', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor({router}).$mount()
    const btnLogin = vm.$el.querySelector('#btnLogin')
    const msg = btnLogin.innerHTML
    expect(msg).to.equal('Connection')
  })
})
