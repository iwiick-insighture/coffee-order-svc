export class Coffee {
  readonly id?: string;
  readonly name: string;
  readonly quantity: number;
  readonly price: number;
  readonly imageUrl?: string;

  constructor(data: Coffee) {
    if (data) {
      this.id = data?.id;
      this.name = data.name;
      this.quantity = data.quantity;
      this.price = data.price;
      this.imageUrl = data.imageUrl;
    }
  }
}
