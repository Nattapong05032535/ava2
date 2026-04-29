// Shared types
export type TActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};
