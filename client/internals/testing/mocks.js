import moment from 'moment';

class LocalStorageMock {
  length = 0;
  constructor() {
    this.store = {};
    this.setLength();
  }

  setLength() {
    this.length = Object.keys(this.store).length;
  }

  clear() {
    this.store = {};
    this.setLength();
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    this.store[key] = value.toString();
    this.setLength();
  }

  removeItem(key) {
    delete this.store[key];
    this.setLength();
  }
}

global.localStorage = new LocalStorageMock();

Date.now = jest.genMockFunction().mockReturnValue(new Date('2017-05-01'));

moment.now = jest.genMockFunction().mockReturnValue(Date.now());
