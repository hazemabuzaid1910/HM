import './App.css'
//import Login from './Pages/Login/Login'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
//import Home from './Pages/Home/Home';
//import Hotel_Dashboard from './Pages/Hotel_Dashboard/Hotel_Dashboard';
import Header from './sections/Header/Header'
import NavBar from './sections/NavBar/NavBar'
import Footer from './sections/Footer/Footer'


import Container from './sections/Container/Container'
import Container2 from './sections/Container2/Container2'
import Hotel_Dashboard from './Pages/Hotel/Hotel_Dashboard/Hotel_Dashboard'
import Add_Hotel from './Pages/Hotel/Add_Hotel/Add_Hotel';
import Home from './Pages/Home/Home';
import Hotel_Page from './Pages/Hotel/Hotel-Page/Hotel-Page';
import Add_Room from './Pages/Hotel/Add_Room/Add_Room';
import Car_rental from './Pages/Cars/Car_rental';
function App() {


  return (
    


<Router>
      <div>
        <Header />
        <Container>
          <NavBar />
          <Container2>
            
            <Routes>
            <Route path="/" element={<Home/>} />

            
            <Route path="/hotel-dashboad" element={<Hotel_Dashboard />} />

              <Route path="/add-hotel" element={<Add_Hotel />} />
              <Route path="/hotel-Page" element={<Hotel_Page/>} />
              <Route path="/add-room" element={<Add_Room />} />
               <Route path="/CarRental_dashboard" element={<Car_rental/>}/>
            
            </Routes>
          </Container2>
        </Container>
        <Footer />
      </div>
    </Router>
  )
}

export default App
/*   */ 