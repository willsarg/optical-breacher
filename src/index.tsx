import { lazy, Suspense } from 'react'
import { render } from 'react-dom'
import { ErrorBoundary } from './error-boundary'
import './main.css'

const App = lazy(() => import('./app'))

if (
  'serviceWorker' in navigator &&
  process.env.NODE_ENV === 'production' &&
  window.isSecureContext
) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .catch(error => {
        console.warn('Service worker registration failed', error)
      })
  })
}

const fallback = (
  <div
    style={{
      height: '100%',
      fontSize: '1.2em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    INITIALIZING...
  </div>
)

render(
  <ErrorBoundary>
    <Suspense fallback={fallback}>
      <App />
    </Suspense>
  </ErrorBoundary>,
  document.getElementById('root')!
)
