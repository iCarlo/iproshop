import {Container, Nav, Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import '../styles/Navbar.scss';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppButton from "./AppButton";

const NavBar = () => {
  return (
    <Navbar bg='primary-yellow' sticky='top' expand="sm">
      <Container className="navbar-container">
        <Navbar.Brand className="text-primary-blue fw-bold fs-1" as={Link} to="/">
          iProShop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='main-navbar' />
        <Navbar.Collapse  id="main-navbar">
          <Nav>
            <Nav.Link className="text-primary-blue fs-5" as={Link} to="/products">
              Products
            </Nav.Link>
          </Nav>


          
          <Nav className="ms-auto">
            <div className="cart">
              <span className="label text-primary-blue fs-5">Cart</span>
              <div className="cartIcon">
                <ShoppingCartIcon />
                <span>0</span>
              </div>
            </div>
            <AppButton customClass="btn-lg" text="Sign-in"/>
          </Nav>

          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar