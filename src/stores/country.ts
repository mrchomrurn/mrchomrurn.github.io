import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ICountry, IPagination } from '../types'
import { useAxios } from '../composables/use-axios'
import { Status } from '../enums/status'

export const useCountryStore = defineStore('country', () => {
  const TOTAL_PER_PAGE = 25

  const axios = useAxios()

  const textSearch = ref<string>('')
  const status = ref<Status>(Status.Initial)
  const countries = ref<ICountry[]>([])
  const pagination = ref<IPagination>({
    page: 1,
    totalPage: 0,
  })

  const fetchCountries = async () => {
    try {
      status.value = Status.Fetching
      const { data } = await axios.get('/all', {
        fields: ['name', 'flags', 'cca2', 'cca3', 'altSpellings', 'idd'].join(
          ','
        ),
      })
      countries.value = data
      pagination.value = {
        page: 1,
        totalPage: Math.ceil(countries.value.length / TOTAL_PER_PAGE),
      }
      status.value = Status.Success
    } catch (e) {
      // TODO: Error handling implementation
      console.log(e)
      status.value = Status.Error
    }
  }

  return {
    textSearch,
    status,
    countries,
    pagination,

    fetchCountries,
  }
})
