"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Mock Data ---
type Product = { id: number; name: string; price: number; img: string };
type CartItem = Product & { quantity: number; cartId: number };

const PRODUCTS: Product[] = [
  { id: 1, name: "Artisanal Water", price: 12.99, img: '💧' },
  { id: 2, name: "Deconstructed Bread", price: 8.50, img: '🍞' },
  { id: 3, name: "Invisible Apple", price: 5.20, img: '🍏' },
  { id: 4, name: "Quantum Avocado", price: 25.00, img: '🥑' },
  { id: 5, name: "Anxious Coffee", price: 14.00, img: '☕' },
  { id: 6, name: "Paradoxical Cheese", price: 13.50, img: '🧀' },
];

const AUTOCORRECT_MAP: Record<string, string> = {
  "bread": "Breadcrumbs for pigeons",
  "water": "Dehydrated water powder",
  "apple": "Apple-shaped potato",
  "milk": "Oat-flavored almond juice",
  "coffee": "Hot bean water",
  "cheese": "Solidified cow juice",
};

const ETAS = [
  "Delivery in 8 mins",
  "Arriving next Tuesday",
  "Driver lost in multiversal rift",
  "Your package has transcended time",
  "Driver is currently fighting a bear",
];

// --- Utilities ---
const generateEquation = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  const c = Math.floor(Math.random() * 50) + 10;
  return {
    equation: `Solve for x: ${a}x + ${b} = ${c}`,
    answer: ((c - b) / a).toFixed(2),
  };
};

export default function DeepDarkCommerce() {
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const [displaySearchTerm, setDisplaySearchTerm] = useState("");
  
  // Category Marquee
  const [marqueeSpeed, setMarqueeSpeed] = useState(25);
  
  // Filter Dropdown
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Captcha Modal
  const [captchaProduct, setCaptchaProduct] = useState<Product | null>(null);
  const [equation, setEquation] = useState({ equation: "", answer: "" });
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  // Checkout button pos
  const [checkoutPos, setCheckoutPos] = useState({ x: 0, y: 0 });

  // 1. Scroll Hijacking
  // UX VIOLATION: Consistency and Standards & User Control. 
  // Interfering with native browser scrolling breaks fundamental user mental models and physical expectations.
  useEffect(() => {
    const handleScroll = () => {
      // 10% chance to scroll UP when they try to scroll DOWN
      if (Math.random() < 0.10) {
        window.scrollBy({ top: -200, behavior: 'instant' });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Debounced Search Autocorrect
  // UX VIOLATION: User Control & Freedom. 
  // Autocorrecting user input to wildly incorrect items strips their agency, ignores intent, and prevents goal completion.
  useEffect(() => {
    const timer = setTimeout(() => {
      const lower = displaySearchTerm.toLowerCase();
      let matched = false;
      for (const key in AUTOCORRECT_MAP) {
        if (lower.includes(key)) {
          setSearchTerm(AUTOCORRECT_MAP[key]);
          matched = true;
          break;
        }
      }
      if (!matched) setSearchTerm(displaySearchTerm);
    }, 800);
    return () => clearTimeout(timer);
  }, [displaySearchTerm]);

  const handleProductAdd = (product: Product) => {
    setEquation(generateEquation());
    setCaptchaProduct(product);
    setCaptchaInput("");
    setCaptchaError("");
  };

  // 3. Complex Captcha Submission
  const submitCaptcha = () => {
    if (captchaInput === equation.answer || Math.abs(parseFloat(captchaInput) - parseFloat(equation.answer)) < 0.05) {
      // UX VIOLATION: Error Prevention & Consistency. 
      // Adding non-integer float quantities for discrete physical items contradicts real-world logic.
      const qty = (Math.random() * 3 + 0.1).toFixed(3);
      setCart(prev => [...prev, { ...captchaProduct!, quantity: parseFloat(qty), cartId: Math.random() }]);
      setCaptchaProduct(null);
    } else {
      setCaptchaError("Incorrect. The driver is getting further away.");
      setEquation(generateEquation());
    }
  };

  const handleCheckoutHover = () => {
    // UX VIOLATION: Fitts's Law / User Control. 
    // The primary conversion button randomly jumping away prevents task completion and causes extreme frustration.
    if (Math.random() > 0.3) {
      setCheckoutPos({
        x: (Math.random() - 0.5) * 400, // Jump randomly across X
        y: (Math.random() - 0.5) * 100  // Jump slightly across Y
      });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans pb-[400px]">
      
      {/* 
        UX VIOLATION: Aesthetic and Minimalist Design / Visibility. 
        A persistent, un-closable top banner taking up exactly 25% of the viewport severely limits usable screen real estate.
      */}
      <div className="fixed top-0 left-0 w-full h-[25vh] bg-red-600 text-white z-[999] flex flex-col justify-center items-center shadow-2xl border-b-[16px] border-yellow-400">
        <h1 className="text-4xl md:text-6xl font-black uppercase animate-pulse text-center tracking-tighter">0.01% Discount!</h1>
        <p className="text-xl md:text-3xl mt-4 font-bold tracking-widest text-center">ACT FAST! OFFER EXPIRES IN -4 SECONDS!</p>
        <p className="text-[10px] md:text-xs mt-2 opacity-60 text-center px-4 uppercase">(Terms and conditions apply. Discount only valid on leap years during a total solar eclipse. Must be left-handed.)</p>
      </div>

      <div className="pt-[30vh] max-w-7xl mx-auto px-4">
        
        {/*
          UX VIOLATION: Recognition rather than Recall. 
          Categories represented by confusing, low-contrast SVG icons with no text labels force the user to guess meaning.
        */}
        <div className="mb-14">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Shop by Category (Good luck)</h2>
          <div 
            className="w-full h-24 bg-neutral-200 overflow-hidden relative cursor-crosshair border-2 border-dashed border-neutral-300 shadow-inner"
            // UX VIOLATION: User Control. Hovering should pause continuous animations to allow interaction, not accelerate them drastically.
            onMouseEnter={() => setMarqueeSpeed(2)}
            onMouseLeave={() => setMarqueeSpeed(25)}
          >
            <motion.div 
              className="flex items-center h-full gap-16 absolute left-0"
              animate={{ x: [0, -2000] }}
              transition={{ repeat: Infinity, duration: marqueeSpeed, ease: "linear" }}
            >
              {[...Array(60)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-lg border border-neutral-300 flex items-center justify-center shrink-0 opacity-20 hover:opacity-100 bg-neutral-100 transition-opacity">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-neutral-500">
                     <path d={['M2 12h20M12 2v20', 'M5 5l14 14M5 19L19 5', 'M12 2a10 10 0 100 20 10 10 0 100-20z', 'M3 3h18v18H3z'][i % 4]} />
                   </svg>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 
          UX VIOLATION: Match between system and the real world / Consistency.
          A filter dropdown that closes immediately if the mouse moves 1 pixel outside its bounding box creates an impossibly strict interaction window.
        */}
        <div className="mb-10 relative z-40 inline-block group">
          <button 
            onMouseEnter={() => setFilterOpen(true)}
            className="bg-neutral-800 text-white px-8 py-4 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[0_0_0_0_rgba(0,0,0,1)] transition-all"
          >
            Filter By Irrelevance
          </button>
          {filterOpen && (
            <div 
              onMouseLeave={() => setFilterOpen(false)}
              className="absolute top-full left-0 mt-2 w-72 bg-white border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-4 flex flex-col gap-3"
            >
              {['Price: High to NaN', 'Alphabetical (Z to 7)', 'Edibility: Questionable', 'Size: Hypercube'].map(f => (
                <label key={f} className="flex items-center gap-3 text-sm hover:bg-neutral-200 p-2 cursor-pointer border border-transparent hover:border-black font-mono font-bold">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer accent-black" /> {f}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-24">
          {PRODUCTS.map(p => (
            <ProductCard key={p.id} product={p} onAdd={handleProductAdd} />
          ))}
        </div>

        {/* Cart & Checkout */}
        <div className="mt-20 border-t-[12px] border-black pt-16">
          <h2 className="text-5xl font-black mb-8 uppercase tracking-tighter">Your Cart (Maybe?)</h2>
          <div className="bg-white p-8 border-4 border-black mb-12 min-h-40 shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            {cart.length === 0 ? (
              <p className="text-neutral-400 italic font-serif text-lg text-center mt-10">Your cart is empty. Or is it? Yes. It is.</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {cart.map(item => (
                  <li key={item.cartId} className="flex justify-between items-center border-b-2 border-dashed border-neutral-300 pb-3">
                    <span className="font-mono text-xl">{item.img} {item.name}</span>
                    <div className="text-right">
                      {/* Random float quantity displayed in UI */}
                      <span className="block text-sm text-neutral-500 font-bold tracking-widest">QTY: {item.quantity}</span>
                      <span className="font-black text-2xl">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-neutral-50 p-10 border-4 border-neutral-300 h-[600px] overflow-y-scroll relative shadow-inner">
            <h3 className="font-black mb-6 uppercase text-neutral-800 text-2xl tracking-widest border-b-4 border-neutral-200 pb-2">Terms and Conditions of Checkout</h3>
            
            <p className="text-justify text-xs text-neutral-500 mb-8 font-serif leading-loose">
              By proceeding, you agree that Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              {/* Repeating text to create a massive scroll block */}
              {[...Array(50)].map(() => "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ")}
            </p>
            
            {/* 
              UX VIOLATION: Discoverability.
              Hiding the checkout button inside a massive block of unreadable legal text guarantees high cart abandonment.
            */}
            <motion.div 
              className="absolute left-1/2 my-20 z-50 inline-block"
              animate={{ x: checkoutPos.x, y: checkoutPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ x: "-50%" }}
            >
              <button 
                onMouseEnter={handleCheckoutHover}
                className="bg-green-500 text-black px-16 py-6 font-black uppercase text-2xl border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:bg-green-400"
              >
                Proceed to Checkout
              </button>
            </motion.div>
            
            <p className="text-justify text-xs text-neutral-500 mt-64 relative font-serif leading-loose">
              {[...Array(30)].map(() => "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ")}
            </p>
          </div>
        </div>
      </div>

      {/* Captcha Modal */}
      <AnimatePresence>
        {captchaProduct && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
          >
            <div className="bg-yellow-400 p-10 max-w-lg w-full shadow-[20px_20px_0_0_rgba(255,0,0,1)] border-8 border-black transform -rotate-2">
              <h2 className="text-3xl font-black mb-4 uppercase text-black">Human Verification</h2>
              {/* 
                UX VIOLATION: Match between system and real world. 
                Asking users to solve abstract algebraic equations just to add groceries to their cart imposes a severe cognitive load.
              */}
              <p className="font-bold text-lg mb-2 text-black">Solve this equation to prove you are not a sentient AI:</p>
              <p className="mb-8 font-mono bg-white p-6 border-4 border-black text-2xl text-center shadow-inner tracking-widest">
                {equation.equation}
              </p>
              <div className="flex flex-col gap-4">
                <input 
                  type="number" step="0.01"
                  value={captchaInput} onChange={e => setCaptchaInput(e.target.value)}
                  placeholder="Enter 'x' (2 decimal places)"
                  className="w-full border-4 border-black p-4 font-mono focus:bg-yellow-100 outline-none text-xl font-bold"
                />
                {captchaError && <span className="text-sm text-red-600 font-black bg-white p-2 border-2 border-red-600 block">{captchaError}</span>}
                <div className="flex gap-4 mt-6">
                  <button onClick={() => setCaptchaProduct(null)} className="flex-1 bg-white text-black border-4 border-black p-4 font-black uppercase hover:bg-neutral-200">Abandon Cart</button>
                  <button onClick={submitCaptcha} className="flex-1 bg-black text-white p-4 font-black uppercase hover:bg-neutral-800 tracking-widest">Verify & Add</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        UX VIOLATION: Consistency/Proximity. 
        Global search belongs at the top of the interface. Placing it at the absolute bottom of the DOM hides critical functionality.
      */}
      <div className="fixed bottom-0 left-0 w-full bg-black border-t-8 border-blue-500 p-8 z-[100] shadow-[0_-10px_50px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col gap-3">
          <label className="text-blue-400 font-black uppercase tracking-widest text-sm">Global Search (Why is this here?)</label>
          <input 
            type="text" 
            value={displaySearchTerm}
            onChange={(e) => setDisplaySearchTerm(e.target.value)}
            placeholder="Search for something simple like 'bread'..."
            className="w-full bg-neutral-900 text-blue-300 font-mono text-2xl p-6 border-4 border-neutral-700 outline-none focus:border-blue-500 transition-colors"
          />
          {searchTerm !== displaySearchTerm && searchTerm !== "" && (
            <p className="text-sm text-red-500 mt-2 font-bold animate-pulse font-mono tracking-widest">
              &gt; SYSTEM OVERRIDE: Autocorrected "{displaySearchTerm}" to "{searchTerm}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product, onAdd: (p: Product) => void }) {
  const [eta, setEta] = useState(ETAS[0]);

  // UX VIOLATION: Visibility of System Status & Trust. 
  // Randomly fluctuating ETAs destroy trust and transparency regarding the system's actual real-world state.
  useEffect(() => {
    const interval = setInterval(() => {
      setEta(ETAS[Math.floor(Math.random() * ETAS.length)]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border-4 border-black p-8 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] hover:-translate-y-2 hover:-translate-x-2 transition-all flex flex-col gap-6 group">
      <div className="text-8xl text-center py-10 bg-neutral-100 border-2 border-dashed border-neutral-300 group-hover:scale-105 transition-transform">{product.img}</div>
      <div>
        <h3 className="font-black text-2xl uppercase tracking-tighter leading-tight">{product.name}</h3>
        <p className="text-3xl font-serif text-green-700 mt-2 font-bold">${product.price.toFixed(2)}</p>
      </div>
      <div className="bg-yellow-200 border-4 border-yellow-400 text-yellow-900 p-3 text-sm font-black font-mono">
        STATUS: {eta}
      </div>
      {/* 
        This triggers the math modal 
      */}
      <button 
        onClick={() => onAdd(product)}
        className="mt-auto bg-black text-white w-full py-5 uppercase font-black tracking-widest hover:bg-neutral-800 transition-colors text-xl border-4 border-black hover:text-yellow-400"
      >
        Add to Cart
      </button>
    </div>
  );
}
