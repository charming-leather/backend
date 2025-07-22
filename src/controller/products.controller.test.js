const {
  createProduct,
  updateStock,
  getByCategory,
} = require('../controller/products.controller');

jest.mock('../repository/product.repository');

const {
  add,
  updateStock: updateStockRepo,
  getByCategory: getByCategoryRepo,
} = require('../repository/product.repository');

describe('createProduct', () => {
  const leatherProducts = [
    { name: 'Leather Wallet', price: 299.99, categoryId: 1 },
    { name: 'Leather Belt', price: 199.99, categoryId: 1 },
    { name: 'Leather Shoes', price: 899.99, categoryId: 2 },
    { name: 'Leather Jacket', price: 1499.99, categoryId: 3 },
    { name: 'Leather Handbag', price: 1299.50, categoryId: 2 },
    { name: 'Leather Backpack', price: 999.95, categoryId: 2 },
    { name: 'Leather Phone Case', price: 159.99, categoryId: 4 },
    { name: 'Leather Notebook Cover', price: 249.99, categoryId: 4 },
    { name: 'Leather Key Holder', price: 89.99, categoryId: 1 },
    { name: 'Leather Watch Strap', price: 179.99, categoryId: 4 },
    { name: 'Leather Gloves', price: 399.99, categoryId: 3 },
    { name: 'Leather Couch', price: 7499.99, categoryId: 5 },
    { name: 'Leather Briefcase', price: 1999.00, categoryId: 2 },
    { name: 'Leather Camera Strap', price: 299.99, categoryId: 4 },
    { name: 'Leather Passport Holder', price: 219.99, categoryId: 4 },
  ];

  leatherProducts.forEach((product, index) => {
    it(`should create and return leather product ${index + 1}: ${product.name}`, async () => {
      const expected = { success: true, product_id: index + 1 };
      add.mockResolvedValue(expected);

      const result = await createProduct(product.name, product.price, product.categoryId);
      expect(result).toEqual(expected);
    });
  });
});

describe('updateStock', () => {
  const testStockUpdates = [
    { productId: 1, quantity: 50 },
    { productId: 2, quantity: 0 },
    { productId: 3, quantity: 100 },
    { productId: 4, quantity: 7 },
  ];

  testStockUpdates.forEach(({ productId, quantity }) => {
    it(`should update stock of product ${productId} to ${quantity}`, async () => {
      const expected = { success: true, message: `Stock for product ${productId} updated to ${quantity}` };
      updateStockRepo.mockResolvedValue(expected);

      const result = await updateStock(productId, quantity);
      expect(result).toEqual(expected);
    });
  });
});

describe('getByCategory', () => {
  const testCategories = [
    {
      categoryId: 1,
      products: [
        { id: 1, name: 'Leather Wallet', categoryId: 1 },
        { id: 2, name: 'Leather Belt', categoryId: 1 },
        { id: 9, name: 'Leather Key Holder', categoryId: 1 },
      ],
    },
    {
      categoryId: 2,
      products: [
        { id: 3, name: 'Leather Shoes', categoryId: 2 },
        { id: 5, name: 'Leather Handbag', categoryId: 2 },
        { id: 6, name: 'Leather Backpack', categoryId: 2 },
        { id: 13, name: 'Leather Briefcase', categoryId: 2 },
      ],
    },
    {
      categoryId: 4,
      products: [
        { id: 7, name: 'Leather Phone Case', categoryId: 4 },
        { id: 8, name: 'Leather Notebook Cover', categoryId: 4 },
        { id: 10, name: 'Leather Watch Strap', categoryId: 4 },
        { id: 14, name: 'Leather Camera Strap', categoryId: 4 },
        { id: 15, name: 'Leather Passport Holder', categoryId: 4 },
      ],
    },
    {
      categoryId: 999,
      products: [],
    },
  ];

  testCategories.forEach(({ categoryId, products }) => {
    it(`should return products for category ${categoryId}`, async () => {
      const expected = { success: true, data: products };
      getByCategoryRepo.mockResolvedValue(expected);

      const result = await getByCategory(categoryId);
      expect(result).toEqual(expected);
    });
  });
});
