import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number to a percentage string
 */
export function formatPercentage(value: number, decimals = 0): string {
  return `${Math.round(value * 10 ** decimals) / 10 ** decimals}%`;
}

/**
 * Formats a number to a fixed number of decimal places
 */
export function formatNumber(value: number, decimals = 1): string {
  return value.toFixed(decimals);
}

/**
 * Gets the appropriate text color class based on a numerical value
 */
export function getTextColorClass(value: number, max = 5): string {
  const percentage = (value / max) * 100;
  if (percentage >= 70) return 'text-green-600 dark:text-green-400';
  if (percentage >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
}

/**
 * Gets the appropriate background color class based on a numerical value
 */
export function getBgColorClass(value: number, max = 5): string {
  const percentage = (value / max) * 100;
  if (percentage >= 70) return 'bg-green-100 dark:bg-green-900/30';
  if (percentage >= 40) return 'bg-amber-100 dark:bg-amber-900/30';
  return 'bg-red-100 dark:bg-red-900/30';
}

/**
 * Debounce a function call
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttle a function call
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Generates a unique ID
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
