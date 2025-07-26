import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { DeleteDialog } from "../form/DeleteDialog";

// Define what a column looks like
type Column<T> = {
  header: string;
  accessorKey: keyof T; // Ensures accessorKey must be a key of your data type
};

// Define the props with generics
interface AdminTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;

  renderEdit?: (row: T) => ReactNode;
  renderDelete?: (row: T) => ReactNode;
}

// Generic component that works with any data type
export function AdminTable<T>({
  data,
  columns,
  onEdit,
  onDelete,
  renderEdit,
  renderDelete,
}: AdminTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead key={col.accessorKey as string}>{col.header}</TableHead>
          ))}
          {(onEdit || onDelete) && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow key={i}>
            {columns.map((col) => (
              <TableCell key={col.accessorKey as string}>
                {/* Type-safe access to row data */}
                {row[col.accessorKey] as React.ReactNode}
              </TableCell>
            ))}
            {(onEdit || onDelete) && (
              <TableCell className="flex gap-2">
                {/* {onEdit && (
                  <Button size="sm" onClick={() => onEdit(row)}>
                    Edit
                  </Button>
                )} */}
                {renderEdit
                  ? renderEdit(row)
                  : onEdit && (
                      <Button size="sm" onClick={() => onEdit(row)}>
                        Edit
                      </Button>
                    )}
                {renderDelete
                  ? renderDelete(row)
                  : onDelete && (
                      <DeleteDialog onConfirm={() => onDelete(row)} />
                    )}
                {/* {onDelete && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(row)}
                  >
                    Delete
                  </Button>
                )} */}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
