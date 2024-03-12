import { v4 as uuidv4 } from "uuid";

export const getPrefixedUUID = () => {
  return `order_${uuidv4()}`;
};
