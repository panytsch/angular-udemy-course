export class User {
  constructor(public email: string,
              public id: string,
              private _token: string,
              private _tokenExpirationDate: Date) {
  }

  get tokenExpirationDate(): Date {
    return this._tokenExpirationDate;
  }

  get token() {
    return !this._tokenExpirationDate || new Date() > this._tokenExpirationDate
      ? ''
      : this._token;
  }
}
