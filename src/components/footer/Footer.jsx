const Footer = () => {
  return (
    <footer className="footer footer-center bg-green-700 text-white p-10">
      {/* Top Navigation Links */}
      <nav className="grid grid-flow-col gap-6 text-lg font-medium">
        <a className="link link-hover hover:text-yellow-300">About us</a>
        <a className="link link-hover hover:text-yellow-300">Contact</a>
        <a className="link link-hover hover:text-yellow-300">Jobs</a>
        <a className="link link-hover hover:text-yellow-300">Press kit</a>
      </nav>

      {/* Social Media Icons */}
      <nav>
        <div className="grid grid-flow-col gap-6 mt-4">
          <a href="#" title="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-current hover:fill-yellow-300 transition-colors duration-200"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775..."></path>
            </svg>
          </a>
          <a href="#" title="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-current hover:fill-yellow-300 transition-colors duration-200"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245..."></path>
            </svg>
          </a>
          <a href="#" title="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              className="fill-current hover:fill-yellow-300 transition-colors duration-200"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667..."></path>
            </svg>
          </a>
        </div>
      </nav>

      {/* Footer Bottom Text */}
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
