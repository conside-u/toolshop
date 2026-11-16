export class Product {
  constructor({ id, name, categoryId, price, stock = 0, attributes = {} }) {
    if (!name) throw new Error("Назва товару обов'язкова");
    if (!(price > 0)) throw new Error("Ціна має бути більшою за 0");
    if (!Number.isInteger(stock) || stock < 0) throw new Error("Залишок має бути цілим числом ≥ 0");
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.price = price;
    this.stock = stock;
    this.attributes = attributes;
  }

  isAvailable(qty = 1) {
    return this.stock >= qty;
  }

  reserve(qty) {
    if (!Number.isInteger(qty) || qty <= 0) throw new Error("Кількість має бути цілим числом > 0");
    if (!this.isAvailable(qty)) throw new Error(`Недостатньо товару «${this.name}» на складі`);
    this.stock -= qty;
  }

  changePrice(price) {
    if (!(price > 0)) throw new Error("Ціна має бути більшою за 0");
    this.price = price;
  }
}
