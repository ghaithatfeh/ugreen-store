
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface PriceFieldProps {
  control: Control<any>;
}

export const PriceField = ({ control }: PriceFieldProps) => {
  return (
    <FormField
      control={control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-2">$</span>
              <Input className="pl-7" placeholder="0.00" {...field} type="number" step="0.01" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
