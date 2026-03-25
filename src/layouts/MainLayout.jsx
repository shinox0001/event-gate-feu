import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-between items-center">
        <main className="w-full max-w-7x1"> {children}</main>
      </div>
      <Footer />

    </div>


  );
};

export default MainLayout;