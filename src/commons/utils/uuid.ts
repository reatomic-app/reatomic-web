import { v4 } from "uuid";

export const generateID = (): string => {
  return v4();
}
