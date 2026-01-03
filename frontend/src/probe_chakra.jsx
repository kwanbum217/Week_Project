import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Chakra from '@chakra-ui/react';

console.log("Chakra Exports:", Object.keys(Chakra));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div style={{ padding: 20 }}>
        <h1>Chakra Exports Probe</h1>
        <pre>{JSON.stringify(Object.keys(Chakra), null, 2)}</pre>
    </div>
);
