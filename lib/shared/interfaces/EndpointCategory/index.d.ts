import ZoomAPI from '../../../types/ZoomAPI';
import InitPack from '../../types/InitPack';
import VisitEndpointFunc from '../../types/VisitEndpointFunc';
/**
 * An endpoint category
 * @author Gabe Abrams
 */
declare class EndpointCategory {
    protected visitEndpoint: VisitEndpointFunc;
    protected api: ZoomAPI;
    /**
     * Initialize the endpoint category
     * @author Gabe Abrams
     * @param initPack package of info for initializing the endpoint category
     */
    constructor(initPack: InitPack);
}
export default EndpointCategory;
