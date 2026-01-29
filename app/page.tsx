"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, CheckCircle2, TrendingUp, ShieldCheck, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#1A1A1A] font-sans selection:bg-primary/20">
      {/* Navigation / Logo */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white/30 backdrop-blur-sm rounded-sm rotate-45" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight uppercase">PropOS</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Plataforma</a>
          <a href="#" className="hover:text-foreground transition-colors">Portafolio</a>
          <a href="#" className="hover:text-foreground transition-colors">Empresa</a>
        </div>
        <button
          onClick={handleLogin}
          className="bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-bold hover:bg-primary/20 transition-all active:scale-95"
        >
          Acceso
        </button>
      </nav>

      <main className="pt-24 lg:pt-0 lg:flex lg:min-h-screen items-center">
        {/* Left Side: Content */}
        <div className="flex-1 px-6 lg:px-20 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-xl mx-auto lg:mx-0"
          >
            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6">
              Enterprise Asset Management
            </span>

            <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight mb-8">
              Control total de tu <span className="text-primary italic">patrimonio</span> inmobiliario.
            </h1>

            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-lg">
              La plataforma de gestión para inversores de alto nivel. Visualiza, analiza y opera tu portafolio con precisión quirúrgica desde cualquier dispositivo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="group relative flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-5 rounded-[20px] font-bold text-lg hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-70 shadow-2xl shadow-primary/20"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Continuar con Google</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-8 border-t border-[#E8E8E4] pt-8">
              <div>
                <h4 className="font-serif text-3xl font-bold mb-1">+MXN 240M</h4>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Activos Gestionados</p>
              </div>
              <div>
                <h4 className="font-serif text-3xl font-bold mb-1">98.2%</h4>
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Tasa de Ocupación Avg.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Hero Visual */}
        <div className="flex-1 h-[60vh] lg:h-screen sticky top-0 bg-[#E8E8E4] relative overflow-hidden group">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src="/hero-luxury.png"
              alt="Luxury Mansion"
              className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FBFBF9] via-[#FBFBF9]/0 to-transparent lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FBFBF9] via-[#FBFBF9]/0 to-transparent lg:hidden block" />
          </motion.div>

          {/* Floating Cards (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-12 right-12 lg:left-auto lg:right-20 lg:w-80"
          >
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-[32px] shadow-2xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">ROI Anualizado</p>
                  <p className="text-xl font-bold text-white">+12.4%</p>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <p className="text-xs text-white/80 leading-relaxed italic">
                "El control que necesitaba para mis propiedades en Santa Fe y Riviera Maya."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-500 border border-white/20" />
                <span className="text-[10px] font-bold text-white">Inversora AAA</span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-10 text-center lg:text-left lg:px-20 max-w-7xl mx-auto border-t border-[#E8E8E4]">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground tracking-widest uppercase mb-0">
            &copy; 2026 ANTIGRAVITY REAL ESTATE SYSTEMS. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacidad</a>
            <a href="#" className="hover:text-primary transition-colors">Legal</a>
            <a href="#" className="hover:text-primary transition-colors">Seguridad</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
