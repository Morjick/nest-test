import { Injectable } from '@nestjs/common';

export interface MessageI {
  autor: string;
  text: string;
}

export interface ErrorI {
  ok: boolean;
  message: string;
  error?: string;
}

export interface NumbersI {
  newNumber: number;
  oldNumber: number;
  arithmeticMean: number;
}

export interface SendNumbersDTO {
  autor: string;
  value: number;
}

const messages = [{ autor: 'Matvey', text: 'First message' }];
const numbers = [{ autor: 'Matvey', value: 0 }];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(message: MessageI): Promise<object[] | object> {
    try {
      const { autor, text } = message;

      if (!autor || !text) {
        return {
          message: 'Введите имя отправителя и текст сообщения',
          ok: false,
        };
      }

      messages.push({
        autor,
        text,
      });

      return messages;
    } catch (e) {
      return {
        ok: false,
        message: 'Неожиданная ошибка сервера. Попробуйте позже',
        error: e,
      };
    }
  }

  async getMessage(): Promise<MessageI[] | ErrorI> {
    try {
      return messages;
    } catch (e) {
      return {
        ok: false,
        message: 'Неожиданная ошибка сервера. Попробуйте позже',
        error: e,
      };
    }
  }

  async sendNumber(body: SendNumbersDTO): Promise<NumbersI | ErrorI> {
    try {
      const { value, autor } = body;

      if (!value || !autor) {
        return {
          ok: false,
          message: 'Введите, пожалуйста, новое число и имя пользователя',
        };
      }

      const oldNumber = numbers[numbers.length - 1];
      numbers.push({ value, autor });

      return {
        newNumber: value,
        oldNumber: oldNumber.value,
        arithmeticMean: (Number(value) + Number(oldNumber.value)) / 2,
      };
    } catch (e) {
      return {
        ok: false,
        message: 'Неожиданная ошибка сервера. Попробуйте позже',
        error: e,
      };
    }
  }

  async getNumbers(): Promise<SendNumbersDTO[] | ErrorI> {
    try {
      return numbers;
    } catch (e) {
      return {
        ok: false,
        message: 'Неожиданная ошибка сервера. Попробуйте позже',
        error: e,
      };
    }
  }
}
