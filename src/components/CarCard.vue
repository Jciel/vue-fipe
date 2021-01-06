<template>
  <article class="card-container">
    <img class="image" src="https://s2.glbimg.com/mYgwlPa7vtIiUk6kROUxJUi2yyo=/0x0:620x413/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2020/a/4/Ik8J1fQYirf6wYRvRJ8Q/2020-03-20-novo-tracker-1.jpg">
    <div class="card-informations">
      <header class="header-content">
        <div class="title">{{ vehicleData.marca }} - {{ complement }}</div>
        <div class="info">{{ vehicleInfo }}</div>
      </header>

      <section class="price-content">
        <div class="price">
          {{ vehicleData.preco }}
        </div>
        <div class="year-kilometers">
          <div>{{ vehicleData.ano_modelo }}</div>
          <div>{{ vehicleData.combustivel }}</div>
        </div>
      </section>

      <footer class="footer-information">
        <img class="marker-map" alt="Marker map" src="@/assets/marker-map.svg">
        <div class="city">São paulo</div>
      </footer>
    </div>
  </article>
</template>

<script>
import { computed } from "vue";

export default {
  name: "CarCard",

  props: {
    vehicleData: {
      type: Object,
      default: () => {return {}}
    }
  },

  setup (props) {

    const vehicleInfo = computed(() => props.vehicleData.name.toUpperCase())
    const complement = computed(() => props.vehicleData.key.split('-')[0])

    return {
      vehicleInfo: vehicleInfo,
      complement: complement
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-container {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    max-width: 280px;
    min-width: 220px;

    .image {
      width: 100%;
      border-radius: 4px;
      display: block;
    }

    .card-informations {
      padding: 20px 20px 0 20px;

      .header-content {
        padding-bottom: 40px;

        .title {
          padding-bottom: 5px;
          color: #000;
          font-weight: bold;
        }

        .info {
          color: #bfbfbf;
        }
      }

      .price-content {
        padding-bottom: 5px;
        display: flex;
        flex-direction: column;
        width: 100%;

        .price {
          padding-bottom: 5px;
          font-weight: bold;
          color: #8c8c8c;
        }

        .year-kilometers {
          width: 100%;
          display: flex;
          justify-content: space-between;
          color: #bfbfbf;
        }
      }

      .footer-information {
        padding: 10px 0 10px 0;
        border-top: 1px solid #bfbfbf;
        display: flex;
        width: 100%;

        .marker-map {
          display: block;
          width: 20px;
          margin-right: 10px;
        }
      }
    }
  }
</style>
