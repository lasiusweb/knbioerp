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
    items: IOrderItem[];
    customer_id: string;
    created_at: string;
}

export interface IOrderItem {
    product_id: string;
    quantity: number;
    unit_price: number;
}

export type ApiResponse<T> = {
    data: T;
    error: string | null;
    message?: string;
};



export interface IBatch {
    product_id: string;
    quantity: number;
    batch_number?: string; // Added
    production_date?: string; // Added
    expiry_date?: string; // Added
}

export interface IOrder {
    id: string;
    status: 'pending' | 'paid' | 'shipped' | 'delivered'; // Added status
    total_amount: number;
    items: IOrderItem[]; // Added
    customer_id: string; // Added
    created_at: string; // Added
}

export interface IOrderItem {
    product_id: string;
    quantity: number;
    unit_price: number;
}

export type ApiResponse<T> = {
    data: T;
    error: string | null;
    message?: string; // Added optional message
};



    product_id: string;
    quantity: number;
    batch_number?: string; // Added
    production_date?: string; // Added
    expiry_date?: string; // Added
}

export interface IOrder {
    id: string;
    status: 'pending' | 'paid' | 'shipped' | 'delivered'; // Added status
    total_amount: number;
    items: IOrderItem[]; // Added
    customer_id: string; // Added
    created_at: string; // Added
}

export interface IOrderItem {
    product_id: string;
    quantity: number;
    unit_price: number;
}

export type ApiResponse<T> = {
    data: T;
    error: string | null;
    message?: string; // Added optional message
};


    product_id: string;
    quantity: number;
    batch_number?: string; // Added
    production_date?: string; // Added
    expiry_date?: string; // Added
}

export interface IOrder {
    id: string;
    status: 'pending' | 'paid' | 'shipped' | 'delivered'; // Added status
    total_amount: number;
    items: IOrderItem[]; // Added
    customer_id: string; // Added
    created_at: string; // Added
}

export interface IOrderItem {
    product_id: string;
    quantity: number;
    unit_price: number;
}

export type ApiResponse<T> = {
    data: T;
    error: string | null;
    message?: string; // Added optional message
};

export interface IBatch {
    product_id: string;
    quantity: number;
    batch_number?: string; // Added
    production_date?: string; // Added
    expiry_date?: string; // Added
}

export interface IOrder {
    id: string;
    status: 'pending' | 'paid' | 'shipped' | 'delivered'; // Added status
    total_amount: number;
    items: IOrderItem[]; // Added
    customer_id: string; // Added
    created_at: string; // Added
}

export interface IOrderItem {
    product_id: string;
    quantity: number;
    unit_price: number;
}

export type ApiResponse<T> = {
    data: T;
    error: string | null;
    message?: string; // Added optional message
};

}

export type ApiResponse<T> = {
    data: T;
    error: string | null;
};
