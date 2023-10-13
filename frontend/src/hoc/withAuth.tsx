// withAuth.tsx

import { useRouter } from "next/router";
import { useEffect } from "react";
import { NextPage, NextPageContext } from "next";
import { parseCookies } from "nookies";



const withAuth = (Component: NextPage) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = () => {
        const cookies = parseCookies();
        const token = cookies["token"];
        if (!token) {
          router.push("/");
        }
      };
      checkAuth();
    }, []);

    return <Component {...props} />;
  };

  AuthenticatedComponent.getInitialProps = async (ctx: NextPageContext) => {
    if (Component.getInitialProps) {
      const pageProps = await Component.getInitialProps(ctx);
      return { ...pageProps };
    }
    return {};
  };

  return AuthenticatedComponent;
};

export default withAuth;
