export interface SnackbarServiceInterface {
  info(message: string, duration?: number): void;

  success(message: string, duration?: number): void;

  warning(message: string, duration?: number): void;

  error(message: string, duration?: number): void;

  dismiss(): void;
}
