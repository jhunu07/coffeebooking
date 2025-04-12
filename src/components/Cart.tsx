
import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const Cart = () => {
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

  const handleCheckout = () => {
    toast.success('Order placed successfully! Your coffee is being prepared.');
    clearCart();
    toggleCart();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-50 transition-opacity duration-300",
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleCart}
      />

      {/* Cart Sidebar */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full md:w-96 bg-cream z-50 shadow-xl transform transition-transform duration-300 ease-in-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Cart Header */}
          <div className="flex items-center justify-between p-6 border-b border-coffee-light">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 text-coffee-darkest mr-2" />
              <h2 className="text-xl font-serif font-semibold text-coffee-darkest">Your Cart</h2>
            </div>
            <button 
              onClick={toggleCart}
              className="text-coffee-darkest hover:text-coffee-dark"
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <ShoppingBag className="h-16 w-16 text-coffee-medium mb-4" />
                <p className="text-lg text-coffee-dark font-medium mb-2">Your cart is empty</p>
                <p className="text-muted-foreground mb-6">Add some delicious coffee to get started</p>
                <Button 
                  onClick={toggleCart}
                  variant="outline"
                >
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
                        <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center border border-coffee-light rounded-md">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="p-1.5 text-coffee-dark hover:text-coffee-darkest"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-2 py-1 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="p-1.5 text-coffee-dark hover:text-coffee-darkest"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-coffee-dark hover:text-red-500"
                          aria-label="Remove item"
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

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t border-coffee-light p-6 space-y-4">
              <div className="flex justify-between text-base font-medium text-coffee-darkest">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="space-y-2">
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-coffee-darkest hover:bg-black"
                >
                  Checkout
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
