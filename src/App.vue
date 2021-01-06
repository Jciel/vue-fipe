<template>
  <main class="container">
    <section class="search-bars">
      <el-select class="select-input" v-model="brandSelected" filterable placeholder="Select">
        <el-option
          v-for="brand in listBrands"
          :key="brand.id"
          :label="brand.name"
          :value="brand.id">
        </el-option>
      </el-select>

      <el-select :defaultFirstOption="true" class="select-input" v-model="vehicleSelected" filterable placeholder="Select">
        <el-option
            v-for="vehicle in listVehicles"
            :key="vehicle.id"
            :label="vehicle.name"
            :value="vehicle.id">
        </el-option>
      </el-select>

      <el-select class="select-input" v-model="yearSelected" filterable placeholder="Select">
        <el-option label="Todos" value="all"></el-option>
        <el-option
            v-for="(year, index) in vehiclesYears"
            :key="index"
            :label="year"
            :value="year">
        </el-option>
      </el-select>
    </section>

    <section class="cards-container">
      <car-card
          class="app-car-card"
          v-for="vehicle in vehiclesSelected"
          :key="vehicle.id"
          :vehicle-data="vehicle"/>
    </section>
  </main>
</template>

<script>
import CarCard from "./components/CarCard";
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'App',

  components: {
    'car-card': CarCard
  },

  setup() {
    const store = useStore()
    const brandSelected = ref('')
    let vehicleSelected = ref('')
    const yearSelected = ref('all')

    const listBrands = computed(() => store.getters.listBrands)
    const listVehicles = computed(() => store.getters.vehiclesByBrand(brandSelected.value))
    const vehiclesSelected = computed(() => store.getters.vehiclesSelected(yearSelected.value))
    const vehiclesYears = computed(() => store.getters.vehiclesYears)

    onMounted(() => { store.dispatch('findBrands') })

    watch(brandSelected, (brandId) => {
      store.dispatch('findCarsByBrandId', brandId).then(() => {
        vehicleSelected.value = listVehicles.value[0].id
      })
    })

    watch(vehicleSelected, (vehicleId) => {
      store.dispatch('findCarsByCarId', {brandId: brandSelected.value, vehicleId})
    })

    return {
      vehiclesSelected: vehiclesSelected,
      vehicleSelected:  vehicleSelected,
      brandSelected:    brandSelected,
      vehiclesYears:    vehiclesYears,
      listVehicles:     listVehicles,
      yearSelected:     yearSelected,
      listBrands:       listBrands
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  .search-bars {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;

    .select-input {
      margin-right: 15px;
    }
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .app-car-card {
      margin-right: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
