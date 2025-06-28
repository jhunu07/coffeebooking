
import React, { useState } from 'react';
import CoffeeCard from '@/components/CoffeeCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee as CoffeeType } from '@/context/CartContext';

// Menu data
const coffeeMenu: Record<string, CoffeeType[]> = {
  espresso: [
    {
      id: 1,
      name: "Classic Espresso",
      price: 199,
      description: "Rich, full-bodied espresso with a caramel-like sweetness.",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aedda?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      name: "Americano",
      price: 149,
      description: "Espresso diluted with hot water, maintaining the flavor but reducing intensity.",
      image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      name: "Double Espresso",
      price: 249,
      description: "Twice the espresso, twice the flavor, a powerful coffee experience.",
      image: "https://images.unsplash.com/photo-1510707577719-ae7f89c4be25?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ],
  milk: [
    {
      id: 4,
      name: "Cappuccino",
      price: 299,
      description: "Espresso with steamed milk and a deep layer of foam.",
      image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 5,
      name: "Caffè Latte",
      price: 249,
      description: "Espresso with steamed milk and a light layer of foam.",
      image: "https://images.unsplash.com/photo-1582192322537-8c9e6b4d9bfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 6,
      name: "Flat White",
      price: 299,
      description: "Espresso with velvety steamed milk, less foam than a latte.",
      image: "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 7,
      name: "Mocha",
      price: 329,
      description: "Espresso with chocolate syrup and steamed milk, topped with whipped cream.",
      image: "https://images.unsplash.com/photo-1579282092671-5e8b5338f049?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ],
  specialty: [
    {
      id: 8,
      name: "Caramel Macchiato",
      price: 349,
      description: "Espresso with vanilla syrup, steamed milk and caramel drizzle.",
      image: "https://images.unsplash.com/photo-1546549024-8d2cb007390a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 9,
      name: "Hazelnut Latte",
      price: 349,
      description: "Espresso with steamed milk infused with rich hazelnut flavor.",
      image: "https://images.unsplash.com/photo-1610632380989-680fe40816c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 10,
      name: "Vanilla Latte",
      price: 329,
      description: "Espresso with steamed milk and vanilla syrup.",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 11,
      name: "Affogato",
      price: 399,
      description: "Espresso poured over a scoop of vanilla ice cream.",
      image: "https://images.unsplash.com/photo-1592318730259-6c43ddc835ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ],
  cold: [
    {
      id: 12,
      name: "Cold Brew",
      price: 299,
      description: "Coffee brewed with cold water over 12+ hours for a smooth, less acidic taste.",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 13,
      name: "Iced Latte",
      price: 249,
      description: "Espresso with cold milk and ice for a refreshing coffee experience.",
      image: "https://images.unsplash.com/photo-1586347873209-02542e580c2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 14,
      name: "Iced Mocha",
      price: 329,
      description: "Espresso with chocolate syrup, cold milk, and ice, topped with whipped cream.",
      image: "https://images.unsplash.com/photo-1527156231393-7023794f363c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 15,
      name: "Frappuccino",
      price: 399,
      description: "Blended coffee with ice and milk, topped with whipped cream.",
      image: "https://images.unsplash.com/photo-1575377625484-b748249b2a77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ]
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<string>("espresso");

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

        <Tabs defaultValue="espresso" className="w-full" onValueChange={setActiveCategory}>
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 md:grid-cols-4 mb-10">
            <TabsTrigger value="espresso">Espresso</TabsTrigger>
            <TabsTrigger value="milk">Milk Based</TabsTrigger>
            <TabsTrigger value="specialty">Specialty</TabsTrigger>
            <TabsTrigger value="cold">Cold Coffee</TabsTrigger>
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
