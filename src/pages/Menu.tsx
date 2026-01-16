
import React, { useState, useEffect } from 'react';
import CoffeeCard from '@/components/CoffeeCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee as CoffeeType } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;

// Fallback menu data if database is empty
const fallbackMenu: Record<string, CoffeeType[]> = {
  espresso: [
    {
      id: 1,
      name: "Classic Espresso",
      price: 3.99,
      description: "Rich, full-bodied espresso with a caramel-like sweetness.",
      image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg",
    },
    {
      id: 2,
      name: "Americano",
      price: 3.49,
      description: "Espresso diluted with hot water, maintaining the flavor but reducing intensity.",
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Double Espresso",
      price: 4.49,
      description: "Twice the espresso, twice the flavor, a powerful coffee experience.",
      image: "https://images.pexels.com/photos/1058920/pexels-photo-1058920.jpeg",
    },
  ],
  milk: [
    {
      id: 4,
      name: "Cappuccino",
      price: 4.99,
      description: "Espresso with steamed milk and a deep layer of foam.",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 5,
      name: "Caffè Latte",
      price: 4.49,
      description: "Espresso with steamed milk and a light layer of foam.",
      image: "https://images.pexels.com/photos/15889374/pexels-photo-15889374.jpeg",
    },
    {
      id: 6,
      name: "Flat White",
      price: 4.99,
      description: "Espresso with velvety steamed milk, less foam than a latte.",
      image: "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 7,
      name: "Mocha",
      price: 5.29,
      description: "Espresso with chocolate syrup and steamed milk, topped with whipped cream.",
      image: "https://images.pexels.com/photos/1006297/pexels-photo-1006297.jpeg",
    },
  ],
  specialty: [
    {
      id: 8,
      name: "Caramel Macchiato",
      price: 5.49,
      description: "Espresso with vanilla syrup, steamed milk and caramel drizzle.",
      image: "https://images.pexels.com/photos/32713605/pexels-photo-32713605.jpeg",
    },
    {
      id: 9,
      name: "Hazelnut Latte",
      price: 5.49,
      description: "Espresso with steamed milk infused with rich hazelnut flavor.",
      image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 10,
      name: "Vanilla Latte",
      price: 5.29,
      description: "Espresso with steamed milk and vanilla syrup.",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 11,
      name: "Affogato",
      price: 5.99,
      description: "Espresso poured over a scoop of vanilla ice cream.",
      image: "https://pastaevangelists.com/cdn/shop/articles/Affogato.png?v=1621613046&width=1280",
    },
  ],
  cold: [
    {
      id: 12,
      name: "Cold Brew",
      price: 4.99,
      description: "Coffee brewed with cold water over 12+ hours for a smooth, less acidic taste.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 13,
      name: "Iced Latte",
      price: 4.49,
      description: "Espresso with cold milk and ice for a refreshing coffee experience.",
      image: "https://images.pexels.com/photos/32732219/pexels-photo-32732219.jpeg",
    },
    {
      id: 14,
      name: "Iced Mocha",
      price: 5.29,
      description: "Espresso with chocolate syrup, cold milk, and ice, topped with whipped cream.",
      image: "https://images.unsplash.com/photo-1527156231393-7023794f363c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 15,
      name: "Frappuccino",
      price: 5.99,
      description: "Blended coffee with ice and milk, topped with whipped cream.",
      image: "https://images.pexels.com/photos/20205944/pexels-photo-20205944.jpeg",
    },
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("espresso");
  const [coffeeMenu, setCoffeeMenu] = useState<Record<string, CoffeeType[]>>(fallbackMenu);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data: products, error } = await supabase
          .from('products')
          .select('*')
          .order('name');

        if (error) {
          console.error('Error fetching products:', error);
          toast.error('Failed to load menu. Using default menu.');
          setLoading(false);
          return;
        }

        if (products && products.length > 0) {
          // Group products by category
          const menuByCategory: Record<string, CoffeeType[]> = {};
          
          products.forEach((product: Product) => {
            const category = product.category || 'other';
            if (!menuByCategory[category]) {
              menuByCategory[category] = [];
            }
            
            menuByCategory[category].push({
              id: parseInt(product.id.slice(0, 8), 16) || Math.random() * 10000,
              name: product.name,
              price: product.price,
              description: product.description || '',
              image: product.image_url || 'https://via.placeholder.com/500',
            });
          });

          if (Object.keys(menuByCategory).length > 0) {
            setCoffeeMenu(menuByCategory);
            setActiveCategory(Object.keys(menuByCategory)[0]);
          }
        }
      } catch (error) {
        console.error('Unexpected error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading menu..." />;
  }

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-coffee-darkest mb-4">
            Our Coffee Menu
          </h1>
          <p className="text-coffee-dark max-w-2xl mx-auto">
            Explore our wide range of coffee selections. Each cup is crafted with love and expertise.
          </p>
        </div>

        <Tabs value={activeCategory} className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 md:grid-cols-4 mb-10">
            {Object.keys(coffeeMenu).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(coffeeMenu).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              {items.length === 0 ? (
                <div className="text-center py-12 text-coffee-dark">
                  No items in this category
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((coffee) => (
                    <CoffeeCard key={coffee.id} coffee={coffee} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-serif font-semibold text-coffee-darkest mb-6">
            Want to enjoy your coffee in our cozy atmosphere?
          </h2>
          <Button asChild size="lg" className="bg-coffee-darkest hover:bg-black">
            <a href="/booking">Book a Table</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
