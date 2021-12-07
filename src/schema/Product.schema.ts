export const ProductSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string',
    },
    image: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
    productId: {
      type: 'integer',
    },
  },
  required: ['description', 'image', 'name', 'price', 'productId'],
}

export const ProductListSchema = {
  type: 'array',
  items: [{ ...ProductSchema }],
}
