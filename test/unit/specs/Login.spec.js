import Vue from 'vue'
import router from '@/router'

import Login from '@/components/Login'

describe.only('Login.vue', () => {
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

  // it('user info after calling login', async () => {
  //   const Constructor = Vue.extend(Login)
  //   const vm = new Constructor({router}).$mount()
  //   const userInfo = await vm.login('test2@gmail.com', 'test1234')
  //   expect(userInfo != undefined).to.equal(true)
  // })
})
