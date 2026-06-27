"use client";
import React, { useState, useEffect, use } from 'react';
import { theme } from "@/components/Styles";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

export default function FeedDetailPage({ params }) {
    // Safely unwrap the async params Promise
    const resolvedParams = use(params);
    const id = resolvedParams?.id;

    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchPostDetails = async () => {
            try {
                // Fetching single document from your 'news' collection
                const docRef = doc(db, "news", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setItem({ docId: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such announcement or update found!");
                }
            } catch (error) {
                console.error("Error fetching feed details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPostDetails();
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center font-sans">
                <p className="text-slate-400 font-medium animate-pulse">Loading updates...</p>
            </main>
        );
    }

    if (!item) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center font-sans">
                <h2 className="text-xl font-bold text-slate-800 mb-2">Update Not Found</h2>
                <p className="text-slate-400 text-sm mb-6">The post you are trying to view doesn't exist or was removed.</p>
                <Link href="/feed" className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90" style={{ backgroundColor: theme.primaryColor }}>
                    Return to Feed
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-slate-800 font-sans pb-20">
            {/* Top Navigation Navigation Header Row */}
            <div className="max-w-2xl mx-auto px-4 pt-8">
                <Link href="/feed" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                    <span>←</span> Back to Feed
                </Link>
            </div>

            {/* Main Specific Post Container Card */}
            <article className="max-w-2xl mx-auto px-4 mt-6">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 md:p-8">
                    
                    {/* Meta: Category Badge & Dynamic Date */}
                    <div className="flex items-center justify-between gap-4 mb-5">
                        <span 
                            className="text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-opacity-10"
                            style={{ 
                                color: theme.secondaryColor, 
                                backgroundColor: `${theme.secondaryColor}15` 
                            }}
                        >
                            {item.cat || "General"}
                        </span>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                            <span>🕒</span>
                            <span>{item.timestamp}</span>
                        </div>
                    </div>

                    {/* Headline Post Title */}
                    <h1 
                        className="text-2xl md:text-3xl font-bold mb-6 tracking-tight leading-snug"
                        style={{ color: theme.primaryColor }}
                    >
                        {item.title}
                    </h1>

                    {/* Author Contributor Profile Profile Info Row */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100/50 mb-6">
                        {item.img ? (
                            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-100 flex-shrink-0">
                                <img 
                                    src={item.img} 
                                    alt={item.author || "Author"} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div 
                                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white shadow-inner flex-shrink-0"
                                style={{ backgroundColor: theme.primaryColor }}
                            >
                                {item.author ? item.author.charAt(0) : "?"}
                            </div>
                        )}
                        <div>
                            <p className="text-xs font-bold text-slate-700">{item.author || "Anonymous Contributor"}</p>
                            <p className="text-[10px] text-slate-400 font-medium">CampusLink Verified Publisher</p>
                        </div>
                    </div>

                    {/* Narrative News Update Content Block */}
                    <div className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-line border-b border-slate-50 pb-6 mb-4">
                        {item.desc}
                    </div>

                    {/* Footer System Identification */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium pt-2">
                        <span>CampusLink Official Context</span>
                        <span className="font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100 text-slate-400/80">ID: {item.docId}</span>
                    </div>

                </div>
            </article>
        </main>
    );
}