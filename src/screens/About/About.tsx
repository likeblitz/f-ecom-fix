import { CreditCard as CreditCardIcon, Headphones as HeadphonesIcon, Smartphone as SmartphoneIcon, Star as StarIcon, Truck as TruckIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

const features = [
  {
    icon: TruckIcon,
    title: "Free Delivery",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: CreditCardIcon,
    title: "Secure Payment",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: HeadphonesIcon,
    title: "Help Center",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    icon: SmartphoneIcon,
    title: "Shop Smart Devices",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const reviews = [
  {
    text: "Outstanding service and product quality. My Samsung Galaxy Watch 6 arrived in perfect condition and works flawlessly. The entire ordering process was smooth and delivery was faster than expected. I'll definitely be coming back.",
    rating: 5,
    author: "David Chen",
  },
  {
    text: "Excellent experience shopping here. I purchased a Dell XPS 13 Plus and the specifications match exactly what was advertised. The tech support team was incredibly helpful when I had questions. Very impressed overall.",
    rating: 4,
    author: "Lisa Rodriguez",
  },
  {
    text: "Premium quality products with competitive pricing. The Sony WF-1000XM5 earbuds I bought are worth every penny. Amazing sound clarity and the active noise cancellation is industry-leading. Highly recommend this store.",
    rating: 5,
    author: "Kevin Park",
  },
];


const footerLinks = {
  company: [
    { label: "About", href: "#" },
    { label: "Features", href: "#" },
    { label: "Works", href: "#" },
    { label: "Career", href: "#" },
  ],
  help: [
    { label: "Customer Support", href: "#" },
    { label: "Delivery Details", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
  resources: [
    { label: "Free eBooks", href: "#" },
    { label: "Development Tutorial", href: "#" },
    { label: "How to - Blog", href: "#" },
    { label: "Youtube Playlist", href: "#" },
  ],
};

export const About = (): JSX.Element => {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <section className="bg-gray-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <nav className="text-sm mb-4">
            <span className="text-gray-400">Home</span>
            <span className="mx-2">/</span>
            <span>About</span>
          </nav>
          <h1 className="text-4xl font-bold">About Us</h1>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Modern technology workspace with laptop and devices"
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Your Premier Digital Technology Store
            </h2>
            <p className="text-gray-600 mb-4">
              We are dedicated to providing the latest and greatest in digital technology. 
              From cutting-edge smartphones and laptops to innovative smart watches and audio devices, 
              we carefully curate our selection to bring you only the highest quality products from 
              trusted brands.
            </p>
            <p className="text-gray-600 mb-6">
              Our commitment goes beyond just selling products. We believe in building lasting 
              relationships with our customers by offering exceptional service, competitive pricing, 
              and expert guidance to help you make the best technology choices for your needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Customer's Review
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-none shadow-sm">
                <CardContent className="pt-6">
                  <p className="text-gray-600 text-sm mb-4">{review.text}</p>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-orange-500 text-orange-500"
                            : "fill-gray-300 text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="font-semibold text-sm">{review.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Subscribe to Now</h2>
          <p className="text-gray-400 mb-6">Get latest news and updates</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-gray-900 flex-1"
            />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white h-auto px-6">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
