import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "expo-router";
// interface CustomRouter {
//   replace(arg0: string): unknown;
//   pathname: string;
// }

const protectedRoutes = ['/reservations']; 

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

  const pathname = usePathname(); // get the current pathname
  
  const { isAuthenticated } = useAuth();
  const router = useRouter()  ; 

  useEffect(() => {

    // if user is not authenticated & try to visit protected routes 
    // redirect to login page
    if (!isAuthenticated && protectedRoutes.includes(pathname)) {
      router.replace('/profile');
    }
  }, [isAuthenticated, router, protectedRoutes]);

  return isAuthenticated || !protectedRoutes.includes(pathname) ? children : null;
};

export default ProtectedRoute;
