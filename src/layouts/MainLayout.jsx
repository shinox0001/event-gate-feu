import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div>
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80rem)] border-0">
            <main className=""> {children}</main>
        </div>   
        <Footer />

    </div>
    
    
  );
};

export default MainLayout;