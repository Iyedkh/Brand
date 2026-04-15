const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const User = require('../models/userModel');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const products = [
  {
    name: "Oversized Wool Blend Coat",
    description: "Long sleeve coat made of a wool blend. Lapel collar and long sleeves. Front welt pockets. Matching lining. Double-breasted button fastening at the front.",
    price: 159.00,
    images: [
      "https://images.unsplash.com/photo-1539109132314-d4a8c62e40dc?auto=format&fit=crop&q=80&w=1974",
      "https://images.unsplash.com/photo-1544022613-e87ec7506bbd?auto=format&fit=crop&q=80&w=1974"
    ],
    category: "Women",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Black"],
    stock: 10,
    rating: 4.5,
    numReviews: 12
  },
  {
    name: "Relaxed Fit Cotton Shirt",
    description: "Relaxed fit shirt made of cotton fabric. Spread collar and long sleeves with buttoned cuffs. Button-up front.",
    price: 49.90,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1976",
      "https://images.unsplash.com/photo-1621072124578-83737ec38459?auto=format&fit=crop&q=80&w=1974"
    ],
    category: "Men",
    sizes: ["M", "L", "XL"],
    colors: ["White", "Blue"],
    stock: 25,
    rating: 4.8,
    numReviews: 8
  },
  {
    name: "Satin Finish Midi Dress",
    description: "Midi dress made of fabric with a satin finish. Round neck and short sleeves. Back slit at the hem. Back hidden in-seam zip fastening.",
    price: 69.90,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1966",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=1976"
    ],
    category: "Women",
    sizes: ["XS", "S", "M"],
    colors: ["Black", "Champagne"],
    stock: 15,
    rating: 4.2,
    numReviews: 20
  },
  {
    name: "Technical Bomber Jacket",
    description: "Bomber jacket with a rib collar and long sleeves. Welt pockets at the waist and an inside pocket detail. Ribbed trims. Zip-up front.",
    price: 89.90,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=2072"
    ],
    category: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "Olive"],
    stock: 8,
    rating: 4.6,
    numReviews: 5
  }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
