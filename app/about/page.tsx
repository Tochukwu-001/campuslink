"use client";
import React from "react";
import { theme } from "@/components/Styles";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans antialiased pb-24">
      {/* Top Header/Navigation Link */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link 
          href="/feed" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
        >
          <span>←</span> Back to Feed
        </Link>
      </div>

      {/* Hero Section */}
      <section className="max-w-3xl mx-auto px-6 mt-16 text-center">
        <span 
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-md bg-opacity-10 mb-4 inline-block"
          style={{
            color: theme.secondaryColor,
            backgroundColor: `${theme.secondaryColor}15`,
          }}
        >
          Our Mission
        </span>
        <h1 
          className="text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight"
          style={{ color: theme.primaryColor }}
        >
          Connecting Campus Life, One Update at a Time.
        </h1>
        <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          CampusLink is a verified, community-driven platform built to streamline academic updates, peer resources, and essential news across our institution.
        </p>
      </section>

      {/* Core Breakdown Section */}
      <section className="max-w-4xl mx-auto px-6 mt-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 shadow-sm">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white mb-5 shadow-sm text-lg"
              style={{ backgroundColor: theme.primaryColor }}
            >
              📢
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Verified Real-Time News</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              No more digging through scattered social channels or outdated notice boards. Get instant access to timetables, structural group shifts, and official student adjustments direct from peers and publishers.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 shadow-sm">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white mb-5 shadow-sm text-lg"
              style={{ backgroundColor: theme.secondaryColor }}
            >
              📚
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Peer-Led Resources</h3>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Empowering students to share visual alternative proofs, structured summaries, and dynamic learning methods. If an academic textbook explanation isn't clicking, find a visual peer perspective that makes sense.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Callout Section */}
      <section className="max-w-3xl mx-auto px-6 mt-16">
        <div 
          className="rounded-3xl p-8 md:p-10 border-l-4 shadow-sm bg-slate-50"
          style={{ borderLeftColor: theme.secondaryColor }}
        >
          <h3 className="text-xs font-black mb-3 uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <span>🛡️</span> Accountability & Quality
          </h3>
          <p className="text-slate-700 font-medium text-base md:text-lg leading-relaxed">
            We believe that local campus information should be accurate and accountable. Every update published on CampusLink is mapped directly to a verified account profile, keeping our community communication highly reliable, clean, and organized.
          </p>
        </div>
      </section>

      {/* Small Minimalist Footer Branding */}
      <section className="max-w-2xl mx-auto text-center mt-24 pt-8 border-t border-slate-100">
        <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
          CampusLink &copy; {new Date().getFullYear()}
        </p>
      </section>
    </main>
  );
}