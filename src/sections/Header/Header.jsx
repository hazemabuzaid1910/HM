import './Header.css';
import image2 from './../../assets/image_profile.svg';
import image1 from './../../assets/logo.svg';
import {  FaMoon } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
const Header = () => {

  return (
    <div className='header'>
      <div className='logo'>
      <img  src={image1} alt="" />
      </div>
      
      <div className='search'>
        <input type="text" placeholder='search'/>
        <FaSearch className='search-icon'/>
      </div>
     <ul>
        <button className='button-theme'><FaMoon size={30}/></button>
        <IoNotifications size={30} color="yellow"/>
        <div className="profile-image">
         <img src={image2} alt="" />
        </div>
        
     </ul>

    </div>
  )
}

export default Header
