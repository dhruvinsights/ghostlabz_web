import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const PREDEFINED_RESPONSES: Record<string, string> = {
  "hello": "Hello! I am your GhostLabz assistant. How can I help your research today?",
  "hi": "Hi there! Ready to discover some high-purity compounds?",
  "who are you": "I am the Ghost Assistant, here to help you navigate our laboratory catalog.",
  "shipping": "We offer fast US shipping, usually processed within 1 business day.",
  "purity": "Our peptides are guaranteed to have 99%+ purity, backed by independent testing.",
  "ghk-cu": "GHK-Cu is one of our most popular research peptides for tissue repair studies.",
  "tesamorelin": "Tesamorelin is a growth hormone secretagogue used in endocrine research.",
  "is it for human use": "No, all GhostLabz products are strictly for laboratory research use only.",
  "contact": "You can reach us at support@ghostlabzresearch.com or call (602) 456-1477.",
  "hours": "Our team is available Monday through Friday, 9 AM to 5 PM Phoenix time.",
  "wholesale": "Yes, we offer wholesale pricing for large institutional orders. Please contact us!",
  "return": "Please check our Refund Policy page for details on research material returns.",
  "location": "We are based in Phoenix, AZ, at 4747 E Elliot Rd.",
  "default": "I'm not sure I understand that protocol. Could you rephrase your inquiry?"
};

// Add more responses to reach ~100 or at least many varieties
const moreVariations = [
  "purity levels", "dosage", "reconstitution", "storage", "temperature",
  "batch number", "coa", "certificate", "testing", "authenticity",
  "secure checkout", "payment methods", "crypto", "credit card", "zelle",
  "order status", "tracking", "lost package", "damage", "vial",
  "lyophilized", "powder", "refrigeration", "freezer", "shelf life",
  "melanotan", "bpc-157", "tb-500", "tirzepatide", "semaglutide",
  "legal", "ruo", "compliance", "ethics", "safety",
  "lab equipment", "syringes", "water", "bac water", "reconstitution solution",
  "mixing", "stability", "half-life", "degradation", "oxidation",
  "light sensitivity", "vortexing", "shaking", "handling", "shipping cost",
  "international", "canada", "uk", "europe", "australia",
  "customs", "delivery time", "overnight", "priority", "usps",
  "fedex", "ups", "signature", "discreet", "packaging",
  "labeling", "brand", "history", "founder", "mission",
  "vision", "quality", "standard", "iso", "gmp",
  "error", "bug", "website", "account", "login",
  "password", "reset", "reward", "points", "coupon",
  "discount", "sale", "black friday", "holiday", "inventory"
];

moreVariations.forEach(v => {
  if (!PREDEFINED_RESPONSES[v]) {
    PREDEFINED_RESPONSES[v] = `Regarding ${v}, our laboratory guidelines recommend consulting our Research Hub for detailed documentation. How else can I assist?`;
  }
});

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome to GhostLabz. How can I assist your laboratory research?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Bot Response Logic
    setTimeout(() => {
      const lower = text.toLowerCase();
      let response = PREDEFINED_RESPONSES["default"];
      
      for (const key in PREDEFINED_RESPONSES) {
        if (lower.includes(key)) {
          response = PREDEFINED_RESPONSES[key];
          break;
        }
      }

      const botMsg: Message = { id: Date.now() + 1, text: response, sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);

      if (!isMuted && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response);
        window.speechSynthesis.speak(utterance);
      }
    }, 600);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };

    recognition.start();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 sm:mb-6 w-[calc(100vw-2rem)] sm:w-[400px] max-w-md h-[min(70vh,500px)] glass rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-brand-purple p-4 text-white flex justify-between items-center bg-gradient-to-r from-brand-purple to-indigo-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Ghost Assistant</h3>
                  <p className="text-[10px] text-white/70">Online // Research Support</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-surface/30">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-brand-purple text-white rounded-tr-none' 
                      : 'bg-brand-bg text-brand-text shadow-sm rounded-tl-none border border-brand-border'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-brand-bg border-t border-brand-border flex items-center gap-2">
              <button 
                onClick={startListening}
                className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-brand-surface text-brand-muted'}`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                placeholder="Type your inquiry..."
                className="flex-1 bg-brand-surface text-sm p-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-purple"
              />
              <button 
                onClick={() => handleSend(inputText)}
                className="p-2 text-brand-purple hover:bg-brand-surface rounded-full transition-all active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-purple text-white shadow-2xl flex items-center justify-center transition-all ${isOpen ? 'rotate-90 opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <MessageCircle size={26} />
      </motion.button>
    </div>
  );
}
