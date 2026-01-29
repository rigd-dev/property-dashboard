"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import { motion } from "framer-motion";
import {
    User,
    Phone,
    Mail,
    Briefcase,
    Building2,
    Check,
    ChevronLeft,
    ArrowRight,
    Loader2
} from "lucide-react";
import { useDataEngine, Lead } from "@/lib/data-engine";
import { useRouter } from "next/navigation";

export default function AddLeadPage() {
    const router = useRouter();
    const { addLead, properties } = useDataEngine();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        origin: "whatsapp" as any,
        budget: "",
        propertyId: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const newLead: Lead = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            title: "Nuevo Cliente",
            pipelineDuration: "0 días en Nuevo",
            phone: formData.phone,
            email: formData.email,
            origin: formData.origin,
            addedDate: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
            propertyId: formData.propertyId || null,
            status: 'new',
            matchScore: 85 // Mock initial score
        };

        setTimeout(() => {
            addLead(newLead);
            router.push('/leads');
        }, 1000);
    };

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-background via-background to-primary/5">
            <header className="p-6">
                <button
                    onClick={() => router.back()}
                    className="mb-4 bg-muted p-2 rounded-full hover:bg-muted/80 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-3xl font-serif font-bold">Nuevo Lead</h1>
                <p className="text-muted-foreground">Registrar prospecto en CRM</p>
            </header>

            <main className="p-6 max-w-lg mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Personal Info */}
                    <GlassCard className="p-6 space-y-4">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <User size={18} className="text-primary" />
                            Información Personal
                        </h3>

                        <div>
                            <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Nombre Completo</label>
                            <input
                                required
                                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Ej. Juan Pérez"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Teléfono</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 text-muted-foreground" size={14} />
                                    <input
                                        required
                                        className="w-full bg-background/50 border border-border rounded-lg pl-9 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="+52..."
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-muted-foreground" size={14} />
                                    <input
                                        required
                                        type="email"
                                        className="w-full bg-background/50 border border-border rounded-lg pl-9 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                                        placeholder="@..."
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Origen</label>
                            <div className="flex gap-2">
                                {['whatsapp', 'web', 'referral'].map(o => (
                                    <button
                                        key={o}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, origin: o as any })}
                                        className={`flex-1 py-2 rounded-lg text-xs font-bold border capitalize transition-colors ${formData.origin === o
                                            ? 'bg-primary/10 border-primary text-primary'
                                            : 'border-border text-muted-foreground hover:bg-muted'
                                            }`}
                                    >
                                        {o}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </GlassCard>

                    {/* Interest */}
                    <GlassCard className="p-6 space-y-4">
                        <h3 className="font-bold flex items-center gap-2 mb-4">
                            <Briefcase size={18} className="text-primary" />
                            Interés e Inversión
                        </h3>

                        <div>
                            <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Presupuesto Aprox (USD)</label>
                            <input
                                type="number"
                                className="w-full bg-background/50 border border-border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Ej. 500000"
                                value={formData.budget}
                                onChange={e => setFormData({ ...formData, budget: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold uppercase text-muted-foreground block mb-1">Vincular Propiedad</label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-2.5 text-muted-foreground" size={14} />
                                <select
                                    className="w-full bg-background/50 border border-border rounded-lg pl-9 py-2 outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                                    value={formData.propertyId}
                                    onChange={e => setFormData({ ...formData, propertyId: e.target.value })}
                                >
                                    <option value="">Seleccionar Propiedad...</option>
                                    {properties.map(p => (
                                        <option key={p.id} value={p.id}>{p.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </GlassCard>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-[24px] font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50 transition-all font-serif text-lg"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Registrar Lead'}
                    </button>
                </form>
            </main>

            <BottomNav />
        </div>
    );
}
