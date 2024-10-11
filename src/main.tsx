import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WeatherDashboard from './WeatherDashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherDashboard />
  </StrictMode>,
)
