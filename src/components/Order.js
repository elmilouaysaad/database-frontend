import {Link, useParams} from "react-router-dom";
import React, { useState, useEffect } from 'react';
export function Order({signOut}) {
    const [iceCream, setIceCream] = useState(null);
    const [address, setAddress] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [order, setOrder] = useState();
    const [pass,setPass]=useState(0);
    const {id} = useParams();
    const [focused, setFocused] = useState(false);
    const [cId,setCID]=useState(0);
    const handleFocus = () => {
      setFocused(true);
    };
  
    const handleBlur = () => {
      setFocused(false);
    };
    useEffect(() => {
        // Simulating fetching ice cream details from an API
        const fetchIceCreamDetails = async () => {
            try {
                // Replace this with actual API call to fetch ice cream details
                const flavors = [
                    { id: 1, name: 'Classic Vanilla', description: 'Smooth and creamy vanilla ice cream.',price:"12" },
                    { id: 2, name: 'Decadent Chocolate', description: 'Rich and indulgent chocolate ice cream.',price:"10" },
                    { id: 3, name: 'Refreshing Strawberry', description: 'Fresh and fruity strawberry ice cream.',price:"15" },
                    { id: 4, name: 'Caramel Swirl', description: 'Creamy caramel ice cream with a caramel swirl.',price:"22" },
                    { id: 5, name: 'Mint Chocolate Chip', description: 'Refreshing mint ice cream with chocolate chips.',price:"32" },
                    { id: 6, name: 'Cookie Dough', description: 'Vanilla ice cream with chunks of cookie dough.',price:"8" },
                ];
                const response = flavors[id-1];
                //const data = await response.json();
                const data= response;
                setIceCream(data);
            } catch (error) {
                console.error('Error fetching ice cream details:', error);
            }
        };

        fetchIceCreamDetails();
    }, [id]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };


    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit order logic here
        console.log('Order submitted');
    };
useEffect(()=>{
        setOrder(localStorage.getItem("order"));
        setPass(localStorage.getItem("pass"));
        setCID(localStorage.getItem("user"));
    },[]);
    

    function placeOrder(address,quantity,name,total) {
        const id =localStorage.getItem("user");
      fetch(`https://database-backend-vert.vercel.app/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, address, quantity, name, total }),
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
            localStorage.setItem("order",data);
            setOrder(order);
          console.log(data)
        });
    }
    if (!iceCream) {
        return <div>Loading...</div>;
    }
    if(id==cID){
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-8">
            <div className="flex justify-end mb-4">
            <Link  className="text" to={`/`}>
          <button
            onClick={signOut}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button></Link>
        </div>
                <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
                <h2 className="text-2xl font-bold mb-4">{iceCream.name}</h2>
                <p className="mb-4">Price per scoop: ${iceCream.price}</p>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                    <div className="mb-4">
                        <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address:</label>
                        <input
                            type="text"
                            id="address"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-${focused ? 'white' : 'gray-700'} leading-tight focus:outline-none focus:shadow-outline bg-gray-800`}
                            value={address}
                            onChange={handleAddressChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="Enter your adress here"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paymentMethod" className="block text-lg font-medium text-gray-700">Payment Method:</label>
                        
                            <span value="cash">Cash on Delivery</span>
                    </div>
                    <div className="mb-4">
                        <p className="text-lg font-medium text-gray-700">Total Price: ${quantity?iceCream.price * quantity: 0 }</p>
                    </div>
                    <div className="text-center">
                    {(!isNaN(quantity) && address!=="") && (pass<1)&&
                            
                        <button onClick={()=>{placeOrder(address,quantity,iceCream.name,iceCream.price * quantity);setPass(1);localStorage.setItem("pass",1)}} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Place Order
                        </button>
                    }{(pass>0)&&
                            
                    <span className="absolute bottom-0 right-0 p-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Order placed
                    </span>
                }
                    {((pass>0)) &&
                        <Link  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"  to={`/status/${parseInt(order)+1}`}>
                            <button onClick={()=>{setPass(0);localStorage.setItem("pass",0)}}>
                            check status of order</button>
                        </Link>
                    }
                    </div>
                </form>
            </div>
        </div>
    );} else{
        return( 
            <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div class="rounded-lg bg-white p-8 text-center shadow-xl">
              <h1 class="mb-4 text-4xl font-bold">401</h1>
              <p class="text-gray-600">Oops! The page you are looking for has special crediantials.</p>
            </div>
          </div>
  )
    }
}