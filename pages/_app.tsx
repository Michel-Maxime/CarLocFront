//import '../styles/globals.css'
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Layout } from "../components/navBar/layout";
import { AcmeLogo } from "../components/navBar/AcmeLogo";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider>
      <Layout>
        <Navbar isCompact isBordered variant="sticky" maxWidth="xl">
          <Navbar.Brand>
            <AcmeLogo />
            <Text b color="inherit" hideIn="xs">
              CarLoc
            </Text>
          </Navbar.Brand>
          <Navbar.Content hideIn="xs" variant="underline">
            <Navbar.Link
              isActive={router.asPath === "/offer/allOffer"}
              href="/offer/allOffer"
            >
              Offer 🚗
            </Navbar.Link>
            <Navbar.Link
              isActive={router.asPath === "/profile"}
              href="/profile"
            >
              Profile 🙋
            </Navbar.Link>
          </Navbar.Content>
          <Navbar.Content>
            <Navbar.Link color="inherit" href="/auth/login">
              Login
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href="/auth/register">
                Sign Up
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        </Navbar>
        <Component {...pageProps} />
      </Layout>
    </NextUIProvider>
  );
}
