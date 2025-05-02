import * as Form from "@radix-ui/react-form";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  options: Array<{
    value: string;
    label: string;
  }>;
  required?: boolean;
}

export function SelectField({
  name,
  label,
  value,
  onChange,
  options,
  required = false,
}: SelectFieldProps) {
  return (
    <Form.Field name={name}>
      <Form.Label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </Form.Label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="mt-1 flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm">
          <Select.Value />
          <Select.Icon>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white dark:bg-gray-800 rounded-md shadow-lg">
            <Select.Viewport>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex items-center px-8 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer outline-none"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {required && (
        <Form.Message match="valueMissing" className="text-sm text-red-600">
          Please select a {label.toLowerCase()}
        </Form.Message>
      )}
    </Form.Field>
  );
} 