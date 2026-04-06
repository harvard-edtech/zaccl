/**
 * Custom ZACCL error class
 * @author Gabe Abrams
 */
declare class ZACCLError extends Error {
    message: string;
    name: string;
    code: string;
    stack: string;
    isZACCLError: boolean;
    /**
     * Create a new ZACCLError
     * @author Gabe Abrams
     * @param opts object containing all arguments
     * @param [opts.message=An unknown error occurred.] error message
     * @param [opts.name=ZACCLError] name of the error
     * @param [opts.code=NOCODE1] custom error code
     * @param [opts.stack=current stack] error stack
     */
    constructor(opts?: {
        message?: string;
        name?: string;
        code?: string;
        stack?: string;
    });
}
export default ZACCLError;
