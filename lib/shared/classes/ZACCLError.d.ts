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
     * @param opts object containing all arguments
     */
    constructor(opts?: {
        message?: string;
        name?: string;
        code?: string;
        stack?: string;
    });
}
export default ZACCLError;
