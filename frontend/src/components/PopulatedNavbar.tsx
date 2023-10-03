import styles from "./nav/Nav.module.scss";
import { IoMdArrowDropdown, IoMdMenu } from "react-icons/io";
import NavBar from "./nav/NavBar";
import NavDropdown from "./nav/NavDropDown";
import NavItem from "./nav/NavItem";
import { useState, useEffect } from "react";

const PopulatedNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 650) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    // Check screen size on initial render
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <NavBar>
      <div className={styles.left}>
        <NavItem>SPEED</NavItem>
      </div>
      <div
        className={styles.menuIcon}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <IoMdMenu className={styles.menuIcon} />
      </div>
      {isMenuOpen && (
        <div className={styles.right}>
          <NavItem route="/" end>
            Home
          </NavItem>
          <NavItem route="/moderator" end>
            Moderator
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
      )}
    </NavBar>
  );
};

export default PopulatedNavBar;
