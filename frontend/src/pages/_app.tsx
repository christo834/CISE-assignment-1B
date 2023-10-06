// import "../../styles/globals.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavBar from "../components/PopulatedNavbar";
import Footer from "@/components/nav/Footer";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col min-h-screen">
        <PopulatedNavBar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
export default MyApp;