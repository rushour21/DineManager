import { useEffect, useState } from 'react';
import axios from 'axios';
import { GiHamburger, GiFullPizza, GiFrenchFries, GiFruitBowl } from "react-icons/gi";
import { RiDrinks2Line } from "react-icons/ri";
import "../styles/menulist.css"

function Menulist() {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Pizza');

  const categories = [
    { name: 'Burger', icon: <GiHamburger size={20} /> },
    { name: 'Pizza', icon: <GiFullPizza size={20} /> },
    { name: 'Drink', icon: <RiDrinks2Line size={20} /> },
    { name: 'French Fries', icon: <GiFrenchFries size={20} /> },
    { name: 'Veggies', icon: <GiFruitBowl size={20} /> },
  ];

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="admin-dashboard">
      <h2 className="admin-heading">Menu Management</h2>
      
      <div className="app-menu-list">
        {categories.map(({ name, icon }) => (
          <div
            key={name}
            className={`app-menu ${selectedCategory === name ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(name)}
          >
            <div className="icon">{icon}</div>
            <p>{name}</p>
          </div>
        ))}
      </div>

      <p className='sel-cat'>{selectedCategory}</p>

      <div className="menu-grid">
        {filteredItems.length === 0 ? (
          <p>No items found in {selectedCategory}</p>
        ) : (
          filteredItems.map((item, index) => (
            <div key={index} className="menu-card">
              <div 
                className='item-image' 
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              ></div>
              <div className="card-details">
                <p style={{ fontSize: "14px", fontWeight: '500' }}>{item.name}</p>
                <p>₹ {item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Menulist;
