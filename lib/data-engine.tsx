'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// --- Types ---

export type PropertyType = 'residential' | 'industrial' | 'land' | 'commercial';

export type Property = {
    id: string;
    title: string;
    address: string;
    price: number;
    currency: string;
    beds?: number;
    baths?: number;
    garage?: number;
    sqMeters: number;
    image: string;
    status: 'active' | 'pending' | 'sold';
    description: string;
    type: PropertyType;
    features: string[];
    coordinates: { lat: number; lng: number };
};

export type Lead = {
    id: string;
    name: string;
    phone: string;
    email: string;
    title: string; // Job title or Role
    origin: 'whatsapp' | 'web' | 'referral';
    addedDate: string;
    pipelineDuration: string; // e.g. "12 días en Negociación"
    propertyId: string | null;
    interestedInIds?: string[];
    status: 'new' | 'contacted' | 'proposal' | 'negotiation' | 'closed';
    matchScore?: number;
};

export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskType = 'call' | 'email' | 'contract' | 'tour' | 'admin';

export type ActionTask = {
    id: string;
    title: string;
    description: string;
    type: TaskType;
    priority: TaskPriority;
    dueDate: string;
    status: 'pending' | 'completed';
    relatedLeadId?: string;
};

export type DataEngineContextType = {
    properties: Property[];
    leads: Lead[];
    tasks: ActionTask[];
    addProperty: (property: Property) => void;
    addLead: (lead: Lead) => void;
    updateLeadStatus: (leadId: string, status: Lead['status']) => void;
    linkPropertyToLead: (leadId: string, propertyId: string) => void;
    toggleTaskStatus: (taskId: string) => void;
    addTask: (task: ActionTask) => void;
    getLeadsByProperty: (propertyId: string) => Lead[];
    getPropertyById: (propertyId: string) => Property | undefined;
    getLeadById: (leadId: string) => Lead | undefined;
};

// --- Mock Data ---

const INITIAL_PROPERTIES: Property[] = [
    // Residential (Luxury)
    {
        id: '1', title: 'Penthouse Santa Fe', address: 'Av. Santa Fe 450, CDMX', price: 24000000, currency: 'MXN',
        beds: 3, baths: 3.5, garage: 2, sqMeters: 280, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
        status: 'active', description: 'Penthouse de lujo con vista panorámica.', type: 'residential', features: ['Terraza', 'Gym'], coordinates: { lat: 19.361, lng: -99.274 }
    },
    {
        id: '9', title: 'Loft Roma Norte', address: 'Colima 120, Roma Norte', price: 9000000, currency: 'MXN',
        beds: 1, baths: 1.5, garage: 1, sqMeters: 110, image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80',
        status: 'active', description: 'Loft industrial renovado.', type: 'residential', features: ['Roof Garden', 'Seguridad'], coordinates: { lat: 19.419, lng: -99.162 }
    },
    {
        id: '10', title: 'Casa Pedregal', address: 'Fuego 400, Jardines del Pedregal', price: 64000000, currency: 'MXN',
        beds: 5, baths: 6, garage: 6, sqMeters: 800, image: 'https://images.unsplash.com/photo-1600596542815-22b5c010deb7?auto=format&fit=crop&q=80',
        status: 'active', description: 'Obra maestra arquitectónica.', type: 'residential', features: ['Jardín', 'Alberca', 'Cine'], coordinates: { lat: 19.325, lng: -99.200 }
    },
    {
        id: '2', title: 'Residencia Lomas', address: 'Paseo de la Reforma 2500', price: 50000000, currency: 'MXN',
        beds: 4, baths: 5, garage: 4, sqMeters: 500, image: 'https://images.unsplash.com/photo-1600596542815-22b5c010deb7?auto=format&fit=crop&q=80',
        status: 'active', description: 'Mansión exclusiva.', type: 'residential', features: ['Jardín Privado', 'Cava'], coordinates: { lat: 19.423, lng: -99.215 }
    },

    // Industrial
    {
        id: 'ind-1', title: 'Nave Ind. Querétaro', address: 'El Marqués, QRO', price: 70000000, currency: 'MXN',
        sqMeters: 3500, image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
        status: 'active', description: 'Nave Clase A.', type: 'industrial', features: ['Andenes', 'Altura 12m'], coordinates: { lat: 20.590, lng: -100.395 }
    },
    {
        id: 'ind-2', title: 'Logística Tultitlán', address: 'Tultitlán, EDOMEX', price: 36000000, currency: 'MXN',
        sqMeters: 1800, image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80',
        status: 'pending', description: 'Bodega estratégica.', type: 'industrial', features: ['Patio Maniobras'], coordinates: { lat: 19.648, lng: -99.172 }
    },
    {
        id: 'ind-3', title: 'Parque Industrial Toluca', address: 'Toluca 2000', price: 104000000, currency: 'MXN',
        sqMeters: 6000, image: 'https://images.unsplash.com/photo-1565514020176-db937ebdc13c?auto=format&fit=crop&q=80',
        status: 'active', description: 'Cross-docking facility.', type: 'industrial', features: ['Cross-dock', 'Seguridad'], coordinates: { lat: 19.350, lng: -99.550 }
    },
    {
        id: 'ind-4', title: 'Bodega Iztapalapa', address: 'Eje 6 Sur, CDMX', price: 19000000, currency: 'MXN',
        sqMeters: 800, image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
        status: 'sold', description: 'Bodega última milla.', type: 'industrial', features: ['Acceso Torton'], coordinates: { lat: 19.370, lng: -99.080 }
    },

    // Land
    {
        id: 'land-1', title: 'Macrolote Tulum', address: 'Región 15, Tulum', price: 17000000, currency: 'MXN',
        sqMeters: 5000, image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
        status: 'active', description: 'Terreno H3.', type: 'land', features: ['H3', 'Escriturado'], coordinates: { lat: 20.215, lng: -87.460 }
    },
    {
        id: 'land-2', title: 'Terreno Valle de Bravo', address: 'Avandaro, Valle de Bravo', price: 24000000, currency: 'MXN',
        sqMeters: 2500, image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80',
        status: 'active', description: 'Vista al lago.', type: 'land', features: ['Boscoso', 'Servicios'], coordinates: { lat: 19.160, lng: -100.150 }
    },
    {
        id: 'land-3', title: 'Lote Ind. Apodaca', address: 'Apodaca, NL', price: 42000000, currency: 'MXN',
        sqMeters: 10000, image: 'https://images.unsplash.com/photo-1504297050568-910d24c426d3?auto=format&fit=crop&q=80',
        status: 'active', description: 'Uso de suelo industrial pesado.', type: 'land', features: ['Industrial', 'Plano'], coordinates: { lat: 25.780, lng: -100.200 }
    },

    // Commercial
    {
        id: 'com-1', title: 'Torre Insurgentes', address: 'Insurgentes Sur, CDMX', price: 312000000, currency: 'MXN',
        sqMeters: 4500, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
        status: 'active', description: 'Edificio LEED Gold.', type: 'commercial', features: ['Helipuerto'], coordinates: { lat: 19.370, lng: -99.185 }
    },
    {
        id: 'com-2', title: 'Local Masaryk', address: 'Masaryk 300, Polanco', price: 84000000, currency: 'MXN',
        sqMeters: 180, image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80',
        status: 'active', description: 'Local comercial triple A.', type: 'commercial', features: ['Triple A', 'Escaparate'], coordinates: { lat: 19.432, lng: -99.195 }
    },
    {
        id: 'com-3', title: 'Oficinas Arcos', address: 'Paseo de los Tamarindos', price: 17800000, currency: 'MXN',
        sqMeters: 150, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
        status: 'active', description: 'Oficina acondicionada.', type: 'commercial', features: ['Acondicionada', 'Vistas'], coordinates: { lat: 19.385, lng: -99.255 }
    },
    {
        id: '15', title: 'Penthouse Reforma', address: 'Reforma 222', price: 36000000, currency: 'MXN',
        beds: 3, baths: 3, garage: 2, sqMeters: 220, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80',
        status: 'sold', description: 'Lujo urbano.', type: 'residential', features: ['Mall', 'Gym'], coordinates: { lat: 19.429, lng: -99.160 }
    }
];

const INITIAL_TASKS: ActionTask[] = [
    { id: 't1', title: 'Enviar Contrato Final', description: 'Grupo Logístico MX espera el contrato de arrendamiento.', type: 'contract', priority: 'high', dueDate: 'Hoy', status: 'pending', relatedLeadId: 'l2' },
    { id: 't2', title: 'Llamada de Seguimiento', description: 'Confirmar visita con María García.', type: 'call', priority: 'medium', dueDate: 'Mañana', status: 'pending', relatedLeadId: 'l1' },
    { id: 't3', title: 'Tour Virtual: Penthouse SF', description: 'Cliente internacional solicitó recorrido.', type: 'tour', priority: 'high', dueDate: 'Hoy', status: 'pending' },
    { id: 't4', title: 'Actualizar Lista de Precios', description: 'Ajustar precios por inflación Q1.', type: 'admin', priority: 'low', dueDate: 'Viernes', status: 'pending' },
    { id: 't5', title: 'Cena con Inversionistas', description: 'Presentar proyecto Tulum.', type: 'tour', priority: 'high', dueDate: 'Jueves', status: 'pending' },
    { id: 't6', title: 'Enviar Brochure Industrial', description: 'Solicitado por Desarrolladora Riviera.', type: 'email', priority: 'medium', dueDate: 'Mañana', status: 'pending', relatedLeadId: 'l4' },
    { id: 't7', title: 'Revisión Legal: Terreno Valle', description: 'Checar gravamen.', type: 'contract', priority: 'medium', dueDate: 'Miércoles', status: 'pending' },
    { id: 't8', title: 'Llamada en Frío: CEO Tech', description: 'Ofrecer oficinas en Insurgentes.', type: 'call', priority: 'low', dueDate: 'Semana próxima', status: 'pending' },
    { id: 't9', title: 'Renovar Póliza de Seguro', description: 'Edificio Corporativo.', type: 'admin', priority: 'high', dueDate: 'Urgente', status: 'pending' },
    { id: 't10', title: 'Feedback Visita ayer', description: 'Preguntar a Ana López qué le pareció.', type: 'email', priority: 'medium', dueDate: 'Hoy', status: 'pending', relatedLeadId: 'l3' }
];

const INITIAL_LEADS: Lead[] = [
    { id: 'l1', name: 'Maria Garcia', title: 'CEO Tech Startup', phone: '+52 55 1234 5678', email: 'maria@tech.com', origin: 'whatsapp', addedDate: '24 Ene', pipelineDuration: '4 días en Nuevo', propertyId: '1', status: 'new', matchScore: 92 },
    { id: 'l2', name: 'Grupo Logístico MX', title: 'Director de Expansión', phone: '+52 55 8765 4321', email: 'expansion@glmx.com', origin: 'web', addedDate: '15 Ene', pipelineDuration: '12 días en Negociación', propertyId: 'ind-1', interestedInIds: ['ind-1', 'ind-2'], status: 'negotiation', matchScore: 98 },
    { id: 'l3', name: 'Ana Lopez', title: 'Inversionista Privada', phone: '+52 55 1122 3344', email: 'ana@invest.com', origin: 'referral', addedDate: '20 Ene', pipelineDuration: '8 días en Propuesta', propertyId: '2', status: 'proposal', matchScore: 85 },
    { id: 'l4', name: 'Desarrolladora Riviera', title: 'Gerente de Proyectos', phone: '+998 123 4567', email: 'proyectos@riviera.com', origin: 'web', addedDate: '2 días', pipelineDuration: '2 días en Contactado', propertyId: 'land-1', status: 'contacted', matchScore: 88 },
];

// --- Context & Provider ---

const DataEngineContext = createContext<DataEngineContextType | undefined>(undefined);

export function DataEngineProvider({ children }: { children: ReactNode }) {
    const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
    const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
    const [tasks, setTasks] = useState<ActionTask[]>(INITIAL_TASKS);

    const addProperty = (property: Property) => setProperties((prev) => [...prev, property]);
    const addLead = (lead: Lead) => setLeads((prev) => [...prev, lead]);

    const updateLeadStatus = (leadId: string, status: Lead['status']) => {
        setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status } : l)));
    };

    const linkPropertyToLead = (leadId: string, propertyId: string) => {
        setLeads((prev) => prev.map((l) => {
            if (l.id !== leadId) return l;
            const currentInterests = l.interestedInIds || [];
            if (currentInterests.includes(propertyId)) return l;
            return { ...l, interestedInIds: [...currentInterests, propertyId] };
        }));
    };

    const toggleTaskStatus = (taskId: string) => {
        setTasks((prev) => prev.map((t) =>
            t.id === taskId ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t
        ));
    };

    const addTask = (task: ActionTask) => setTasks((prev) => [task, ...prev]);

    const getLeadsByProperty = (propertyId: string) => {
        return leads.filter((l) => l.propertyId === propertyId || l.interestedInIds?.includes(propertyId));
    };

    const getPropertyById = (propertyId: string) => properties.find((p) => p.id === propertyId);
    const getLeadById = (leadId: string) => leads.find((l) => l.id === leadId);

    return (
        <DataEngineContext.Provider
            value={{
                properties,
                leads,
                tasks,
                addProperty,
                addLead,
                updateLeadStatus,
                linkPropertyToLead,
                toggleTaskStatus,
                addTask,
                getLeadsByProperty,
                getPropertyById,
                getLeadById,
            }}
        >
            {children}
        </DataEngineContext.Provider>
    );
}

export function useDataEngine() {
    const context = useContext(DataEngineContext);
    if (context === undefined) {
        throw new Error('useDataEngine must be used within a DataEngineProvider');
    }
    return context;
}
