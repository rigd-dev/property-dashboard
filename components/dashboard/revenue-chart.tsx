"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
    { name: "Ene", total: 120000 },
    { name: "Feb", total: 132000 },
    { name: "Mar", total: 145000 },
    { name: "Abr", total: 142000 },
    { name: "May", total: 155000 },
    { name: "Jun", total: 168000 },
    { name: "Jul", total: 172000 },
    { name: "Ago", total: 165000 },
    { name: "Sep", total: 158000 },
    { name: "Oct", total: 175000 },
    { name: "Nov", total: 182000 },
    { name: "Dic", total: 195000 },
];

export function RevenueChart() {
    return (
        <Card className="col-span-4 h-full">
            <CardHeader>
                <CardTitle>Resumen de Ingresos</CardTitle>
                <CardDescription>
                    Rendimiento mensual de ingresos del año actual.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="name"
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="#888888"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                                itemStyle={{ color: 'hsl(var(--foreground))' }}
                                formatter={(value: any) => [`$${value?.toLocaleString()}`, "Ingresos"]}
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#10b981"
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
