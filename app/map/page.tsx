"use client";

import dynamic from "next/dynamic";
import { BottomNav } from "@/components/layout/bottom-nav";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";

// Dynamically import map to avoid SSR issues with Leaflet
const InteractiveMap = dynamic(() => import("@/components/map/interactive-map"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-[#1a1a1a] flex items-center justify-center text-muted-foreground animate-pulse">Cargando Satélite...</div>
});

export default function MapPage() {
    return (
        <div className="h-screen w-full bg-[#1a1a1a] relative overflow-hidden text-white flex flex-col">
            {/* Map Container */}
            <div className="flex-1 relative z-0">
                <InteractiveMap />
            </div>

            {/* Overlay UI */}
            <div className="absolute top-4 left-4 right-4 pointer-events-none z-[1000] flex justify-center">
                <div className="pointer-events-auto flex items-center gap-2 bg-white/90 backdrop-blur-xl p-2 rounded-full border border-black/5 shadow-xl text-black">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-3 text-muted-foreground mr-1">Filtros</span>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-black/5 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" /> Residencial
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-black/5 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-sm" /> Industrial
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-black/5 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm" /> Terrenos
                    </button>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
