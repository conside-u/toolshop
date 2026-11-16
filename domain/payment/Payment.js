export const PaymentStatus = Object.freeze({ PENDING: "pending", PAID: "paid", FAILED: "failed" });

export class Payment {
  constructor({ id, orderId, amount, status = PaymentStatus.PENDING }) {
    if (!(amount > 0)) throw new Error("Сума платежу має бути більшою за 0");
    this.id = id;
    this.orderId = orderId;
    this.amount = amount;
    this.status = status;
    this.failureReason = null;
  }

  markPaid() {
    if (this.status !== PaymentStatus.PENDING) throw new Error("Платіж уже оброблено");
    this.status = PaymentStatus.PAID;
  }

  markFailed(reason) {
    if (this.status !== PaymentStatus.PENDING) throw new Error("Платіж уже оброблено");
    this.status = PaymentStatus.FAILED;
    this.failureReason = reason;
  }
}
