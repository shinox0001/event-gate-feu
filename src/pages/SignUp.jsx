import React from 'react'
import MainLayout from '../layouts/MainLayout';
import Input from '../components/form/input';
import Card from '../components/icons/Card';
import SendIcon from '../components/icons/SendIcon';
import { supabase } from '../utils/supabase';

const SignUp = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const signupform = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      password: formData.get('password'), 
    }; 
    const { data, error } = await supabase.auth.signUp({
  email: signupform.email,
  password: signupform.password,
});
if (error) {
  console.error("Error signing up:", error.message);
} else {
  console.log("User signed up successfully:", data);
}
  };
    
  

  return (
    <MainLayout>
      
      <div className="flex flex-col gap-1 border-2 p-4 rounded-xl">
        <span className="text-center text-2xl">CERTIFIED YOUNG STUNNA SIGN UP</span> 
        <div>
          <Card>
            <form onSubmit={handleSubmit}>
              <Input name="firstname" 
            placeholder="Enter your First Name, ya" 
            type="Firstname" 
            label="FirstName" 
            />

            <Input name="lastname" 
            placeholder="Enter your Last Name, ya" 
            type="Lastname" 
            label="LastName" 
            />

            <Input name="email" 
            placeholder="Enter your Email, ya" 
            type="email" 
            label="Email" 
            />

            <Input name="password" 
            placeholder="Enter your Password, ya" 
            type="password" 
            label="Password" 
            />  

            <div className="text-center">
          
          
          <button className="btn btn-primary mt-4">
            <SendIcon />
            BECOME A YOUNG STUNNA!!
            </button>
        </div>
            </form>
          </Card>
        </div>

    
        
      </div>

       
    </MainLayout>

  );
};

export default SignUp;
