"use client";

import { useDataEngine } from "@/lib/data-engine";
import { BottomNav } from "@/components/layout/bottom-nav";
import { GlassCard } from "@/components/ui/glass-card";
import { motion, AnimatePresence } from "framer-motion";
import { CheckSquare, Calendar, Phone, Mail, FileText, Briefcase, Plus } from "lucide-react";

export default function ActionsPage() {
    const { tasks, toggleTaskStatus } = useDataEngine();

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high": return "text-red-500 bg-red-500/10 border-red-500/20";
            case "medium": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
            case "low": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
            default: return "text-gray-500 bg-gray-500/10";
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "call": return <Phone size={16} />;
            case "email": return <Mail size={16} />;
            case "contract": return <FileText size={16} />;
            case "tour": return <Briefcase size={16} />;
            default: return <CheckSquare size={16} />;
        }
    };

    // Sort: Pending first, then by Priority, then Due Date
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status === 'pending' ? -1 : 1;
    });

    return (
        <div className="min-h-screen pb-24 bg-gradient-to-br from-background via-background to-secondary/20">
            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                <header className="flex justify-between items-end mb-2">
                    <div>
                        <h1 className="text-4xl font-serif text-foreground">Acciones</h1>
                        <p className="text-muted-foreground mt-1">Tu plan de día: {tasks.filter(t => t.status === 'pending').length} pendientes.</p>
                    </div>
                    <button className="bg-primary text-primary-foreground p-3 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
                        <Plus size={20} />
                    </button>
                </header>

                <div className="space-y-3">
                    <AnimatePresence>
                        {sortedTasks.map((task) => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <GlassCard
                                    className={`p-4 flex items-start gap-4 transition-all duration-300 ${task.status === 'completed' ? 'opacity-50 grayscale' : 'hover:border-primary/50'
                                        }`}
                                >
                                    <button
                                        onClick={() => toggleTaskStatus(task.id)}
                                        className={`mt-1 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${task.status === 'completed'
                                                ? 'bg-primary border-primary text-primary-foreground'
                                                : 'border-muted-foreground/30 hover:border-primary'
                                            }`}
                                    >
                                        {task.status === 'completed' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><CheckSquare size={14} /></motion.div>}
                                    </button>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className={`font-bold text-base ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                                {task.title}
                                            </h3>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)} uppercase tracking-wider`}>
                                                {task.priority}
                                            </span>
                                        </div>

                                        <p className="text-sm text-muted-foreground mt-1 truncate">{task.description}</p>

                                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                {getIcon(task.type)}
                                                <span className="capitalize">{task.type}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar size={14} />
                                                <span>{task.dueDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
