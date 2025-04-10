// App.js
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import Navbar from './components/Navbar'
import CoinTable from './components/CoinTable'
import Trending from './pages/Trending'
import SavedCoin from './pages/SavedCoin'
import {store} from './app/store'
import { Provider } from 'react-redux'
import DetailsCryptoModal from './pages/DetailsCryptoModal'
const App = () => {
  return (
    <Provider store={store}>
      <Router>
          <Navbar />
            <Routes>
              <Route path="/" element={<CoinTable />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/savedcoins" element={<SavedCoin />} />
            </Routes>
            <DetailsCryptoModal />
      </Router>
    </Provider>
  )
}

export default App