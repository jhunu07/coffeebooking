
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, ShoppingBag, Calendar, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const { totalItems, toggleCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-cream py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Coffee className="h-8 w-8 text-coffee-darkest" />
          <span className="text-2xl font-serif font-bold text-coffee-darkest">Bean Brew</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-coffee-darkest hover:text-coffee-dark font-medium transition-colors">
            Home
          </Link>
          <Link to="/menu" className="text-coffee-darkest hover:text-coffee-dark font-medium transition-colors">
            Menu
          </Link>
          <Link to="/booking" className="text-coffee-darkest hover:text-coffee-dark font-medium transition-colors">
            Book a Table
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="outline"
            className="relative"
            onClick={toggleCart}
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-coffee-darkest text-cream rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="outline"
            className="relative mr-2"
            onClick={toggleCart}
            aria-label="Shopping cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-coffee-darkest text-cream rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-coffee-darkest/90 z-50 flex flex-col items-center justify-center space-y-8 transition-all duration-300 md:hidden",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <X
          className="absolute top-6 right-6 h-8 w-8 text-cream cursor-pointer"
          onClick={toggleMobileMenu}
        />
        <Link
          to="/"
          className="text-xl text-cream hover:text-coffee-light transition-colors"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/menu"
          className="text-xl text-cream hover:text-coffee-light transition-colors"
          onClick={toggleMobileMenu}
        >
          Menu
        </Link>
        <Link
          to="/booking"
          className="text-xl text-cream hover:text-coffee-light transition-colors"
          onClick={toggleMobileMenu}
        >
          Book a Table
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
