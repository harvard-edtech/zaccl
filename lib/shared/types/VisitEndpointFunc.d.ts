/**
 * Visit endpoint function type definition
 * @author Gabe Abrams
 */
type VisitEndpointFunc = ((opts: {
    path: string;
    method: ('GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH');
    action: string;
    errorMap: {
        [k: number]: (string | {
            [k: number]: string;
        });
    };
    params?: {
        [k: string]: any;
    };
    postProcessor?: (response: any) => any;
}) => Promise<any>);
export default VisitEndpointFunc;
