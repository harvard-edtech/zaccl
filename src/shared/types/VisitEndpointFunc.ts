/**
 * Visit endpoint function type definition
 * @author Gabe Abrams
 */
type VisitEndpointFunc = (
  (
    opts: {
      // Path of the endpoint
      path: string,
      // Method of the request
      method: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'),
      // Human-readable description of the task
      action: string,
      // Custom map of errors
      errorMap: {
        [k: number]: (
          string
          | {
            [k: number]: string
          }
        )
      },
      // Parameters/args/body to send with request
      params?: { [k: string]: any },
      // The key in the response body where the list of items can be found (for paginated endpoints)
      itemKey?: string,
      // Callback function that is called when a new page of results is received (for paginated endpoints)
      onNewPage?: (items: any[]) => void,
      // Minimum time (in ms) to wait between paginated requests, for custom throttle control (for paginated endpoints)
      minMsBetweenPageRequests?: number,
    },
  ) => Promise<any>
);

export default VisitEndpointFunc;
