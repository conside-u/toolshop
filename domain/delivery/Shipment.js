export const ShipmentStatus = Object.freeze({ PREPARING: "preparing", SHIPPED: "shipped", DELIVERED: "delivered" });

export class Shipment {
  constructor({ id, orderId, address, carrier, trackingNumber = null, status = ShipmentStatus.PREPARING }) {
    if (!address) throw new Error("Адреса доставки обов'язкова");
    this.id = id;
    this.orderId = orderId;
    this.address = address;
    this.carrier = carrier;
    this.trackingNumber = trackingNumber;
    this.status = status;
  }

  ship(trackingNumber) {
    if (this.status !== ShipmentStatus.PREPARING) throw new Error("Відправлення вже передано перевізнику");
    if (!trackingNumber) throw new Error("Потрібен номер накладної");
    this.trackingNumber = trackingNumber;
    this.status = ShipmentStatus.SHIPPED;
  }

  deliver() {
    if (this.status !== ShipmentStatus.SHIPPED) throw new Error("Спершу відправлення має бути відправлене");
    this.status = ShipmentStatus.DELIVERED;
  }
}
