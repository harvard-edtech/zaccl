"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: make into typescript, handle instantiateEndpoint functionality:
// build it into the visit endpoint function just like in caccl-api
/**
 * An endpoint category
 * @author Gabe Abrams
 */
var EndpointCategory = /** @class */ (function () {
    /**
     * Initialize the endpoint category
     * @author Gabe Abrams
     * @param initPack package of info for initializing the endpoint category
     */
    function EndpointCategory(initPack) {
        this.visitEndpoint = initPack.visitEndpoint;
        this.api = initPack.api;
    }
    return EndpointCategory;
}());
exports.default = EndpointCategory;
//# sourceMappingURL=index.js.map