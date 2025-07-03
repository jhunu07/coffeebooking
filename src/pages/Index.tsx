
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import CoffeeCard from '@/components/CoffeeCard';
import { Coffee, CupSoda } from 'lucide-react';
import { Coffee as CoffeeType } from '@/context/CartContext';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const featuredCoffees: CoffeeType[] = [
  {
    id: 1,
    name: "South Indian Filter Coffee",
    price: 80,
    description: "Traditional filter coffee with chicory, served with hot milk and sugar.",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Madras Cappuccino",
    price: 120,
    description: "Rich espresso with steamed milk and a touch of cardamom.",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 3,
    name: "Masala Chai Latte",
    price: 90,
    description: "Traditional Indian spiced tea with steamed milk and aromatic spices.",
    image: "https://images.pexels.com/photos/32713605/pexels-photo-32713605.jpeg",
  },
];

const carouselCoffees: CoffeeType[] = [
  {
    id: 16,
    name: "Mumbai Street Coffee",
    price: 60,
    description: "Strong black coffee served roadside style with jaggery.",
    image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg",
  },
  {
    id: 17,
    name: "Kerala Spiced Coffee",
    price: 110,
    description: "Coffee infused with cardamom, cinnamon, and black pepper.",
    image: "https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 18,
    name: "Bangalore Café Coffee",
    price: 95,
    description: "Modern café style coffee with a South Indian twist.",
    image: "https://images.pexels.com/photos/1058920/pexels-photo-1058920.jpeg",
  },
  {
    id: 19,
    name: "Goan Coconut Coffee",
    price: 130,
    description: "Coffee with coconut milk and palm sugar, Goan specialty.",
    image: "https://images.pexels.com/photos/15889374/pexels-photo-15889374.jpeg",
  },
  {
    id: 20,
    name: "Rajasthani Kesar Coffee",
    price: 150,
    description: "Premium coffee with saffron and almonds, royal taste.",
    image: "https://images.unsplash.com/photo-1538587888044-79f13ddd7e49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 21,
    name: "Bengali Mishti Coffee",
    price: 100,
    description: "Sweet coffee with jaggery and condensed milk.",
    image: "https://images.pexels.com/photos/1006297/pexels-photo-1006297.jpeg",
  },
];

const Index = () => {
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
            <Coffee className="h-12 w-12 text-white mb-4" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">
              Authentic Indian Coffee, <br /> 
              <span className="text-coffee-medium">Traditional Flavors</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-xl">
              Experience the rich heritage of Indian coffee culture with our authentic blends
              and traditional brewing methods at genuine Indian prices.
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

      {/* Coffee Carousel Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-coffee-darkest mb-4">
              Discover Indian Coffee Varieties
            </h2>
            <p className="text-coffee-dark max-w-2xl mx-auto">
              From street-side filter coffee to royal saffron blends, explore the diverse flavors of India.
            </p>
          </div>

          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-1">
              {carouselCoffees.map((coffee) => (
                <CarouselItem key={coffee.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <CoffeeCard coffee={coffee} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Featured Coffee Section */}
      <section className="py-16 px-6 bg-cream">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-coffee-darkest mb-4">
              Our Signature Blends
            </h2>
            <p className="text-coffee-dark max-w-2xl mx-auto">
              Handpicked regional specialties that represent the true essence of Indian coffee culture.
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
              Experience Authentic Indian Coffee Culture
            </h2>
            <p className="text-xl mb-8">
              Join us for traditional coffee rituals, from South Indian filter coffee ceremonies
              to modern café experiences with a desi twist.
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
              Our Traditional Process
            </h2>
            <p className="text-coffee-dark max-w-2xl mx-auto">
              Following time-honored Indian coffee traditions, each cup is crafted with care and respect for heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-coffee-darkest">1</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Indian Beans</h3>
              <p className="text-coffee-dark">
                We source premium beans from the Western Ghats and Nilgiri hills, supporting local farmers and sustainable practices.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-coffee-darkest">2</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Traditional Roasting</h3>
              <p className="text-coffee-dark">
                Our beans are roasted using traditional methods with chicory blend, creating the authentic South Indian flavor profile.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-coffee-darkest">3</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Filter Brewing</h3>
              <p className="text-coffee-dark">
                Using traditional metal filters and time-tested brewing techniques to extract maximum flavor and aroma.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
