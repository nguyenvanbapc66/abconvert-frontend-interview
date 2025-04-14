import { products } from "../constants/mockData";
import { getTestGroup } from "./abTesting";

export function getProductsForCurrentUser() {
  const userGroup = getTestGroup();
  return products.filter((product) => product.testGroup === userGroup);
}

export function getProductById(id: string) {
  const userGroup = getTestGroup();
  return products.find((product) => product.id === id && product.testGroup === userGroup);
}
