import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Products from "../pages/Products";
import UpdateProduct from "../pages/UpdateProduct";
import CreateProduct from "../pages/CreateProduct";
import Users from "../pages/Users";

const RouterMain = () => {
  const userData = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user);
  const admin = userData.currentUser.isAdmin
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        {admin && (
          <Route path="/" element={<App />}>
            <Route index element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/update-products/:id" element={<UpdateProduct />} />
            <Route path="/create-product" element={<CreateProduct />} />
          </Route>)
        }
      </Routes>
    </Router>
  );
};

export default RouterMain;