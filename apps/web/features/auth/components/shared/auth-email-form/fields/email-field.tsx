import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";

export function EmailField({
    control,
    disabled,
    label,
}: {
    control: any;
    disabled: boolean;
    label: string;
}) {
    return (
        <FormField
            control={control}
            name="email"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-gray-300 text-sm font-medium">
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type="email"
                            disabled={disabled}
                            autoComplete="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 bg-[#151821] rounded-xl text-white"
                        />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                </FormItem>
            )}
        />
    );
}
