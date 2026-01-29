"use client";

import { useDataEngine } from "@/lib/data-engine";
import { divIcon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function InteractiveMap() {
    const { properties } = useDataEngine();

    // Custom marker styles using HTML based on property type
    const createCustomIcon = (type: string, price: number) => {
        let color = "#D4AF37"; // default gold
        if (type === 'industrial') color = "#06b6d4"; // cyan
        if (type === 'land') color = "#22c55e"; // green

        const priceShort = new Intl.NumberFormat('en-US', {
            notation: "compact",
            compactDisplay: "short"
        }).format(price);

        return divIcon({
            className: "custom-marker",
            html: `
        <div style="
            background-color: ${color}; 
            width: 30px; 
            height: 30px; 
            border-radius: 50%; 
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            position: relative;
        ">
           <div style="background: white; border-radius: 4px; padding: 2px 4px; position: absolute; top: -25px; font-weight: bold; font-size: 10px; color: black; white-space: nowrap;">
              $${priceShort}
           </div>
        </div>
      `,
            iconSize: [30, 30],
            iconAnchor: [15, 15] // center
        });
    };

    return (
        <div className="h-full w-full rounded-[24px] overflow-hidden shadow-2xl relative z-0">
            <MapContainer
                center={[19.4326, -99.1332]} // CDMX Center
                zoom={12}
                style={{ height: "100%", width: "100%", zIndex: 0 }}
                scrollWheelZoom={true}
            >
                {/* Dark Matter Tiles (CartoDB) - High End Look */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                {properties.map((property) => (
                    <Marker
                        key={property.id}
                        position={[property.coordinates.lat, property.coordinates.lng]}
                        icon={createCustomIcon(property.type, property.price)}
                    >
                        <Popup className="bg-transparent border-none p-0 glass-popup">
                            <div className="w-[200px] rounded-xl overflow-hidden shadow-xl bg-background/95 backdrop-blur-xl border border-border">
                                <div className="h-24 relative">
                                    <img src={property.image} className="w-full h-full object-cover" />
                                    <span className="absolute bottom-1 left-1 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full uppercase">
                                        {property.type}
                                    </span>
                                </div>
                                <div className="p-3">
                                    <h3 className="font-bold text-sm truncate">{property.title}</h3>
                                    <p className="text-primary font-bold text-xs mt-1">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(property.price)}
                                    </p>
                                    <Link href={`/properties/${property.id}`} className="block mt-2">
                                        <button className="w-full bg-primary text-primary-foreground text-[10px] py-1 rounded-full font-bold">
                                            Ver Detalles
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
