import {
  DecoratorContext,
  Model,
  validateDecoratorTarget,
} from "@typespec/compiler";
import {
  assertKeys,
  assertKeysKnown,
  assertKeysNoDuplicates,
} from "./standard_assertions.js";

export const namespace = "TypespecUtilityTypeDecorators";

/**
 * Omits all but the given keys from a model.
 * @param context Decorator context.
 * @param target Decorator target. Must be a Model.
 * @param keys The Model property keys to be kept, removing all others.
 */
export const $pick = (
  context: DecoratorContext,
  target: Model,
  ...keys: string[]
): void => {
  if (!validateDecoratorTarget(context, target, "@pick", "Model")) return;

  assertKeys(context, keys);
  assertKeysNoDuplicates(context, keys);
  assertKeysKnown(context, target, keys);

  for (const [key, prop] of target.properties) {
    if (!keys.includes(prop.name)) target.properties.delete(key);
  }
};
