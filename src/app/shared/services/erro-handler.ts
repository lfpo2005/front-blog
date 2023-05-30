import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    // Aqui você pode fazer o que quiser com o erro
    console.error('Error from global error handler', error);
  }
}
