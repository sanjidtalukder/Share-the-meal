import { NavLink } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-green-700 text-white p-10 rounded-t-4xl">
      
      <div className="grid grid-flow-col gap-6 text-lg font-medium">
        <NavLink to="/about" className="link link-hover hover:text-yellow-300">About us</NavLink>
        <NavLink to="/contact" className="link link-hover hover:text-yellow-300">Contact</NavLink>
        <NavLink to="/jobs" className="link link-hover hover:text-yellow-300">Jobs</NavLink>
        <NavLink to="/press" className="link link-hover hover:text-yellow-300">Press kit</NavLink>
      </div>

      <div className="grid grid-flow-col gap-6 mt-4">
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter">
    <FaTwitter size={28} className="text-white hover:text-yellow-300 transition-colors duration-200" />
  </a>
  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube">
    <FaYoutube size={28} className="text-white hover:text-yellow-300 transition-colors duration-200" />
  </a>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
    <FaFacebookF size={28} className="text-white hover:text-yellow-300 transition-colors duration-200" />
  </a>
</div>

      <aside className="mt-6 text-sm">
        <p>
          © {new Date().getFullYear()} - All rights reserved by{" "}
          <span className="font-semibold text-yellow-300">ZeroWasteMeals</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;