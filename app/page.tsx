import { theme } from "@/components/Styles";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* Hero Section with Restored Background Image */}
      <section className="min-h-dvh bg-[url('/bg.jpg')] bg-no-repeat bg-center bg-cover">
        {/* Light overlay tint to make text pop while showcasing the image */}
        <div className="min-h-dvh bg-black/60 flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <span 
              className="inline-block text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-teal-100/80 mb-6"
            >
              Academic Collaboration Hub
            </span>
            
            <h1 
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white"
            >
              Connect With Peers
            </h1>
            
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              A hub for students and aspiring students of various tertiary institutions to connect, share resources, and discover diverse teaching methods to drastically improve academic performance.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 transition-all duration-200 text-white text-center"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                Share Resources
              </Link>
              <Link 
                href="/" 
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium border-2 text-center"
                style={{ color: theme.secondaryColor }}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features / Benefits Section */}
      <section className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.primaryColor }}>
              Everything you need to excel together
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Skip the struggle of studying alone. Leverage the collective knowledge of students across multiple institutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-teal-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" style={{ color: theme.secondaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: theme.primaryColor }}>Resource Library</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Access lecture notes, past questions, and summaries contributed by top-performing students across various departments.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-teal-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" style={{ color: theme.secondaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: theme.primaryColor }}>Peer Mentorship</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect directly with peers who understand your curriculum and can explain complex topics using relatable methods.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-teal-200 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" style={{ color: theme.secondaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: theme.primaryColor }}>Diverse Methods</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Everyone learns differently. Discover alternative explanations, video breakdowns, and visual aids for tough courses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div 
          className="max-w-4xl mx-auto rounded-3xl p-10 md:p-16 text-center text-white shadow-xl relative overflow-hidden"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to elevate your learning?
            </h2>
            <p className="text-indigo-200 max-w-xl mx-auto mb-8 text-base md:text-lg">
              Join thousands of students from tertiary institutions sharing knowledge daily. Sign up today and never study alone again.
            </p>
            <Link 
              href="/" 
              className="inline-block px-8 py-4 bg-white font-semibold rounded-xl shadow-lg hover:bg-slate-100 transition-colors duration-200"
              style={{ color: theme.primaryColor }}
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}