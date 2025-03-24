import { PricingRule } from './PricingRule';

export class Checkout {
  private pricingRules: PricingRule[];
  private scannedItems: string[];
  private productCatalog: { [key: string]: any };

  constructor(pricingRules: PricingRule[], productCatalog: { [key: string]: any }) {
    this.pricingRules = pricingRules;
    this.scannedItems = [];
    this.productCatalog = productCatalog;
  }

  scan(itemSku: string): void {
    // Check if the itemSku is present in the productCatalog
    if (!(itemSku in this.productCatalog)) {
        console.log(`Item with SKU '${itemSku}' does not exist in the catalog.`);
        return;
    }
    
    this.scannedItems.push(itemSku);
  }

  total(): number {
    let total = 0;

    // Calculate the price for each scanned item
    for (const sku of this.scannedItems) {
      const product = this.productCatalog[sku];
      total += product.price;
    }

    // Apply the pricing rules
    for (const rule of this.pricingRules) {
      total = rule.apply(this.scannedItems, total, this.productCatalog);
    }

    return total;
  }

  clear(): void {
    // Clear the previously scanned Items
    this.scannedItems = []
  }
}