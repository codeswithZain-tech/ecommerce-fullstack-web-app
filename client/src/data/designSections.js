// Design asset mapping from Figma "Ecommerce Web Design (Community)" image folders.
// Each source file is used once across visible home sections where possible.

export const HOME_INTERIOR_ORDER = [
  'Soft chairs',
  'Sofa & chair',
  'Kitchen dishes',
  'Kitchen mixer',
  'Blenders',
  'Home appliance',
  'Coffee maker',
  'Water boiler black for kitchen, 1200 Watt',
];

export const CONSUMER_ELECTRONICS_ORDER = [
  'Headset for gaming with mic',
  'Smartwatch silver color modern',
  'Headphones',
  'Laptops',
  'GoPro cameras',
  'Smart watches',
  'Electric kettle',
  'Smartphones',
];

export const RECOMMENDED_ORDER = [
  'T-shirts with multiple colors, for men',
  'Jeans bag for travel for men',
  'Smartphones',
  'Leather wallet',
  'Canon Camera EOS 2000, Black 10x zoom',
  'Headset for gaming with mic',
  'Headphones',
  'GoPro cameras',
  'GoPro HERO6 4K Action Camera - Black',
  'Laptops',
];

export function sortProductsByNames(products, names) {
  const byName = new Map(products.map((product) => [product.name, product]));
  return names.map((name) => byName.get(name)).filter(Boolean);
}
