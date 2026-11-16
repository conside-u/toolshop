// Позиція замовлення зберігає назву й ціну товару на момент замовлення,
// тож подальші зміни в каталозі не змінюють уже оформлене замовлення.
export class OrderItem {
  constructor({ productId, productName, unitPrice, quantity }) {
    if (!Number.isInteger(quantity) || quantity <= 0) throw new Error("Кількість має бути цілим числом > 0");
    this.productId = productId;
    this.productName = productName;
    this.unitPrice = unitPrice;
    this.quantity = quantity;
  }

  get total() {
    return this.unitPrice * this.quantity;
  }
}
