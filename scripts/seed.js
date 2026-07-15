require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../models/Category');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Offer = require('../models/Offer');

// Using placeholder food images from Unsplash source (free, no API key
// needed) so the app looks realistic immediately. Swap these URLs
// for your own hosted images whenever you're ready.
const img = (query) => `https://source.unsplash.com/400x300/?${encodeURIComponent(query)}`;

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB for seeding...');

  // Wipe existing data so this script is safely re-runnable
  await Category.deleteMany({});
  await Restaurant.deleteMany({});
  await MenuItem.deleteMany({});
  await Offer.deleteMany({});
  console.log('Cleared existing categories/restaurants/menu items/offers.');

  // --- Categories ---
  const categories = await Category.insertMany([
    { name: 'Pizza', image: img('pizza') },
    { name: 'Burger', image: img('burger') },
    { name: 'Nuggets', image: img('chicken nuggets') },
    { name: 'Healthy Salads', image: img('salad') },
    { name: 'French Fries', image: img('french fries') },
    { name: 'Sushi', image: img('sushi') },
  ]);
  const catByName = Object.fromEntries(categories.map((c) => [c.name, c._id]));
  console.log(`Seeded ${categories.length} categories.`);

  // --- Restaurants ---
  const restaurants = await Restaurant.insertMany([
    {
      name: 'Sierra Quick Bite Restaurant',
      image: img('restaurant fast food'),
      banner: img('restaurant fast food banner'),
      description: 'Fast, fresh, and always delicious.',
      address: '12 Main Street',
      phone: '9876543210',
      cuisine: 'Fast Food',
      rating: 4.6,
    },
    {
      name: 'Linsy Prusy Cravings',
      image: img('restaurant interior'),
      banner: img('restaurant food spread'),
      description: 'Comfort food for every craving.',
      address: '45 Market Road',
      phone: '9876500011',
      cuisine: 'Comfort Food',
      rating: 4.3,
    },
    {
      name: 'Food Point',
      image: img('burger restaurant'),
      banner: img('burger restaurant banner'),
      description: 'We serve you quality meals.',
      address: '78 Central Avenue',
      phone: '9876511122',
      cuisine: 'Burgers & Fries',
      rating: 4.5,
    },
    {
      name: 'Japanese Food Restaurant',
      image: img('japanese food sushi'),
      banner: img('japanese restaurant banner'),
      description: 'Authentic Japanese cuisine.',
      address: '3 Sakura Lane',
      phone: '9876522233',
      cuisine: 'Japanese',
      rating: 4.8,
    },
  ]);
  console.log(`Seeded ${restaurants.length} restaurants.`);

  // --- Menu items (spread across restaurants and categories) ---
  await MenuItem.insertMany([
    // Sierra Quick Bite — burgers
    { name: 'Crispy Chicken Burger', price: 445, image: img('crispy chicken burger'), restaurant: restaurants[0]._id, category: catByName['Burger'] },
    { name: 'BBQ Bacon Burger', price: 545, image: img('bbq bacon burger'), restaurant: restaurants[0]._id, category: catByName['Burger'] },
    { name: 'Spicy Jalapeno Burger', price: 380, image: img('spicy burger'), restaurant: restaurants[0]._id, category: catByName['Burger'] },

    // Linsy Prusy Cravings — mixed
    { name: 'Vanilla Pudding Fruit Salad', price: 550, image: img('fruit pudding salad'), restaurant: restaurants[1]._id, category: catByName['Healthy Salads'] },
    { name: 'Crispy Chicken Nuggets', price: 250, image: img('chicken nuggets'), restaurant: restaurants[1]._id, category: catByName['Nuggets'] },
    { name: 'Classic French Fries', price: 200, image: img('french fries'), restaurant: restaurants[1]._id, category: catByName['French Fries'] },

    // Food Point — pizza & fries
    { name: 'Margherita Pizza', price: 650, image: img('margherita pizza'), restaurant: restaurants[2]._id, category: catByName['Pizza'] },
    { name: 'Pepperoni Pizza', price: 720, image: img('pepperoni pizza'), restaurant: restaurants[2]._id, category: catByName['Pizza'] },
    { name: 'Loaded Fries', price: 280, image: img('loaded fries cheese'), restaurant: restaurants[2]._id, category: catByName['French Fries'] },

    // Japanese Food Restaurant — sushi
    { name: 'California Crunch Roll Sushi', price: 3500, image: img('california roll sushi'), restaurant: restaurants[3]._id, category: catByName['Sushi'] },
    { name: 'Salmon Nigiri Set', price: 2800, image: img('salmon nigiri'), restaurant: restaurants[3]._id, category: catByName['Sushi'] },
    { name: 'Healthy Veggie Salad', price: 480, image: img('veggie salad bowl'), restaurant: restaurants[3]._id, category: catByName['Healthy Salads'] },
  ]);
  console.log('Seeded menu items.');

  // --- Offers ---
  await Offer.insertMany([
    {
      title: 'Fresh & Spicy Delicious Chicken',
      image: img('spicy fried chicken offer'),
      discountPercent: 50,
      restaurant: restaurants[0]._id,
    },
    {
      title: 'Special Food Offer',
      image: img('food offer banner'),
      discountPercent: 50,
      restaurant: restaurants[2]._id,
    },
    {
      title: "Today's Special",
      image: img('special meal deal'),
      discountPercent: 30,
      restaurant: restaurants[1]._id,
    },
  ]);
  console.log('Seeded offers.');

  console.log('Seeding complete!');
  await mongoose.disconnect();
  process.exit(0);
};

run().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
