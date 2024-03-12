export class CartItem {
  readonly id?: string;
  readonly quantity: Number;
  readonly userId: string;
  readonly coffeeId: string;

  constructor(data: CartItem) {
    if (data) {
      this.id = data?.id;
      this.quantity = data.quantity;
      this.userId = data.userId;
      this.coffeeId = data.coffeeId;
    }
  }
}
