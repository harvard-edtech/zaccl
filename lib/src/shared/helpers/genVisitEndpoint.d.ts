import VisitEndpointFunc from '../types/VisitEndpointFunc';
import ZoomAPIConfig from '../../types/ZoomAPIConfig';
/**
 * Generates a visit endpoint function
 * @author Gabe Abrams
 * @author Grace Whitney
 * @param zoomAPIConfig the active api configuration
 */
declare const genVisitEndpoint: (zoomAPIConfig: ZoomAPIConfig) => VisitEndpointFunc;
export default genVisitEndpoint;
