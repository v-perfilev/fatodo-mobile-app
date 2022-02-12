export default interface Snack {
  message: string;
  color: string;
}

export class SnackBuilder {
  private readonly snack: Snack;

  constructor(message: string) {
    this.snack = {message, color: 'primary.500'};
  }

  setColor(color: string): SnackBuilder {
    this.snack.color = color;
    return this;
  }

  build(): Snack {
    return this.snack;
  }
}
