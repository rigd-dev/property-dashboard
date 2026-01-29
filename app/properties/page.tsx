"use client";

import { useDataEngine } from "@/lib/data-engine";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Plus, Users, MapPin, BedDouble, Bath, Car } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PropertiesPage() {
    const { properties, getLeadsByProperty } = useDataEngine();

    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-background via-background to-secondary/20">
            <main className="p-6 space-y-6 max-w-5xl mx-auto">
                <header className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-serif text-foreground">Propiedades</h1>
                        <p className="text-muted-foreground mt-1">
                            {properties.length} propiedades activas en portafolio
                        </p>
                    </div>
                    <Link href="/properties/add">
                        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                            <Plus size={18} />
                            <span>Añadir</span>
                        </button>
                    </Link>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property, index) => {
                        const interestedLeads = getLeadsByProperty(property.id);

                        return (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={`/properties/${property.id}`}>
                                    <GlassCard className="h-full hover:scale-[1.02] transition-transform duration-300 group cursor-pointer">
                                        {/* Image Layer */}
                                        <div className="aspect-[4/3] relative overflow-hidden rounded-t-[24px]">
                                            <img
                                                src={property.image}
                                                alt={property.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                <div className={`w-2 h-2 rounded-full ${property.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                                                <span className="capitalize">{property.status}</span>
                                            </div>

                                            {interestedLeads.length > 0 && (
                                                <div className="absolute bottom-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                                                    <Users size={12} />
                                                    <span>{interestedLeads.length} Interesados</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Layer */}
                                        <div className="p-5 space-y-4">
                                            <div>
                                                <h3 className="text-lg font-bold font-serif line-clamp-1">{property.title}</h3>
                                                <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                                                    <MapPin size={12} />
                                                    <span className="truncate">{property.address}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between py-2 border-y border-border/50">
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <BedDouble size={14} />
                                                    <span>{property.beds}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Bath size={14} />
                                                    <span>{property.baths}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Car size={14} />
                                                    <span>{property.garage}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <span className="font-medium">{property.sqMeters} m²</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className="text-xl font-bold font-serif text-primary">
                                                    {formatPrice(property.price, property.currency)}
                                                </p>
                                                <span className="text-xs text-muted-foreground underline decoration-1 underline-offset-4 group-hover:text-primary transition-colors">
                                                    Ver Detalles
                                                </span>
                                            </div>
                                        </div>
                                    </GlassCard>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
