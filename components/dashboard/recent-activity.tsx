"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivity() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                    Últimas acciones y actualizaciones en tus propiedades.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Olivia Martin</p>
                            <p className="text-sm text-muted-foreground">
                                Envió una solicitud de mantenimiento para la Unidad 4B.
                            </p>
                        </div>
                        <div className="ml-auto font-medium text-sm text-muted-foreground">Ahora mismo</div>
                    </div>
                    <div className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/avatars/02.png" alt="Avatar" />
                            <AvatarFallback>JL</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Jackson Lee</p>
                            <p className="text-sm text-muted-foreground">
                                Pagó la renta de Septiembre 2024.
                            </p>
                        </div>
                        <div className="ml-auto font-medium text-sm text-emerald-500">+$2,450.00</div>
                    </div>
                    <div className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src="/avatars/03.png" alt="Avatar" />
                            <AvatarFallback>IN</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                            <p className="text-sm text-muted-foreground">
                                Renovación de contrato firmada para la Unidad 12A.
                            </p>
                        </div>
                        <div className="ml-auto font-medium text-sm text-muted-foreground">Hace 2h</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
