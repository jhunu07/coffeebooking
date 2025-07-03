
import React, { useState } from 'react';
import CoffeeCard from '@/components/CoffeeCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee as CoffeeType } from '@/context/CartContext';

// Menu data with Indian coffee varieties and real Indian pricing
const coffeeMenu: Record<string, CoffeeType[]> = {
  traditional: [
    {
      id: 1,
      name: "South Indian Filter Coffee",
      price: 80,
      description: "Traditional filter coffee with chicory, served with hot milk and sugar.",
      image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg",
    },
    {
      id: 22,
      name: "Kumbakonam Degree Coffee",
      price: 90,
      description: "Premium filter coffee from Kumbakonam, known for its strong aroma.",
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 23,
      name: "Madras Filter Coffee",
      price: 75,
      description: "Classic Chennai style filter coffee with perfect milk-coffee ratio.",
      image: "https://images.pexels.com/photos/1058920/pexels-photo-1058920.jpeg",
    },
    {
      id: 24,
      name: "Coorg Coffee",
      price: 100,
      description: "From the coffee hills of Karnataka, rich and aromatic.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ],
  regional: [
    {
      id: 25,
      name: "Kerala Spiced Coffee",
      price: 110,
      description: "Coffee infused with cardamom, cinnamon, and black pepper.",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 26,
      name: "Goan Coconut Coffee",
      price: 130,
      description: "Coffee with coconut milk and palm sugar, Goan specialty.",
      image: "https://images.pexels.com/photos/15889374/pexels-photo-15889374.jpeg",
    },
    {
      id: 27,
      name: "Rajasthani Kesar Coffee",
      price: 150,
      description: "Premium coffee with saffron and almonds, royal taste.",
      image: "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 28,
      name: "Bengali Mishti Coffee",
      price: 100,
      description: "Sweet coffee with jaggery and condensed milk.",
      image: "https://images.pexels.com/photos/1006297/pexels-photo-1006297.jpeg",
    },
  ],
  modern: [
    {
      id: 29,
      name: "Mumbai Street Coffee",
      price: 60,
      description: "Street-style black coffee with jaggery, Mumbai tapri special.",
      image: "https://images.pexels.com/photos/32713605/pexels-photo-32713605.jpeg",
    },
    {
      id: 30,
      name: "Bangalore Café Latte",
      price: 120,
      description: "Modern café style latte with South Indian coffee beans.",
      image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 31,
      name: "Delhi CCD Style Coffee",
      price: 95,
      description: "Café Coffee Day inspired blend, popular in North India.",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 32,
      name: "Hyderabadi Irani Coffee",
      price: 85,
      description: "Traditional Irani café style coffee from Hyderabad.",
      image: "https://pastaevangelists.com/cdn/shop/articles/Affogato.png?v=1621613046&width=1280",
    },
  ],
  special: [
    {
      id: 33,
      name: "Masala Chai Coffee",
      price: 90,
      description: "Fusion of coffee and masala chai spices.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 34,
      name: "Kulhad Coffee",
      price: 70,
      description: "Traditional coffee served in clay cups for authentic taste.",
      image: "https://images.pexels.com/photos/32732219/pexels-photo-32732219.jpeg",
    },
    {
      id: 35,
      name: "Jaggery Coffee",
      price: 80,
      description: "Coffee sweetened with organic jaggery instead of sugar.",
      image: "https://images.unsplash.com/photo-1527156231393-7023794f363c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 36,
      name: "Rose Coffee",
      price: 110,
      description: "Coffee infused with rose water and topped with rose petals.",
      image: "https://images.pexels.com/photos/20205944/pexels-photo-20205944.jpeg",
    },
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("traditional");

  return (
    <div className="min-h-screen bg-cream py-12 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-coffee-darkest mb-4">
            Authentic Indian Coffee Menu
          </h1>
          <p className="text-coffee-dark max-w-2xl mx-auto">
            From traditional South Indian filter coffee to regional specialties, 
            experience the rich diversity of Indian coffee culture at genuine local prices.
          </p>
        </div>

        <Tabs defaultValue="traditional" className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 mb-10">
            <TabsTrigger value="traditional">Traditional</TabsTrigger>
            <TabsTrigger value="regional">Regional</TabsTrigger>
            <TabsTrigger value="modern">Modern</TabsTrigger>
            <TabsTrigger value="special">Special</TabsTrigger>
          </TabsList>
          
          {Object.entries(coffeeMenu).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((coffee) => (
                  <CoffeeCard key={coffee.id} coffee={coffee} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-serif font-semibold text-coffee-darkest mb-6">
            Experience authentic Indian coffee culture in our traditional setting
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
