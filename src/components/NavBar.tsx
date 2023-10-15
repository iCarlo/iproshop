import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppButton from "./AppButton";
import Cart from "./Cart";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logoutUser } from "../redux/authReducer";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const navBarStates = useAppSelector(
    (state) => {
      return {
        cartItemsCount: state.shop.cartState.cart.length,
        currentUser: state.shop.authState.currentUser
      }
    }
  );

  const [openCart, setopenCart] = useState(false);


  const logoutSignInHandler = () => {
    if(navBarStates.currentUser){
      dispatch(logoutUser())

    } else {
      navigate("/login")
    }
  }

  return (
    <Navbar bg="primary-yellow" sticky="top" expand="sm">
      <Container className="navbar-container">
        <Navbar.Brand className="text-dark fw-bolder fs-1" as={Link} to="/">
          iProShop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          {navBarStates.currentUser && 
          <Nav>
            <Nav.Link className="text-dark fs-5" as={Link} to="/products">
              Products
            </Nav.Link>
          </Nav>
          }

          <Nav className="ms-auto">
            {navBarStates.currentUser &&
              <div className="cart" onClick={() => setopenCart(!openCart)}>
                <span className="label text-dark fs-5">Cart</span>
                <div className="cartIcon">
                  <ShoppingCartIcon />
                  <span>{navBarStates.cartItemsCount}</span>
                </div>
              </div>
            }
            <AppButton customClass="btn-lg" 
              text={navBarStates.currentUser ? "Logout" : "Login"} 
              onClick={() => logoutSignInHandler()}
              />
          </Nav>
        </Navbar.Collapse>
      </Container>

      {openCart && <Cart onDismiss={() => setopenCart(false)} />}
    </Navbar>
  );
};

export default NavBar;
