import { useEffect, useState } from 'react';
import { authStateChanged } from 'myFirebase/client';
import { useRouter } from 'next/router';

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOW: undefined,
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOW);
  const router = useRouter();

  useEffect(() => {
    authStateChanged(setUser);
  }, []);

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && router.push('/');
  }, [user]);

  return user;
}
