export const PACKAGEDISCOUNT = {
    "type": "package",
    "sku": ["atv"], // Add SKUs to apply Discount
    "packSize": 3,
    "priceForPackageItems": 2
}

export const BULKDISCOUNT = {
    "type": "bulk",
    "sku": ["ipd"], // Add SKUs to apply Discount
    "minItems": 4,
    "discountedPrice": 499.99
}