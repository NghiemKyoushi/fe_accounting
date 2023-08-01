import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
// import { useAuthContext } from 'src/contexts/auth-context';
import { cookieSetting } from '../../utils';
interface AuthGuardProps{
  children: React.ReactNode
}
import { useAuth } from '../config/auth';
const AuthGuard = (props: AuthGuardProps) => {
  const {user} = useAuth();
  console.log('data', user)
  const { children } = props;
  const router = useRouter();
  const isAuthenticated  = cookieSetting.get();
  // console.log("isAuthenticated",isAuthenticated)
  const ignore = useRef(false);
  // const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.

  useEffect(
    () => {
      // if (!router.isReady) {
      //   return;
      // }

      // // Prevent from calling twice in development mode with React.StrictMode enabled
      // if (ignore.current) {
      //   return;
      // }

      // ignore.current = true;

      if (isAuthenticated === undefined) {
        console.log('Not authenticated, redirecting');
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      }
      //  else {
      //   setChecked(true);
      // }
    },
    [router.isReady]
  );

  // if (!checked) {
  //   return null;
  // }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

export default AuthGuard;