import * as Form from "@radix-ui/react-form";

interface FormFieldProps {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "textarea";
  onChange: (value: string) => void;
  rows?: number;
}

export function FormField({
  name,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  rows = 3,
}: FormFieldProps) {
  return (
    <Form.Field name={name}>
      <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Form.Label>
      <Form.Control asChild>
        {type === "text" ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            placeholder={placeholder}
          />
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
            placeholder={placeholder}
          />
        )}
      </Form.Control>
      {required && (
        <Form.Message match="valueMissing" className="text-sm text-red-600">
          Please enter a {label.toLowerCase()}
        </Form.Message>
      )}
    </Form.Field>
  );
} 