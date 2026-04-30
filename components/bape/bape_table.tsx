import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { TableAvatar } from "@/components/bape/TableAvatar"

type AvatarItem = {
  src: string
  alt: string
}

type Column<T> = {
  key: keyof T
  label: string
  align?: "left" | "right" | "center"
  type?: "text" | "avatar" | "avatars"
  rounded?: boolean
  size?: number
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

  const renderCell = (col: Column<T>, row: T) => {
    const value = row[col.key]

    if (col.type === "avatar") {
      return (
        <div className="flex justify-center">
          <TableAvatar
            src={String(value)}
            alt={row.name}
            size={col.size ?? 36}
            rounded={col.rounded ?? true}
          />
        </div>
      )
    }

    if (col.type === "avatars") {
      return (
        <div className="flex justify-center -space-x-2">
          {(value as AvatarItem[]).map((avatar) => (
            <div
              key={avatar.alt}
              className={
                col.rounded === false
                  ? "rounded-md border-2 border-background"
                  : "rounded-full border-2 border-background"
              }
            >
              <TableAvatar
                src={avatar.src}
                alt={avatar.alt}
                size={col.size ?? 32}
                rounded={col.rounded ?? true}
              />
            </div>
          ))}
        </div>
      )
    }

    return String(value)
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
            {columns.map((col) => (
              <TableCell
                key={String(col.key)}
                className={getAlignClass(col.align)}
              >
                {renderCell(col, row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}