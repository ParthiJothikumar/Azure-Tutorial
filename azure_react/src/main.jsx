import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import './index.css'
import App from './App.jsx'
import {store,persistor} from './redux/app/store.js'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // </StrictMode>,
)
