// Import shared types
import ZoomAPI from '../../types/ZoomAPI';
import InitPack from '../types/InitPack';
import VisitEndpointFunc from '../types/VisitEndpointFunc';

// TODO: make into typescript, handle instantiateEndpoint functionality:
// build it into the visit endpoint function just like in caccl-api

/**
 * An endpoint category
 * @author Gabe Abrams
 */
class EndpointCategory {
  protected visitEndpoint: VisitEndpointFunc;
  protected api: ZoomAPI;

  /**
   * Initialize the endpoint category
   * @author Gabe Abrams
   * @param initPack package of info for initializing the endpoint category
   */
  constructor(initPack: InitPack) {
    this.visitEndpoint = initPack.visitEndpoint;
    this.api = initPack.api;
  }
}

export default EndpointCategory;
