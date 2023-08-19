<template>
  <Dialog v-model="detailDailog" title="Country Detail">
    <Loading v-if="detailStatus == Status.Fetching"></Loading>
    <div v-else-if="!!countryDetail">
      <div class="card mb-5">
        <div class="card-header bg-transparent px-4 py-3 border-bottom-lg">
          <h6 class="card-title mb-0">Basic Info</h6>
        </div>
        <div class="card-body">
          <div class="row gy-2 mb-5">
            <div class="col-md-8">
              <div class="row gy-2">
                <div class="col-md-4 text-muted">
                  Officail Name:
                  <p class="text-dark fw-bold">
                    {{ countryDetail.name.official }}
                  </p>
                </div>
                <div class="col-md-4 text-muted">
                  Common Name:
                  <p class="text-dark fw-bold">
                    {{ countryDetail.name.common }}
                  </p>
                </div>
                <div class="col-md-4 text-muted">
                  Alternative Name:
                  <p class="text-dark fw-bold">
                    {{ countryDetail.altSpellings.join(', ') }}
                  </p>
                </div>
                <div class="col-12 text-muted">
                  Native Name (Common):
                  <div class="text-dark fw-bold d-flex gap-3">
                    <div
                      v-for="(name, key) in countryDetail.name.nativeName"
                      class="d-flex flex-nowrap text-align-center"
                    >
                      <div class="bg-primary text-white px-3 rounded-pill me-2">
                        {{ key.toUpperCase() }}
                      </div>
                      {{ name.official }} ({{ name.common }})
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="text-center">
                <img
                  :src="countryDetail.flags.png"
                  :alt="countryDetail.flags.alt"
                  class="img-fluid rounded-4 shadow"
                />
              </div>
            </div>
          </div>

          <div class="row gy-2 mb-5"></div>
          <div class="row gy-2 mb-5">
            <div class="col-12 text-muted">
              Country Name Translation:
              <div class="text-dark fw-bold d-flex flex-wrap gap-4">
                <div
                  v-for="(name, key) in countryDetail.translations"
                  class="d-flex flex-nowrap text-align-center"
                >
                  <div class="bg-primary text-white px-3 rounded-pill me-1">
                    {{ key.toUpperCase() }}
                  </div>
                  {{ name.official }} ({{ name.common }})
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-5">
        <div class="card-header bg-transparent px-4 py-3 border-bottom-lg">
          <h6 class="card-title mb-0">General Info</h6>
        </div>
        <div class="card-body">
          <div class="row gy-2 mb-5">
            <div class="col-md-4 text-muted">
              ISO 3166-1 alpha-2 two-letter country codes:
              <p class="text-dark fw-bold">{{ countryDetail.cca2 }}</p>
            </div>
            <div class="col-md-4 text-muted">
              ISO 3166-1 alpha-3 three-letter country codes:
              <p class="text-dark fw-bold">{{ countryDetail.cca3 }}</p>
            </div>
            <div class="col-md-4 text-muted">
              Geographical size:
              <p class="text-dark fw-bold">
                {{ countryDetail.area }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Border countries:
              <p class="text-dark fw-bold">
                {{ countryDetail.borders?.join(', ') || 'N/A' }}
              </p>
            </div>
          </div>
          <div class="row gy-2 mb-5">
            <div class="col-md-4 text-muted">
              International dialing codes:
              <p class="text-dark fw-bold">
                {{
                  `${countryDetail.idd.root}${countryDetail.idd.suffixes?.join(
                    `${countryDetail.idd.root}, `
                  )}`
                }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Capital cities:
              <p class="text-dark fw-bold">
                {{ countryDetail.capital?.join(', ') }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Capital latitude and longitude:
              <p class="text-dark fw-bold">
                {{ countryDetail.latlng }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Car distinguised (oval) signs:
              <p class="text-dark fw-bold">
                {{ countryDetail.car?.signs }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Car driving side:
              <p class="text-dark fw-bold">
                {{ countryDetail.car?.side }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Code of the International Olympic Committee:
              <p class="text-dark fw-bold">
                {{ countryDetail.cioc }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              On-continent:
              <p class="text-dark fw-bold">
                {{ countryDetail.continents?.join(', ') }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Population:
              <p class="text-dark fw-bold">
                {{ countryDetail.population }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Currencies:
              <div class="text-white fw-bold d-flex align-items-center">
                <div
                  class="rounded-pill bg-secondary px-3 py-1 me-1"
                  v-for="currency in countryDetail.currencies"
                >
                  {{ currency.name }} ({{ currency.symbol }})
                </div>
              </div>
            </div>
            <div class="col-md-4 text-muted">
              Genderized inhabitants (male/female):
              <div
                class="text-white fw-bold d-flex align-items-center flex-wrap"
              >
                <div
                  class="rounded-pill bg-secondary px-3 py-1 text-nowrap mb-1 me-1"
                  v-for="demonym in countryDetail.demonyms"
                >
                  {{ `${demonym.m}/${demonym.f}` }}
                </div>
              </div>
            </div>
            <div class="col-md-4 text-muted">
              Independent:
              <div
                class="text-white fw-bold rounded-pill px-4 py-1"
                style="width: min-content"
                :class="[
                  countryDetail.independent ? 'bg-success' : 'bg-secondary',
                ]"
              >
                {{ countryDetail.independent ? 'Yes' : 'No' }}
              </div>
            </div>
            <div class="col-md-4 text-muted">
              FIFA code:
              <p class="text-dark fw-bold">
                {{ countryDetail.fifa || 'N/A' }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              FIFA code:
              <p class="text-dark fw-bold">
                {{ countryDetail.fifa || 'N/A' }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Worldbank Gini index (year):
              <div
                class="text-white fw-bold d-flex align-items-center flex-wrap"
              >
                <div
                  class="rounded-pill bg-secondary px-3 py-1 text-nowrap mb-1 me-1"
                  v-for="(gini, year) in countryDetail.gini"
                >
                  {{ `${gini} (${year})` }}
                </div>
              </div>
            </div>
            <div class="col-md-4 text-muted">
              Landlocked country:
              <p
                class="fw-bold rounded-pill py-1 px-4 text-white"
                :class="[
                  countryDetail.landlocked ? 'bg-secondary' : 'bg-success',
                ]"
                style="width: min-content"
              >
                {{ countryDetail.landlocked ? 'Yes' : 'No' }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Official languages:
              <div
                class="text-white fw-bold d-flex align-items-center flex-wrap"
              >
                <div
                  class="rounded-pill bg-secondary px-3 py-1 text-nowrap mb-1 me-1"
                  v-for="lang in countryDetail.languages"
                >
                  {{ lang }}
                </div>
              </div>
            </div>

            <div class="col-md-4 text-muted">
              Postal codes (Reqex):
              <p class="text-dark fw-bold">
                {{
                  countryDetail.postalCode?.format
                    ? `${countryDetail.postalCode?.format} ( ${countryDetail.postalCode?.regex} )`
                    : 'N/A'
                }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Region:
              <p class="text-dark fw-bold">
                {{ countryDetail.region }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              ISO 3166-1 assignment status:
              <p class="text-dark fw-bold">
                {{ countryDetail.status }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              Subregion:
              <p class="text-dark fw-bold">
                {{ countryDetail.subregion }}
              </p>
            </div>

            <div class="col-md-4 text-muted">
              Timezone:
              <p class="text-dark fw-bold">
                {{ countryDetail.timezones?.join(', ') }}
              </p>
            </div>

            <div class="col-md-4 text-muted">
              Internet top level domains:
              <p class="text-dark fw-bold">
                {{ countryDetail.tld?.join(', ') }}
              </p>
            </div>
            <div class="col-md-4 text-muted">
              UN Member:
              <div
                class="text-white fw-bold rounded-pill px-4 py-1"
                style="width: min-content"
                :class="[
                  countryDetail.unMember ? 'bg-success' : 'bg-secondary',
                ]"
              >
                {{ countryDetail.unMember ? 'Yes' : 'No' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCountryStore } from '../stores/country'
import Dialog from './core/Dialog.vue'
import Loading from './core/Loading.vue'
import { Status } from '../enums/status'

const countryStore = useCountryStore()

const { detailStatus, detailDailog, countryDetail } = storeToRefs(countryStore)
</script>
