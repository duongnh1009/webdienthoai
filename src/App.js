import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux-setup/store';

//import Layouts
import Footer from './shared/components/Layouts/Footer';
import Header from './shared/components/Layouts/Header';
import Menu from './shared/components/Layouts/Menu';
import Sidebar from './shared/components/Layouts/Sidebar';
import Slider from './shared/components/Layouts/Slider';

//import Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetails';
import Sucsess from './pages/Sucsess';
import Search from './pages/Search';
import Notfound from './pages/NotFound';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          <div id="body">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <Menu />
                </div>
              </div>

              <div className="row">
                <div id="main" className="col-lg-8 col-md-12 col-sm-12">
                  <Slider />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category-:id" element={<Category />} />
                    <Route path="/productdetail-:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/success" element={<Sucsess />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="*" element={<Notfound />} />
                  </Routes>
                </div>

                <Sidebar />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
