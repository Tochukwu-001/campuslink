"use client"
import { theme } from "@/components/Styles";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand/Platform Column */}
          <div className="md:col-span-1">
            <span 
              className="text-xl font-extrabold tracking-tight block mb-4"
              style={{ color: theme.primaryColor }}
            >
              Campus<span style={{ color: theme.secondaryColor }}>Link</span>
            </span>
            <p className="text-sm leading-relaxed text-slate-500">
              Empowering students across tertiary institutions to collaborate, share resources, and excel academically together.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: theme.primaryColor }}
            >
              Explore
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors duration-200">
                  Find Resources
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors duration-200">
                  Share Materials
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors duration-200">
                  Peer Mentors
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidelines/Legal Column */}
          <div>
            <h4 
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: theme.primaryColor }}
            >
              Community
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors duration-200">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-teal-600 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter/Action Column */}
          <div>
            <h4 
              className="text-sm font-bold uppercase tracking-wider mb-4"
              style={{ color: theme.primaryColor }}
            >
              Stay Updated
            </h4>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Subscribe to get notified when new curriculum resources are uploaded.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Student email" 
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
                required
              />
              <button 
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} CampusLink. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Twitter
            </Link>
            <Link href="/" className="hover:text-slate-600 transition-colors">
              GitHub
            </Link>
            <Link href="/" className="hover:text-slate-600 transition-colors">
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}