import {
  DecoratorContext,
  Model,
  validateDecoratorTarget,
} from "@typespec/compiler";
import { assertKeys, assertKeysNoDuplicates } from "./standard_assertions.js";

export const namespace = "TypespecUtilityTypeDecorators";

/**
 * Removes properties of the Model with the given keys.
 * @param context Decorator context.
 * @param target Decorator target. Must be a Model.
 * @param keys The Model property keys to be removed.
 */
export const $omit = (
  context: DecoratorContext,
  target: Model,
  ...keys: string[]
): void => {
  if (!validateDecoratorTarget(context, target, "@omit", "Model")) return;

  assertKeys(context, keys);
  assertKeysNoDuplicates(context, keys);
  // can't check because the decorator would remove the key that it would check to be present
  // assertKeysKnown(context, target, keys);

  for (const [key, prop] of target.properties) {
    if (keys.includes(prop.name)) target.properties.delete(key);
  }
};
