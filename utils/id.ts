import { ulid } from "ulid";

export const randomID = (prefix: string) => {
  const short = ulid().slice(-12);
  return `${prefix}-${short}`;
};
