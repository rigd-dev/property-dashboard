"use client";

import { motion } from "framer-motion";
import { TenantList } from "@/components/tenants/tenant-list";

export default function TenantPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tenant Portal</h1>
                    <p className="text-muted-foreground mt-2">Manage tenants, leases, and payments.</p>
                </div>
            </div>
            <div className="rounded-xl border border-border bg-card shadow-sm">
                <TenantList />
            </div>
        </motion.div>
    );
}
