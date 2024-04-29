import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [user,setUser]=useState(setUser(localStorage.getItem("user")));
  function getOrders() {
    fetch("https://database-backend-vert.vercel.app/admin")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        let a,b;
        let orderData,old=orders;
        JSON.parse(data).map(item=>(
           a= '['+String(Object.values(item)).substring(1,String(Object.values(item)).length-1)+'"]',
           b=a.slice(0,a.lastIndexOf(",")+1)+'"'+a.slice(a.lastIndexOf(",")+1),
           orderData=JSON.parse(b),
            old=[...old,{id:orderData[0],status:orderData[1],items:[orderData[2]],totalPrice:orderData[3],adress:orderData[4]}]
        ))
            setOrders(old)
  
      });
  }
  
  function updateClient(id,status) {
    fetch(`https://database-backend-vert.vercel.app/admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status}),
    })
      .then((response) => {
        return response.text();
      });
  }
    const handleAcceptOrder = (orderId) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: 1 };
            }
            return order;
        });
        updateClient(orderId,1);
        setOrders(updatedOrders);
    };

    const handleUpdateStatus = (orderId, newStatus) => {
        const updatedOrders = orders.map(order => {
            if (order.id === orderId) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        updateClient(orderId,newStatus);
        setOrders(updatedOrders);

    };
    useEffect(() => {
        setUser(localStorage.getItem("user"));
        console.log(user);
    getOrders()
    }, [])
    
    if(user==1){
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {orders.map(order => (
                        <div key={order.id} className="bg-white shadow-md p-4 rounded-lg">
                            <h2 className="text-xl font-bold">Order #{order.id}</h2>
                            <h3 className="text-xl font-bold to-blue-950" >Adress: {order.adress}</h3>
                            
                            <ul className="list-disc list-inside">
                                {order.items.map(item => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <p>Total Price: ${order.totalPrice}</p>
                            {order.status == 0 && (
                                <>
                                    <button onClick={() => handleAcceptOrder(order.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                        Accept Order
                                    </button>
                                    <button onClick={() => handleUpdateStatus(order.id, -1)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                                        Cancel Order
                                    </button>
                                </>
                            )}
                            {order.status == 1 && (
                                <button onClick={() => handleUpdateStatus(order.id, 2)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    Mark as Out for Delivery
                                </button>
                            )}
                            {order.status == 2 && (
                                <button onClick={() => handleUpdateStatus(order.id, 3)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    Mark as Delivered
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );}
    else{
        return( <>
        <section className="relative z-10 bg-primary py-[120px]">
          <div className="container mx-auto">
            <div className="-mx-4 flex">
              <div className="w-full px-4">
                <div className="mx-auto max-w-[400px] text-center">
                  <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                    401
                  </h2>
                  <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                  UNAUTHORIZED
                  </h4>
                  <p className="mb-8 text-lg text-white">
                    The page you are looking for needs special credentials
                  </p>
                  <Link
                    to={"/"}
                    className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary"
                  >
                    Go To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
  
          <div className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-between space-x-5 md:space-x-8 lg:space-x-14">
            <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
            <div className="flex h-full w-1/3">
              <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
              <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]"></div>
            </div>
            <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]"></div>
          </div>
        </section>
      </>)
    }
}
