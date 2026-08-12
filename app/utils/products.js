import productsData from '../../products.json';

const BASE_URL = 'https://pagalworldh.com';

// Deterministic sale prices under ₹49
const SALE_PRICES = [19, 29, 39, 49, 9];

/**
 * Given a product object, collect all img1, img2, img3... fields
 * and return them as a full-URL array.
 */
function extractImages(product) {
  const imgs = [];
  let i = 1;
  while (product[`img${i}`]) {
    imgs.push(`${BASE_URL}${product[`img${i}`]}`);
    i++;
  }
  return imgs;
}

export function getProducts() {
  return productsData.map(product => {
    const salePrice = SALE_PRICES[product.id % SALE_PRICES.length];
    const images = extractImages(product);
    const image = images[0] || `${BASE_URL}/assets/img/placeholder.png`;

    return {
      ...product,
      originalPrice: product.price,
      price: salePrice,
      image,         // Primary image (full URL)
      images,        // All gallery images (full URLs)
    };
  });
}

export function getProductById(id) {
  return getProducts().find(p => p.id === parseInt(id));
}
