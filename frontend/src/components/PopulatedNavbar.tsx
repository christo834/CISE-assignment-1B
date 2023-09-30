import styles from "./nav/Nav.module.scss";
import { IoMdArrowDropdown } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";

const PopulatedNavBar = () => {
  return (
    <NavBar>
      <div className={styles.left}>
        <NavItem>SPEED</NavItem>
      </div>
      <div className={styles.right}>
        <NavItem route="/" end>
          Home
        </NavItem>

        <NavItem route="/admin" end>
          Admin
        </NavItem>
        <NavItem dropdown route="/articles">
          Articles <IoMdArrowDropdown />
          <NavDropdown>
            <NavItem route="/articles">View articles</NavItem>
            <NavItem route="/articles/new">Submit new</NavItem>
          </NavDropdown>
        </NavItem>
      </div>
    </NavBar>
  );
};

export default PopulatedNavBar;
