import { TInput } from "@/types";
import { Field, FieldError, FieldLabel } from "./field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { CircleAlert, EyeOffIcon } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "cn";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  input: TInput;
  error?: string;
  startAdornment?: ReactNode;
  inputGroupClassName?: string;
}

const CustomInput = ({ input, error, className, id, type, name, startAdornment, inputGroupClassName, ...props }: CustomInputProps) => {
  return (
    <Field className="w-full min-w-0" data-invalid={!!error}>
      {input.label && (
        <FieldLabel htmlFor={id ?? input.name}>
          {input.label}{" "}
          {input.required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <InputGroup
        className={cn(
          "h-10 w-full rounded-lg border-input bg-background transition-[border-color,box-shadow] duration-200 ease-out focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25 dark:focus-within:ring-primary/30",
          error &&
            "border-destructive ring-2 ring-destructive/15 focus-within:border-destructive focus-within:ring-destructive/20",
          inputGroupClassName,
        )}
      >
        {startAdornment && (
          <InputGroupAddon className="pl-3" aria-hidden="true">
            {startAdornment}
          </InputGroupAddon>
        )}
        <InputGroupInput
          id={id ?? input.name}
          name={name ?? input.name}
          type={type ?? input.type}
          placeholder={input.placeholder}
          autoFocus={input.autoFocus}
          required={input.required}
          defaultValue={input.defaultValue}
          className={cn("h-full text-sm text-foreground", className)}
          {...props}
        />
        {input.type === "password" && (
          <InputGroupAddon>
            <EyeOffIcon className="size-4.5" />
          </InputGroupAddon>
        )}
        {error && (
          <InputGroupAddon align={"inline-end"}>
            <CircleAlert className="text-destructive size-4.5" />
          </InputGroupAddon>
        )}
      </InputGroup>
      {error && (
        <FieldError className="text-[13px] text-destructive">
          {error}
        </FieldError>
      )}
    </Field>
  );
};

export default CustomInput;
