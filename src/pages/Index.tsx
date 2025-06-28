
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CoffeeCard from '@/components/CoffeeCard';
import { Coffee, CupSoda, Loader2 } from 'lucide-react';
import { useCart, Coffee as CoffeeType } from '@/context/CartContext';

// Featured coffees data
const featuredCoffees: CoffeeType[] = [
  {
    id: 1,
    name: "Classic Espresso",
    price: 300,
    description: "Rich, full-bodied espresso with a caramel-like sweetness.",
    image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg",
  },
  {
    id: 2,
    name: "Cappuccino",
    price: 400,
    description: "Espresso with steamed milk and a deep layer of foam.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Caramel Macchiato",
    price: 500,
    description: "Espresso with vanilla syrup, steamed milk and caramel drizzle.",
    image: "https://images.pexels.com/photos/32713605/pexels-photo-32713605.jpeg",
  },
  {
    id: 4,
    name: " Macchiato",
    price: 500,
    description: "Espresso with vanilla syrup, steamed milk and caramel drizzle.",
    image: "https://images.pexels.com/photos/32713605/pexels-photo-32713605.jpeg",
  },
];

const Index = () => {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] bg-coffee-dark overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Coffee Shop" 
            className="w-full h-full object-cover object-center opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-coffee-darkest/40 z-10" />
        <div className="relative z-20 container mx-auto h-full flex flex-col justify-center items-start px-6">
          <div className="max-w-2xl">
            <div className="relative inline-block mb-4">
              <div className="absolute -top-3 -left-2 w-4 h-4 rounded-full bg-coffee-medium animate-steam" />
              <div className="absolute -top-3 left-0 w-3 h-3 rounded-full bg-coffee-medium animate-steam opacity-70 delay-100" />
              <div className="absolute -top-4 left-2 w-3 h-3 rounded-full bg-coffee-medium animate-steam opacity-60 delay-300" />
              <Coffee className="h-12 w-12 text-white mb-4" />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Exquisite Coffee, <br /> 
              <span className="text-coffee-medium">Memorable Experiences</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Experience the rich flavors of premium coffee in our cozy atmosphere. 
              Order online or book a table for a perfect coffee date.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-coffee-dark hover:bg-coffee-darkest text-white font-medium"
              >
                <Link to="/menu">
                  <CupSoda className="mr-2 h-5 w-5" />
                  Order Now
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link to="/booking">
                  Book a Table
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coffee Section */}
      <section className="py-16 px-6 bg-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-coffee-darkest mb-4">
              Our Featured Coffee
            </h2>
            <p className="text-coffee-dark max-w-2xl mx-auto">
              Discover our carefully selected coffee beans, expertly roasted and brewed to perfection.
              Each cup tells a story of quality and passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCoffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              asChild
              size="lg"
              className="bg-coffee-dark hover:bg-coffee-darkest"
            >
              <Link to="/menu">
                View Full Menu
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Book a Table CTA */}
      <section className="py-16 px-6 bg-coffee-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Coffee Shop Interior" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Reserve Your Perfect Coffee Experience
            </h2>
            <p className="text-xl mb-8">
              Whether it's a casual meet-up, business meeting, or romantic date,
              we have the perfect spot waiting for you.
            </p>
            <Button 
              asChild
              size="lg" 
              className="bg-white text-coffee-darkest hover:bg-coffee-light"
            >
              <Link to="/booking">
                Book a Table Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Coffee Process */}
      <section className="py-16 px-6 bg-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-coffee-darkest mb-4">
              Our Coffee Journey
            </h2>
            <p className="text-coffee-dark max-w-2xl mx-auto">
              From carefully selected beans to the perfect brew, discover the passion behind each cup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-coffee-darkest">1</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Selection</h3>
              <p className="text-coffee-dark">
                We source the finest beans from sustainable farms around the world, ensuring quality and ethical practices.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-coffee-darkest">2</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Roasting</h3>
              <p className="text-coffee-dark">
                Our master roaster brings out the unique flavor profile of each bean through careful roasting techniques.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-coffee-darkest">3</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Brewing</h3>
              <p className="text-coffee-dark">
                Our skilled baristas prepare each cup with precision and care, creating the perfect coffee experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
