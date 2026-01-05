export interface IReview {
  user_id: string;
  rating: number;
  comment: string;
  date: string;
}

export interface IProduct {
  id: string;
  name: string;
  base_price: number;
  expiry_date: string;
  weight: number;
  packing: string;
  form: string;
  reviews: IReview[];
  recommendations: string[];
  category?: string;
  manufacturer?: string;
  description?: string;
  images?: string[];
  // Diverse attributes for agri-aqua products
  nutritional_info?: {
    calories?: number;
    protein?: number;
    fat?: number;
    carbohydrates?: number;
    vitamins?: Record<string, number>;
    minerals?: Record<string, number>;
  };
  certifications?: string[]; // e.g., organic, fair trade
  origin?: string;
  sustainability_score?: number;
  allergens?: string[];
  storage_instructions?: string;
  preparation_methods?: string[];
  shelf_life?: number; // in days
  packaging_options?: string[];
  quality_grades?: string[];
  traceability_info?: {
    farm_id?: string;
    harvest_date?: string;
    processing_date?: string;
  };
}

export interface IBatch {
  product_id: string;
  quantity: number;
  batch_number?: string;
  production_date?: string;
  expiry_date?: string;
  quality_checks?: {
    date: string;
    inspector: string;
    passed: boolean;
    notes?: string;
  }[];
  storage_location?: string;
  supplier_id?: string;
}

export interface IOrder {
  id: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  items: IOrderItem[];
  customer_id: string;
  created_at: string;
  updated_at?: string;
  shipping_address?: string;
  billing_address?: string;
  payment_method?: string;
  delivery_date?: string;
  notes?: string;
}

export interface IOrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
  batch_id?: string;
  discounts?: number;
  tax_rate?: number;
}

export type ApiResponse<T> = {
  data: T;
  error: string | null;
  message?: string;
  timestamp?: string;
  request_id?: string;
};

// Extended Product Model for Integrated Agri-Aquaculture-Poultry Manufacturer
export interface IIntegratedProduct extends IProduct {
  // Integration features
  category: 'agri' | 'aqua' | 'poultry' | 'integrated';
  applications: string[]; // ['crops', 'fish', 'poultry', 'livestock']
  compatibleWith: string[]; // Product compatibility matrix
  seasonalAvailability: ISeason[];
  regionalPricing: IRegionalPrice[];
  minOrderQty: number;
  bulkPricing: IBulkPricingTier[];
  targetAudience: 'farmer' | 'dealer' | 'distributor' | 'all';
}

export interface ISeason {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  startMonth: number; // 1-12
  endMonth: number; // 1-12
  demandMultiplier: number; // Price adjustment factor
}

export interface IRegionalPrice {
  region: string; // Geographic region identifier
  adjustment: number; // Price adjustment factor (1.0 = no change)
  transportCost: number; // Additional transport cost
}

export interface IBulkPricingTier {
  minQuantity: number;
  maxQuantity?: number;
  discountPercentage: number;
  description?: string;
}

// Enhanced User Role Management
export type UserRole = 'farmer' | 'dealer' | 'distributor' | 'manufacturer_admin' | 'regional_manager';

export interface IUserProfile {
  id: string;
  role: UserRole;
  businessType?: 'individual' | 'cooperative' | 'corporation' | 'partnership';
  farmSize?: number; // in hectares
  location: ILocation;
  creditLimit?: number;
  loyaltyPoints: number;
  preferredProducts: string[];
  dealerNetwork?: IDealerNetwork;
  distributorTerritory?: string[];
  certifications?: string[];
  complianceStatus: 'pending' | 'approved' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface IDealerNetwork {
  parentDealerId?: string;
  subDealers: string[];
  territory: string;
  commissionStructure: ICommissionTier[];
}

export interface ICommissionTier {
  productCategory: string;
  commissionPercentage: number;
  minVolume: number;
  maxVolume?: number;
}

export interface ILocation {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  timezone: string;
}

// Smart Pricing Engine Models
export interface IPricingRule {
  id: string;
  name: string;
  type: 'user_type' | 'volume' | 'geographic' | 'seasonal' | 'loyalty' | 'promotional';
  conditions: IPricingCondition[];
  adjustments: IPricingAdjustment[];
  priority: number; // Higher number = higher priority
  active: boolean;
  validFrom: string;
  validTo?: string;
}

export interface IPricingCondition {
  field: string; // 'user.role', 'quantity', 'location.region', etc.
  operator: 'equals' | 'greater_than' | 'less_than' | 'in' | 'between';
  value: any;
}

export interface IPricingAdjustment {
  type: 'percentage' | 'fixed_amount' | 'multiplier';
  value: number;
  description: string;
}

export interface IPricingCalculation {
  productId: string;
  userId: string;
  quantity: number;
  basePrice: number;
  adjustments: IPricingAdjustmentResult[];
  finalPrice: number;
  appliedRules: string[];
  calculatedAt: string;
}

export interface IPricingAdjustmentResult {
  ruleId: string;
  ruleName: string;
  adjustment: number;
  description: string;
}

// Order Extensions for B2B/B2C
export interface IEnhancedOrder extends IOrder {
  orderType: 'b2c' | 'b2b_bulk' | 'b2b_dealer' | 'b2b_distributor';
  paymentTerms?: IPaymentTerms;
  shippingMethod: 'standard' | 'express' | 'scheduled';
  dealerId?: string; // For dealer-fulfilled orders
  loyaltyPointsEarned: number;
  loyaltyPointsUsed: number;
  promotionalDiscounts: IPromotionalDiscount[];
}

export interface IPaymentTerms {
  type: 'immediate' | 'net_30' | 'net_60' | 'installments';
  dueDate?: string;
  installmentSchedule?: IPaymentInstallment[];
}

export interface IPaymentInstallment {
  amount: number;
  dueDate: string;
  paid: boolean;
  paidDate?: string;
}

export interface IPromotionalDiscount {
  promotionId: string;
  discountAmount: number;
  description: string;
}

// Product Bundle/Kits
export interface IProductBundle {
  id: string;
  name: string;
  description: string;
  products: IBundleItem[];
  totalPrice: number;
  discountPercentage: number;
  targetApplications: string[];
  seasonal: boolean;
  bundleType: 'starter_kit' | 'maintenance' | 'emergency' | 'seasonal';
}

export interface IBundleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
}

// Farm Management Integration
export interface IFarmProfile {
  id: string;
  farmerId: string;
  name: string;
  location: ILocation;
  size: number; // hectares
  farmType: 'agriculture' | 'aquaculture' | 'poultry' | 'integrated';
  crops: ICrop[];
  ponds: IPond[];
  livestock: ILivestock[];
  equipment: IEquipment[];
  certifications: string[];
  sustainabilityScore: number;
  lastAssessmentDate: string;
}

export interface ICrop {
  id: string;
  name: string;
  variety: string;
  plantedArea: number; // hectares
  plantingDate: string;
  expectedHarvestDate: string;
  currentStage: 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'harvested';
  yieldEstimate: number;
  productsUsed: string[]; // Product IDs
}

export interface IPond {
  id: string;
  name: string;
  area: number; // square meters
  depth: number; // meters
  fishSpecies: string[];
  stockingDensity: number; // fish per square meter
  waterQuality: IWaterQuality;
  feedingSchedule: IFeedingSchedule[];
  productsUsed: string[]; // Product IDs
}

export interface ILivestock {
  id: string;
  type: 'chicken' | 'duck' | 'goat' | 'pig' | 'cattle';
  breed: string;
  count: number;
  age: number; // weeks
  healthStatus: 'healthy' | 'sick' | 'recovering';
  productsUsed: string[]; // Product IDs
}

export interface IWaterQuality {
  ph: number;
  temperature: number;
  dissolvedOxygen: number;
  ammonia: number;
  nitrite: number;
  nitrate: number;
  lastTested: string;
}

export interface IFeedingSchedule {
  time: string; // HH:MM format
  feedType: string;
  quantity: number;
  frequency: 'daily' | 'twice_daily' | 'weekly';
}

export interface IEquipment {
  id: string;
  type: string;
  model: string;
  capacity: number;
  purchaseDate: string;
  maintenanceSchedule: IMaintenanceSchedule[];
}

export interface IMaintenanceSchedule {
  type: 'preventive' | 'corrective';
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annual';
  lastPerformed: string;
  nextDue: string;
  description: string;
}

// Analytics and Recommendations
export interface IProductRecommendation {
  productId: string;
  farmerId: string;
  recommendationScore: number; // 0-1
  reason: string;
  seasonalRelevance: number;
  compatibilityScore: number;
  expectedYield: number;
  roi: number; // Return on investment
  generatedAt: string;
}

export interface IUsageAnalytics {
  farmerId: string;
  productId: string;
  period: string; // 'monthly', 'quarterly', 'annual'
  totalQuantity: number;
  totalSpent: number;
  effectiveness: number; // Based on yield/productivity metrics
  satisfaction: number; // User feedback
  recommendations: string[];
}
