/**
 * Class that represents a category of endpoints
 * @author Gabe Abrams
 */

const instantiateEndpoint = require('./helpers/instantiateEndpoint');

class EndpointCategory {
  /**
   * Create a new Endpoint Category instance, translating the static methods
   *   into instance methods
   * @param {API} api - the instance of the API class that this endpoint
   *   category is being added to
   * @author Gabe Abrams
   */
  constructor(config, Subclass) {
    // Go through subcategories and functions to initialize the tree
    Object.keys(Subclass).forEach((prop) => {
      const childIsCategory = (
        Subclass[prop].prototype instanceof EndpointCategory
      );

      if (childIsCategory) {
        // Recurse for subcategory
        this[prop] = new Subclass[prop](config);
      } else {
        // Initialize the endpoint as an instance method
        const endpointCoreFunction = Subclass[prop];

        // Extract the action text
        const action = (
          endpointCoreFunction.action
          || `perform an unnamed ${prop} task`
        );

        // Instantiate the endpoint
        this[prop] = instantiateEndpoint({
          action,
          requiredParams: endpointCoreFunction.requiredParams,
          paramTypes: endpointCoreFunction.paramTypes,
          endpointCoreFunction: Subclass[prop],
          api: config.api,
          errorMap: Subclass[prop].errorMap,
          postProcessor: Subclass[prop].postProcessor,
        });
      }
    });
  }
}

module.exports = EndpointCategory;
