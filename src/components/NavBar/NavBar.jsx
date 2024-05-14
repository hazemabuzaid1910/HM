import './NavBar.css'
import { FaHome } from 'react-icons/fa';
import { MdHotel } from 'react-icons/md';
import { FaPlane } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';
import { IoSettings } from "react-icons/io5";
import { IoLanguageSharp } from "react-icons/io5";
import { useState } from 'react';


const NavBar = () => {
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const toggleLanguageDropdown = () => {
    setShowLanguageDropdown(!showLanguageDropdown);
  };
  const [showLanguage, setShowLanguage] = useState(false);

  const toggleLanguage = () => {
    setShowLanguage(!showLanguage);
  };

  return (
    <div className='NavBar'>
      <ul>
      <li >
          <FaHome className="nav-icon" /> Home
        </li>
        <li>
          <MdHotel className="nav-icon" /> Hotel
        </li>
        <li>
          <FaPlane className="nav-icon" /> Flights
        </li>
        <li>
          <FaCar className="nav-icon" /> Car rental
        </li>
        <li>
          <FaCar className="nav-icon" /> Activites
        </li>
        <hr />
        <li onClick={toggleLanguageDropdown}>
          <IoSettings className="nav-icon" /> Setting
        </li>
        
        {showLanguageDropdown && (
       <li  className='language' onClick={toggleLanguage}>
        
          <IoLanguageSharp className="nav-icon" /> Language
          
    
    
        </li>
        
        )}
              {showLanguage && (
              <li className="language-dropdown" >
              <select>
                <option value="En">En</option>
                <option value="Ar">Ar</option>
              </select>
    
        </li>

        )}
    
  

   
    
      
    
       
     
      </ul>
    </div>
  )
}

export default NavBar
/*{showLanguageDropdown && (
  <li className="language-dropdown"onClick={toggleLanguage}>
  <IoLanguageSharp className="nav-icon" /> Language
  {showLanguage && (
      <li className="language-dropdown">
        <select>
          <option value="En">En</option>
          <option value="Ar">Ar</option>
        </select>
      </li>
    )}
</li>
  
)}*/