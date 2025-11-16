import {
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

const contactInfo = {
  email: "exclusive@gmail.com",
  phone: "+88015-88888-9999",
  address: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh",
};

const stores = [
  {
    name: "USA",
    address: "730 Glenstone Ave 65802, Springfield US",
    phone: "+1 (555) 123-4567",
    email: "usa@beststore.com",
  },
  {
    name: "France",
    address: "13 Rue Montmartre 75001, Paris France",
    phone: "+33 1 23 45 67 89",
    email: "france@beststore.com",
  },
];


const footerLinks = {
  support: [
    { name: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh", icon: "location" },
    { name: "exclusive@gmail.com", icon: "email" },
    { name: "+88015-88888-9999", icon: "phone" },
  ],
  account: ["My Account", "Login / Register", "Cart", "Wishlist", "Shop"],
  quickLink: ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"],
};

export const Contact = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      <section className="relative w-full h-48 bg-gradient-to-r from-gray-800 to-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-2">Contact</h1>
        <div className="flex items-center gap-2 text-sm">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span>/</span>
          <span>Contact</span>
        </div>
      </section>

      <main className="flex flex-col items-center w-full">
        <section className="w-full max-w-6xl px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Info</h2>
              <p className="text-gray-600 mb-6">
                We'd love to hear from you. Here's how you can reach us.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MailIcon className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-gray-600">{contactInfo.email}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-gray-600">{contactInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div className="text-gray-600">{contactInfo.address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Any Questions?</h2>
              <p className="text-gray-600 mb-6">
                Use the form below to get in touch with us.
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Your name" />
                  <Input placeholder="Your email" type="email" />
                </div>
                <Input placeholder="Subject" />
                <Textarea
                  placeholder="Write your message here..."
                  className="min-h-32"
                />
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white h-auto py-3">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="w-full max-w-6xl px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden min-h-[300px]">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <MapPinIcon className="w-16 h-16" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Our Stores</h2>
              <p className="text-gray-600 mb-6">
                Find us at one of our store locations.
              </p>
              <div className="space-y-6">
                {stores.map((store, index) => (
                  <div key={index}>
                    <h3 className="font-bold mb-2">{store.name}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>{store.address}</div>
                      <div>{store.phone}</div>
                      <div>{store.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-gray-900 py-16">
          <div className="max-w-6xl mx-auto px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Subscribe Us Now
            </h2>
            <p className="text-gray-400 mb-8">
              Get latest news, updates and deals directly mailed to your inbox.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <Input
                placeholder="Your email address..."
                className="bg-white"
                type="email"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white h-auto px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
