import { Mail as MailIcon, MapPin as MapPinIcon, Phone as PhoneIcon, Send as SendIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

const footerLinks = {
  support: [
    { name: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh", icon: "location", href: null },
    { name: "basicstore@gmail.com", icon: "email", href: null },
    { name: "+88015-88888-9999", icon: "phone", href: null },
    { name: "Contact", icon: null, href: "/contact" },
  ],
  account: [
    { name: "My Account", href: "/login" },
    { name: "Login / Register", href: "/login" },
    { name: "Cart", href: "/cart" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Shop", href: "/shop" },
  ],
};

export const Footer = (): JSX.Element => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Exclusive</h3>
            <p className="text-sm mb-4">Subscribe</p>
            <p className="text-sm text-gray-400 mb-4">
              Get 10% off your first order
            </p>
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-white text-white pr-10"
              />
              <SendIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.support.map((link, index) => (
                <li key={index} className="flex items-start gap-2">
                  {link.icon === "location" && (
                    <MapPinIcon className="w-4 h-4 mt-1 flex-shrink-0 text-orange-500" />
                  )}
                  {link.icon === "email" && (
                    <MailIcon className="w-4 h-4 mt-1 flex-shrink-0 text-orange-500" />
                  )}
                  {link.icon === "phone" && (
                    <PhoneIcon className="w-4 h-4 mt-1 flex-shrink-0 text-orange-500" />
                  )}
                  {link.href ? (
                    <Link to={link.href} className="hover:text-orange-500 transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <span>{link.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {footerLinks.account.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="hover:text-orange-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="bg-gray-800 mb-8" />

        <div className="text-center text-sm text-gray-400">
          <p>&copy; Copyright Rimel 2024. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};
