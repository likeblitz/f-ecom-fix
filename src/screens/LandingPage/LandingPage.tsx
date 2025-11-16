import {
  HeartIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  SendIcon,
  ShoppingCartIcon,
  StarIcon,
  TagIcon,
  TrophyIcon,
  ClockIcon,
  SearchIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { products as staticProducts, type Product } from "../../data/products";
import { useWishlist } from "../../context/WishlistContext";

const categories = [
  {
    name: "Accessories",
    count: "4 Items",
    image: "/acceessories.jpeg",
  },
  {
    name: "Watches",
    count: "2 Items",
    image: "/bestwatches.jpg",
  },
  {
    name: "Tablets",
    count: "1 Item",
    image: "/pexels-photo-303383.jpeg",
  },
  {
    name: "Phones",
    count: "4 Items",
    image: "/phone.jpeg",
  },
];

const reviews = [
  {
    name: "Emma Chamberlin",
    rating: 5,
    text: "Amazing experience shopping here. Quality products and excellent customer service!",
  },
  {
    name: "Thomas Sam",
    rating: 5,
    text: "Fast shipping and exactly as described. Will definitely shop again!",
  },
  {
    name: "Kevin Bryan",
    rating: 5,
    text: "Best online store I've used. Great selection and competitive prices!",
  },
];

const features = [
  {
    icon: TrophyIcon,
    title: "Premium Quality",
    description: "We ensure all products meet the highest quality standards",
  },
  {
    icon: ClockIcon,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep",
  },
  {
    icon: TagIcon,
    title: "Best Prices",
    description: "Competitive pricing with regular discounts",
  },
];


export const LandingPage = (): JSX.Element => {
  const [allProducts] = useState<Product[]>(staticProducts);
  const [loading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const filteredProducts = allProducts.filter((product) => {
    if (searchQuery === "") return true;
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const displayProducts = searchQuery ? filteredProducts : allProducts.slice(0, 8);

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      <section className="relative w-full h-96 bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover premium tech products at unbeatable prices. Shop the latest gadgets and electronics.
            </p>
            <Link to="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white h-auto px-8 py-3">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/shop"
                className="group relative overflow-hidden rounded-lg h-48"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center text-white">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-sm">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h2 className="text-3xl font-bold">{searchQuery ? 'Search Results' : 'Featured Products'}</h2>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
              </div>
              <Link to="/shop">
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 whitespace-nowrap">
                  View All
                </Button>
              </Link>
            </div>
          </div>
          {searchQuery && (
            <p className="text-gray-600 mb-6">
              Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} matching "{searchQuery}"
            </p>
          )}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : displayProducts.length === 0 ? (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search query</p>
              <Button
                onClick={() => setSearchQuery("")}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="block"
                >
                  <Card className="group hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <div className="absolute top-2 right-2 z-10">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => handleWishlistToggle(e, product)}
                            className={`h-8 w-8 rounded-full hover:bg-gray-100 ${
                              isInWishlist(product.id) ? 'bg-orange-50' : 'bg-white'
                            }`}
                          >
                            <HeartIcon
                              className={`w-4 h-4 ${
                                isInWishlist(product.id)
                                  ? 'fill-orange-500 text-orange-500'
                                  : 'text-gray-700'
                              }`}
                            />
                          </Button>
                        </div>
                        <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        {product.discount && (
                          <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            {product.discount}
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2 line-clamp-2 text-sm">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-orange-500 font-bold">
                          ${product.price}
                        </span>
                        {product.original_price && (
                          <span className="text-gray-400 line-through text-sm">
                            ${product.original_price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-3 h-3 ${
                              i < product.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-8 text-center">
                    <Icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 text-sm">{review.text}</p>
                  <p className="font-semibold">{review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe Now</h2>
          <p className="text-gray-400 mb-8">
            Get latest news, updates and deals directly mailed to your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address..."
              className="bg-white text-gray-900 flex-1"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-auto px-8">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
