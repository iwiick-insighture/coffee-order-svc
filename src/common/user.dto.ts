export class User {
  readonly id?: string;
  readonly name: string;
  readonly email: string;
  readonly password: string;

  constructor(data: User) {
    if (data) {
      this.id = data?.id;
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
    }
  }
}
