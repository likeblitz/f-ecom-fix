import {
  MinusIcon,
  PlusIcon,
  XIcon,
  ShoppingBagIcon,
  ArrowLeftIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

export const Cart = (): JSX.Element => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const subtotal = getTotalPrice();
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const total = subtotal - discount + shipping;

  const handleApplyCoupon = () => {
    const validCoupons: { [key: string]: number } = {
      'SAVE10': 10,
      'SAVE20': 20,
      'WELCOME': 15,
    };

    const upperCode = couponCode.toUpperCase();
    if (validCoupons[upperCode]) {
      setAppliedCoupon({ code: upperCode, discount: validCoupons[upperCode] });
    } else {
      alert('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Order placed successfully! Total: $${total.toFixed(2)}`);
    clearCart();
    setAppliedCoupon(null);
    setCouponCode("");
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col w-full min-h-screen bg-white">
        <Navbar />

        <section className="w-full bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
            <div className="flex items-center gap-2 text-sm">
              <Link to="/" className="hover:text-orange-500">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-400">Cart</span>
            </div>
          </div>
        </section>

        <main className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <ShoppingBagIcon className="w-24 h-24 text-gray-300 mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8 text-center max-w-md">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
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
          <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-400">Cart</span>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Cart Items ({items.length})</h2>
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 p-4 font-semibold text-sm">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-center">Total</div>
              </div>

              {items.map((item, index) => (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                  {index > 0 && <Separator />}
                  <div className="grid grid-cols-12 gap-4 p-4 items-center">
                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                      <Link to={`/product/${item.id}`}>
                        <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.id}`}
                          className="font-medium hover:text-orange-500 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedColor && item.selectedSize && <span> | </span>}
                          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-4 md:col-span-2 text-left md:text-center">
                      <span className="text-orange-500 font-semibold">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="col-span-5 md:col-span-3 flex items-center justify-start md:justify-center">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span className="px-4 text-sm font-semibold min-w-12 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="col-span-2 md:col-span-2 flex items-center justify-between md:justify-center">
                      <span className="font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-auto p-2 md:ml-4"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <XIcon className="w-5 h-5 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Link to="/shop">
                <Button
                  variant="outline"
                  className="border-gray-300 hover:border-orange-500 hover:text-orange-500"
                >
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {subtotal < 100 && subtotal > 0 && (
                  <p className="text-xs text-gray-500 bg-orange-50 p-2 rounded">
                    Add ${(100 - subtotal).toFixed(2)} more to get FREE shipping!
                  </p>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Apply Coupon Code</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={!!appliedCoupon}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleApplyCoupon}
                    disabled={!couponCode || !!appliedCoupon}
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-50"
                  >
                    Apply
                  </Button>
                </div>
                {appliedCoupon && (
                  <div className="mt-2 text-sm text-green-600 flex items-center justify-between">
                    <span>Coupon applied!</span>
                    <button
                      onClick={() => {
                        setAppliedCoupon(null);
                        setCouponCode("");
                      }}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Try: SAVE10, SAVE20, WELCOME
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white h-auto py-3 font-semibold"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-auto py-3"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-sm mb-3">We Accept</h3>
                <div className="flex gap-2 flex-wrap">
                  {['VISA', 'MC', 'AMEX', 'PP'].map((card) => (
                    <div
                      key={card}
                      className="px-3 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-700"
                    >
                      {card}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="w-full bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-8">
            Contact our support team for any questions about your order.
          </p>
          <Link to="/contact">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-auto px-8 py-3">
              Contact Support
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
