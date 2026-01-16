
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X, Plus, Minus, Trash2, IndianRupee, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { createOrder } from '@/utils/orderUtils';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    items, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity,
    totalPrice,
    clearCart
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Check authentication
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      toast.error('Please sign in to place an order');
      toggleCart();
      navigate('/auth');
      return;
    }

    setIsCheckingOut(true);
    try {
      const tax = Math.round(totalPrice * 0.1);
      const totalWithTax = totalPrice + tax;

      const { orderId, error } = await createOrder(
        session.user.id,
        items,
        totalWithTax
      );

      if (error) {
        throw error;
      }

      toast.success('Order placed successfully! Your coffee is being prepared.', {
        description: `Order ID: ${orderId.slice(0, 8)}...`
      });
      clearCart();
      toggleCart();
      navigate('/orders');
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-96 bg-cream z-50 shadow-xl transform transition-transform duration-300 ease-in-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-coffee-light">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-coffee-darkest mr-2" />
              <h2 className="text-xl font-serif font-semibold text-coffee-darkest">Your Cart</h2>
            </div>
            <button 
              onClick={toggleCart}
              className="text-coffee-darkest hover:text-coffee-dark"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <ShoppingBag className="h-16 w-16 text-coffee-medium mb-4" />
                <p className="text-lg text-coffee-dark font-medium mb-2">Your cart is empty</p>
                <p className="text-muted-foreground mb-6">Add some delicious coffee to get started</p>
                <Button onClick={toggleCart} variant="outline">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex border-b border-coffee-light pb-4">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-coffee-light">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium text-coffee-darkest">
                        <h3>{item.name}</h3>
                        <div className="flex items-center ml-4">
                          <IndianRupee className="h-4 w-4" />
                          <span>{item.price * item.quantity}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-coffee-light rounded-md">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="p-1.5 text-coffee-dark hover:text-coffee-darkest"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2 py-1 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-1.5 text-coffee-dark hover:text-coffee-darkest"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-coffee-dark hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-coffee-light p-6 space-y-4">
              <div className="flex justify-between text-base font-medium text-coffee-darkest">
                <p>Subtotal</p>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  <span>{totalPrice}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-coffee-darkest hover:bg-black"
                  disabled={isCheckingOut || items.length === 0}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Checkout'
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={toggleCart}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
