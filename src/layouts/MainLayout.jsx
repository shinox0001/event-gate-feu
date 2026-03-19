import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div>
        <NavBar />
        <div className="max-w-7xl w-full mx-auto flex flex-col min-h-screen">
            <main className=""> {children}</main>
        </div>   
        <Footer />

    </div>
    
    
  );
};

export default MainLayout