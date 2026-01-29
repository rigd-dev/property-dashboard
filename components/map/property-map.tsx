"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const properties = [
    { id: 1, x: "20%", y: "30%", name: "Downtown Lofts", status: "Operational" },
    { id: 2, x: "50%", y: "40%", name: "Sunset Apartments", status: "Maintenance" },
    { id: 3, x: "70%", y: "20%", name: "Harbor View", status: "Operational" },
    { id: 4, x: "35%", y: "70%", name: "University Housing", status: "Operational" },
    { id: 5, x: "80%", y: "60%", name: "Tech Park Residences", status: "Operational" },
    { id: 6, x: "10%", y: "80%", name: "Westside Condos", status: "Operational" },
];

export function PropertyMap() {
    return (
        <div className="w-full h-full bg-slate-950 relative overflow-hidden group">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Simulated Map Features */}
            <svg className="absolute inset-0 w-full h-full text-slate-800 opacity-40 pointer-events-none">
                <path d="M0,100 Q200,300 400,100 T800,200" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M100,600 Q300,400 600,600 T1000,500" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="200" cy="300" r="50" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>

            {/* Interactive Markers */}
            <TooltipProvider>
                {properties.map((prop, index) => (
                    <Tooltip key={prop.id}>
                        <TooltipTrigger asChild>
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                                className="absolute cursor-pointer"
                                style={{ top: prop.y, left: prop.x }}
                            >
                                <div className="relative flex items-center justify-center">
                                    <motion.div
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                        className={`absolute h-8 w-8 rounded-full ${prop.status === 'Operational' ? 'bg-emerald-500' : 'bg-orange-500'}`}
                                    />
                                    <div className={`relative h-3 w-3 rounded-full border border-background shadow-lg ${prop.status === 'Operational' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                                </div>
                            </motion.div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <div className="text-xs font-bold">{prop.name}</div>
                            <div className="text-[10px] text-muted-foreground">{prop.status}</div>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </TooltipProvider>

            {/* Controls Overlay */}
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 bg-card/80 backdrop-blur-md p-2 rounded-lg border border-border shadow-xl">
                <Navigation className="h-6 w-6 text-foreground hover:text-primary transition-colors cursor-pointer" />
            </div>
        </div>
    );
}
