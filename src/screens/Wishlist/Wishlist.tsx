import {
  HeartIcon,
  ShoppingCartIcon,
  XIcon,
  ArrowLeftIcon,
  StarIcon,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

export const Wishlist = (): JSX.Element => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product, 1, product.colors[0], product.sizes[0]);
  };

  const handleMoveToCart = (product: any) => {
    addToCart(product, 1, product.colors[0], product.sizes[0]);
    removeFromWishlist(product.id);
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Navbar />

        <section className="w-full bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Wishlist</h1>
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-400">Wishlist</span>
            </div>
          </div>
        </section>

        <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <HeartIcon className="w-24 h-24 text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-600 mb-8 text-center max-w-md">
            Start adding products you love to your wishlist and they'll appear here!
          </p>
          <Link to="/shop">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-auto px-8 py-3">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      <section className="w-full bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Wishlist</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-400">Wishlist</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">My Wishlist ({items.length} {items.length === 1 ? 'item' : 'items'})</h2>
          <Button
            variant="outline"
            onClick={clearWishlist}
            className="text-red-500 border-red-500 hover:bg-red-50"
          >
            Clear Wishlist
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {items.map((item) => (
            <Card
              key={item.id}
              className="group relative overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 hover:bg-red-50 transition-colors shadow-md"
                >
                  <XIcon className="w-4 h-4 text-red-500" />
                </button>

                <Link to={`/product/${item.id}`}>
                  <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>

                <Link
                  to={`/product/${item.id}`}
                  className="block mb-2"
                >
                  <h3 className="font-semibold text-sm line-clamp-2 hover:text-orange-500 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-orange-500 font-bold">
                    ${item.price}
                  </span>
                  {item.original_price && (
                    <span className="text-gray-400 line-through text-sm">
                      ${item.original_price}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-3 h-3 ${
                        i < item.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    ({item.reviews})
                  </span>
                </div>

                <div className="space-y-2">
                  <Button
                    onClick={() => handleMoveToCart(item)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white h-auto py-2 text-sm"
                  >
                    <ShoppingCartIcon className="w-4 h-4 mr-2" />
                    Move to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="my-12" />

        <div className="flex justify-between items-center">
          <Link to="/shop">
            <Button
              variant="outline"
              className="border-gray-300 hover:border-orange-500 hover:text-orange-500"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <Link to="/cart">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white h-auto px-8 py-3">
              View Cart
            </Button>
          </Link>
        </div>
      </main>

      <section className="w-full bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Shop?</h2>
          <p className="text-gray-400 mb-8">
            Browse our collection and find more products you'll love.
          </p>
          <Link to="/shop">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-auto px-8 py-3">
              Explore Products
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
