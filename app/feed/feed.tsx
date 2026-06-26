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
import React, { useState, useEffect } from 'react';


export default function FeedClient() {
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const initialItems: object[] = []
      try {
        const querySnapshot = await getDocs(collection(db, "news"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const singlePost = {
            docId: doc.id,
            ...doc.data()
          }

          initialItems.push(singlePost)
          setFeedItems(initialItems)
        });
        console.log(feedItems);
    
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
    handleFetch();
    
  }, []);

  const handleDelete = async (id: any) => {
    if (confirm("Are you sure you want to delete this update?")) {
      try {
        // Optimistically remove from localized UI array state
        setFeedItems((prev) => prev.filter((item) => item.id !== id));

        // Firestore removal operation
        await deleteDoc(doc(db, "news", id));
        console.log(`Document with ID ${id} deleted successfully from Firestore.`);
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
            <p className="text-slate-400 font-medium">No CampusLink updates available.</p>
          </div>
        ) : (
          feedItems.map((item, i) => (
            <article
              key={i}
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

                <div className="flex items-center">
                  {/* Swapped Save/Share buttons for this unified Delete Trigger */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-red-600 transition-colors py-1 px-2.5 rounded-lg hover:bg-red-50 font-bold"
                  >
                    <HiOutlineTrash className="text-lg" />
                    <span className="text-xs font-semibold">
                      Delete
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}