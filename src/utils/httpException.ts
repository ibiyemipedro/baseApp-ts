class HttpException extends Error {
  code: number;
  message: string;
  source?: string;
  data?: any;
  constructor(code: number, message: string, source = "", data: any = null) {
    super(message);
    this.code = code;
    this.message = message;
    this.data = data;
    this.source = source;
  }
}

export default HttpException;
