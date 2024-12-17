
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
// import ShopCategory from './Pages/ProductList';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'
import ProductList from './Pages/ProductList';
import ProductDisplay from './Components/ProductDisplay/ProductDisplay';
import Profile from './Pages/Profile';
import Orders from './Pages/Orders';
import Auth from './utils/PhoneAuth'
import PhoneAuth from './utils/PhoneAuth';

export const backend_url = "http://localhost:5000";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path='/groceries' element={<ProductList banner={men_banner} category="Groceries" items="QUALITY"/>}/>
        <Route path='/fruits' element={<ProductList banner={women_banner} category="Fruits" items="FRESH"/>}/>
          <Route path='/vegetables' element={<ProductList banner={kid_banner} category="Vegetables" items="FRESH" />} />
          {/* <Route path="/vegetables/:category/:id" element={<ProductDisplay />} />
        <Route path="/products/product/:productId" element={<Product/>}/> */}
          
          {/* Dynamic route for category lists */}
          <Route path="/:category" element={<ProductList />} />

          {/* Dynamic route for product details */}
          <Route path="/:category/:productId" element={<Product />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<PhoneAuth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
