import React from 'react'
import Navbar from './components/Navbar'
import CoinTable from './components/CoinTable'
import Top from './pages/Top'
import Trending from './pages/Trending'
import SavedCoin from './pages/SavedCoin'
import { BrowserRouter as Router , Route,Routes } from 'react-router'
const App = () => {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
        <Route path='/' element={<CoinTable/>}>
          <Route path= 'top' element={<Top/>}/>
          <Route path='trending' element={<Trending/>}/>
          <Route path='savedcoins' element={<SavedCoin/>}/>
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App