export const UserRole = Object.freeze({ CUSTOMER: "customer", MANAGER: "manager" });

export class User {
  constructor({ id, email, name, role = UserRole.CUSTOMER }) {
    if (!email || !email.includes("@")) throw new Error("Некоректний email");
    if (!Object.values(UserRole).includes(role)) throw new Error(`Невідома роль: ${role}`);
    this.id = id;
    this.email = email;
    this.name = name;
    this.role = role;
  }

  isManager() {
    return this.role === UserRole.MANAGER;
  }
}
