import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start mt-5 py-4 border-top">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Men's Boutique</h5>
            <p>Style. Power. Presence.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-dark">About Us</Link></li>
              <li><Link to="/contact" className="text-dark">Contact</Link></li>
              <li><Link to="/faqs" className="text-dark">FAQs</Link></li>
              <li><Link to="/privacy-policy" className="text-dark">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-dark">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <p>Instagram | Facebook | TikTok</p>
          </div>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} Men's Boutique</p>
      </div>
    </footer>
  );
}

export default Footer;
