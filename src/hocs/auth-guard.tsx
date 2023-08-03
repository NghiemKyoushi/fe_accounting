import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import  axiosInstance  from "../config/index";
// import { useAuthContext } from 'src/contexts/auth-context';
import { cookieSetting } from "../../utils";
interface AuthGuardProps {
  children: React.ReactNode;
}
import { useAuth } from "../config/auth";
const AuthGuard = (props: AuthGuardProps) => {
  const { user } = useAuth();
  console.log("data", user);
  const { children } = props;
  const router = useRouter();
  const isAuthenticated = cookieSetting.get("token");
  // console.log("isAuthenticated",isAuthenticated)
  const ignore = useRef(false);
  // const [checked, setChecked] = useState(false);

  // Only do authentication check on component mount.
  // This flow allows you to manually redirect the user after sign-out, otherwise this will be
  // triggered and will automatically redirect to sign-in page.
//  console.log("kdkdkdk")
//   if(isAuthenticated){
//     axiosInstance.get('/api/users/68350f36-300d-43f1-b4da-922dc5263d9c',{headers: {
//           Authorization: `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuZ2hpZW0iLCJpYXQiOjE2OTA5OTIxNzEsImV4cCI6MTY5MDk5NTc3MX0.nqe4Hfz94gFRUAKX1fkCgjzec_OuBnCCtB-VqJlCL8zIRqrQc5tg0jd8rIS_gHsA6MKhYeqNU81iXfy4DuYa9g`},
//       }
//     ).then(res => console.log(res));
//     // console.log("check call api", a);
//   }
  useEffect(() => {
    // if (!router.isReady) {
    //   return;
    // }

    // // Prevent from calling twice in development mode with React.StrictMode enabled
    // if (ignore.current) {
    //   return;
    // }

    // ignore.current = true;

    if (isAuthenticated === undefined) {
      console.log("Not authenticated, redirecting");
      router
        .replace({
          pathname: "/auth/login",
          query:
            router.asPath !== "/" ? { continueUrl: router.asPath } : undefined,
        })
        .catch(console.error);
    } else {
     
    }
  }, [router.isReady]);

  // if (!checked) {
  //   return null;
  // }

  // If got here, it means that the redirect did not occur, and that tells us that the user is
  // authenticated / authorized.

  return children;
};

export default AuthGuard;
