import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { GiHamburger, GiFullPizza, GiFrenchFries, GiFruitBowl } from "react-icons/gi";
import { RiDrinks2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa6";
import Proceed from './component/peoceed.jsx';
function App() {
  const [greeting, setGreeting] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Pizza');
  const [menuItems, setMenuItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState({});
  const [proceed, setProceed] = useState(false); // Track quantities for each item

  const categories = [
    { name: 'Burger', icon: <GiHamburger size={20} /> },
    { name: 'Pizza', icon: <GiFullPizza size={20} /> },
    { name: 'Drink', icon: <RiDrinks2Line size={20} /> },
    { name: 'French Fries', icon: <GiFrenchFries size={20} /> },
    { name: 'Veggies', icon: <GiFruitBowl size={20} /> }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    if (hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  useEffect(() => {
    setGreeting(getGreeting());
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/menu`);
        setMenuItems(response.data);
        console.log('Menu items:', response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchMenuItems();
  }, []);

  const filteredItems = menuItems
    .filter(item => item.category === selectedCategory)
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Add item quantity
  const addItem = (itemId) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  // Decrease item quantity
  const decreaseItem = (itemId) => {
    setQuantities(prev => {
      const newQuantity = (prev[itemId] || 0) - 1;
      if (newQuantity <= 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: newQuantity
      };
    });
  };

  const selectedItems = menuItems
  .filter(item => quantities[item._id])
  .map(item => ({
    ...item,
    quantity: quantities[item._id],
    total: item.price * quantities[item._id]
  }));

  console.log('Quantities:', quantities);

  return (
    <div className="app">
      <div className="app-header">
        <p style={{fontSize: '22px' }}>{greeting}</p>
        <p>Place your order here</p>
      </div>

      <div className="app-searchbar">
        <IoSearch size={24} color='#A8A8A8'/>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {!proceed && <><div className="app-menu-list">
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
          <p>No items found for "{searchTerm}" in {selectedCategory}</p>
        ) : (
          filteredItems.map((item, index) => (
            <div key={index} className="menu-card">
              <div 
                className='item-image' 
                style={{backgroundImage: `url(${item.imageUrl})`}}
              ></div>
              <div className="card-details">
                <p style={{ fontSize: "14px", fontWeight:'500'}} className="item-name">{item.name}</p>
                <div className="price-add">
                  <p>₹ {item.price}</p>
                  {quantities[item._id] ? (
                    <div className="quantity-controls">
                      <button 
                        className="btn"
                        onClick={() => decreaseItem(item._id)}
                      >
                        <FaMinus size={10}/>
                      </button>
                      <span className="quantity">{quantities[item._id]}</span>
                      <button 
                        className="btn"
                        onClick={() => addItem(item._id)}
                      >
                        <FaPlus size={10}/>
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="add-btn"
                      onClick={() => addItem(item._id)}
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        className="next-btn"
        disabled={selectedItems.length === 0}
        onClick={() => setProceed(true)}
      >
        Next
      </button>
      </>}

      {proceed && <Proceed 
        selectedItems={selectedItems} 
        addItem={addItem} 
        decreaseItem={decreaseItem} 
        goBack={() => setProceed(false)} 
      />
      }
    </div>
  );
}

export default App;