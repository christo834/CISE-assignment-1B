// import "../../styles/globals.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavBar from "../components/PopulatedNavbar";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <PopulatedNavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
