import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {Store} from "react-notifications-component";

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (!userId) {
        localStorage.setItem('notificationMessage', 'Please login first before using the services');
        window.location.replace('/login');
      // router.push('/login').then(() => { // Redirect to login page
    }
  }, []);
};

export default useAuth;