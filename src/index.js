import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.min.css';
import { ContextProvider } from './contexts/ContextProvider';

import './index.css';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';


ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <ContextProvider>
                <App />
            </ContextProvider>,
        </AuthContextProvider>
    </React.StrictMode>,
    
    document.getElementById('root')

);