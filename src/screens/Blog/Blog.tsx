import { useState, useEffect } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Footer } from "../../components/Footer";
import { Navbar } from "../../components/Navbar";

const blogPosts = [
  {
    id: 1,
    title: "Technology Hacks You Probably Don't Know Yet",
    category: "Technology",
    date: "Nov 22, 2024",
    author: "John Doe",
    readTime: "5 min read",
    image: "/technology.jpeg",
    excerpt: "Technology moves fast, and with it comes a long list of shortcuts and hidden tricks that can make daily life run a little smoother.",
    content: `Technology moves fast, and with it comes a long list of shortcuts and hidden tricks that can make daily life run a little smoother. Most people only scratch the surface of what their devices can do, but a few lesser-known hacks can save time, boost productivity, and even protect your privacy.

1. Use Your Phone's Camera as a Real-Time Translator
Most smartphone cameras can instantly translate text on menus, signs, packaging, or documents. Whether you're traveling or browsing a product label, simply pointing your camera at the text can reveal the translation in your own language. It's incredibly useful and often overlooked.

2. Turn Your Old Router Into a Wi-Fi Extender
If you have an old router lying around, you can repurpose it as an extender to boost your Wi-Fi coverage. Many routers have a "repeater mode," which can refresh dead zones in your home without buying new equipment. It's a great way to breathe life into outdated tech.

3. Tap Your Phone to Share Your Wi-Fi Password
On many modern phones, you can generate a QR code that instantly shares your Wi-Fi login. No more reading out long passwords. Just open the Wi-Fi settings, tap "Share," and let guests scan the code.

4. Use Dark Mode to Save Battery Life
This isn't just about aesthetics. On OLED screens, dark mode uses noticeably less power because pixels don't need to illuminate when displaying black. If you're trying to stretch battery life through a long day, switching to dark mode helps more than you might expect.

5. Scan Documents Without a Scanner
Your phone can double as a high-quality scanner. Apps and built-in tools automatically crop, straighten, and enhance documents, making them look clean and professional. It's perfect for receipts, forms, or handwritten notes.

These hacks showcase just how much potential is hidden in the devices we use every day. Once you start exploring these features, you'll be amazed at what you discover.`,
  },
  {
    id: 2,
    title: "The Best Digital Watches to Buy This Year",
    category: "Watches",
    date: "Dec 31, 2024",
    author: "Mitch",
    readTime: "6 min read",
    image: "/bestwatches.jpg",
    excerpt: "Digital watches have become more than simple timekeepers. Today, they pack fitness tools, payment systems, and health tracking into one compact device.",
    content: `Digital watches have become more than simple timekeepers. Today, they pack fitness tools, payment systems, health tracking, and sleek designs into one compact device. With so many options on the market, choosing the right one can feel overwhelming. Here are some of the standout digital watches worth considering this year.

1. Garmin Fenix Series
Garmin remains a top choice for athletes. The Fenix line offers GPS accuracy, rugged durability, and advanced health metrics. It's perfect for anyone who loves hiking, running, or training outdoors.

2. Apple Watch Series
For iPhone users, the Apple Watch is a natural fit. The newest models bring improved battery life, faster performance, and better health sensors. The watch integrates seamlessly with Apple's ecosystem, making daily tasks easier and more connected.

3. Samsung Galaxy Watch
Android users looking for a reliable, sleek option will love the Galaxy Watch. It delivers beautiful display quality, accurate fitness tracking, and smooth performance. Its classic round face gives it a watch-like appearance while remaining fully digital.

4. Amazfit GTS Line
If you're looking for a feature-packed watch without the high price tag, Amazfit offers one of the best value-for-money choices. It includes heart-rate tracking, long battery life, and crisp visuals, all at a budget-friendly cost.

5. Casio G-Shock
Still a legend in durability, G-Shock models combine tough build quality with modern digital features. They're waterproof, shock-resistant, and great for anyone who works in active or rugged environments.

Each of these watches brings something different to the table, whether it's durability, style, smart features, or value. Finding the right one depends on how you plan to use it — fitness, travel, productivity, or everyday wear.`,
  },
  {
    id: 3,
    title: "How to Make Your Workspace More Productive",
    category: "Gadgets",
    date: "Feb 22, 2025",
    author: "John Fu",
    readTime: "4 min read",
    image: "/productivity.jpeg",
    excerpt: "Your workspace plays a major role in how well you work. Whether you're working from home or at an office, small adjustments can boost productivity.",
    content: `Your workspace plays a major role in how well you work. Whether you're running an online business, studying, or working from home, the way your environment is set up can either help or hinder your focus. A few simple adjustments can boost motivation and make daily tasks feel much easier.

1. Clear Out Visual Clutter
A clean workspace helps your mind stay clear too. Remove unnecessary items and keep only what you use daily. Minimal setups often lead to better concentration and less stress.

2. Add Proper Lighting
Good lighting is essential. Natural light is ideal, but if that's not possible, use warm, soft lighting that reduces eye strain. A desk lamp angled correctly can make a huge difference in comfort and productivity.

3. Use Ergonomic Tools
A supportive chair, proper desk height, and ergonomic keyboard can reduce fatigue and improve posture. You'll feel the difference after long hours of work.

4. Personalize With Intent
A few personal touches — a plant, artwork, or meaningful item — can make your workspace feel inviting. The key is not to overdo it. A couple of well-chosen pieces can spark creativity without causing distraction.

5. Keep a Simple Workflow System
Use notebooks, planners, or digital apps to track tasks. Staying organized prevents overwhelm and keeps your mind focused on what matters most.

Creating a productive workspace doesn't require a full remodel. With small, intentional changes, you can build an environment that supports your goals and keeps you energized throughout the day.`,
  },
];


export const Blog = (): JSX.Element => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const selectedPost = selectedPostId ? blogPosts.find(p => p.id === selectedPostId) : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Navbar />

      <main className="flex-1">
        {selectedPost ? (
          <section className="container mx-auto px-4 lg:px-8 py-8 max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => setSelectedPostId(null)}
              className="mb-6 text-gray-600 hover:text-gray-900"
            >
              ← Back to Posts
            </Button>

            <article>
              <div className="mb-6">
                <Badge variant="secondary" className="mb-4">
                  {selectedPost.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                  {selectedPost.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span>{selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="mb-8">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              <div className="prose prose-lg max-w-none">
                {selectedPost.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </section>
        ) : (
          <section className="container mx-auto px-4 lg:px-8 py-16">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
              <p className="text-gray-600 text-lg">Explore our latest articles on technology and productivity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {blogPosts.map((post) => (
                <Card
                  key={post.id}
                  className="cursor-pointer hover:shadow-xl transition-all overflow-hidden border-0 shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-3">
                        {post.date} - {post.category}
                      </p>
                      <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <Button
                        onClick={() => setSelectedPostId(post.id)}
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="bg-black text-white py-16">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Join our mailing list</h2>
            <p className="text-gray-400 mb-8">
              Sign up to receive inspiration, product updates, and special offers from our team.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                type="email"
                className="flex-1 bg-white text-black"
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
