'use client';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import SearchBar from './SearchBar';
import './header.css';
import { Nunito } from 'next/font/google';
import AuthModal from '../Modals/AuthModal';
import { useState } from 'react';

const nunito = Nunito({
  weights: [400, 700],
  subsets: ['latin'],
});

const NavBar = () => {
  // Store the modal show state
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState({ title: '', type: '' });

  const handleAuthModal = (title, type) => {
    setModalData({ title, type });
    setShow(true);
  };

  return (
    <header>
      <Navbar
        expand="md"
        className="!z-50 py-4 px-6 fixed w-full md:flex md:items-center"
      >
        <Navbar.Brand
          href="/"
          className={`me-auto font-bold ${nunito.className}`}
        >
          Cataholic
        </Navbar.Brand>
        <Navbar.Toggle className="border-none" />
        <Navbar.Collapse>
          <Nav className="ms-auto gap-x-4 md:flex md:items-center">
            <Nav.Link href="/" className={`font-bold ${nunito.className}`}>
              Home
            </Nav.Link>
            <Nav.Link
              href="/favorites"
              className={`font-bold ${nunito.className}`}
            >
              Favorites
            </Nav.Link>
            <NavDropdown
              title="Profile"
              className={`font-bold ${nunito.className}`}
            >
              <NavDropdown.Item
                href="/settings"
                className={`${nunito.className}`}
              >
                Settings
              </NavDropdown.Item>
              <NavDropdown.Item
                href="/logout"
                className={`${nunito.className}`}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              onClick={() => handleAuthModal('Welcome Back!', 'login')}
              className={`font-bold ${nunito.className}`}
            >
              Login
            </Nav.Link>
            <Nav.Link
              onClick={() => handleAuthModal('Join Our Community!', 'signup')}
              className={`font-bold ${nunito.className}`}
            >
              Signup
            </Nav.Link>
            <SearchBar />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AuthModal
        show={show}
        setShow={setShow}
        title={modalData.title}
        type={modalData.type}
      />
    </header>
  );
};

export default NavBar;
