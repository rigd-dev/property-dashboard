"use client";

import { useDataEngine } from "@/lib/data-engine";
import { GlassCard } from "@/components/ui/glass-card";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Building2, Users, Briefcase, DollarSign, ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
    // ...
    const { properties, leads } = useDataEngine();

    // Metrics
    const activeProperties = properties.filter((p) => p.status === "active").length;
    const newLeads = leads.filter((l) => l.status === "new").length;
    const negotiationLeads = leads.filter((l) => l.status === "negotiation" || l.status === "proposal").length;
    // Mock sales data
    const monthlySales = "$4.5M";

    const stats = [
        {
            title: "Propiedades Activas",
            value: activeProperties,
            icon: Building2,
            color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
        },
        {
            title: "Leads Nuevos",
            value: newLeads,
            icon: Users,
            color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        },
        {
            title: "En Negociación",
            value: negotiationLeads,
            icon: Briefcase,
            color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
        },
        {
            title: "Ventas Mes",
            value: monthlySales,
            icon: DollarSign,
            color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        },
    ];

    const pipelineStages = [
        { id: "contact", label: "Primer Contacto", count: leads.filter(l => l.status === 'new').length },
        { id: "scheduled", label: "Cita Agendada", count: leads.filter(l => l.status === 'contacted').length },
        { id: "proposal", label: "Propuesta Enviada", count: leads.filter(l => l.status === 'proposal').length },
        { id: "closed", label: "Cierre", count: leads.filter(l => l.status === 'closed').length },
    ];

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-background via-background to-secondary/20">
            <main className="p-6 space-y-8 max-w-5xl mx-auto">
                <header className="py-4 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-serif text-foreground">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">Bienvenido de nuevo, Agente.</p>
                    </div>
                    <Link href="/map" className="hidden md:block">
                        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-border">
                            <MapPin size={16} /> Ver Mapa
                        </button>
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="p-4 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2 rounded-xl ${stat.color}`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <span className="text-xs font-medium text-muted-foreground">+12%</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-serif">{stat.value}</h3>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1">
                                        {stat.title}
                                    </p>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Pipeline Visual */}
                <section>
                    <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
                        Pipeline de Ventas <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-sans font-bold">LIVE</span>
                    </h2>
                    <GlassCard className="p-6 overflow-x-auto">
                        <div className="flex items-center justify-between min-w-[600px] gap-4">
                            {pipelineStages.map((stage, i) => (
                                <div key={stage.id} className="flex items-center flex-1">
                                    <div className="flex-1 flex flex-col items-center gap-3">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border-2 border-primary/20 z-10 relative">
                                                <span className="font-bold text-primary">{stage.count}</span>
                                            </div>
                                            {/* Connection Line */}
                                            {i < pipelineStages.length - 1 && (
                                                <div className="absolute top-1/2 left-full w-[calc(100%+2rem)] h-0.5 bg-border -translate-y-1/2 -z-0" />
                                            )}
                                        </div>
                                        <span className="text-xs font-medium text-center max-w-[80px] leading-tight">
                                            {stage.label}
                                        </span>
                                    </div>
                                    {i < pipelineStages.length - 1 && (
                                        <ArrowRight className="text-muted-foreground/30 mx-2 flex-shrink-0" size={16} />
                                    )}
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </section>

                {/* Recent Activity Mock */}
                <section className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-xl font-serif mb-4">Actividad Reciente</h2>
                        <div className="space-y-3">
                            {[1, 2, 3].map((_, i) => (
                                <GlassCard key={i} className="p-3 flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Nuevo lead registrado</p>
                                        <p className="text-xs text-muted-foreground">Hace {i * 2 + 5} minutos</p>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-serif mb-4">Citas para Hoy</h2>
                        <GlassCard className="p-8 flex flex-col items-center justify-center text-center text-muted-foreground h-[200px]">
                            <Briefcase className="mb-2 opacity-20" size={48} />
                            <p>No hay citas pendientes</p>
                        </GlassCard>
                    </div>
                </section>
            </main>
            <BottomNav />
        </div>
    );
}
