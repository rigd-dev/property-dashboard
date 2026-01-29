"use client";

import { useDataEngine } from "@/lib/data-engine";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import {
    Plus,
    Search,
    MessageCircle,
    Globe,
    User,
    ChevronRight,
    Phone,
    Calendar
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LeadsPage() {
    const { leads, getPropertyById } = useDataEngine();

    const getOriginIcon = (origin: string) => {
        switch (origin) {
            case "whatsapp":
                return <MessageCircle size={16} className="text-green-500" />;
            case "web":
                return <Globe size={16} className="text-blue-500" />;
            default:
                return <User size={16} className="text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
            case "contacted": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300";
            case "negotiation": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
            case "closed": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
            default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "new": return "Nuevo";
            case "contacted": return "Contactado";
            case "negotiation": return "Negociación";
            case "proposal": return "Propuesta";
            case "closed": return "Cerrado";
            default: return status;
        }
    };

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-background via-background to-secondary/20">
            <main className="p-6 space-y-6 max-w-4xl mx-auto">
                <header className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-4xl font-serif text-foreground">Leads</h1>
                        <p className="text-muted-foreground mt-1">Gestión de relaciones con clientes.</p>
                    </div>
                    <Link href="/leads/add">
                        <button className="bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            <Plus size={18} />
                            <span>Añadir</span>
                        </button>
                    </Link>
                </header>

                <div className="space-y-3">
                    {leads.map((lead, index) => {
                        const interestedProperty = lead.propertyId ? getPropertyById(lead.propertyId) : null;

                        return (
                            <motion.div
                                key={lead.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/leads/${lead.id}`}>
                                    <GlassCard className="p-4 flex items-center gap-4 hover:translate-x-1 transition-transform cursor-pointer group">
                                        {/* Avatar / Initials */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-lg font-bold font-serif text-primary border border-white/20 shadow-inner">
                                            {lead.name.substring(0, 2).toUpperCase()}
                                        </div>

                                        {/* Main Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-bold text-base truncate">{lead.name}</h3>
                                                <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                                    {getOriginIcon(lead.origin)}
                                                    <span>{lead.origin}</span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Phone size={12} />
                                                    <span>{lead.phone}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    <span>{lead.addedDate}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status & Match Score */}
                                        <div className="text-right">
                                            <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium mb-1 ${getStatusColor(lead.status)}`}>
                                                {getStatusLabel(lead.status)}
                                            </span>

                                            {lead.matchScore && (
                                                <div className="flex items-center justify-end gap-1 mt-1">
                                                    <span className="text-[10px] font-bold text-muted-foreground">MATCH</span>
                                                    <span className={`text-xs font-bold ${lead.matchScore > 90 ? 'text-emerald-500' : 'text-amber-500'}`}>
                                                        {lead.matchScore}%
                                                    </span>
                                                </div>
                                            )}

                                            {/* Show property count if multiple, or title if single */}
                                            {lead.interestedInIds && lead.interestedInIds.length > 1 ? (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Interesado en <span className="font-bold text-foreground">{lead.interestedInIds.length} Propiedades</span>
                                                </p>
                                            ) : interestedProperty ? (
                                                <p className="text-xs text-muted-foreground truncate max-w-[150px] mt-1">
                                                    Int: <span className="text-foreground font-medium">{interestedProperty.title}</span>
                                                </p>
                                            ) : null}
                                        </div>

                                        <ChevronRight className="text-muted-foreground/30 group-hover:text-primary transition-colors" size={20} />
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </main >
            <BottomNav />
        </div >
    );
}
