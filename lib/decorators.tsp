import "../dist/src/utility_partial.js";

using TypeSpec.Reflection;

namespace TypespecUtilityTypeDecorators;

/**
 * Partial
 * Sets all properties of the Model to be optional.
 */
extern dec partial(target: Model);
/**
 * PartialKeys
 * Sets properties of the Model with the given keys to be optional.
 * @param keys The Model property keys to be made optional.
 */
extern dec partialKeys(target: Model, ...keys: valueof string[]);