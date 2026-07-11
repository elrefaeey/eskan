interface FormFieldErrorProps {
  message?: string;
}

export function FormFieldError({ message }: FormFieldErrorProps) {
  if (!message) return null;

  return (
    <p
      role="alert"
      className="mt-1.5 rounded-lg border border-red-100 bg-red-50 px-3 py-1.5 text-right text-sm font-medium text-red-700"
    >
      {message}
    </p>
  );
}
