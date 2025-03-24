import { PricingRule } from '../models/PricingRule';
import { BULKDISCOUNT } from "../data/discount";

export class BulkDiscountRule extends PricingRule {
  apply(items: string[], total: number, productCatalog: { [sku: string]: any }): number {
    const itemsToDiscount = BULKDISCOUNT.sku; // Get the items to discount from BULKDISCOUNT
    let discount = 0;

    for (const sku of itemsToDiscount) {
      const count = items.filter(item => item === sku).length;
      // If the item exists in the product catalog and there are enough items to apply the discount
      if (count >= BULKDISCOUNT.minItems && sku in productCatalog) {
        const discountPrice = BULKDISCOUNT.discountedPrice; // Discounted price for the item
        const originalPrice = productCatalog[sku].price; // Original price of the item
        // Calculate the discount for the current item
        discount += count * (originalPrice - discountPrice);
      }
    }

    // Ensure the discount does not exceed the total amount
    if (discount > total) {
      discount = total;
    }

    // Subtract the total discount from the total amount
    total -= discount;

    return total;
  }
}
