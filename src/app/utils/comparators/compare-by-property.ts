export function compareByProperty(propertyName) {
  return (object1: any, object2: any) => object1[propertyName] === object2[propertyName];
}
