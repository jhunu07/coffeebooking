
import React from 'react';
import { Coffee, Users, Award, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-coffee-dark text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            About CoffeeWala
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're passionate about bringing you the finest coffee experiences, 
            combining traditional brewing methods with modern innovation.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-coffee-darkest mb-8 text-center">
              Our Story
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-coffee-dark mb-6">
                  Founded in 2020, CoffeeWala began as a small family business with a simple mission: 
                  to serve exceptional coffee that brings people together. What started as a single 
                  location in Rajkot has grown into a beloved community hub.
                </p>
                <p className="text-coffee-dark mb-6">
                  We source our beans directly from sustainable farms, ensuring fair trade practices 
                  and the highest quality. Our expert roasters carefully craft each blend to bring 
                  out unique flavor profiles that tell the story of their origin.
                </p>
                <p className="text-coffee-dark">
                  Today, we continue to honor our commitment to quality, community, and sustainability 
                  in every cup we serve.
                </p>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Coffee shop interior"
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-serif font-bold text-coffee-darkest mb-12 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-coffee-darkest" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Quality</h3>
              <p className="text-coffee-dark">
                We never compromise on quality, from bean selection to the final cup.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-coffee-darkest" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Community</h3>
              <p className="text-coffee-dark">
                We're more than a coffee shop - we're a gathering place for our community.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-coffee-darkest" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Excellence</h3>
              <p className="text-coffee-dark">
                We strive for excellence in every aspect of our service and products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-coffee-light rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-coffee-darkest" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-coffee-darkest mb-3">Passion</h3>
              <p className="text-coffee-dark">
                Our love for coffee drives everything we do, from roasting to serving.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      
    </div>
  );
};

export default About;
