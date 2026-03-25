import Input from "../components/form/Input";
import MainLayout from "../layouts/MainLayout";
import SendIcon from "../components/icons/SendIcon";
import { supabase } from "../utils/supabase";
import { useContext, useState, useEffect } from "react";
import { SessionContext } from "../components/contexts/SessionContext";
import { useNavigate } from "react-router";

const EditProfile = () => {
  const session = useContext(SessionContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  useEffect(() => {
    if (session) {
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [session]);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    if (error) {
      alert('Error fetching profile: ' + error.message);
    } else if (data) {
      setProfile(data);
      setFormData({
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        email: data.email || '',
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', session.user.id);

    if (error) {
      alert('Update error: ' + error.message);
    } else {
      navigate('/Profile');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center min-h-screen">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h1 className="text-xl font-bold mb-4 flex justify-center">Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <Input
              name="firstname"
              placeholder="First Name"
              label="First Name"
              type="text"
              defaultValue={profile?.firstname}
            />
            <Input
              name="lastname"
              placeholder="Last Name"
              label="Last Name"
              type="text"
              defaultValue={profile?.lastname}
            />
            <Input
              name="email"
              placeholder="Email"
              label="Email"
              type="email"
              defaultValue={profile?.email}
            />
            <div className="flex justify-center">
              <button className="btn btn-primary mt-4">
                <SendIcon />
                Update Profile
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
