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
 * Sets all properties of the Model to be required.
 * @param context Decorator context.
 * @param target Decorator target. Must be a Model.
 */
export const $required = (context: DecoratorContext, target: Model): void => {
  if (!validateDecoratorTarget(context, target, "@required", "Model")) return;
  for (const [key, prop] of target.properties) {
    prop.optional = false;
    target.properties.set(key, prop);
  }
};

/**
 * Sets properties of the Model with the given keys to be required.
 * @param context Decorator context.
 * @param target Decorator target. Must be a Model.
 * @param keys The Model property keys to be made required.
 */
export const $requiredKeys = (
  context: DecoratorContext,
  target: Model,
  ...keys: string[]
): void => {
  if (!validateDecoratorTarget(context, target, "@requiredKeys", "Model"))
    return;

  assertKeys(context, keys);
  assertKeysNoDuplicates(context, keys);
  assertKeysKnown(context, target, keys);

  for (const [key, prop] of target.properties) {
    if (keys.includes(prop.name)) prop.optional = false;
    target.properties.set(key, prop);
  }
};
