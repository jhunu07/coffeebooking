
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft, IndianRupee, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { createOrder } from '@/utils/orderUtils';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    items, 
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
      navigate('/orders');
    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center mb-8">
          <Link to="/menu" className="flex items-center text-coffee-dark hover:text-coffee-darkest mr-4">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Menu
          </Link>
          <h1 className="text-3xl font-serif font-bold text-coffee-darkest">Your Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-coffee-medium mx-auto mb-6" />
            <h2 className="text-2xl font-serif font-semibold text-coffee-darkest mb-4">Your cart is empty</h2>
            <p className="text-coffee-dark mb-8">Add some delicious coffee to get started</p>
            <Button asChild className="bg-coffee-darkest hover:bg-black">
              <Link to="/menu">Browse Menu</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-serif font-semibold text-coffee-darkest mb-6">Order Items</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center p-4 border border-coffee-light rounded-lg">
                      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-coffee-darkest">{item.name}</h3>
                        <div className="flex items-center text-coffee-dark">
                          <IndianRupee className="h-4 w-4" />
                          <span>{item.price}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 text-coffee-dark hover:text-coffee-darkest border border-coffee-light rounded"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 text-coffee-dark hover:text-coffee-darkest border border-coffee-light rounded"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="ml-4 flex items-center space-x-4">
                        <div className="flex items-center font-medium text-coffee-darkest">
                          <IndianRupee className="h-4 w-4" />
                          <span>{item.price * item.quantity}</span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-coffee-dark hover:text-red-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-serif font-semibold text-coffee-darkest mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-coffee-dark">Subtotal</span>
                    <div className="flex items-center font-medium">
                      <IndianRupee className="h-4 w-4" />
                      <span>{totalPrice}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-dark">Tax</span>
                    <div className="flex items-center font-medium">
                      <IndianRupee className="h-4 w-4" />
                      <span>{Math.round(totalPrice * 0.1)}</span>
                    </div>
                  </div>
                  <hr className="border-coffee-light" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-coffee-darkest">Total</span>
                    <div className="flex items-center text-coffee-darkest">
                      <IndianRupee className="h-4 w-4" />
                      <span>{Math.round(totalPrice * 1.1)}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleCheckout}
                  className="w-full mt-6 bg-coffee-darkest hover:bg-black"
                  disabled={isCheckingOut || items.length === 0}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  asChild
                  className="w-full mt-2"
                >
                  <Link to="/menu">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
