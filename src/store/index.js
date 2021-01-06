import { createStore } from 'vuex'

const fetchOptions = { mode: 'cors' }

export default createStore({
  strict: true,

  state: {
    listBrands: [],
    listCars: [],
    listVehicles: [],
    vehiclesSelected: []
  },

  mutations: {
    setListBrands (state, brands) { state.listBrands = brands },

    setListCars (state, { vehicles, brandId }) { state.listVehicles[brandId] = vehicles },

    setVehiclesSelected (state, vehiclesData) {
      state.vehiclesSelected = vehiclesData
    }
  },

  actions: {
    findBrands ({ commit }) {
      fetch('https://fipeapi.appspot.com/api/1/carros/marcas.json', fetchOptions)
        .then(res => res.json())
        .then(brandsData => {
          const brands = brandsData.map(brand => { return { id: brand.id, name: brand.fipe_name } })
          commit('setListBrands', brands)
        }).catch(err => {
          console.log("ERR: ", err)
        })
    },

    findCarsByBrandId({ commit, state }, brandId) {
      if (state.listVehicles[brandId]?.length > 0) return

      return fetch(`https://fipeapi.appspot.com/api/1/carros/veiculos/${brandId}.json`, fetchOptions)
        .then(res => res.json())
        .then(vehicles => {
          commit('setListCars', { vehicles, brandId })
        }).catch(err => {
          console.log("ERR: ", err)
        })
    },

    findCarsByCarId({ commit }, { brandId, vehicleId }) {
      fetch(`https://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${vehicleId}.json`, fetchOptions)
        .then(vehicleModels => vehicleModels.json())
        .then(vehicleModels => vehicleModels.map(vehicleModel =>
            fetch(`https://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${vehicleId}/${vehicleModel.id}.json`, fetchOptions)
              .then(vehiclesData => vehiclesData.json())
          ))
        .then(vehiclesDataPromises => Promise.all(vehiclesDataPromises))
        .then(vehiclesData => {
          console.log('vehiclesData: ', vehiclesData)
          commit('setVehiclesSelected', vehiclesData)
        })
        .catch(err => {
          console.log("ERR: ", err)
        })
      // fetch(`https://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${vehicleId}.json`, fetchOptions)
      //   .then(vehicleModels => vehicleModels.json())
      //   .then(vehicleModels => {
      //
      //     console.log('vehicle: ', vehicleModels)
      //     console.log('commit: ', commit)
      //
      //     const vehiclesPromises = vehicleModels.map(vehicleModel =>
      //       fetch(`https://fipeapi.appspot.com/api/1/carros/veiculo/${brandId}/${vehicleId}/${vehicleModel.id}.json`, fetchOptions)
      //         .then(res => res.json()))
      //
      //     Promise.all(vehiclesPromises).then(vehiclesData => {
      //
      //       console.log('vehiclesData: ', vehiclesData)
      //
      //     })
      //     // commit('setListCars', { vehicles, brandId })
      //   }).catch(err => {
      //   console.log("ERR: ", err)
      // })
    }
  },

  getters: {
    vehiclesSelected: state => yearFilter => {
      if (yearFilter === "all") {
        return state.vehiclesSelected
      }
      return state.vehiclesSelected.filter(vehicle => vehicle.ano_modelo === yearFilter)
    },
    vehiclesByBrand: state => brandId => state.listVehicles[brandId],
    vehiclesYears: state => state.vehiclesSelected.map(vehicle => vehicle.ano_modelo),
    listVehicles: state => state.listVehicles,
    listBrands: state => state.listBrands
  },

  modules: {
  }
})



