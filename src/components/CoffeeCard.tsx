
import React from 'react';
import { Coffee as CoffeeType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { PlusCircle, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoffeeCardProps {
  coffee: CoffeeType;
  className?: string;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ coffee, className }) => {
  const { addToCart } = useCart();

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1",
      className
    )}>
      <div className="h-48 overflow-hidden">
        <img 
          src={coffee.image} 
          alt={coffee.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-semibold text-coffee-darkest">{coffee.name}</h3>
          <div className="flex items-center font-medium text-coffee-dark">
            <IndianRupee className="h-4 w-4" />
            <span>{coffee.price}</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{coffee.description}</p>
        <Button 
          onClick={() => addToCart(coffee)}
          className="w-full bg-coffee-dark hover:bg-coffee-darkest text-white flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-4 w-4" /> 
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default CoffeeCard;
