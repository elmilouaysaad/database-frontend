import React from 'react';

export function Welcome({loginClient,signUp}) {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-8">
                <h1 className="text-3xl font-bold text-center mb-8">Welcome to Sweet Scoops Ice Cream Shop!</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Explore Our Flavors</h2>
                        <ul className="list-disc list-inside">
                            <li>Classic Vanilla</li>
                            <li>Decadent Chocolate</li>
                            <li>Refreshing Strawberry</li>
                            <li>Unique Specials</li>
                        </ul>
                        <h2 className="text-2xl font-bold mt-8 mb-4">Visit Us</h2>
                        <ul className="list-disc list-inside">
                            <li>Find our shop location</li>
                            <li>Check our opening hours</li>
                            <li>Contact us for special events</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Order Online</h2>
                        <p className="mb-4">Browse our menu and customize your order. Enjoy delivery or pickup options!</p>
                        <div className="flex justify-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={loginClient}>Login</button>
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={signUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
                <h2 className="text-2xl font-bold mt-8 mb-4">Discover Our Story</h2>
                <p className="mb-8">Learn about our passion for ice cream, meet our team, and find out how we create our delicious flavors!</p>
                <h2 className="text-2xl font-bold mb-4">Follow Us on Social Media</h2>
                <p className="mb-8">Stay updated with our latest flavors and offers, join our ice cream community, and share your Sweet Scoops experience!</p>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <ul>
                    <li>Phone: 123-456-7890</li>
                    <li>Email: info@sweetscoops.com</li>
                    <li>Visit us at: 123 Main Street, Anytown, USA</li>
                </ul>
            </div>
            <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 
    
        AUI || Made for database Class by Saad Elmilouay, Younes Mellouk, Ahmed Taha Baitou, Omar Lhoumadi
    </span>
        
        </div>
        </footer>
        </div>
    );
}

