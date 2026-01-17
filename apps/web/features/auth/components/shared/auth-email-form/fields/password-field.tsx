import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/form";
import { Input } from "@repo/ui/input";

export function PasswordField({
    control,
    disabled,
}: {
    control: any;
    disabled: boolean;
}) {
    return (
        <FormField
            control={control}
            name="password"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-gray-300 text-sm font-medium">
                        Password
                    </FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            type="password"
                            disabled={disabled}
                            autoComplete="new-password"
                            placeholder="Enter password"
                            className="w-full px-4 py-3 bg-[#151821] rounded-xl text-white"
                        />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                </FormItem>
            )}
        />
    );
}
