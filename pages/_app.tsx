//import '../styles/globals.css'
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import NavigationBar from "../components/navBar/nav.bar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <NavigationBar>
        <Component {...pageProps} />
      </NavigationBar>
    </NextUIProvider>
  );
}
