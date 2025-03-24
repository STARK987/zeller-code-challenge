export abstract class PricingRule {
    abstract apply(items: string[], total: number, productCatalog: { [sku: string]: any }): number;
}  