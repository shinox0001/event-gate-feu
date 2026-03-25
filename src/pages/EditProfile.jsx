import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";
import Card from "../components/icons/Card";
import SendIcon from "../components/icons/SendIcon";
import { supabase } from "../utils/supabase";
import { useContext } from "react";
import { SessionContext } from "../components/contexts/SessionContext";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const { session, profile, setProfile } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const signupForm = {
      firstname: formData.get("firstname"),
      lastname: formData.get("lastname"),
      email: formData.get("email"),
    };

    const { data: profileData, error: profileError } = await supabase
      .from("Profile")
      .update({
        firstname: signupForm.firstname,
        lastname: signupForm.lastname,
        email: signupForm.email,
      })
      .eq("id", session.user.id)
      .select()
      .single();

    if (profileError) alert(profileError);
    if (profileData) {
      navigate("/profile");
      setProfile(profileData);
    }
  };

  console.log("profile from edit profile", profile);

  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="flex justify-center items-center flex-1">
          <Card>
            <h1 className="text-xl font-bold">Edit Profile</h1>
            <form onSubmit={handleSubmit}>
              <Input
                name="firstname"
                placeholder="Enter your First Name"
                label="Firstname"
                type="text"
                defaultValue={profile?.firstname}
              />
              <Input
                name="lastname"
                placeholder="Enter your Last Name"
                label="Lastname"
                type="text"
                defaultValue={profile?.lastname}
              />
              <Input
                name="email"
                placeholder="Enter your Email"
                label="Email"
                type="email"
                defaultValue={profile?.email}
              />
              <button className="btn btn-primary rounded-full mt-5">
                <SendIcon className="text-sm" /> Submit
              </button>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProfile;