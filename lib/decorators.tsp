import "../dist/src/utility_omit.js";
import "../dist/src/utility_partial.js";
import "../dist/src/utility_pick.js";
import "../dist/src/utility_required.js";

using TypeSpec.Reflection;

namespace TypespecUtilityTypeDecorators;

/**
 * Removes properties of the Model with the given keys.
 * @param keys The Model property keys to be removed.
 */
extern dec omit(target: Model, ...keys: valueof string[]);

/**
 * Sets all properties of the Model to be optional.
 */
extern dec partial(target: Model);
/**
 * Sets properties of the Model with the given keys to be optional.
 * @param keys The Model property keys to be made optional.
 */
extern dec partialKeys(target: Model, ...keys: valueof string[]);

/**
 * Omits all but the given keys from a model.
 * @param keys The Model property keys to be kept, removing all others.
 */
extern dec pick(target: Model, ...keys: valueof string[]);

/**
 * Sets all properties of the Model to be required.
 */
extern dec required(target: Model);
/**
 * Sets properties of the Model with the given keys to be required.
 * @param keys The Model property keys to be made required.
 */
extern dec requiredKeys(target: Model, ...keys: valueof string[]);