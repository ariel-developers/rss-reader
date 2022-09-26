// @ts-ignore
let storage = {};

global.localStorage = {
  getItem: jest.fn().mockImplementation((key) => storage[key]),
  setItem: jest.fn().mockImplementation((key, value) => {
    storage[key] = value;
  }),
  removeItem: jest.fn().mockImplementation((key) => {
    delete storage[key];
  }),
  clear: jest.fn().mockImplementation(() => {
    storage = {};
  }),
  key: jest.fn(),
  length: 0,
};
