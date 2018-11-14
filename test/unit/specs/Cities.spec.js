import Vue from 'vue'
import router from '@/router'

import Cities from '@/components/Cities'

describe('Cities.vue', () => {
  it('it should contain data', () => {
    expect(typeof Cities.data).to.equal('function')
  })

  it('it should has 42 cities', () => {
      const noCities = Cities.data().citiesArray.length
      expect(noCities).to.equal(42)
  })

  it('it must have Bucureşti in array', () => {
    const isBuc = !!Cities.data().citiesArray.find(x => x.nume == 'Bucureşti')
    expect(isBuc).to.equal(true)
  })

  it('it should have cities array in data in cities', () => {
    expect(Cities.data().citiesArray != undefined).to.equal(true)
  })
})
