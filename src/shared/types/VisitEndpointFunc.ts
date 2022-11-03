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
      // Function that processes the response before returning
      postProcessor?: (response: any) => any,
    },
  ) => Promise<any>
);

export default VisitEndpointFunc;
