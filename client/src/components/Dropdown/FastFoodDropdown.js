import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { Link } from 'react-router-dom';
import '../../styles/FastFoodDropdown.css';

function FastFoodDropdown({enterFoodDropdown, exitFoodDropdown}) {
  {/* Functions handling click */}
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
      <ul
        onClick={handleClick}
        className={click ? 'Dropdown-Menu clicked' : 'Dropdown-Menu'}
        onMouseEnter={enterFoodDropdown} 
        onMouseLeave={exitFoodDropdown}
        >  

         {/* First launch will not include */}
         
         <h1 style={{justifyContent:'center'}}>coming soon!</h1>

      </ul>
  );
}

export default FastFoodDropdown;
