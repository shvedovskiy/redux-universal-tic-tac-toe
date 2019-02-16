import ExtendableError from './ExtendableError';


export default class DataAccessError extends ExtendableError {
  constructor(message, fatal = false) {
    super(message);
    this.fatal = fatal;
  }
}
