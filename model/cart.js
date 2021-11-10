export default class CartProduct {
  constructor(id, ownerId, title, imageUrl, description, price, count) {
    this.id = id;
    this.ownerId = ownerId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.count = count;
  }
}
