"use client";

import { useDataEngine } from "@/lib/data-engine";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import {
    ArrowLeft,
    MapPin,
    BedDouble,
    Bath,
    Car,
    Share2,
    Users,
    ChevronRight,
    Check,
    Calculator,
    FileText
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function PropertyDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getPropertyById, getLeadsByProperty } = useDataEngine();
    const [showShareNotification, setShowShareNotification] = useState(false);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [downPayment, setDownPayment] = useState(20); // %

    const property = getPropertyById(id as string);

    if (!property) {
        return <div className="p-10 text-center">Propiedad no encontrada</div>;
    }

    const interestedLeads = getLeadsByProperty(property.id);

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat("es-MX", { style: "currency", currency: currency, minimumFractionDigits: 0 }).format(price);
    };

    const handleShare = () => {
        setShowShareNotification(true);
        setTimeout(() => setShowShareNotification(false), 3000);
    };

    const handleDownloadPdf = () => {
        setGeneratingPdf(true);
        setTimeout(() => {
            setGeneratingPdf(false);
            // In a real app, this would download a file
            setShowShareNotification(true);
        }, 2500);
    };

    // Mortgage Calc Logic
    const interestRate = 0.10; // 10% annual
    const loanAmount = property.price * (1 - downPayment / 100);
    const years = 20;
    const monthlyRate = interestRate / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return (
        <div className="min-h-screen pb-24 bg-background">
            {/* Immersive Helper Header */}
            <motion.div initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent pointer-events-none">
                <button onClick={() => router.back()} className="pointer-events-auto bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div className="flex gap-2 pointer-events-auto">
                    <button onClick={handleDownloadPdf} className="bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 transition-colors">
                        {generatingPdf ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FileText size={24} />}
                    </button>
                    <button onClick={handleShare} className="bg-white/20 backdrop-blur-md rounded-full p-2 text-white hover:bg-white/30 transition-colors">
                        <Share2 size={24} />
                    </button>
                </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div layoutId={`image-${property.id}`} className="h-[50vh] relative w-full">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end mb-2">
                        <h1 className="text-3xl md:text-5xl font-serif text-foreground drop-shadow-lg max-w-[80%] leading-tight">{property.title}</h1>
                        <div className="text-right">
                            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{property.type}</span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 text-muted-foreground">
                        <MapPin size={18} />
                        <span className="text-lg">{property.address}</span>
                    </motion.div>
                </div>
            </motion.div>

            <main className="px-6 -mt-6 relative z-10 space-y-8 max-w-4xl mx-auto">
                {/* Main Stats */}
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {property.beds !== undefined && (
                        <GlassCard className="flex-1 min-w-[100px] p-4 flex flex-col items-center justify-center gap-2 bg-background/80">
                            <BedDouble className="text-primary" size={24} />
                            <span className="font-bold text-lg">{property.beds}</span>
                            <span className="text-xs text-muted-foreground uppercase">Habs</span>
                        </GlassCard>
                    )}
                    {property.baths !== undefined && (
                        <GlassCard className="flex-1 min-w-[100px] p-4 flex flex-col items-center justify-center gap-2 bg-background/80">
                            <Bath className="text-primary" size={24} />
                            <span className="font-bold text-lg">{property.baths}</span>
                            <span className="text-xs text-muted-foreground uppercase">Baños</span>
                        </GlassCard>
                    )}
                    {property.garage !== undefined && (
                        <GlassCard className="flex-1 min-w-[100px] p-4 flex flex-col items-center justify-center gap-2 bg-background/80">
                            <Car className="text-primary" size={24} />
                            <span className="font-bold text-lg">{property.garage}</span>
                            <span className="text-xs text-muted-foreground uppercase">Autos</span>
                        </GlassCard>
                    )}
                    <GlassCard className="flex-1 min-w-[120px] p-4 flex flex-col items-center justify-center gap-2 bg-background/80">
                        <span className="font-bold text-lg text-primary">{property.sqMeters} m²</span>
                        <span className="text-xs text-muted-foreground uppercase">Total</span>
                    </GlassCard>
                </div>

                {/* Price & Description */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-border pb-4">
                        <h2 className="text-2xl font-serif">Precio</h2>
                        <p className="text-3xl font-bold text-primary font-serif">
                            {formatPrice(property.price, property.currency)}
                        </p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                        {property.description}
                    </p>
                    {/* Features List */}
                    {property.features && property.features.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {property.features.map(f => (
                                <span key={f} className="bg-muted px-3 py-1 rounded-full text-xs font-medium border border-border">{f}</span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mortgage Simulator (New) */}
                <section>
                    <h2 className="text-xl font-serif font-bold mb-4 flex items-center gap-2">
                        <Calculator size={20} /> Simulador Hipotecario
                    </h2>
                    <GlassCard className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Pago Mensual Est.</p>
                                <p className="text-2xl font-bold font-serif text-primary">
                                    {formatPrice(monthlyPayment, property.currency)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-muted-foreground">Tasa Anual</p>
                                <p className="font-bold">10%</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Enganche ({downPayment}%)</span>
                                <span className="font-bold">{formatPrice(property.price * (downPayment / 100), property.currency)}</span>
                            </div>
                            <input
                                type="range"
                                min="10"
                                max="50"
                                step="5"
                                value={downPayment}
                                onChange={(e) => setDownPayment(parseInt(e.target.value))}
                                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-muted-foreground">
                                <span>10%</span>
                                <span>50%</span>
                            </div>
                        </div>
                    </GlassCard>
                </section>

                {/* Leads Section */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-serif flex items-center gap-2">
                            <Users size={20} /> Interesados
                        </h2>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                            {interestedLeads.length}
                        </span>
                    </div>

                    <div className="space-y-3">
                        {interestedLeads.length === 0 ? (
                            <p className="text-muted-foreground italic">No hay leads registrados aún.</p>
                        ) : (
                            interestedLeads.map((lead) => (
                                <Link key={lead.id} href={`/leads/${lead.id}`}>
                                    <GlassCard className="p-4 flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-accent/20 text-accent-foreground flex items-center justify-center font-bold font-serif">
                                                {lead.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold">{lead.name}</p>
                                                <p className="text-xs text-muted-foreground">{lead.status.toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={18} className="text-muted-foreground/30 group-hover:text-primary transition-colors" />
                                    </GlassCard>
                                </Link>
                            ))
                        )}
                    </div>
                </section>
            </main>

            {/* Notification Toast */}
            <AnimatePresence>
                {showShareNotification && (
                    <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-foreground text-background px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 min-w-[300px]">
                        <div className="bg-green-500 rounded-full p-1 text-white"><Check size={12} strokeWidth={4} /></div>
                        <div>
                            <p className="font-bold text-sm">{generatingPdf ? "PDF Descargado" : "Link Copiado"}</p>
                            <p className="text-xs opacity-90">{generatingPdf ? "Guardado en descargas" : "Listo para compartir"}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BottomNav />
        </div>
    );
}
