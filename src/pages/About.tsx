// About page redesign for Cheese Bites
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Leaf, Heart } from 'lucide-react';

const heroImage = '/images/about/about-pizza.jpg'; // loaded cheesy pizza image
const images = {
  cheeseburger: '/images/about/about-cheeseburger.jpg',
  cheesyFries: '/images/about/about-cheesy-fries.jpg',
  chickenWings: '/images/about/about-chicken-wings.jpg',
  pizza: '/images/about/about-pizza.jpg',
};

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-[90vh] bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight"
          >
            Good Food. Great Taste. Unforgettable Cravings.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200"
          >
            Experience the joy of fresh, cheesy delights crafted with love and premium ingredients.
          </motion.p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 bg-[#FAF5E4]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Cheese Bites began with a simple idea – great food should spark cravings and bring people together. From our first cheesy bites to a full‑service menu, we blend fresh ingredients, bold flavors, and a passion for quality.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you’re sharing a laugh over a burger or enjoying a quiet night with our signature wings, we aim to make every bite unforgettable.
            </p>
            <Link
              to="/menu"
              className="inline-block mt-6 px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition"
            >
              Explore Our Menu
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={images.cheeseburger} alt="Juicy Cheeseburger" className="rounded-lg shadow-lg object-cover w-full h-48" loading="lazy" />
            <img src={images.chickenWings} alt="Crispy Chicken Wings" className="rounded-lg shadow-lg object-cover w-full h-48" loading="lazy" />
          </div>
        </div>
      </section>

      {/* FOOD SHOWCASE */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">Food Showcase</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: images.pizza, alt: 'Loaded Cheesy Pizza' },
              { src: images.cheesyFries, alt: 'Loaded Cheesy Fries' },
              { src: images.cheeseburger, alt: 'Juicy Cheeseburger' },
              { src: images.chickenWings, alt: 'Crispy Chicken Wings' },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="overflow-hidden rounded-xl shadow-lg"
              >
                <img src={item.src} alt={item.alt} className="w-full h-56 object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND EXPERIENCE */}
      <section className="py-16 bg-[#FAF5E4]">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Why Choose Cheese Bites</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Heart className="w-10 h-10 text-amber-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Delicious Food</h3>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="w-10 h-10 text-amber-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Quality Ingredients</h3>
            </div>
            <div className="flex flex-col items-center">
              <Star className="w-10 h-10 text-amber-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Great Taste</h3>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-10 h-10 text-amber-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Customer Experience</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="py-20 bg-amber-50 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Made for Your Cravings.</h2>
        <Link
          to="/menu"
          className="inline-block px-8 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition"
        >
          Explore Our Menu
        </Link>
      </section>
    </div>
  );
};
