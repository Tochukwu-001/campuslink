"use client";
import { theme } from "@/components/Styles";
import Image from "next/image";
import {
  HiOutlineBookmark,
  HiOutlineShare,
  HiOutlineFilter,
  HiOutlineSearch,
} from "react-icons/hi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/config/firebase";

// Mock Data structure based on your details
const feedItems = [
  {
    id: 1,
    title: "Alternative Calculus Proofs for Engineering Freshmen",
    category: "Study Resources",
    newsUpdate:
      "Just uploaded a comprehensive breakdown of alternative visual proofs for real analysis and integration steps. Perfect if the standard textbook explanations aren't clicking!",
    timestamp: "2 hours ago",
    author: "David Alao",
    authorImg: "/authors/david.jpg", // Replace with your image assets or paths
  },
  {
    id: 2,
    title: "University of Lagos Revised Exam Timetable Released",
    category: "Campus News",
    newsUpdate:
      "The academic board has pushed back the second-semester examination kick-off date by two weeks. Updated PDFs for all departments are now downloadable in the resources tab.",
    timestamp: "5 hours ago",
    author: "Aminat Bello",
    authorImg: "", // Empty string to test fallback initials UI
  },
  {
    id: 3,
    title: "Mastering Peer-Led Study Groups: What Works?",
    category: "Teaching Methods",
    newsUpdate:
      "We're hosting a live roundtable chat this Friday discussing structural adjustments to study groups. Learn how to delegate teaching topics to improve group grade averages.",
    timestamp: "Yesterday",
    author: "Prof. Collins",
    authorImg: "/authors/collins.jpg",
  },
];

export default function FeedClient() {
    
  const handleFetch = async () => {
    const querySnapshot = await getDocs(collection(db, "news"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  };
  handleFetch()

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Main Feed Content Area */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {feedItems.map((item) => (
          <article
            key={item.id}
            className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6"
          >
            {/* Header: Author Info & Meta Details */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {/* Author Profile Image with Initials Fallback Option */}
                {item.authorImg ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-100">
                    <Image
                      src={item.authorImg}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-inner"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {item.author.charAt(0)}
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-slate-800 leading-tight">
                    {item.author}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {/* Dynamic Badge Component Categorization using theme colors */}
              <span
                className="text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-opacity-10"
                style={{
                  color: theme.secondaryColor,
                  backgroundColor: `${theme.secondaryColor}15`,
                }}
              >
                {item.category}
              </span>
            </div>

            {/* Core Updates Layout: Title and Narrative Content */}
            <h2
              className="text-lg md:text-xl font-bold mb-2 tracking-tight leading-snug hover:text-opacity-80 transition-opacity cursor-pointer"
              style={{ color: theme.primaryColor }}
            >
              {item.title}
            </h2>

            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-4 whitespace-pre-line">
              {item.newsUpdate}
            </p>

            {/* Action Footer Bar for engagement utility */}
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-slate-400 text-sm">
              <span className="text-xs font-medium text-slate-400">
                CampusLink Verified Update
              </span>

              <div className="flex items-center gap-4">
                <button
                  className="flex items-center gap-1.5 hover:text-teal-600 transition-colors py-1 px-2 rounded-lg hover:bg-slate-50"
                  style={
                    {
                      "--hover-color": theme.secondaryColor,
                    } as React.CSSProperties
                  }
                >
                  <HiOutlineBookmark className="text-lg" />
                  <span className="text-xs font-medium hidden sm:inline">
                    Save
                  </span>
                </button>

                <button className="flex items-center gap-1.5 hover:text-slate-600 transition-colors py-1 px-2 rounded-lg hover:bg-slate-50">
                  <HiOutlineShare className="text-lg" />
                  <span className="text-xs font-medium hidden sm:inline">
                    Share
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
