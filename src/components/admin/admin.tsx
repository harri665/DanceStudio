import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../root/Main';
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';
import AdminPannel from './AdminPannel';
import JsonEdit from './JsonEdit';

const SignInButton = () => (
  <button onClick={() => signInWithRedirect(auth, new GoogleAuthProvider())}>Sign in with Google</button>
);

const SignOutButton = () => auth.currentUser && <button className= "mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"onClick={() => signOut(auth)}>Sign Out</button>;




const ProtectedComponent: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!user) {
    return <SignInButton />;
  }

  return (
    <div>
      <div>Welcome, {user.displayName}! You are now signed in.</div>
      <SignOutButton/>
      {/* Place the content you want to protect here */}
      <AdminPannel />
      <JsonEdit/>
    </div>
  );
};

export default ProtectedComponent;
