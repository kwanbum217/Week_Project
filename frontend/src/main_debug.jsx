import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import App from './App.jsx'

console.log("Main Debug: React + Chakra + App imports success");
console.log("defaultSystem:", defaultSystem);

try {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <ChakraProvider value={defaultSystem}>
            <h1>Main Debug: React + Chakra Works. App imported.</h1>
        </ChakraProvider>
    );
    console.log("Main Debug: Rendered React + Chakra");
} catch (e) {
    console.error("Main Debug Error", e);
}
