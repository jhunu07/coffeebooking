
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingCart, LogOut, User, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from "sonner";
import { useUserProfile } from '@/hooks/useUserProfile';

interface NavbarProps {
  user: SupabaseUser | null;
}

const Navbar = ({ user }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, toggleCart } = useCart();
  const { profile } = useUserProfile(user);
  
  const isAdmin = profile?.role === 'admin';

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold text-coffee-darkest">
           CoffeeWala
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-coffee-dark hover:text-coffee-darkest">
              Home
            </Link>
            <Link to="/menu" className="text-coffee-dark hover:text-coffee-darkest">
              Menu
            </Link>
      
            <Link to="/booking" className="text-coffee-dark hover:text-coffee-darkest">
              Book a Table
            </Link>
        
            {isAdmin && (
              <Link to="/admin" className="text-coffee-dark hover:text-coffee-darkest flex items-center">
                <Settings className="mr-1 h-4 w-4" />
                Admin
              </Link>
            )}
            {user ? (
              <>
                <Button variant="ghost" onClick={handleLogout} className="text-coffee-dark hover:text-coffee-darkest">
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button asChild className="bg-coffee-dark hover:bg-coffee-darkest">
                <Link to="/auth">
                  <User className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            )}
            <button 
              onClick={toggleCart}
              className="relative text-coffee-dark hover:text-coffee-darkest"
            >
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-coffee-medium text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-coffee-dark hover:text-coffee-darkest">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link 
              to="/menu" 
              className="block text-coffee-dark hover:text-coffee-darkest"
              onClick={() => setIsOpen(false)}
            >
              Menu
            </Link>
            <Link 
              to="/about" 
              className="block text-coffee-dark hover:text-coffee-darkest"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/booking" 
              className="block text-coffee-dark hover:text-coffee-darkest"
              onClick={() => setIsOpen(false)}
            >
              Book a Table
            </Link>
            <Link 
              to="/contact" 
              className="block text-coffee-dark hover:text-coffee-darkest"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="block text-coffee-dark hover:text-coffee-darkest flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="mr-1 h-4 w-4" />
                Admin
              </Link>
            )}
            {user ? (
              <Button 
                variant="ghost" 
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }} 
                className="w-full justify-start text-coffee-dark hover:text-coffee-darkest"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </Button>
            ) : (
              <Button 
                asChild 
                className="w-full bg-coffee-dark hover:bg-coffee-darkest"
                onClick={() => setIsOpen(false)}
              >
                <Link to="/auth">
                  <User className="mr-2 h-5 w-5" />
                  Sign In
                </Link>
              </Button>
            )}
            <button 
              onClick={() => {
                toggleCart();
                setIsOpen(false);
              }}
              className="flex items-center w-full text-coffee-dark hover:text-coffee-darkest"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Cart ({items.length})
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
