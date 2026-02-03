import { Route, Routes } from "react-router-dom";
import "./App.css";

import AdminPannel from "./Admin/AdminPannel";
import CustomerRoutes from "./Routers/CustomerRoutes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./Redux/Auth/Action";
// import Routers from './Routers/Routers';

function App() {
  const { auth } = useSelector(store => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, dispatch]);
  return (
    <div className="">
      <Routes>

        <Route path="/*" element={<CustomerRoutes />} />
        {auth.user?.role === "ROLE_ADMIN" && <Route path="/admin/*" element={<AdminPannel />} />}
      </Routes>
    </div>
  );
}

export default App;
