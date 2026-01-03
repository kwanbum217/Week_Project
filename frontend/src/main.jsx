import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { Toaster } from '@chakra-ui/react'
import { toaster } from './utils/chakra-toaster'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider value={defaultSystem}>
    <Toaster toaster={toaster} />
    <App />
  </ChakraProvider>,
)

