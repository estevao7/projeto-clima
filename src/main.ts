import './style.css'
import { searchWeather } from './services/openMeteo'

const searchForm = document.querySelector<HTMLFormElement>('#search-form')
const cityInput = document.querySelector<HTMLInputElement>('#city-input')
const searchButton = document.querySelector<HTMLButtonElement>('#search-button')
const emptyState = document.querySelector<HTMLElement>('#empty-state')
const loadingState = document.querySelector<HTMLElement>('#loading-state')
const cardContent = document.querySelector<HTMLElement>('#card-content')

if (!searchForm || !cityInput || !searchButton || !emptyState || !loadingState || !cardContent) {
  throw new Error('Elementos necessários da interface de clima não encontrados.')
}

const requiredEmptyState = emptyState
const requiredLoadingState = loadingState
const requiredCardContent = cardContent
const requiredCityInput = cityInput
const requiredSearchButton = searchButton

type UiState = 'empty' | 'loading' | 'result'

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
    setUiState(weather ? 'result' : 'empty')
  } catch (error) {
    console.error('Não foi possível concluir a busca do clima.', error)
    setUiState('empty')
  }
})
