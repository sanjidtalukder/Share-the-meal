import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';


const MyProfile = () => {
  const { user } = useContext(AuthContext); // or your custom hook

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">My Profile</h2>
        <img src={user?.photoURL} alt="Profile" className="w-24 rounded-full" />
        <p>Name: {user?.displayName}</p>
        <p>Email: {user?.email}</p>
        {user?.role && user.role !== 'user' && <p>Role: {user.role}</p>}
      </div>
    </div>
  );
};

export default MyProfile;
