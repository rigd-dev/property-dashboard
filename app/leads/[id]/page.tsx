"use client";

import { useDataEngine, Lead } from "@/lib/data-engine";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import {
    ArrowLeft,
    Phone,
    Mail,
    Calendar,
    MessageSquare,
    Building2,
    ChevronRight,
    MoveRight,
    Clock,
    Mic,
    Play,
    Link as LinkIcon
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function LeadDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getLeadById, getPropertyById, updateLeadStatus, properties, linkPropertyToLead } = useDataEngine();
    const [isRecording, setIsRecording] = useState(false);
    const [showStopRecording, setShowStopRecording] = useState(false);
    const [showLinkMenu, setShowLinkMenu] = useState(false);

    const lead = getLeadById(id as string);

    if (!lead) {
        return <div className="p-10 text-center">Lead no encontrado</div>;
    }

    // Handle both single and multi-property logic
    const propertyIds = lead.interestedInIds || (lead.propertyId ? [lead.propertyId] : []);
    const interestedProperties = propertyIds.map(pid => getPropertyById(pid)).filter(Boolean);

    // Filter properties not yet linked
    const availableProperties = properties.filter(p => !propertyIds.includes(p.id));

    const handleStatusChange = (newStatus: Lead['status']) => {
        updateLeadStatus(lead.id, newStatus);
        if (newStatus === 'closed') {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#065F46', '#D4AF37', '#ffffff'] });
        }
    };

    const handleVoiceRecord = () => {
        setIsRecording(true);
        setTimeout(() => {
            setIsRecording(false);
            setShowStopRecording(true);
            setTimeout(() => setShowStopRecording(false), 3000); // Toast "Guardado"
        }, 2000);
    };

    const handleLinkProperty = (propertyId: string) => {
        linkPropertyToLead(lead.id, propertyId);
        setShowLinkMenu(false);
    };

    const statusSteps: Lead['status'][] = ['new', 'contacted', 'proposal', 'negotiation', 'closed'];

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "new": return "Nuevo";
            case "contacted": return "Contactado";
            case "negotiation": return "Negociación";
            case "proposal": return "Propuesta";
            case "closed": return "Cierre";
            default: return status;
        }
    };

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-background via-background to-secondary/20 relative">
            <header className="p-6 pb-2 relative">
                <div className="flex justify-between items-start mb-4">
                    <button onClick={() => router.back()} className="bg-white/50 dark:bg-black/20 p-2 rounded-full hover:bg-white/80 transition-colors">
                        <ArrowLeft size={24} />
                    </button>
                    {/* Pipeline Time Tracker */}
                    <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-800/50 flex items-center gap-2">
                        <Clock size={14} />
                        {lead.pipelineDuration || "1 día en etapa"}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold font-serif shadow-lg shadow-primary/30 relative">
                        {lead.name.substring(0, 2).toUpperCase()}
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-background" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-serif font-bold">{lead.name}</h1>
                        <p className="text-muted-foreground text-sm font-medium">{lead.title || "Cliente Potencial"}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            Origen: <span className="uppercase font-bold">{lead.origin}</span>
                        </p>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                {/* Contact Info */}
                <GlassCard className="p-0 divide-y divide-border/50">
                    <div className="p-4 flex items-center gap-4">
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-700 dark:text-green-400">
                            <Phone size={20} />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Teléfono</p>
                            <p className="font-medium text-lg">{lead.phone}</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-muted rounded-full transition-colors">
                                <MessageSquare size={18} className="text-green-600" />
                            </button>
                        </div>
                    </div>
                    <div className="p-4 flex items-center gap-4">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full text-blue-700 dark:text-blue-400">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                            <p className="font-medium text-lg">{lead.email}</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Voice Memos (New) */}
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-serif font-bold flex items-center gap-2">
                            <Mic size={18} /> Notas de Voz
                        </h2>
                        <button
                            onClick={handleVoiceRecord}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${isRecording ? "bg-red-500 text-white animate-pulse" : "bg-primary/10 text-primary"
                                }`}
                        >
                            {isRecording ? "Grabando..." : "Grabar Nota"}
                        </button>
                    </div>
                    {/* Fake previously recorded note */}
                    <GlassCard className="p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">
                            <Play size={14} fill="currentColor" />
                        </div>
                        <div className="flex-1">
                            <div className="h-1 bg-muted rounded-full overflow-hidden w-full max-w-[150px]">
                                <div className="h-full w-1/3 bg-indigo-500 rounded-full" />
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-1">Nota de la visita (0:42) - Ayer</p>
                        </div>
                    </GlassCard>
                </section>

                {/* Property Linking Section */}
                <section>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-lg font-serif font-bold flex items-center gap-2">
                            Propiedades
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{interestedProperties.length}</span>
                        </h2>
                        <button
                            onClick={() => setShowLinkMenu(!showLinkMenu)}
                            className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-md hover:bg-primary/10"
                        >
                            <LinkIcon size={12} /> Vincular
                        </button>
                    </div>

                    <AnimatePresence>
                        {showLinkMenu && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mb-4 overflow-hidden"
                            >
                                <GlassCard className="p-2 max-h-40 overflow-y-auto space-y-1 bg-background/95 border-primary/20">
                                    {availableProperties.map(p => (
                                        <button
                                            key={p.id}
                                            onClick={() => handleLinkProperty(p.id)}
                                            className="w-full text-left text-xs p-2 hover:bg-muted rounded-md flex items-center justify-between group"
                                        >
                                            <span className="font-medium truncate">{p.title}</span>
                                            <span className="opacity-0 group-hover:opacity-100 text-primary font-bold">+</span>
                                        </button>
                                    ))}
                                </GlassCard>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-3">
                        {interestedProperties.length > 0 ? (
                            interestedProperties.map((prop) => (
                                <Link key={prop!.id} href={`/properties/${prop!.id}`}>
                                    <GlassCard className="p-4 flex gap-4 group cursor-pointer hover:bg-white/40 dark:hover:bg-white/5 transition-colors border-l-4 border-l-primary relative">
                                        <img
                                            src={prop!.image}
                                            alt={prop!.title}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold font-serif text-sm leading-tight group-hover:text-primary transition-colors truncate">
                                                {prop!.title}
                                            </h3>
                                            <p className="text-primary font-bold text-xs mt-1">
                                                {new Intl.NumberFormat("es-MX", { style: "currency", currency: prop!.currency, minimumFractionDigits: 0 }).format(prop!.price)}
                                            </p>
                                        </div>
                                        <ChevronRight className="self-center text-muted-foreground/30" size={18} />
                                    </GlassCard>
                                </Link>
                            ))
                        ) : (
                            <div className="p-6 border border-dashed border-border rounded-xl text-center text-muted-foreground text-sm">
                                No hay propiedades vinculadas
                            </div>
                        )}
                    </div>
                </section>

                {/* Pipeline Controls */}
                <section>
                    <h2 className="text-lg font-serif mb-3 font-bold">Status</h2>
                    <GlassCard className="p-2 space-y-1">
                        {statusSteps.map((step, index) => {
                            const isActive = lead.status === step;
                            const isPast = statusSteps.indexOf(lead.status) > index;

                            return (
                                <button
                                    key={step}
                                    onClick={() => handleStatusChange(step)}
                                    className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all text-sm ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02] font-bold'
                                        : isPast
                                            ? 'bg-muted/50 text-muted-foreground opacity-70'
                                            : 'hover:bg-muted/30 text-muted-foreground'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 text-[10px] font-bold ${isActive ? 'border-white bg-transparent' : isPast ? 'border-primary bg-primary text-white' : 'border-current opacity-30'
                                            }`}>
                                            {isPast ? <Check size={12} /> : index + 1}
                                        </div>
                                        <span>{getStatusLabel(step)}</span>
                                    </div>
                                    {isActive && <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">Actual</span>}
                                </button>
                            );
                        })}
                    </GlassCard>
                </section>
            </main>

            {/* Floating WhatsApp Button */}
            <div className="fixed bottom-24 right-6 z-50">
                <button className="bg-[#25D366] text-white p-4 rounded-full shadow-xl shadow-green-500/30 hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
                    <MessageSquare size={28} fill="white" />
                </button>
            </div>

            {/* Toast Recording */}
            <AnimatePresence>
                {showStopRecording && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2 rounded-full text-xs font-bold shadow-xl z-50 flex items-center gap-2"
                    >
                        <Check size={12} /> Nota Guardada
                    </motion.div>
                )}
            </AnimatePresence>

            <BottomNav />
        </div>
    );
}



function Check({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
