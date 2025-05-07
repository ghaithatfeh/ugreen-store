
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface NameFieldProps {
  control: Control<any>;
}

export const NameField = ({ control }: NameFieldProps) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter product name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
