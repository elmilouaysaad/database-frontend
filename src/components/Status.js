import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";

export function Status() {
  const {id} = useParams();
  const [orderStatus, setOrderStatus] = useState(0);
  localStorage.setItem("status",0);
  localStorage.setItem("pass",0);
  useEffect(() => {
    if (!isNaN(localStorage.getItem("status"))) {
      setOrderStatus(localStorage.getItem("status"));
    }
    getStatus();
  }, []);

  function getStatus() {
    const id = localStorage.getItem("order");
    fetch(`https://database-backend-vert.vercel.app//status/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        localStorage.setItem("status", data);
        setOrderStatus(data);
        console.log(data);
      });
  }
  function deleteOrder() {
    const id = localStorage.getItem("order");
    fetch(`https://database-backend-vert.vercel.app//orders/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then(() => {
        localStorage.setItem("status",-1);
        setOrderStatus(-1);
      });
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Order Status</h1>
        <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-lg">
          <p className="text-lg font-medium">Status for order {id}</p>
          {(orderStatus == 0) && (
            <p className="text-gray-700 mt-2">Your order is being processed.</p>
          )}
          {(orderStatus == 1) && (
            <p className="text-gray-700 mt-2">
              Your order is accepted.
            </p>
          )}
          {(orderStatus == 2) && (
            <p className="text-gray-700 mt-2">Your order is out for delivery.</p>
          )}
          {(orderStatus == 3) && (
            <p className="text-gray-700 mt-2">Your order has been delivered.</p>
          )}
          {(orderStatus != -1) && (
            <button
            onClick={() => deleteOrder()}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Cancel Order
          </button>
          )}
            <button
              onClick={() => getStatus()}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded mt-4"
            >
              Get status
            </button>
          {(orderStatus == -1) && (
            <p className="text-red-500 font-bold mt-4">
              Your order has been cancelled.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
