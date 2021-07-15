import { 
  Navbar, 
  NavbarBrand, 
  Nav, 
  NavItem, 
  NavLink 
} from "reactstrap";

const NavBar = (props) => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/todo-list-frontend">To-do List</NavbarBrand>
        
        <Nav className="mr-auto" navbar>
          {
            props.isLoggedIn ? (
              <NavItem>
                <NavLink href="/todo-list-frontend/dashboard">Dashboard</NavLink>
              </NavItem>
            ) : null
          }
          
          <NavItem>
            <NavLink target="_blank" href="https://github.com/kishan-aghera/todo-list-frontend">Frontend React App Github</NavLink>
          </NavItem>
          
          <NavItem>
            <NavLink target="_blank" href="https://github.com/kishan-aghera/todo-list-backend">Backend Rails API Github</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavBar;
