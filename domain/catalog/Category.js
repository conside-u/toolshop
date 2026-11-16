export class Category {
  constructor({ id, name, parentId = null }) {
    if (!name) throw new Error("Назва категорії обов'язкова");
    this.id = id;
    this.name = name;
    this.parentId = parentId;
  }
}
