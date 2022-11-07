import ZoomAPIStructure from '../../types/ZoomAPI';
import VisitEndpointFunc from './VisitEndpointFunc';
/**
 * Arguments required for initializing an endpoint category
 * @author Gabe Abrams
 */
declare type InitPack = {
    visitEndpoint: VisitEndpointFunc;
    api: ZoomAPIStructure;
};
export default InitPack;
