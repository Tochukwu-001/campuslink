"use client";
import { theme } from "@/components/Styles";
import Image from "next/image";
import {
  HiOutlineTrash,
  HiOutlineFilter,
  HiOutlineSearch,
} from "react-icons/hi";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import React, { useState, useEffect } from "react";
import Link from "next/link";

// Define an explicit type for your news post structure
interface NewsItem {
  docId: string;
  author?: string;
  img?: string;
  cat?: string;
  title?: string;
  newsUpdate?: string;
  timestamp?: string;
  userId?: string;
  [key: string]: any; // Catch-all for extra dynamic fields
}

export default function FeedClient({ userId }) {
  // Explicitly type your state array to prevent the infered 'never[]' error
  const [feedItems, setFeedItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    const handleFetch = async () => {
      const initialItems: NewsItem[] = [];
      try {
        const querySnapshot = await getDocs(collection(db, "news"));

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const singlePost: NewsItem = {
            docId: doc.id,
            ...doc.data(),
          };
          initialItems.push(singlePost);
        });

        // Update state once after the array is completely populated
        setFeedItems(initialItems);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    handleFetch();
  }, []);

  const handleDelete = async (docId: string) => {
    if (confirm("Are you sure you want to delete this update?")) {
      try {
        // Optimistically remove from localized UI array using the matched docId
        setFeedItems((prev) => prev.filter((item) => item.docId !== docId));

        // Firestore removal operation using docId
        await deleteDoc(doc(db, "news", docId));
        console.log(
          `Document with ID ${docId} deleted successfully from Firestore.`,
        );
      } catch (error) {
        console.error("Error deleting document from Firestore: ", error);
        alert("An error occurred while trying to delete this item.");
      }
    }
  };

  return (
    <main className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Main Feed Content Area */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {feedItems.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl">
            <p className="text-slate-400 font-medium">
              No CampusLink updates available.
            </p>
          </div>
        ) : (
          feedItems.map((item) => (
            <Link
              href={"/feed/" + item.docId}
              key={item.docId}
              className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 block"
            >
              {/* Header: Author Info & Meta Details */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Author Profile Image with Initials Fallback Option */}
                  {item.img ? (
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-100">
                      <img
                        src={item.img}
                        alt={item.author || "Author"}
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-inner"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {item.author ? item.author.charAt(0) : "?"}
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 leading-tight">
                      {item.author || "Anonymous Contributor"}
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
                  {item.cat || "General"}
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

                {userId == item.userId && (
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevents default Link behavior
                        e.stopPropagation(); // Stops the click event from bubbling up to the Link wrapper
                        handleDelete(item.docId);
                      }}
                      className="flex items-center gap-1.5 text-slate-400 hover:text-red-600 transition-colors py-1 px-2.5 rounded-lg hover:bg-red-50 font-bold"
                    >
                      <HiOutlineTrash className="text-lg" />
                      <span className="text-xs font-semibold">Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
