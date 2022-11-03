// Import shared helpers
import sendZoomRequest from './sendZoomRequest';

// Import shared types
import VisitEndpointFunc from '../types/VisitEndpointFunc';
import ZoomAPIConfig from '../../types/ZoomAPIConfig';
import ErrorCode from '../types/ErrorCode';
import ThrottleHeader from '../types/ThrottleHeader';

// Import shared classes
import ZACCLError from '../classes/ZACCLError';

/**
 * Generates a visit endpoint function
 * @author Gabe Abrams
 * @author Grace Whitney
 * @param zoomAPIConfig the active api configuration
 */
const genVisitEndpoint = (zoomAPIConfig: ZoomAPIConfig): VisitEndpointFunc => {
  /**
   * Visit a Zoom endpoint
   * @author Gabe Abrams
   * @param opts object containing all arguments
   * @param opts.path Path of the endpoint
   * @param opts.method http method to use for the request
   * @param opts.action Human-readable description of the task
   * @param opts.errorMap map of Zoom errors taken from the API docs
   * @param [opts.postProcessor] function that processes the response before
   *   returning
   * @param [opts.params] Parameters/args/body to send with request
   * @returns response body
   */
  return async (
    opts: {
      path: string,
      method: ('GET' | 'POST' | 'PUT' | 'DELETE'),
      action: string,
      errorMap: {
        [k: number]: (
          string
          | {
            [k: number]: string
          }
        )
      },
      params?: { [k: string]: any },
      postProcessor?: (response: any) => any,
    },
  ): Promise<any> => {
    const {
      path,
      params,
      action,
      errorMap,
      postProcessor,
    } = opts;
    const method = (opts.method ?? 'GET');

    /* ---------- Send Request ---------- */

    const { status, headers, body } = await sendZoomRequest({
      path,
      method,
      params,
      zoomAPIConfig,
    });

    /* ----------- Rate Error ----------- */

    if (status === 429) {
      // Case-insensitive header lookup
      const [rateLimitTypeHeader] = Object.keys(headers).filter(
        (key) => { return (key.toLowerCase() === 'x-ratelimit-type'); }
      );

      // Case-insensitive limit type lookup
      const rateLimitType = (
        headers[rateLimitTypeHeader]
          ? headers[rateLimitTypeHeader].toLowerCase()
          : null
      );

      if (rateLimitType === ThrottleHeader.DailyLimitHeader) {
        // Daily limit
        throw new ZACCLError({
          message: 'Zoom is very busy today. Please try this operation again tomorrow.',
          code: ErrorCode.DailyLimitError,
        });
      } else if (rateLimitType === ThrottleHeader.RateLimitHeader) {
        // Rate limit
        throw new ZACCLError({
          message: 'Zoom is very busy right now. Please try this operation again later.',
          code: ErrorCode.RateLimitError,
        });
      } else {
        // Unknown rate limit
        throw new ZACCLError({
          message: 'Zoom is very busy right now. Please try this operation again.',
          code: ErrorCode.UnknownLimitError,
        });
      }
    }

    /* -------- Custom Error Code ------- */

    if (status < 200 || status >= 300) {
      // A Zoom error occurred

      // Check status to see if its in the error map
      let zoomErrorMessage: string = 'An unknown Zoom error occurred.';
      if (errorMap[status]) {
        if (typeof errorMap[status] === 'string') {
          // Found the error message
          zoomErrorMessage = (errorMap[status] as string);
        } else if (body.code) {
          // Check for nested error message
          if (typeof errorMap[status][body.code] === 'string') {
            // Found nested error message
            zoomErrorMessage = errorMap[status][body.code];
          } else if (body.message) {
            // errorMap[status][code] did not return err message
            // so we check body
            if (typeof body.message === 'string') {
              zoomErrorMessage = body.message;
            }
          }
        }
      } else if (body.message) {
        // Error message not in the error map so check body
        if (typeof body.message === 'string') {
          zoomErrorMessage = body.message;
        }
      }

      const errorMessage = `We couldn't ${action} because an error occurred: ${zoomErrorMessage}`;
      const errorCode = `ZOOM${status}${body.code ? `-${body.code}` : ''}`;

      throw new ZACCLError({
        message: errorMessage,
        code: errorCode,
      });
    }

    /* ----- Post-process and Return ---- */

    if (postProcessor) {
      return postProcessor(body);
    }

    return body;
  };
};

export default genVisitEndpoint;
