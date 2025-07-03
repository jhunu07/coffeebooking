
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { Coffee } from '@/context/CartContext';
import { IndianRupee } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface CoffeeCardProps {
  coffee: Coffee;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast.error('Please login to add items to cart');
      navigate('/auth');
      return;
    }

    addToCart(coffee);
    toast.success(`${coffee.name} added to cart!`);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <div className="h-48 overflow-hidden">
          <img 
            src={coffee.image} 
            alt={coffee.name}
            className="w-full h-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-serif text-coffee-darkest mb-2">
          {coffee.name}
        </CardTitle>
        <p className="text-sm text-coffee-dark mb-3">
          {coffee.description}
        </p>
        <div className="flex items-center text-lg font-semibold text-coffee-darkest">
          <IndianRupee className="h-5 w-5 mr-1" />
          {coffee.price}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-coffee-darkest hover:bg-black"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoffeeCard;
