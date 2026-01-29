"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    MapPin,
    Image as ImageIcon,
    Check,
    Loader2,
    ChevronLeft,
    BedDouble,
    Bath,
    Car,
    Maximize,
    User
} from "lucide-react";
import { useDataEngine, Property, Lead } from "@/lib/data-engine";
import { useRouter } from "next/navigation";

export default function AddPropertyPage() {
    const router = useRouter();
    const { addProperty, leads } = useDataEngine();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [aiGenerating, setAiGenerating] = useState(false);

    // Full Form Data
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        type: "residential",
        price: "",
        beds: "",
        baths: "",
        garage: "",
        sqMeters: "",
        keywords: "",
        description: "",
        image: null as string | null,
        linkedLeadId: ""
    });

    const handleNext = () => setStep(s => s + 1);
    const handleBack = () => setStep(s => s - 1);

    // Simulation: AI Text Generation
    const generateDescription = () => {
        setAiGenerating(true);
        setTimeout(() => {
            let desc = "";
            if (formData.keywords.toLowerCase().includes("lujo")) {
                desc = "Exclusiva residencia diseñada para el máximo confort. Espacios abiertos bañados de luz natural, acabados en mármol italiano y una terraza infinity que redefine el concepto de lujo urbano.";
            } else if (formData.keywords.toLowerCase().includes("industrial")) {
                desc = "Nave industrial de alto rendimiento. Ubicación logística estratégica, piso de concreto reforzado de 8 ton/m² y andenes equipados para operaciones 24/7.";
            } else {
                desc = "Propiedad única que combina elegancia y funcionalidad. Ideal para quienes buscan un estilo de vida sofisticado en una ubicación privilegiada, con todas las amenidades modernas.";
            }
            setFormData(prev => ({ ...prev, description: desc }));
            setAiGenerating(false);
        }, 1500);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setFormData(prev => ({ ...prev, image: url }));
        }
    };

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            const newProp: Property = {
                id: Math.random().toString(36).substr(2, 9),
                title: formData.title || "Nueva Propiedad",
                address: formData.address,
                price: Number(formData.price) || 0,
                currency: "USD",
                sqMeters: Number(formData.sqMeters) || 0,
                image: formData.image || "https://images.unsplash.com/photo-1600596542815-22b5c010deb7?auto=format&fit=crop&q=80",
                status: "active",
                description: formData.description,
                type: formData.type as any,
                features: ["Nuevo Ingreso"],
                coordinates: { lat: 19.4326, lng: -99.1332 }, // Mock coords
                beds: formData.beds ? Number(formData.beds) : undefined,
                baths: formData.baths ? Number(formData.baths) : undefined,
                garage: formData.garage ? Number(formData.garage) : undefined
            };

            addProperty(newProp);
            // NOTE: In a real app we would link the lead here too

            setLoading(false);
            router.push("/properties");
        }, 1500);
    };

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-background via-background to-primary/5">
            <header className="p-6">
                <h1 className="text-3xl font-serif font-bold">Alta de Propiedad</h1>
                <div className="flex gap-2 mt-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
                    ))}
                </div>
            </header>

            <main className="p-6 max-w-lg mx-auto">
                <AnimatePresence mode="wait">

                    {/* STEP 1: DETAILED INFO */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <GlassCard className="p-6 space-y-4">
                                <div>
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Tipo</label>
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {['residential', 'industrial', 'land'].map(t => (
                                            <button
                                                key={t}
                                                onClick={() => setFormData({ ...formData, type: t })}
                                                className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.type === t
                                                    ? 'border-primary bg-primary/10 text-primary'
                                                    : 'border-border hover:bg-muted'
                                                    }`}
                                            >
                                                {t === 'residential' ? 'Residencial' : t === 'industrial' ? 'Nave Ind.' : 'Terreno'}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <input
                                        className="w-full bg-transparent border-b border-border py-2 text-lg font-serif outline-none focus:border-primary placeholder:font-sans"
                                        placeholder="Título (Ej. Casa Lomas)"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    />
                                    <input
                                        className="w-full bg-transparent border-b border-border py-2 outline-none focus:border-primary"
                                        placeholder="Dirección Completa"
                                        value={formData.address}
                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        className="w-full bg-transparent border-b border-border py-2 text-lg font-bold outline-none focus:border-primary"
                                        placeholder="Precio USD"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>

                                {/* Amenities Grid */}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="relative">
                                        <Maximize className="absolute top-2.5 left-0 text-muted-foreground" size={16} />
                                        <input
                                            type="number"
                                            className="w-full bg-transparent border-b border-border pl-6 py-2 outline-none focus:border-primary"
                                            placeholder="m² Totales"
                                            value={formData.sqMeters}
                                            onChange={e => setFormData({ ...formData, sqMeters: e.target.value })}
                                        />
                                    </div>

                                    {formData.type === 'residential' && (
                                        <>
                                            <div className="relative">
                                                <BedDouble className="absolute top-2.5 left-0 text-muted-foreground" size={16} />
                                                <input
                                                    type="number"
                                                    className="w-full bg-transparent border-b border-border pl-6 py-2 outline-none focus:border-primary"
                                                    placeholder="Recámaras"
                                                    value={formData.beds}
                                                    onChange={e => setFormData({ ...formData, beds: e.target.value })}
                                                />
                                            </div>
                                            <div className="relative">
                                                <Bath className="absolute top-2.5 left-0 text-muted-foreground" size={16} />
                                                <input
                                                    type="number"
                                                    className="w-full bg-transparent border-b border-border pl-6 py-2 outline-none focus:border-primary"
                                                    placeholder="Baños"
                                                    value={formData.baths}
                                                    onChange={e => setFormData({ ...formData, baths: e.target.value })}
                                                />
                                            </div>
                                            <div className="relative">
                                                <Car className="absolute top-2.5 left-0 text-muted-foreground" size={16} />
                                                <input
                                                    type="number"
                                                    className="w-full bg-transparent border-b border-border pl-6 py-2 outline-none focus:border-primary"
                                                    placeholder="Estacionamiento"
                                                    value={formData.garage}
                                                    onChange={e => setFormData({ ...formData, garage: e.target.value })}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </GlassCard>

                            <button
                                onClick={handleNext}
                                disabled={!formData.title || !formData.price}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-[24px] font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50 transition-all"
                            >
                                Siguiente <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    )}

                    {/* STEP 2: DESCRIPTION (AI) */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <GlassCard className="p-6 space-y-6">
                                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-4 rounded-xl border border-indigo-500/20">
                                    <div className="flex items-center gap-2 text-indigo-500 mb-2">
                                        <Sparkles size={18} />
                                        <span className="font-bold text-sm">Tech Description</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            className="flex-1 bg-background/50 rounded-lg px-3 py-2 text-sm border border-indigo-200 dark:border-indigo-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            placeholder="Palabras clave..."
                                            value={formData.keywords}
                                            onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                                        />
                                        <button
                                            onClick={generateDescription}
                                            disabled={aiGenerating || !formData.keywords}
                                            className="bg-indigo-600 text-white rounded-lg px-4 py-2 text-xs font-bold hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                        >
                                            {aiGenerating ? <Loader2 className="animate-spin" size={16} /> : 'Generar'}
                                        </button>
                                    </div>
                                </div>

                                <textarea
                                    className="w-full h-40 bg-muted/30 rounded-xl p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-primary/20 resize-none transition-all"
                                    placeholder="Descripción detallada..."
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </GlassCard>

                            <div className="flex gap-4">
                                <button onClick={handleBack} className="p-4 rounded-full bg-muted text-muted-foreground hover:bg-muted/80">
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="flex-1 py-4 bg-primary text-primary-foreground rounded-[24px] font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                                >
                                    Siguiente <ArrowRight size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: MEDIA & CRM */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <GlassCard className="p-6 space-y-6">
                                {/* Image Upload */}
                                <div className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden bg-muted/20 min-h-[150px]">
                                    {formData.image ? (
                                        <img src={formData.image} className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <>
                                            <ImageIcon className="text-muted-foreground mb-2" size={32} />
                                            <p className="text-xs text-muted-foreground">Click para subir portada</p>
                                        </>
                                    )}
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} />
                                </div>

                                {/* Link to Lead */}
                                <div>
                                    <label className="text-xs font-bold uppercase text-muted-foreground block mb-2">Vincular a Lead (Opcional)</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 text-muted-foreground" size={16} />
                                        <select
                                            className="w-full bg-background/50 border border-border rounded-lg pl-9 py-2 outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                                            value={formData.linkedLeadId}
                                            onChange={e => setFormData({ ...formData, linkedLeadId: e.target.value })}
                                        >
                                            <option value="">Sin vincular</option>
                                            {leads.map(l => (
                                                <option key={l.id} value={l.id}>{l.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </GlassCard>

                            <div className="flex gap-4">
                                <button onClick={handleBack} className="p-4 rounded-full bg-muted text-muted-foreground hover:bg-muted/80">
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex-1 py-4 bg-primary text-primary-foreground rounded-[24px] font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] disabled:opacity-50 transition-all"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : 'Publicar Propiedad'}
                                </button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>

            <BottomNav />
        </div>
    );
}
