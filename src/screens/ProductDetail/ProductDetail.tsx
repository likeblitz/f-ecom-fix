import {
  HeartIcon,
  StarIcon,
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
  CheckIcon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { products as staticProducts, type Product } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const productReviews = [
  {
    name: "Emma Chamberlin",
    rating: 5,
    text: "Amazing product quality! Exceeded my expectations. Fast shipping and excellent customer service.",
  },
  {
    name: "Thomas Sam",
    rating: 5,
    text: "Best purchase I've made. The product is exactly as described and arrived well-packaged.",
  },
  {
    name: "Kevin Bryan",
    rating: 5,
    text: "Highly recommend! Great value for money and the quality is outstanding.",
  },
];

export const ProductDetail = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [allProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProductAndRelated();
  }, [id]);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || "");
      setSelectedSize(product.sizes[0] || "");
    }
  }, [product]);

  const fetchProductAndRelated = () => {
    setLoading(true);
    const foundProduct = staticProducts.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product) return;

    setIsLoading(true);

    setTimeout(() => {
      addToCart(product, quantity, selectedColor, selectedSize);
      setAddedToCart(true);
      setIsLoading(false);
      setTimeout(() => setAddedToCart(false), 2000);
    }, 500);
  };

  const getRelatedProducts = () => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <a href="/shop">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Back to Shop
              </Button>
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = getRelatedProducts();

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:text-orange-500">
              Home
            </a>
            <span>/</span>
            <a href="/shop" className="hover:text-orange-500">
              Shop
            </a>
            <span>/</span>
            <span className="text-gray-400">{product.name}</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center" style={{ height: "500px" }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-auto h-auto object-contain p-8"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.rating
                        ? "fill-orange-400 text-orange-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-orange-500">${product.price}</span>
              {product.original_price && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.original_price}
                </span>
              )}
              {product.discount && (
                <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                  {product.discount}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 rounded border-2 transition-all ${
                      selectedColor === color
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300 hover:border-orange-500"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border-2 transition-all ${
                      selectedSize === size
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-300 hover:border-orange-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className="px-4 py-2 min-w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={isLoading || addedToCart}
                className={`flex-1 h-auto py-3 gap-2 ${
                  addedToCart
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
              >
                {addedToCart ? (
                  <>
                    <CheckIcon className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : isLoading ? (
                  "Adding..."
                ) : (
                  <>
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  if (product) {
                    if (isInWishlist(product.id)) {
                      removeFromWishlist(product.id);
                    } else {
                      addToWishlist(product);
                    }
                  }
                }}
                className={`h-12 w-12 border-2 ${
                  product && isInWishlist(product.id)
                    ? 'border-orange-500 bg-orange-50'
                    : ''
                }`}
              >
                <HeartIcon
                  className={`w-5 h-5 ${
                    product && isInWishlist(product.id)
                      ? 'fill-orange-500 text-orange-500'
                      : ''
                  }`}
                />
              </Button>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">SKU:</span>
                <span className="font-semibold">{product.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-semibold">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Availability:</span>
                <span className="font-semibold text-green-600">In Stock</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-16" />

        <div className="mb-16">
          <div className="flex gap-8 border-b mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-4 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                activeTab === "description"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-600 hover:text-orange-500"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("info")}
              className={`pb-4 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                activeTab === "info"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-600 hover:text-orange-500"
              }`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 border-b-2 font-semibold whitespace-nowrap transition-colors ${
                activeTab === "reviews"
                  ? "border-orange-500 text-orange-500"
                  : "border-transparent text-gray-600 hover:text-orange-500"
              }`}
            >
              Reviews ({product.reviews})
            </button>
          </div>

          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "info" && (
            <div className="prose max-w-none">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Specifications</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Category: {product.category}</li>
                    <li>Available Colors: {product.colors.join(", ")}</li>
                    <li>Available Sizes: {product.sizes.join(", ")}</li>
                    <li>Rating: {product.rating}/5 ({product.reviews} reviews)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Warranty</h4>
                  <p className="text-gray-600">This product comes with a standard 1-year manufacturer's warranty.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6">
              {productReviews.map((review, index) => (
                <div key={index} className="border-b pb-6 last:border-b-0">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-gray-900 mb-2">{review.name}</p>
                  <p className="text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <a
                  key={relProduct.id}
                  href={`/product/${relProduct.id}`}
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-shadow h-full">
                    <CardContent className="p-4">
                      <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <img
                          src={relProduct.image}
                          alt={relProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-sm line-clamp-2 mb-2">
                        {relProduct.name}
                      </h4>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-orange-500 font-bold text-sm">
                          ${relProduct.price}
                        </span>
                        {relProduct.original_price && (
                          <span className="text-gray-400 line-through text-xs">
                            ${relProduct.original_price}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-3 h-3 ${
                              i < relProduct.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <section className="bg-gray-900 text-white py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Now</h2>
          <p className="text-gray-400 mb-8">
            Get latest news, updates and deals directly to your inbox.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
