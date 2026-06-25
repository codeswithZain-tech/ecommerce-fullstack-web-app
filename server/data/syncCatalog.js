import Product from '../models/Product.js';
import { initialProducts } from './productsData.js';

const catalogProducts = initialProducts.map(({ _id, ...rest }) => rest);

export async function syncProductCatalog() {
  let updated = 0;

  for (const item of catalogProducts) {
    const existing = await Product.findOne({ name: item.name }).select('image category price featured discount').lean();
    const isStalePath = existing?.image?.match(/\.png$/i) || existing?.image?.includes('suit.png');
    const isOutdated = !existing
      || isStalePath
      || existing.image !== item.image
      || existing.category !== item.category
      || existing.price !== item.price
      || Boolean(existing.featured) !== Boolean(item.featured);

    if (!isOutdated) continue;

    if (existing) {
      await Product.updateOne({ name: item.name }, { $set: item });
    } else {
      await Product.create(item);
    }
    updated += 1;
  }

  if (updated > 0) {
    console.log(`Product catalog synced (${updated} items)`);
  }
}
