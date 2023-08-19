import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ICountry, IPagination } from '../types'
import { useAxios } from '../composables/use-axios'
import { Status } from '../enums/status'
import { useDebounce } from '../composables/use-debounce'
import { useSortBy } from '../composables/use-sort'

export const useCountryStore = defineStore('country', () => {
  const TOTAL_PER_PAGE = 25

  const axios = useAxios()

  const textSearch = ref<string>('')
  const isNamedSortAsc = ref<boolean>(true)

  const status = ref<Status>(Status.Initial)
  const countries = ref<ICountry[]>([])
  const pagination = ref<IPagination>({
    page: 1,
    totalPage: 0,
  })

  const getCountries = computed<ICountry[]>(
    () =>
      useSortBy(
        countries.value,
        (v: ICountry) => v.name.official,
        isNamedSortAsc.value
      ) as ICountry[]
  )

  const namedSort = () => {
    isNamedSortAsc.value = !isNamedSortAsc.value
  }

  const fetchCountries = async () => {
    try {
      status.value = Status.Fetching
      const { data } = await axios.get(
        textSearch.value ? `/name/${textSearch.value}` : '/all',
        {
          fields: ['name', 'flags', 'cca2', 'cca3', 'altSpellings', 'idd'].join(
            ','
          ),
        }
      )
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

  const countrySearch = useDebounce(fetchCountries)

  return {
    isNamedSortAsc,
    textSearch,

    status,
    countries,
    pagination,

    getCountries,

    fetchCountries,
    countrySearch,
    namedSort,
  }
})
