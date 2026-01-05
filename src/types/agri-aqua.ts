// Agri-Aqua Data Structures for KN Biosciences ERP

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
  size: number; // in hectares
  type: 'agriculture' | 'aquaculture' | 'both';
  createdAt: Date;
  updatedAt: Date;
}

export interface Crop {
  id: string;
  farmId: string;
  type: string; // e.g., wheat, rice
  variety?: string;
  plantingDate: Date;
  expectedHarvestDate?: Date;
  actualHarvestDate?: Date;
  yield?: number; // in kg or tons
  status: 'planted' | 'growing' | 'harvested' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Livestock {
  id: string;
  farmId: string;
  type: string; // e.g., cow, chicken
  breed?: string;
  birthDate: Date;
  weight?: number; // in kg
  healthStatus: 'healthy' | 'sick' | 'deceased';
  createdAt: Date;
  updatedAt: Date;
}

export interface Pond {
  id: string;
  farmId: string;
  name: string;
  size: number; // area in sq meters
  depth: number; // in meters
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
  averageWeight?: number; // in kg
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
  size: number; // in hectares
  type: 'agriculture' | 'aquaculture' | 'both';
  createdAt: Date;
  updatedAt: Date;
}

export interface Crop {
  id: string;
  farmId: string;
  type: string; // e.g., wheat, rice
  variety?: string;
  plantingDate: Date;
  expectedHarvestDate?: Date;
  actualHarvestDate?: Date;
  yield?: number; // in kg or tons
  status: 'planted' | 'growing' | 'harvested' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Livestock {
  id: string;
  farmId: string;
  type: string; // e.g., cow, chicken
  breed?: string;
  birthDate: Date;
  weight?: number; // in kg
  healthStatus: 'healthy' | 'sick' | 'deceased';
  createdAt: Date;
  updatedAt: Date;
}

export interface Pond {
  id: string;
  farmId: string;
  name: string;
  size: number; // area in sq meters
  depth: number; // in meters
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
  averageWeight?: number; // in kg
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
