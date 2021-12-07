export const OrderSchema = {
    type: 'object',
    properties: {
        orderId: {
            type: 'number',
        },
        orderDate: {
            type: 'string',
        },
        customerId: {
            type: 'number',
        },
        productsOrdered: {
            type: 'object',
        },
    },
    required: ['orderId', 'orderDate', 'customerId', 'productsOrdered'],
}


export const OrderUpdateSchema = {
    type: 'object',
    properties: {
        orderId: {
            type: 'number',
        },
        orderDate: {
            type: 'number',
        },
        customerId: {
            type: 'number',
        },
        productsOrdered: {
            type: 'object',
        },
    },
    required: ['orderId', 'orderDate', 'customerId', 'productsOrdered'],
}

export const OrderListSchema = {
    type: 'array',
    items: [{ ...OrderSchema }],
}
