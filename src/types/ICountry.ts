import { ICapitalInfo } from './ICapitalInfo'
import { ICar } from './ICar'
import { ICoatOfArms } from './ICoatOfArms'
import { ICurrency } from './ICurrency'
import { IMap } from './IMap'
import { IPostalCode } from './IPostalCode'

interface ICountryFlag {
  png: string
  alt?: string
}

interface IName {
  official: string
  common: string
}

interface ICountryName extends IName {
  nativeName: Record<string, IName>
}

interface ICountryIDD {
  root: string
  suffixes: string[]
}

interface IDemonyms {
  f: string
  m: string
}

export interface ICountry {
  name: ICountryName
  flags: ICountryFlag
  idd: ICountryIDD
  cca2: string
  cca3: string
  altSpellings: string[]
  tld?: string[]
  ccn3?: string
  cioc?: string
  independent?: boolean
  status?: string
  unMember?: boolean
  currencies?: Record<string, ICurrency>
  capital?: string[]
  region?: string
  subregion?: string
  languages?: Record<string, string>
  translations?: Record<string, IName>
  latlng?: number[]
  landlocked?: boolean
  borders?: string[]
  area?: number
  demonyms?: Record<string, IDemonyms>
  flag?: string
  map?: IMap
  population?: number
  gini?: Record<string, number>
  fifa?: string
  car?: ICar
  timezones?: string[]
  continents?: string[]
  coatOfArms?: ICoatOfArms
  startOfWeek?: string
  capitalInfo?: ICapitalInfo
  postalCode?: IPostalCode
}
