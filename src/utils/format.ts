/**
 * Utility functions for formatting data in user-friendly formats.
 */

/**
 * Formats a number as currency.
 *
 * @param amount - The numeric amount to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = 'INR',
  locale: string = 'en-IN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Formats a weight value with appropriate units.
 *
 * @param weight - The weight value
 * @param unit - The unit ('kg', 'g', 'lbs', 'oz') (default: 'kg')
 * @param precision - Number of decimal places (default: 2)
 * @returns Formatted weight string
 */
export function formatWeight(
  weight: number,
  unit: 'kg' | 'g' | 'lbs' | 'oz' = 'kg',
  precision: number = 2
): string {
  const formatted = weight.toFixed(precision);
  return `${formatted} ${unit}`;
}

/**
 * Formats a date as a user-friendly expiry string.
 *
 * @param dateString - The date string (ISO format)
 * @param options - Formatting options
 * @returns Formatted expiry string
 */
export function formatExpiry(
  dateString: string,
  options: {
    relative?: boolean;
    locale?: string;
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
  } = {}
): string {
  const {
    relative = true,
    locale = 'en-US',
    dateStyle = 'medium'
  } = options;

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (relative) {
    if (diffDays < 0) {
      return `Expired ${Math.abs(diffDays)} days ago`;
    } else if (diffDays === 0) {
      return 'Expires today';
    } else if (diffDays === 1) {
      return 'Expires tomorrow';
    } else if (diffDays <= 7) {
      return `Expires in ${diffDays} days`;
    } else if (diffDays <= 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Expires in ${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
      // Fall back to formatted date
      return date.toLocaleDateString(locale, { dateStyle });
    }
  }

  return date.toLocaleDateString(locale, { dateStyle });
}

/**
 * Formats a percentage value.
 *
 * @param value - The decimal value (e.g., 0.15 for 15%)
 * @param precision - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number,
  precision: number = 1
): string {
  return `${(value * 100).toFixed(precision)}%`;
}

/**
 * Formats a quantity with appropriate grouping.
 *
 * @param quantity - The quantity number
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns Formatted quantity string
 */
export function formatQuantity(
  quantity: number,
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale).format(quantity);
}
