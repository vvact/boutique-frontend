import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-gray-300 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="space-y-5">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-amber-500 to-amber-300 w-10 h-10 rounded-lg mr-3"></div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-200 tracking-wider">
                MEN'S BOUTIQUE
              </span>
            </div>
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Elevating gentlemen's style through curated craftsmanship and timeless elegance.
            </p>
            <div className="flex space-x-4 pt-2">
              {[
                { name: 'Instagram', url: 'https://instagram.com' },
                { name: 'Facebook', url: 'https://facebook.com' },
                { name: 'TikTok', url: 'https://tiktok.com' }
              ].map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-amber-400 transition-all duration-300 hover:-translate-y-0.5"
                  aria-label={platform.name}
                >
                  <span className="sr-only">{platform.name}</span>
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    {platform.name.charAt(0)}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-amber-500/30 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'FAQs', 'Privacy Policy', 'Terms & Conditions'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-400 hover:text-amber-400 transition-colors flex items-start group"
                  >
                    <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity mr-2">›</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-amber-500/30 inline-block">
              Exclusive Offers
            </h3>
            <p className="mb-4 text-gray-400 leading-relaxed">
              Subscribe to receive premium style insights and private sales
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 w-full"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5 pb-2 border-b border-amber-500/30 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors">+1 (555) 123-4567</a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:contact@mensboutique.com" className="hover:text-amber-400 transition-colors">contact@mensboutique.com</a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-amber-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>123 Luxury Avenue<br/>New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Men's Boutique. All rights reserved.</p>
          <p className="mt-2">Crafted with elegance for the modern gentleman</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;