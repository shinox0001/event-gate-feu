import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/icons/Card";
import SendIcon from "../components/icons/SendIcon";
import { supabase } from "../utils/supabase";
import LoginIcon from "../components/icons/LoginIcon";
import { useContext, useEffect } from "react";
import { SessionContext } from "../components/contexts/SessionContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { profile } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile?.role === "user") {
      navigate("/");
    }
    else if (profile?.role === "admin") {
      navigate("/ManageEvents");
    }


  }, [profile, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginForm = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (error) alert(error);
    if (data) console.log(data);
  };


  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

          <h1 className="text-xl font-bold mb-4">Log in to Your Account</h1>
          <form onSubmit={handleSubmit}>
            <Input
              name="email"
              placeholder="Enter your Email"
              label="Email"
              type="email"
            />
            <Input
              name="password"
              placeholder="Enter your Password"
              label="Password"
              type="password"
            />

            <button className="btn btn-primary mt-4">
              <LoginIcon className="stroke-2" />
              LOGIN
            </button>
          </form>
        </fieldset>
      </div>
    </MainLayout>
  );
};
export default Login;