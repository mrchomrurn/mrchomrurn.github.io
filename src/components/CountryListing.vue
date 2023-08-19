<template>
  <Loading v-if="Status.Fetching === status"></Loading>
  <div v-else class="row gx-2">
    <div
      v-for="country in getCountries"
      class="col-sm-6 col-md-4 col-lg-3 mb-2"
      :key="`country-${country.name}`"
    >
      <a
        href="#"
        class="text-decoration-none text-dark"
        @click.prevent="countryClick(country)"
      >
        <div class="bg-white shadow rounded-3 overflow-hidden p-2">
          <img
            :src="country.flags.png"
            class="img-fluid flag mb-2 rounded shadow-sm"
            :alt="country.flags.alt"
          />
          <div class="p-3">
            <h6 class="text-ellipsis mb-3">{{ country.name.official }}</h6>
            <p class="mb-0 text-muted">Native Name:</p>
            <div
              class="d-flex overflow-auto flex-nowrap mb-3"
              style="height: 30px"
            >
              <div
                v-for="(name, key) in country.name.nativeName"
                :key="`native-name-${key}`"
                class="text-nowrap rounded-pill px-2"
                style="background-color: #e8e8e8"
              >
                {{ name.official }}
              </div>
            </div>

            <p class="mb-0 text-muted">Alternative Name:</p>
            <p class="mb-3 text-ellipsis">
              {{ country.altSpellings.join(', ') }}
            </p>

            <p class="mb-0 text-muted">
              CODE 2: <span class="fw-bold text-dark">{{ country.cca2 }}</span>
            </p>
            <p class="mb-0 text-muted">
              CODE 3: <span class="fw-bold text-dark">{{ country.cca3 }}</span>
            </p>
            <p class="mb-0 text-muted text-nowrap">
              International dialing codes:
              <span class="fw-bold text-dark">{{
                `${country.idd.root}${country.idd.suffixes.join(
                  `${country.idd.root}, `
                )}`
              }}</span>
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>

  <CountryDetailDialog></CountryDetailDialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryStore } from '../stores/country'
import { Status } from '../enums/status'
import CountryDetailDialog from './CountryDetailDialog.vue'
import Loading from './core/Loading.vue'

const countryStore = useCountryStore()

const { countryClick } = countryStore

const { getCountries, status } = storeToRefs(countryStore)
</script>

<style lang="scss" scoped>
.flag {
  height: 120px;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
}
</style>
