export type SnackVariant = 'info' | 'warning' | 'error';

export interface ReduxSnack extends Snack {
  key: string;
  dismissed: boolean;
}

export interface Snack {
  message: string;
  color: string;
}

export class SnackBuilder {
  private readonly snack: Snack;

  constructor(message: string) {
    this.snack = {message, color: 'primary.500'};
  }

  setVariantColor(variant: SnackVariant): SnackBuilder {
    this.snack.color = SnackBuilder.getColorFromVariant(variant);
    return this;
  }

  setStatusColor(status: number): SnackBuilder {
    this.snack.color = SnackBuilder.getColorFromStatus(status);
    return this;
  }

  build(): Snack {
    return this.snack;
  }

  private static getColorFromStatus = (status: number): string => {
    if (status >= 400 && status < 500) {
      return 'warning.500';
    } else if (status >= 500) {
      return 'error.500';
    } else {
      return 'info.500';
    }
  };

  private static getColorFromVariant = (variant: SnackVariant): string => {
    if (variant === 'info') {
      return 'info.500';
    } else if (variant === 'warning') {
      return 'warning.500';
    } else {
      return 'error.500';
    }
  };
}
