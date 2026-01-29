"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, LayoutDashboard, Building2, Users, Map, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: Home,
        },
        {
            label: "Propiedades",
            path: "/properties",
            icon: Building2,
        },
        {
            label: "Mapa",
            path: "/map",
            icon: Map,
        },
        {
            label: "Acciones",
            path: "/actions",
            icon: CheckSquare,
        },
        {
            label: "Leads",
            path: "/leads",
            icon: Users,
        },
    ];

    return (
        <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4">
            <nav className="flex items-center gap-1 p-2 rounded-[32px] bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-white/20 shadow-2xl">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.path);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={cn(
                                "relative flex flex-col items-center justify-center px-6 py-3 rounded-[24px] transition-all duration-300",
                                isActive
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary rounded-[24px]"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <div className="relative z-10 flex flex-col items-center gap-1">
                                <Icon size={24} />
                                <span className="text-[10px] font-medium tracking-wide">
                                    {item.label}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
