import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FieldValues, Path, Control } from 'react-hook-form'

type Option = {
  label: string
  value: string
}

type FormRadioGroupProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  label: string
  options: Option[]
  className?: string
}

export function FormRadioGroup<T extends FieldValues>({
  name,
  control,
  label,
  options,
  className = '',
}: FormRadioGroupProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className="space-y-2">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={`flex gap-4 ${className}`}
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  )
}
