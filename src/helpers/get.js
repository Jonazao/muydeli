import { isEmpty } from '../validations';

export const get = (obj, propertyPath) => {
  const properties = propertyPath.split('.');
  const [property, ...restProperties] = properties;
  if (isEmpty(property)) {
    return undefined;
  }
  const resultObj = obj[property];
  if (isEmpty(restProperties)) {
    return resultObj;
  }
  return get(resultObj, restProperties.join('.'));
};
