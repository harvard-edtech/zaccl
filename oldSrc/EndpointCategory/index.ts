/**
 * Class that represents a category of endpoints
 * @author Gabe Abrams
 */

// Import shared types
import Config from '../shared/types/Config';

// Import shared helpers
import instantiateEndpoint from './shared/helpers/instantiateEndpoint';

class EndpointCategory {
  /**
   * Create a new Endpoint Category instance, translating the static methods
   *   into instance methods
   * @param config pack of configuration
   * @param Subclass the class of the extender
   * @author Gabe Abrams
   */
  constructor(config: Config, Subclass: EndpointCategory) {
    // Go through subcategories and functions to initialize the tree
    Object.keys(Subclass).forEach((prop) => {
      const childIsCategory = (
        (Subclass as any)[prop].prototype instanceof EndpointCategory
      );

      if (childIsCategory) {
        // Recurse for subcategory
        (this as any)[prop] = new (Subclass as any)[prop](config);
      } else {
        // Initialize the endpoint as an instance method
        const endpointCoreFunction = (Subclass as any)[prop];

        // Extract the action text
        const action = (
          endpointCoreFunction.action
          || `perform an unnamed ${prop} task`
        );

        // Instantiate the endpoint
        (this as any)[prop] = instantiateEndpoint({
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

export default EndpointCategory;
