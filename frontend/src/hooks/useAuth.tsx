import { useState, useEffect } from "react";
import { parseCookies } from "nookies";

const useAuth = (): string | null => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    let token = cookies["token"];

    // Parse the JWT token from the cookie
    if (token) {
      const jsonString = token.slice(2);
      const jwtPayload = JSON.parse(decodeURIComponent(jsonString));
      token = jwtPayload.access_token;
    }

    setToken(token);
  }, []);

  return token;
};

export default useAuth;
