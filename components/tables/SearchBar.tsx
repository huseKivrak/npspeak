import { Input } from '@nextui-org/input';

export const SearchBar = ({
  filterValue,
  onClear,
  onValueChange,
  ...props
}: {
  filterValue: string;
  onClear: () => void;
  onValueChange: (value: string) => void;
}) => {
  return (
    <Input
      isClearable
      className="w-full sm:max-w-[44%]"
      placeholder="Search by name..."
      value={filterValue}
      onValueChange={onValueChange}
      onClear={onClear}
      {...props}
    />
  );
};
