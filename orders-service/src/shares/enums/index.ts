export enum OrderStatus {
  CREATED = 'created',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
}

export enum PaymentStatus {
  DECLINED = 'declined',
  CONFIRMED = 'confirmed',
}

export enum ExceptionMessages {
  PRODUCT_NOT_FOUND = 'Product not found.',
  ORDER_NOT_FOUND = 'Order not found.',
  PAYMENTS_SERVICE_ERROR = 'Get error when call payments-service.',
}