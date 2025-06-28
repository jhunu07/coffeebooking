
import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-coffee-darkest text-coffee-light">
      <div className="container mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Coffee className="h-8 w-8" />
              <span className="text-2xl font-serif font-bold text-coffee-light">coffeewala </span>
            </Link>
            <p className="mt-4 text-sm">
              At coffeewala, we're passionate about bringing you the finest coffee experiences. 
              From perfectly brewed espressos to cozy café ambiance.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-coffee-light hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-coffee-light hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-coffee-light hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/menu" className="text-sm hover:text-white transition-colors">Menu</Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm hover:text-white transition-colors">Book a Table</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors"> Contact</Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm">Rajkot Gujarat 360003</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-sm">(+91) 9471564852</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="text-sm">info@coffewala.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p>Monday - Friday: 7am - 9pm</p>
                  <p>Saturday - Sunday: 8am - 10pm</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-coffee-dark mt-12 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()}coffeewala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
