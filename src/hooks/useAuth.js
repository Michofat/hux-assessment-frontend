import { useEffect, useState } from "react";
import { decodeTokenFromStorage } from "../utils/token"; // Assuming you have a function to decode the token

const useAuth = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const decodedToken = decodeTokenFromStorage();
    if (decodedToken) {
      setUserDetails(decodedToken);
    }
  }, []);

  return userDetails;
};

export default useAuth;
