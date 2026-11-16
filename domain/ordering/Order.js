import { OrderItem } from "./OrderItem.js";

export const OrderStatus = Object.freeze({
  NEW: "new",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  CANCELLED: "cancelled",
});

export class Order {
  constructor({ id, customerId, items = [], status = OrderStatus.NEW, createdAt = new Date() }) {
    if (!customerId) throw new Error("Замовлення має належати покупцю");
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = status;
    this.createdAt = createdAt;
  }

  addItem(product, quantity = 1) {
    this.#assertStatus(OrderStatus.NEW, "змінювати позиції");
    const existing = this.items.find((i) => i.productId === product.id);
    if (existing) {
      this.items[this.items.indexOf(existing)] = new OrderItem({ ...existing, quantity: existing.quantity + quantity });
    } else {
      this.items.push(
        new OrderItem({ productId: product.id, productName: product.name, unitPrice: product.price, quantity })
      );
    }
  }

  removeItem(productId) {
    this.#assertStatus(OrderStatus.NEW, "змінювати позиції");
    this.items = this.items.filter((i) => i.productId !== productId);
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  confirm() {
    this.#assertStatus(OrderStatus.NEW, "підтвердити");
    if (this.items.length === 0) throw new Error("Не можна підтвердити порожнє замовлення");
    this.status = OrderStatus.CONFIRMED;
  }

  ship() {
    this.#assertStatus(OrderStatus.CONFIRMED, "відправити");
    this.status = OrderStatus.SHIPPED;
  }

  cancel() {
    if (this.status === OrderStatus.SHIPPED) throw new Error("Відправлене замовлення не можна скасувати");
    this.status = OrderStatus.CANCELLED;
  }

  #assertStatus(expected, action) {
    if (this.status !== expected) {
      throw new Error(`Не можна ${action}: замовлення у статусі «${this.status}»`);
    }
  }
}
