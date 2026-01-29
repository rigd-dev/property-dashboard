"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const tenants = [
    {
        id: "TEN-001",
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        unit: "4B",
        property: "Downtown Lofts",
        status: "Active",
        rent: "$2,200",
        lastPayment: "2024-09-01",
    },
    {
        id: "TEN-002",
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        unit: "12A",
        property: "Sunset Apartments",
        status: "Active",
        rent: "$2,450",
        lastPayment: "2024-09-01",
    },
    {
        id: "TEN-003",
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        unit: "8C",
        property: "Harbor View",
        status: "Pending",
        rent: "$1,950",
        lastPayment: "-",
    },
    {
        id: "TEN-004",
        name: "William Kim",
        email: "will.kim@email.com",
        unit: "2D",
        property: "Tech Park Residences",
        status: "Overdue",
        rent: "$2,800",
        lastPayment: "2024-08-01",
    },
    {
        id: "TEN-005",
        name: "Sofia Davis",
        email: "sofia.davis@email.com",
        unit: "15E",
        property: "Westside Condos",
        status: "Active",
        rent: "$2,100",
        lastPayment: "2024-09-02",
    },
];

export function TenantList() {
    return (
        <div className="p-1">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Property / Unit</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Rent</TableHead>
                        <TableHead>Last Payment</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tenants.map((tenant) => (
                        <TableRow key={tenant.id} className="group">
                            <TableCell>
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{tenant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{tenant.name}</span>
                                    <span className="text-xs text-muted-foreground">{tenant.email}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span>{tenant.property}</span>
                                    <span className="text-xs text-muted-foreground">Unit {tenant.unit}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        tenant.status === "Active"
                                            ? "default" // default in dark mode is white/black, might want "success"
                                            : tenant.status === "Overdue"
                                                ? "destructive"
                                                : "secondary"
                                    }
                                    className={
                                        tenant.status === "Active"
                                            ? "bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 border-emerald-500/20"
                                            : tenant.status === "Pending"
                                                ? "bg-amber-500/15 text-amber-500 hover:bg-amber-500/25 border-amber-500/20"
                                                : ""
                                    }
                                >
                                    {tenant.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{tenant.rent}</TableCell>
                            <TableCell>{tenant.lastPayment}</TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
