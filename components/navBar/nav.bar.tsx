import { useRouter } from "next/router";
import { Navbar, Button, Text } from "@nextui-org/react";
import Link from "next/link";
import { AcmeLogo } from "./AcmeLogo";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import authService from "../../services/auth.service";
export default function NavigationBar({ children }: any) {
  const router = useRouter();
  const token = Cookies.get("token");
  const [isLogged, setIsLogged] = useState<string | undefined>("");

  const logout = async () => {
    await authService.logout();
    router.push("/auth/login");
  };

  useEffect(() => {
    setIsLogged(token);
  }, [token]);

  return (
    <>
      <Navbar isCompact isBordered variant="sticky" maxWidth="xl">
        <Navbar.Brand>
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            CarLoc
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs" variant="underline">
          <Navbar.Link
            as={Link}
            isActive={router.asPath === "/offer/allOffer"}
            href="/offer/allOffer"
          >
            Offer 🚗
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            isActive={router.asPath === "/profile"}
            href="/profile"
          >
            Profile 🙋
          </Navbar.Link>
        </Navbar.Content>
        {!isLogged ? (
          <Navbar.Content>
            <Navbar.Link color="inherit" as={Link} href="/auth/login">
              Login
            </Navbar.Link>
            <Navbar.Item>
              <Button auto flat as={Link} href="/auth/register">
                Sign Up
              </Button>
            </Navbar.Item>
          </Navbar.Content>
        ) : (
          <Navbar.Content>
            <Button
              onPress={logout}
              color="gradient"
              shadow
              auto
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Logout
            </Button>
          </Navbar.Content>
        )}
      </Navbar>
      {children}
    </>
  );
}
