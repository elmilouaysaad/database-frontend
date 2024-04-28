//import logo from './logo.svg';
import "./App.css";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home.js";
import { Order } from "./components/Order.js";
import { Status } from "./components/Status.js";
import { AdminDashboard } from "./components/Admin.js";

function App() {
  const [clients, setClients] = useState(false);
  const [user, setUser] = useState(false);

  function getClients() {
    fetch("https://database-backend-vert.vercel.app")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setClients(data);
      });
  }

  function createClient() {
    let name = prompt("Enter client name");
    let email = prompt("Enter client email");
    let password = prompt("Enter client password");
    fetch("https://database-backend-vert.vercel.app/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data > 0) {
          setUser(parseInt(data));
          localStorage.setItem("user", data);
        }
      });
  }

  function deleteClient() {
    let id = prompt("Enter client id");
    fetch(`https://database-backend-vert.vercel.app/clients/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getClients();
      });
  }

  function updateClient() {
    let id = prompt("Enter client id");
    let name = prompt("Enter new client name");
    let email = prompt("Enter new client email");
    fetch(`https://database-backend-vert.vercel.app/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getClients();
      });
  }
  function loginClient() {
    let email = prompt("Enter your email");
    let password = prompt("Enter password");
    fetch(`https://database-backend-vert.vercel.app/clients/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data > 0) {
          setUser(parseInt(data));
          localStorage.setItem("user", data);
        }
      });
  }
  function signOut() {
    localStorage.setItem("user", -1);
    setUser(-1);
  }
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        
      <Route path="/" element={<Home user={user} loginClient={loginClient} signUp={createClient} signOut={signOut}></Home>}/>
      <Route path={`/order/:id`}  element={<Order signOut={signOut} />} />
      <Route path="/status/:id" element={<Status/>}/>
      <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>

    </BrowserRouter>
  );
}
export default App;
