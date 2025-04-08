import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Background from './pages/Background.jsx'
createRoot(document.getElementById('root')).render(
    <Background>
        <App />
    </Background>
)
