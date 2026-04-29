import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { TableAvatar } from "@/components/TableAvatar.tsx"

type Column<T> = {
  key: keyof T
  label: string
  align?: "left" | "right" | "center"
  type?: "text" | "avatar"
}

type BapeTableProps<T> = {
  columns: readonly Column<T>[]
  athletes: T[]
}

export function BapeTable<T extends { name: string }>({
  columns,
  athletes,
}: BapeTableProps<T>) {
  const getAlignClass = (align?: "left" | "right" | "center") => {
    if (align === "right") return "text-right"
    if (align === "center") return "text-center"
    return ""
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHead
              key={String(col.key)}
              className={getAlignClass(col.align)}
            >
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {athletes.map((row) => (
          <TableRow key={row.name}>
            {columns.map((col) => {
              const value = row[col.key]

              return (
                <TableCell
                  key={String(col.key)}
                  className={getAlignClass(col.align)}
                >
                  {col.type === "avatar" ? (
                    <TableAvatar src={String(value)} alt={row.name} />
                  ) : (
                    String(value)
                  )}
                </TableCell>
              )
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}