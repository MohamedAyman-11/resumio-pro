export type TInput = {
  name: string;
  defaultValue?: string;
  autoFocus?: boolean;
  placeholder: string;
  label: string;
  type: "text" | "email" | "password" | "number" | "tel";
  required?: boolean;
};
