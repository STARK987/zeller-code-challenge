import * as fs from 'fs';
import * as path from 'path';
import { Checkout } from './models/Checkout';
import { PackageRule } from './rules/packageDiscountRule';
import { BulkDiscountRule } from './rules/bulkDiscountRule';

// Load the product data from the JSON file
const productsPath = path.join(__dirname, 'data', 'product.json');
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Create a map of SKU to Product objects
const productCatalog = productsData.reduce((catalog: { [key: string]: any }, product: any) => {
  catalog[product.sku] = product;
  return catalog;
}, {});

// Add Rules for Promotions
const pricingRules = [
  new PackageRule(),
  new BulkDiscountRule()
];

// Initialize checkout system with the pricing rules
const co = new Checkout(pricingRules, productCatalog);

// Checkout Items
co.scan('pov'); // Adding Invalid Item
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('vga');

// Calculate the total price
console.log(`Total: $${co.total().toFixed(2)}`);

// Clear the Checkout Cart Before Another Checkout
co.clear()

// Another Checkout with more items
co.scan('atv');
co.scan('ipd');
co.scan('ipd');
co.scan('atv');
co.scan('ipd');
co.scan('ipd');
co.scan('ipd');
console.log(`Total: $${co.total().toFixed(2)}`);