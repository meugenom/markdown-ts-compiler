const mockEngine = jest.fn().mockImplementation(() => Promise.resolve({}));

module.exports = {
  createOnigurumaEngine: mockEngine,
  __esModule: true,
  default: {
    createOnigurumaEngine: mockEngine
  }
}