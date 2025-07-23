import { ulid } from "ulid";

export const generateId = (prefix: string) => {
  const short = ulid().slice(-12);
  return `${prefix}-${short}`;
};
