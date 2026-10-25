import './style.css'
import type { CombinedWeatherData } from './types/weather'
import { searchWeather } from './services/openMeteo'
import { getWeatherDescription } from './utils/weatherCode'
import { getWindDirection } from './utils/windDirection'
import moonIcon from './assets/moon.svg'
import sunIcon from './assets/sun.svg'

const searchForm = document.querySelector<HTMLFormElement>('#search-form')
const cityInput = document.querySelector<HTMLInputElement>('#city-input')
const searchButton = document.querySelector<HTMLButtonElement>('#search-button')
const emptyState = document.querySelector<HTMLElement>('#empty-state')
const loadingState = document.querySelector<HTMLElement>('#loading-state')
const cardContent = document.querySelector<HTMLElement>('#card-content')
const temperature = document.querySelector<HTMLElement>('#sidebar-temperature')
const location = document.querySelector<HTMLElement>('#sidebar-location')
const date = document.querySelector<HTMLElement>('#sidebar-date')
const dayNight = document.querySelector<HTMLElement>('#daynight-text')
const dayNightIcon = document.querySelector<HTMLImageElement>('#daynight-icon')
const condition = document.querySelector<HTMLElement>('#sidebar-condition')
const humidity = document.querySelector<HTMLElement>('#humidity-value')
const apparentTemperature = document.querySelector<HTMLElement>('#apparent-temperature-value')
const precipitation = document.querySelector<HTMLElement>('#precipitation-value')
const wind = document.querySelector<HTMLElement>('#wind-value')

if (
  !searchForm ||
  !cityInput ||
  !searchButton ||
  !emptyState ||
  !loadingState ||
  !cardContent ||
  !temperature ||
  !location ||
  !date ||
  !dayNight ||
  !dayNightIcon ||
  !condition ||
  !humidity ||
  !apparentTemperature ||
  !precipitation ||
  !wind
) {
  throw new Error('Elementos necessários da interface de clima não encontrados.')
}

const requiredEmptyState = emptyState
const requiredLoadingState = loadingState
const requiredCardContent = cardContent
const requiredCityInput = cityInput
const requiredSearchButton = searchButton
const sidebarElements = { temperature, location, date, dayNight, dayNightIcon, condition }
const metricElements = { humidity, apparentTemperature, precipitation, wind }

type UiState = 'empty' | 'loading' | 'result'

function renderWeatherData(data: CombinedWeatherData): void {
  sidebarElements.temperature.textContent = `${data.current.temperature_2m}${data.current_units.temperature_2m}`
  sidebarElements.location.textContent = `${data.name}, ${data.country_code}`
  sidebarElements.date.textContent = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: data.timezone,
  }).format(new Date())
  const isDay = data.current.is_day === 1
  sidebarElements.dayNight.textContent = isDay ? 'Dia' : 'Noite'
  sidebarElements.dayNightIcon.src = isDay ? sunIcon : moonIcon
  sidebarElements.condition.textContent = getWeatherDescription(data.current.weather_code)
  metricElements.humidity.textContent =
    `${data.current.relative_humidity_2m}${data.current_units.relative_humidity_2m}`
  metricElements.apparentTemperature.textContent =
    `${data.current.apparent_temperature}${data.current_units.apparent_temperature}`
  metricElements.precipitation.textContent =
    `${data.current.precipitation_probability}${data.current_units.precipitation_probability}`
  metricElements.wind.textContent =
    `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m} - ` +
    `${data.current.wind_direction_10m}° (${getWindDirection(data.current.wind_direction_10m)})`
}

function setUiState(state: UiState): void {
  requiredEmptyState.classList.toggle('is-hidden', state !== 'empty')
  requiredLoadingState.classList.toggle('is-hidden', state !== 'loading')
  requiredCardContent.classList.toggle('is-hidden', state !== 'result')
  requiredLoadingState.setAttribute('aria-busy', String(state === 'loading'))
  requiredCityInput.disabled = state === 'loading'
  requiredSearchButton.disabled = state === 'loading'
}

setUiState('empty')

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault()

  const cityName = cityInput.value.trim()
  if (!cityName) {
    return
  }

  setUiState('loading')

  try {
    const weather = await searchWeather(cityName)
    if (weather) {
      renderWeatherData(weather)
    }
    setUiState(weather ? 'result' : 'empty')
  } catch (error) {
    console.error('Não foi possível concluir a busca do clima.', error)
    setUiState('empty')
  }
})
