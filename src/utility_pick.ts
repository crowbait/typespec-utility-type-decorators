import {
  DecoratorContext,
  Model,
  validateDecoratorTarget,
} from "@typespec/compiler";
import { reportDiagnostic } from "./lib.js";

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

  // checks for no keys
  if (!keys || keys.length === 0)
    reportDiagnostic(context.program, {
      code: "no-keys",
      target: context.decoratorTarget,
    });

  // checks for duplicate keys
  const checkedKeys: string[] = [];
  let duplicateKeyIndex = -1;
  for (let i = 0; i < keys.length; i++) {
    if (checkedKeys.includes(keys[i])) {
      duplicateKeyIndex = i;
      break;
    }
    checkedKeys.push(keys[i]);
  }
  if (duplicateKeyIndex !== -1)
    reportDiagnostic(context.program, {
      code: "duplicate-key",
      target: context.getArgumentTarget(duplicateKeyIndex)!,
    });

  for (const [key, prop] of target.properties) {
    if (!keys.includes(prop.name)) target.properties.delete(key);
  }
};
