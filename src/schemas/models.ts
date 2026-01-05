import { z } from 'zod';

export const ReviewSchema = z.object({
  user_id: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  date: z.string(),
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  base_price: z.number(),
  expiry_date: z.string(),
  weight: z.number(),
  packing: z.string(),
  form: z.string(),
  reviews: z.array(ReviewSchema),
  recommendations: z.array(z.string()),
  category: z.string().optional(),
  manufacturer: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  nutritional_info: z.object({
    calories: z.number().optional(),
    protein: z.number().optional(),
    fat: z.number().optional(),
    carbohydrates: z.number().optional(),
    vitamins: z.record(z.number()).optional(),
    minerals: z.record(z.number()).optional(),
  }).optional(),
  certifications: z.array(z.string()).optional(),
  origin: z.string().optional(),
  sustainability_score: z.number().optional(),
  allergens: z.array(z.string()).optional(),
  storage_instructions: z.string().optional(),
  preparation_methods: z.array(z.string()).optional(),
  shelf_life: z.number().optional(),
  packaging_options: z.array(z.string()).optional(),
  quality_grades: z.array(z.string()).optional(),
  traceability_info: z.object({
    farm_id: z.string().optional(),
    harvest_date: z.string().optional(),
    processing_date: z.string().optional(),
  }).optional(),
});

export const BatchSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
  batch_number: z.string().optional(),
  production_date: z.string().optional(),
  expiry_date: z.string().optional(),
  quality_checks: z.array(z.object({
    date: z.string(),
    inspector: z.string(),
    passed: z.boolean(),
    notes: z.string().optional(),
  })).optional(),
  storage_location: z.string().optional(),
  supplier_id: z.string().optional(),
});

export const OrderItemSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
  unit_price: z.number(),
  batch_id: z.string().optional(),
  discounts: z.number().optional(),
  tax_rate: z.number().optional(),
});

export const OrderSchema = z.object({
  id: z.string(),
  status: z.enum(['pending', 'paid', 'shipped', 'delivered', 'cancelled']),
  total_amount: z.number(),
  items: z.array(OrderItemSchema),
  customer_id: z.string(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  shipping_address: z.string().optional(),
  billing_address: z.string().optional(),
  payment_method: z.string().optional(),
  delivery_date: z.string().optional(),
  notes: z.string().optional(),
});

export const SeasonSchema = z.object({
  season: z.enum(['spring', 'summer', 'autumn', 'winter']),
  startMonth: z.number().min(1).max(12),
  endMonth: z.number().min(1).max(12),
  demandMultiplier: z.number(),
});

export const RegionalPriceSchema = z.object({
  region: z.string(),
  adjustment: z.number(),
  transportCost: z.number(),
});

export const BulkPricingTierSchema = z.object({
  minQuantity: z.number(),
  maxQuantity: z.number().optional(),
  discountPercentage: z.number(),
  description: z.string().optional(),
});

export const IntegratedProductSchema = ProductSchema.extend({
  category: z.enum(['agri', 'aqua', 'poultry', 'integrated']),
  applications: z.array(z.string()),
  compatibleWith: z.array(z.string()),
  seasonalAvailability: z.array(SeasonSchema),
  regionalPricing: z.array(RegionalPriceSchema),
  minOrderQty: z.number(),
  bulkPricing: z.array(BulkPricingTierSchema),
  targetAudience: z.enum(['farmer', 'dealer', 'distributor', 'all']),
});

export const LocationSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  timezone: z.string(),
});

export const CommissionTierSchema = z.object({
  productCategory: z.string(),
  commissionPercentage: z.number(),
  minVolume: z.number(),
  maxVolume: z.number().optional(),
});

export const DealerNetworkSchema = z.object({
  parentDealerId: z.string().optional(),
  subDealers: z.array(z.string()),
  territory: z.string(),
  commissionStructure: z.array(CommissionTierSchema),
});

export const UserRoleSchema = z.enum(['farmer', 'dealer', 'distributor', 'manufacturer_admin', 'regional_manager']);

export const UserProfileSchema = z.object({
  id: z.string(),
  role: UserRoleSchema,
  businessType: z.enum(['individual', 'cooperative', 'corporation', 'partnership']).optional(),
  farmSize: z.number().optional(),
  location: LocationSchema,
  creditLimit: z.number().optional(),
  loyaltyPoints: z.number(),
  preferredProducts: z.array(z.string()),
  dealerNetwork: DealerNetworkSchema.optional(),
  distributorTerritory: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  complianceStatus: z.enum(['pending', 'approved', 'suspended']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PricingConditionSchema = z.object({
  field: z.string(),
  operator: z.enum(['equals', 'greater_than', 'less_than', 'in', 'between']),
  value: z.any(),
});

export const PricingAdjustmentSchema = z.object({
  type: z.enum(['percentage', 'fixed_amount', 'multiplier']),
  value: z.number(),
  description: z.string(),
});

export const PricingRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['user_type', 'volume', 'geographic', 'seasonal', 'loyalty', 'promotional']),
  conditions: z.array(PricingConditionSchema),
  adjustments: z.array(PricingAdjustmentSchema),
  priority: z.number(),
  active: z.boolean(),
  validFrom: z.string(),
  validTo: z.string().optional(),
});

export const PricingCalculationSchema = z.object({
  productId: z.string(),
  userId: z.string(),
  quantity: z.number(),
  basePrice: z.number(),
  adjustments: z.array(z.object({
    ruleId: z.string(),
    ruleName: z.string(),
    adjustment: z.number(),
    description: z.string(),
  })),
  finalPrice: z.number(),
  appliedRules: z.array(z.string()),
  calculatedAt: z.string(),
});

export const PaymentInstallmentSchema = z.object({
  amount: z.number(),
  dueDate: z.string(),
  paid: z.boolean(),
  paidDate: z.string().optional(),
});

export const PaymentTermsSchema = z.object({
  type: z.enum(['immediate', 'net_30', 'net_60', 'installments']),
  dueDate: z.string().optional(),
  installmentSchedule: z.array(PaymentInstallmentSchema).optional(),
});

export const PromotionalDiscountSchema = z.object({
  promotionId: z.string(),
  discountAmount: z.number(),
  description: z.string(),
});

export const EnhancedOrderSchema = OrderSchema.extend({
  orderType: z.enum(['b2c', 'b2b_bulk', 'b2b_dealer', 'b2b_distributor']),
  paymentTerms: PaymentTermsSchema.optional(),
  shippingMethod: z.enum(['standard', 'express', 'scheduled']),
  dealerId: z.string().optional(),
  loyaltyPointsEarned: z.number(),
  loyaltyPointsUsed: z.number(),
  promotionalDiscounts: z.array(PromotionalDiscountSchema),
});

export const BundleItemSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  discountPercentage: z.number(),
});

export const ProductBundleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  products: z.array(BundleItemSchema),
  totalPrice: z.number(),
  discountPercentage: z.number(),
  targetApplications: z.array(z.string()),
  seasonal: z.boolean(),
  bundleType: z.enum(['starter_kit', 'maintenance', 'emergency', 'seasonal']),
});

export const CropSchema = z.object({
  id: z.string(),
  name: z.string(),
  variety: z.string(),
  plantedArea: z.number(),
  plantingDate: z.string(),
  expectedHarvestDate: z.string(),
  currentStage: z.enum(['seedling', 'vegetative', 'flowering', 'fruiting', 'harvested']),
  yieldEstimate: z.number(),
  productsUsed: z.array(z.string()),
});

export const PondSchema = z.object({
  id: z.string(),
  name: z.string(),
  area: z.number(),
  depth: z.number(),
  fishSpecies: z.array(z.string()),
  stockingDensity: z.number(),
  waterQuality: z.object({
    ph: z.number(),
    temperature: z.number(),
    dissolvedOxygen: z.number(),
    ammonia: z.number(),
    nitrite: z.number(),
    nitrate: z.number(),
    lastTested: z.string(),
  }),
  feedingSchedule: z.array(z.object({
    time: z.string(),
    feedType: z.string(),
    quantity: z.number(),
    frequency: z.enum(['daily', 'twice_daily', 'weekly']),
  })),
  productsUsed: z.array(z.string()),
});

export const LivestockSchema = z.object({
  id: z.string(),
  type: z.enum(['chicken', 'duck', 'goat', 'pig', 'cattle']),
  breed: z.string(),
  count: z.number(),
  age: z.number(),
  healthStatus: z.enum(['healthy', 'sick', 'recovering']),
  productsUsed: z.array(z.string()),
});

export const EquipmentSchema = z.object({
  id: z.string(),
  type: z.string(),
  model: z.string(),
  capacity: z.number(),
  purchaseDate: z.string(),
  maintenanceSchedule: z.array(z.object({
    type: z.enum(['preventive', 'corrective']),
    frequency: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'annual']),
    lastPerformed: z.string(),
    nextDue: z.string(),
    description: z.string(),
  })),
});

export const FarmProfileSchema = z.object({
  id: z.string(),
  farmerId: z.string(),
  name: z.string(),
  location: LocationSchema,
  size: z.number(),
  farmType: z.enum(['agriculture', 'aquaculture', 'poultry', 'integrated']),
  crops: z.array(CropSchema),
  ponds: z.array(PondSchema),
  livestock: z.array(LivestockSchema),
  equipment: z.array(EquipmentSchema),
  certifications: z.array(z.string()),
  sustainabilityScore: z.number(),
  lastAssessmentDate: z.string(),
});

export const ProductRecommendationSchema = z.object({
  productId: z.string(),
  farmerId: z.string(),
  recommendationScore: z.number(),
  reason: z.string(),
  seasonalRelevance: z.number(),
  compatibilityScore: z.number(),
  expectedYield: z.number(),
  roi: z.number(),
  generatedAt: z.string(),
});

export const UsageAnalyticsSchema = z.object({
  farmerId: z.string(),
  productId: z.string(),
  period: z.string(),
  totalQuantity: z.number(),
  totalSpent: z.number(),
  effectiveness: z.number(),
  satisfaction: z.number(),
  recommendations: z.array(z.string()),
});
