export interface Location {
    address: string;
    latitude?: number;
    longitude?: number;
}
export interface Farm {
    id: string;
    name: string;
    location: Location;
    ownerId: string;
    size: number;
    type: 'agriculture' | 'aquaculture' | 'both';
    createdAt: Date;
    updatedAt: Date;
}
export interface Crop {
    id: string;
    farmId: string;
    type: string;
    variety?: string;
    plantingDate: Date;
    expectedHarvestDate?: Date;
    actualHarvestDate?: Date;
    yield?: number;
    status: 'planted' | 'growing' | 'harvested' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}
export interface Livestock {
    id: string;
    farmId: string;
    type: string;
    breed?: string;
    birthDate: Date;
    weight?: number;
    healthStatus: 'healthy' | 'sick' | 'deceased';
    createdAt: Date;
    updatedAt: Date;
}
export interface Pond {
    id: string;
    farmId: string;
    name: string;
    size: number;
    depth: number;
    waterSource: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Fish {
    id: string;
    pondId: string;
    species: string;
    quantity: number;
    stockingDate: Date;
    harvestDate?: Date;
    averageWeight?: number;
    status: 'stocked' | 'growing' | 'harvested';
    createdAt: Date;
    updatedAt: Date;
}
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'farmer' | 'admin' | 'viewer';
    farmIds: string[];
    createdAt: Date;
    updatedAt: Date;
}
export interface Location {
    address: string;
    latitude?: number;
    longitude?: number;
}
export interface Farm {
    id: string;
    name: string;
    location: Location;
    ownerId: string;
    size: number;
    type: 'agriculture' | 'aquaculture' | 'both';
    createdAt: Date;
    updatedAt: Date;
}
export interface Crop {
    id: string;
    farmId: string;
    type: string;
    variety?: string;
    plantingDate: Date;
    expectedHarvestDate?: Date;
    actualHarvestDate?: Date;
    yield?: number;
    status: 'planted' | 'growing' | 'harvested' | 'failed';
    createdAt: Date;
    updatedAt: Date;
}
export interface Livestock {
    id: string;
    farmId: string;
    type: string;
    breed?: string;
    birthDate: Date;
    weight?: number;
    healthStatus: 'healthy' | 'sick' | 'deceased';
    createdAt: Date;
    updatedAt: Date;
}
export interface Pond {
    id: string;
    farmId: string;
    name: string;
    size: number;
    depth: number;
    waterSource: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Fish {
    id: string;
    pondId: string;
    species: string;
    quantity: number;
    stockingDate: Date;
    harvestDate?: Date;
    averageWeight?: number;
    status: 'stocked' | 'growing' | 'harvested';
    createdAt: Date;
    updatedAt: Date;
}
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'farmer' | 'admin' | 'viewer';
    farmIds: string[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=agri-aqua.d.ts.map