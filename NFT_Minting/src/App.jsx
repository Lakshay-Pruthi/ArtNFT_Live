import './App.css'


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './Pages/Main';
import About from './Pages/About';
import Home from './Pages/Home';
import MyNFT from './Pages/MyNFT';





function App() {


  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} >
            <Route index element={<Home />} />
            <Route path='About' element={<About />} />
            <Route path='MyNFT' element={<MyNFT />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
