import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAccount } from 'wagmi';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { ConnectKitButton } from 'connectkit';

// Interface for defining pages in the navigation bar
type Page = {
  href: string,
  name: string,
  icon: string
};

// Array of pages for the navigation bar
const PAGES: Page[] = [
  {
    href: "/wrappers",
    name: "Home",
    icon: "🔎"
  },
  {
    href: "/factory",
    name: "Send Token",
    icon: "🏭"
  },
];


export default function Topbar() {
  // Getting account information from 'wagmi'
  const { isConnected } = useAccount();

  // Getting the router instance from Next.js
  const router = useRouter();

  // State to track the active page
  const [activePage, setActivePage] = useState<string>("");

  // useEffect to update the activePage based on the current route
  useEffect(() => {
    PAGES.forEach((p: Page) => {
      if (router.pathname && router.pathname.includes(p.href)) {
        setActivePage(p.name);
      }
    });
  }, [router]);

  // Function to determine class names for the active page link
  const getPageLinkClassNames = (key: string) => {
    if (key === activePage) {
      return "border-bottom border-3 border-primary font-weight-bold text-dark";
    }
    return "";
  };


  return (
    <Navbar expand="md" >
      <Container>
        <Navbar.Brand href="/" >
          <h4 className="font-weight-bold">Token ERC20</h4>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="text-center justify-content-center">
          <Nav > 
            {/* Mapping through PAGES array to generate navigation links */}
            {PAGES.map((p: Page) => (
              <Nav.Link 
                className={"px-3 py-2 " + getPageLinkClassNames(p.name)}
                href={p.href}
                key={"page_" + p.name}
              >
                <span>{p.icon + " " + p.name}</span>
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>

        {/* Displaying ConnectKitButton */}
        <Nav.Item>
          <ConnectKitButton />
        </Nav.Item>
      </Container>
    </Navbar>
  );
}
