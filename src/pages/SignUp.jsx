import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/icons/Card";
import SendIcon from "../components/icons/SendIcon";
import SignUpIcons from "../components/icons/SignUpIcon";
import { supabase } from "../utils/supabase";
import { SessionContext } from "../components/contexts/SessionContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate("/");
    }
  }, [session, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
      const formData = new FormData(event.target);
      const signupForm = {
        firstname: formData.get("firstname"),
        lastname: formData.get("lastname"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: signupForm.email,
      password: signupForm.password,
    });

    if (error) alert(signUpError);

    if (signUpData) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: signUpData.user.id,
          firstname: signupForm.firstname,
          lastname: signupForm.lastname,
          email: signupForm.email,
        });
      if (profileError) alert(profileError);
      if (profileData) console.log("Profile created", profileData);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          

          <h1 className="text-xl font-bold mb-4 flex justify-center">
            Create an Account
          </h1>
          <form onSubmit={handleSubmit}>
            <Input
              name="firstname"
              placeholder="Enter your First Name"
              label="First Name"
              type="text"
            />
            <Input
              name="lastname"
              placeholder="Enter your Last Name"
              label="Last Name"
              type="text"
            />
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
            <div className="flex justify-center">
              <button className="btn btn-primary mt-4">
                <SendIcon />
                Create Account
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </MainLayout>
  );
};

export default SignUp;