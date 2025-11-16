import { HeartIcon, StarIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { products as staticProducts, type Product } from "../../data/products";
import { useWishlist } from "../../context/WishlistContext";

const categories = [
  { name: "All", count: 12 },
  { name: "Phones", count: 4 },
  { name: "Accessories", count: 4 },
  { name: "Watches", count: 2 },
  { name: "Tablets", count: 1 },
  { name: "Gaming", count: 1 },
];

const tags = [
  "White",
  "Black",
  "Silver",
  "Headphone",
  "Smartphone",
];

const brands = [
  "Apple",
  "Samsung",
  "Google",
  "Sony",
  "Bose",
  "OnePlus",
  "Fitbit",
];

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Less than $20", min: 0, max: 20 },
  { label: "$20 - $50", min: 20, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "$500+", min: 500, max: Infinity },
];

const reviews = [
  {
    name: "Emma Chamberlin",
    rating: 5,
    text: "Excellent quality products and fast shipping. Very satisfied with my purchase!",
  },
  {
    name: "Thomas Sam",
    rating: 5,
    text: "Great experience shopping here. Customer service was responsive and helpful.",
  },
  {
    name: "Kevin Bryan",
    rating: 5,
    text: "Amazing product selection and competitive prices. Will definitely shop again!",
  },
];


export const Shop = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const [products] = useState<Product[]>(staticProducts);
  const [loading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 9;
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
    const priceMatch = product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max;
    const searchMatch = searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && priceMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.name.localeCompare(b.name);
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-600">Loading products...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      <section className="w-full bg-gray-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Shop</h1>
          <div className="flex items-center gap-2 text-sm">
            <a href="/" className="hover:text-orange-500">
              Home
            </a>
            <span>/</span>
            <span className="text-gray-400">Shop</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden h-11 px-4 border-gray-300"
            >
              <SlidersHorizontalIcon className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.name
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
            {searchQuery && <span> for "{searchQuery}"</span>}
          </p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white"
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A-Z</option>
          </select>
        </div>

        {showFilters && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setShowFilters(false)}>
            <div
              className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => {
                          setSelectedPriceRange(range);
                          setShowFilters(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedPriceRange.label === range.label
                            ? "bg-orange-50 text-orange-500 font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Brands</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => {
                          setSelectedBrand(selectedBrand === brand ? null : brand);
                          setShowFilters(false);
                        }}
                        className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedBrand === brand
                            ? "bg-orange-50 text-orange-500 font-medium"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="cursor-pointer hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedBrand(null);
                    setSelectedPriceRange(priceRanges[0]);
                    setSearchQuery("");
                    setShowFilters(false);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear All Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6 bg-gray-50 p-6 rounded-lg">
              <div>
                <h3 className="font-bold text-base mb-3">Price Range</h3>
                <ul className="space-y-2">
                  {priceRanges.map((range) => (
                    <li key={range.label}>
                      <button
                        onClick={() => setSelectedPriceRange(range)}
                        className={`text-sm hover:text-orange-500 transition-colors ${
                          selectedPriceRange.label === range.label ? "text-orange-500 font-semibold" : "text-gray-600"
                        }`}
                      >
                        {range.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-base mb-3">Brands</h3>
                <ul className="space-y-2">
                  {brands.map((brand) => (
                    <li key={brand}>
                      <button
                        onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                        className={`text-sm hover:text-orange-500 transition-colors ${
                          selectedBrand === brand ? "text-orange-500 font-semibold" : "text-gray-600"
                        }`}
                      >
                        {brand}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-base mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-20">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setSelectedPriceRange(priceRanges[0]);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {paginatedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all h-full">
                    <div className="relative aspect-square bg-gray-50">
                      <button
                        onClick={(e) => handleWishlistToggle(e, product)}
                        className={`absolute top-2 right-2 z-10 p-2 rounded-full transition-colors ${
                          isInWishlist(product.id)
                            ? 'bg-orange-50'
                            : 'bg-white/80 backdrop-blur-sm hover:bg-white'
                        }`}
                      >
                        <HeartIcon
                          className={`w-4 h-4 ${
                            isInWishlist(product.id)
                              ? 'fill-orange-500 text-orange-500'
                              : 'text-gray-700'
                          }`}
                        />
                      </button>
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                          {product.discount}
                        </div>
                      )}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-sm mb-2 line-clamp-2 text-gray-900 leading-snug">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
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
                        </div>
                        <span className="text-xs text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-500 font-bold text-base">
                          ${product.price}
                        </span>
                        {product.original_price && (
                          <span className="text-gray-400 line-through text-xs">
                            ${product.original_price}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </Button>
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-10 w-10 ${
                      currentPage === pageNum
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "variant-outline"
                    }`}
                    variant={currentPage === pageNum ? "default" : "outline"}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </Button>
            </div>
            )}
              </>
            )}
          </div>
        </div>
      </main>

      <section className="bg-gray-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="text-gray-400 mb-6 text-sm md:text-base">
            Get the latest deals and updates delivered to your inbox.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address..."
              className="bg-white text-gray-900 flex-1 h-11"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-11 px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
