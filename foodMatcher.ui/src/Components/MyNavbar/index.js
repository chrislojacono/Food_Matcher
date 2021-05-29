import React, { useState } from 'react';
import firebase from 'firebase/app';
import { Link, withRouter, useHistory } from 'react-router-dom';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function MyNavbar({ user }) {
  const history = useHistory();

  const logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    history.push('/');
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <NavbarBrand href='/'>Let's Eat!</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='mr-auto' navbar>
            <NavItem>
              <Link className='nav-link' to='/mySessions'>
                View Your Sessions
              </Link>
            </NavItem>
            <NavItem>
              {/* <Link className='nav-link' to='/todo'>
                To-Do List
              </Link>
            </NavItem>
            <NavItem>
              <Link className='nav-link' to='/logbook'>
                Logbook
              </Link> */}
            </NavItem>
            {user && (
              <>
              <div className="userImgWrapper">
              <img
                  className='userInfo'
                  src={user?.image_Url}
                  alt={user?.firstName}
                />
              </div>

                <UncontrolledDropdown className='logout-dropdown'>
                  <DropdownToggle nav caret></DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>{user?.displayName}</DropdownItem>
                    <DropdownItem>
                      <div
                        className='nav-link btn btn-danger'
                        onClick={(e) => logMeOut(e)}
                      >
                        Logout
                      </div>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default withRouter(MyNavbar);
