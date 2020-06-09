class ZACCLError extends Error {
  constructor(options = {}) {
    super();

    this.message = options.message || 'An unknown error occurred.';
    this.name = options.name || 'ZACCLError';
    this.code = String(options.code || 'NOCODE1').toUpperCase();
    this.stack = options.stack || new Error(this.message).stack;

    this.isZACCLError = true;
  }
}

module.exports = ZACCLError;
