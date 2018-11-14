import Vue from 'vue'
import router from '@/router'

import AddLostItem from '@/components/AddLostItem'

describe('AddLostItem.vue', () => {
  it('it should contain data', () => {
    expect(typeof AddLostItem.data).to.equal('function')
  })

  it('it should handleOk method', () => {
    expect(typeof AddLostItem.methods.handleOk).to.equal('function')
  })

  it('it should have a method to compress image', () => {
    expect(typeof AddLostItem.methods.reduceImage).to.equal('function')
  })

  it('it should have title, description, contact for lostItem in data in AddLostItem', () => {
    expect(AddLostItem.data().lostItem.title != undefined && AddLostItem.data().lostItem.description != undefined && AddLostItem.data().lostItem.contact != undefined).to.equal(true)
  })

  it('it should have validations', () => {
    expect(AddLostItem.validations.lostItem != undefined).to.equal(true)
  })
})
