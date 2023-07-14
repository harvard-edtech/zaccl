// Import shared types
import ZoomAPIStructure from '../../types/ZoomAPI';
import VisitEndpointFunc from './VisitEndpointFunc';

/**
 * Arguments required for initializing an endpoint category
 * @author Gabe Abrams
 */
type InitPack = {
  // Function to use for sending requests to Canvas
  visitEndpoint: VisitEndpointFunc,
  // Top-level api instance
  api: ZoomAPIStructure,
};

export default InitPack;
