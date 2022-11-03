/**
 * Custom ZACCL error class
 * @author Gabe Abrams
 */
class ZACCLError extends Error {
  public message: string;
  public name: string;
  public code: string;
  public stack: string;
  public isZACCLError: boolean;

  /**
   * Create a new ZACCLError
   * @param opts object containing all arguments
   */
  constructor(
    opts: {
      message?: string,
      name?: string,
      code?: string,
      stack?: string,
    } = {},
  ) {
    super();

    this.message = opts.message || 'An unknown error occurred.';
    this.name = opts.name || 'ZACCLError';
    this.code = String(opts.code || 'NOCODE1').toUpperCase();
    this.stack = opts.stack || new Error(this.message).stack;

    this.isZACCLError = true;
  }
}

export default ZACCLError;
