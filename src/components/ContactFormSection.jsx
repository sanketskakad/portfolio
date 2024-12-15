import React, { useState } from 'react';
import { Send, Sparkles, CheckCircle2, Mail, User, MessageSquare, Tag } from 'lucide-react';
import confetti from 'canvas-confetti';
import RoughAnnotation from './RoughAnnotation';

export default function ContactFormSection({ theme = 'dark' }) {
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. High-Impact Celebration Fireworks Confetti Burst
    const count = 200;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // 2. Open Mailto to send contact information and message to sanket.kakad@gmail.com
    const subject = encodeURIComponent(`[Portfolio Inquiry - ${formData.topic}] from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.topic}\n\nMessage:\n${formData.message}`
    );
    
    // Trigger mailto link after a slight delay for smooth UI feedback
    setTimeout(() => {
      window.location.href = `mailto:sanket.kakad@gmail.com?subject=${subject}&body=${body}`;
    }, 400);

    setSubmitted(true);
  };

  return (
    <section id="contact" className={`py-24 relative overflow-hidden transition-colors duration-500 ${
      isDark ? 'bg-[#000000] text-[#f5f5f7]' : 'bg-[#f5f5f7] text-[#1d1d1f]'
    }`}>
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border transition-colors ${
            isDark 
              ? 'bg-[#161617] border-[#2c2c2e] text-[#2997ff]' 
              : 'bg-[#ffffff] border-[#d2d2d7] text-[#0071e3] shadow-sm'
          }`}>
            <Mail className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Direct Inquiry</span>
          </div>
          
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 ${
            isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
          }`}>
            Let's Build{' '}
            <RoughAnnotation
              type="underline"
              color="#0071e3"
              show={true}
              strokeWidth={3}
            >
              <span className="text-[#0071e3]">Generative AI Systems</span>
            </RoughAnnotation>{' '}
            Together.
          </h2>
          
          <p className={`text-base md:text-lg font-light leading-relaxed ${
            isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
          }`}>
            Send your project requirements or technical inquiries directly to <strong className="font-semibold text-[#0071e3]">sanket.kakad@gmail.com</strong>.
          </p>
        </div>

        {/* Contact Form Card */}
        <div className={`apple-glass-card rounded-3xl p-8 sm:p-12 border transition-all duration-300 ${
          isDark 
            ? 'bg-[#161617]/90 border-[#2c2c2e] shadow-2xl shadow-black/80' 
            : 'bg-[#ffffff]/90 border-[#d2d2d7] shadow-xl shadow-slate-200/50'
        }`}>
          
          {submitted ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/40 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className={`text-2xl font-bold ${isDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'}`}>
                Message Ready to Send!
              </h3>
              <p className={`text-sm max-w-md ${isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'}`}>
                Your email client has been launched with your inquiry addressed to <strong className="text-[#0071e3]">sanket.kakad@gmail.com</strong>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                    isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                  }`}>
                    <User className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Sanket Kakad"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-[#0071e3] ${
                      isDark 
                        ? 'bg-[#000000] border-[#2c2c2e] text-[#f5f5f7] placeholder-[#86868b]/50' 
                        : 'bg-[#f5f5f7] border-[#d2d2d7] text-[#1d1d1f] placeholder-[#6e6e73]/50'
                    }`}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                    isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                  }`}>
                    <Mail className="w-3.5 h-3.5 text-[#0071e3]" />
                    <span>Your Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@domain.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-[#0071e3] ${
                      isDark 
                        ? 'bg-[#000000] border-[#2c2c2e] text-[#f5f5f7] placeholder-[#86868b]/50' 
                        : 'bg-[#f5f5f7] border-[#d2d2d7] text-[#1d1d1f] placeholder-[#6e6e73]/50'
                    }`}
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                  isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                }`}>
                  <Tag className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>Subject</span>
                </label>
                <input
                  type="text"
                  name="topic"
                  required
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="Enter subject..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-[#0071e3] ${
                    isDark 
                      ? 'bg-[#000000] border-[#2c2c2e] text-[#f5f5f7] placeholder-[#86868b]/50' 
                      : 'bg-[#f5f5f7] border-[#d2d2d7] text-[#1d1d1f] placeholder-[#6e6e73]/50'
                  }`}
                />
              </div>

              {/* Message */}
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                  isDark ? 'text-[#86868b]' : 'text-[#6e6e73]'
                }`}>
                  <MessageSquare className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>Message</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project goals or architecture requirements..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all outline-none focus:ring-2 focus:ring-[#0071e3] ${
                    isDark 
                      ? 'bg-[#000000] border-[#2c2c2e] text-[#f5f5f7] placeholder-[#86868b]/50' 
                      : 'bg-[#f5f5f7] border-[#d2d2d7] text-[#1d1d1f] placeholder-[#6e6e73]/50'
                  }`}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-sm shadow-xl shadow-[#0071e3]/30 flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
              >
                <span>Submit</span>
                <Send className="w-4 h-4 text-white ml-1" />
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
