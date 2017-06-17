import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {

  onLoginClick(){
    this.props.onLoginClick();
  }

  onLogoutClick(){
    this.props.onLogoutClick();
  }

  render() {
    let navItems;
    if(this.props.idToken){
      navItems = <NavItem href="#" onClick={this.onLogoutClick.bind(this)}>Logout</NavItem>
    }else{
      navItems = <NavItem href="#" onClick={this.onLoginClick.bind(this)}>Login</NavItem>
    }
    return (
      <Navbar>
          <Navbar.Header>
              <Navbar.Brand>ReactAuth Application</Navbar.Brand>
          </Navbar.Header>
          <Nav>
            {navItems}
          </Nav>
      </Navbar>
    );
  }
}

export default Header;
