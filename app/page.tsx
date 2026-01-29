"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lock, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate auth delay
    setTimeout(() => {
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl mx-auto mb-6 shadow-2xl shadow-indigo-500/20 flex items-center justify-center transform rotate-3"
          >
            <Lock className="text-white" size={32} />
          </motion.div>
          <h1 className="text-4xl font-serif mb-2 tracking-tight">Bienvenido</h1>
          <p className="text-muted-foreground text-sm">PropertyOS Enterprise v2.0</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white text-black h-14 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 hover:bg-gray-100 transition-all active:scale-95 disabled:opacity-70 disabled:scale-100 group relative overflow-hidden"
          >
            {loading ? (
              <motion.div
                className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"
              />
            ) : (
              <>
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <span className="text-indigo-600 font-bold text-xs">G</span>
                </div>
                <span>Continuar con Google</span>
                <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </>
            )}

            {loading && (
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                className="absolute bottom-0 left-0 h-1 bg-indigo-500"
              />
            )}
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] uppercase text-muted-foreground tracking-widest">Biometría</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button className="w-full h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
              <User size={18} className="text-muted-foreground" />
              <span className="text-xs font-medium">Face ID</span>
            </button>
          </div>
        </div>
      </motion.div>

      <footer className="absolute bottom-6 text-[10px] text-muted-foreground/50">
        ANTIGRAVITY SYSTEMS &copy; 2026
      </footer>
    </div>
  );
}
