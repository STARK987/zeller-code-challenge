import { PricingRule } from '../models/PricingRule';
import { PACKAGEDISCOUNT } from "../data/discount";

export class PackageRule extends PricingRule {
  apply(items: string[], total: number, productCatalog: { [sku: string]: any }): number {
    const itemsToDiscount = PACKAGEDISCOUNT.sku; // Get the items to discount from PACKAGEDISCOUNT
    let totalDiscountedItemsCount = 0;
    let discount = 0;

    for (const sku of itemsToDiscount) {
      // Count the number of occurrences of this SKU in the scanned items
      const count = items.filter(item => item === sku).length;
      // If there are any of the current item in the cart
      if (count > 0 && sku in productCatalog) {
        const itemPrice = productCatalog[sku].price; 
        totalDiscountedItemsCount += count;
        
        // Apply discount if enough items of eligible SKUs are in the cart
        if (totalDiscountedItemsCount >= PACKAGEDISCOUNT.packSize) {
          // Discount based on the pack size, calculate the discount based on the total number of discounted items
          const fullPriceItemCount = Math.floor(totalDiscountedItemsCount / PACKAGEDISCOUNT.packSize) * PACKAGEDISCOUNT.priceForPackageItems;
          discount += count * itemPrice - fullPriceItemCount * itemPrice;
        }
      }
    }

    // Ensure the discount does not exceed the total amount
    if (discount > total) {
        discount = total;
    }

    // Subtract the discount from the total
    total -= discount;

    return total;
  }
}
