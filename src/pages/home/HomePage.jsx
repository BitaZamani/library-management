import PropTypes from "prop-types";
import NavBar from "../../components/NavBar";
import { Hero } from "../../components/Hero";
const HomePage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-950">
      <NavBar />
      <Hero />
    </div>
  );
};
HomePage.propTypes = {
  libraryName: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default HomePage;
