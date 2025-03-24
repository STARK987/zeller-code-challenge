import { Checkout } from '@models/Checkout';
import { PackageRule } from '@rules/packageDiscountRule';
import { BulkDiscountRule } from '@rules/bulkDiscountRule';

// Mock Product Data
const productCatalog = {
  ipd: { sku: 'ipd', name: 'Super iPad', price: 549.99 },
  mbp: { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
  atv: { sku: 'atv', name: 'Apple TV', price: 109.5 },
  vga: { sku: 'vga', name: 'VGA adapter', price: 30.0 }
};

// Mock Pricing Rules
const pricingRules = [
  new PackageRule(),
  new BulkDiscountRule()
];

describe('Checkout System', () => {
  let co: Checkout;

  beforeEach(() => {
    // Initialize a new Checkout system before each test
    co = new Checkout(pricingRules, productCatalog);
  });

  afterEach(() => {
    // Clear the cart after each test
    co.clear();
  });

  it('should calculate total price for a cart with valid items', () => {
    // Scan items
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('vga');

    // Expected total calculation
    const total = co.total();

    // Check that the calculated total is correct
    expect(total).toBeCloseTo(249.00, 2); // Example: after applying the package discount
  });

  it('should apply bulk discount for eligible items', () => {
    // Scan items
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('vga');

    // Expected total after applying bulk discount on 'ipd'
    const total = co.total();
    
    // Assuming a bulk discount brings 'ipd' price down to 499.99 each
    expect(total).toBeCloseTo(2529.95, 2);
  });

  it('should apply Package discount for eligible items', () => {
    // Scan items
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('vga');

    // Expected total after applying package discount on 'atv'
    const total = co.total();
    
    // Assuming a package discount 3 for 2 deal on atv
    expect(total).toBeCloseTo(1348.98, 2); 
  });

  it('should not apply a discount for invalid items', () => {
    // Scan invalid and valid items
    co.scan('pov'); // Invalid item
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('vga');

    // Expected total after applying the package discount
    const total = co.total();
    expect(total).toBeCloseTo(249.00, 2); // Only 'atv' should count for discount
  });

  it('should not allow discount greater than total', () => {
    // Scan items that would lead to a discount greater than total
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');

    // Set an arbitrary total (e.g., it might be small enough to test the capping logic)
    const total = co.total();

    // Ensure that the discount does not exceed the total amount
    expect(total).toBeGreaterThanOrEqual(0);
  });

  it('should clear the checkout cart before a new checkout', () => {
    co.scan('atv');
    co.scan('atv');
    co.scan('vga');

    let total = co.total();
    expect(total).toBeCloseTo(249.00, 2); // Calculate the total before clearing

    // Clear the cart
    co.clear();

    // Scan new items
    co.scan('ipd');
    co.scan('ipd');
    co.scan('atv');

    total = co.total();
    expect(total).toBeCloseTo(1209.48, 2); // Total after clearing and scanning new items
  });
});
