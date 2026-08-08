import { ArrowRight } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const About = () => {
  const navigate = useNavigate();
  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-volt rounded-3xl flex bg-[rgb(200,244,0)] text-black items-center justify-center mx-auto mb-6 animate-float">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-zap text-black fill-ink"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
            </svg>
          </div>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl mb-5">
            About{" "}
            <span className="text-volt text-[rgb(200,244,0)]">SkyMart</span>
          </h1>
          <p className="text-white/40 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            SkyMart is a next-generation e-commerce platform built to make
            online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          <div className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide text-[rgb(200,244,0)] lucide-package text-volt mx-auto mb-2"
            >
              <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
              <path d="M12 22V12"></path>
              <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
              <path d="m7.5 4.27 9 5.15"></path>
            </svg>
            <p className="font-heading font-bold text-2xl text-white">20K+</p>
            <p className="text-white/30 text-xs font-body mt-1">Products</p>
          </div>
          <div className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-users text-[rgb(200,244,0)] text-volt mx-auto mb-2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <p className="font-heading font-bold text-2xl text-white">50K+</p>
            <p className="text-white/30 text-xs font-body mt-1">
              Happy Customers
            </p>
          </div>
          <div className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-star text-[rgb(200,244,0)] text-volt mx-auto mb-2"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
            </svg>
            <p className="font-heading font-bold text-2xl text-white">4.9</p>
            <p className="text-white/30 text-xs font-body mt-1">Avg. Rating</p>
          </div>
          <div className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-truck text-[rgb(200,244,0)] text-volt mx-auto mb-2"
            >
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
              <path d="M15 18H9"></path>
              <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
              <circle cx="17" cy="18" r="2"></circle>
              <circle cx="7" cy="18" r="2"></circle>
            </svg>
            <p className="font-heading font-bold text-2xl text-white">99%</p>
            <p className="text-white/30 text-xs font-body mt-1">
              On-time Delivery
            </p>
          </div>
        </div>
        <div className="bg-[#111] border border-white/8 rounded-3xl p-8 sm:p-10 mb-12">
          <h2 className="font-heading font-bold text-2xl mb-4">Our Story</h2>
          <div className="space-y-4 text-white/50 font-body text-sm leading-relaxed">
            <p>
              SkyMart started in 2022 as a small side project — two engineers
              tired of bloated, slow e-commerce experiences. We asked ourselves:
              what if shopping online was actually
              <em className="text-white/70"> enjoyable</em>?
            </p>
            <p>
              Three years later, SkyMart serves over 50,000 customers across the
              country. We stock electronics, fashion, jewelry, and everyday
              essentials — all at prices that don't require a second mortgage.
            </p>
            <p>
              We're still the same team at heart: obsessed with speed,
              transparency, and making you feel good about every purchase you
              make here.
            </p>
          </div>
        </div>
        <section className="mb-12">
          <h2 className="font-heading font-bold text-2xl mb-6 text-center">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#111] border border-white/8 hover:border-volt/25 rounded-2xl p-6 transition-all duration-200 flex gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide text-[rgb(200,244,0)] lucide-shield-check text-volt"
                >
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-1">
                  Trust
                </h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">
                  Every product is verified for quality and authenticity before
                  listing.
                </p>
              </div>
            </div>
            <div className="bg-[#111] border border-white/8 hover:border-volt/25 rounded-2xl p-6 transition-all duration-200 flex gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shrink-0 text-[rgb(200,244,0)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-truck text-volt"
                >
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <path d="M15 18H9"></path>
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-1">
                  Speed
                </h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">
                  We obsess over delivery times so your orders arrive when
                  promised.
                </p>
              </div>
            </div>
            <div className="bg-[#111] border border-white/8 hover:border-volt/25 rounded-2xl p-6 transition-all duration-200 flex gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide text-[rgb(200,244,0)] lucide-heart-handshake text-volt"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"></path>
                  <path d="m18 15-2-2"></path>
                  <path d="m15 18-2-2"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-1">
                  Community
                </h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">
                  Built around real customer feedback, not just business
                  metrics.
                </p>
              </div>
            </div>
            <div className="bg-[#111] border border-white/8 hover:border-volt/25 rounded-2xl p-6 transition-all duration-200 flex gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-star text-[rgb(200,244,0)] text-volt"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-base mb-1">
                  Quality
                </h3>
                <p className="text-white/40 font-body text-sm leading-relaxed">
                  We curate the best — no filler, no junk, just great products.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="font-heading font-bold text-2xl mb-6 text-center">
            Meet the Team
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 text-ink rounded-2xl flex items-center justify-center font-heading font-bold text-xl mx-auto mb-3 bg-[rgb(200,244,0)]  text-black">
                A
              </div>
              <p className="font-body font-semibold text-white/80 text-sm">
                Aryan Shah
              </p>
              <p className="text-white/30 text-xs mt-0.5">Founder &amp; CEO</p>
            </div>
            <div className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-heading font-bold text-xl mx-auto mb-3">
                P
              </div>
              <p className="font-body font-semibold text-white/80 text-sm">
                Priya Mehta
              </p>
              <p className="text-white/30 text-xs mt-0.5">Head of Product</p>
            </div>
            <div className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center font-heading font-bold text-xl mx-auto mb-3">
                R
              </div>
              <p className="font-body font-semibold text-white/80 text-sm">
                Rohan Verma
              </p>
              <p className="text-white/30 text-xs mt-0.5">Lead Engineer</p>
            </div>
            <div className="bg-[#111] border border-white/8 rounded-2xl p-5 text-center">
              <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center font-heading font-bold text-xl mx-auto mb-3">
                S
              </div>
              <p className="font-body font-semibold text-white/80 text-sm">
                Sneha Kapoor
              </p>
              <p className="text-white/30 text-xs mt-0.5">Design Director</p>
            </div>
          </div>
        </section>
        <div className="bg-volt/8 border border-volt/20 rounded-3xl p-8 text-center">
          <h2 className="font-heading font-bold text-2xl text-white mb-3">
            Ready to shop?
          </h2>
          <p className="text-white/40 font-body text-sm mb-6">
            Explore thousands of products at unbeatable prices.
          </p>
          <button
            onClick={() => navigate("/main/shop")}
            className="inline-flex items-center gap-2 rounded-2xl bg-[rgb(200,244,0)] px-8 py-4 text-base font-semibold text-black transition-all cursor-pointer duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(200,244,0,.25)]"
          >
            Browse Products
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
};

export default About;
