import React from 'react'
import { Skeleton } from '../ui/skeleton'
import {
  TableRow,
  TableCell,
} from "@/components/ui/table"

interface TableSkeletonProps {
  columns?: number
  rows?: number
}

export function TableSkeleton({ 
  columns = 5,
  rows = 5
}: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex} className="hover:bg-transparent">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex} className="p-4">
              <Skeleton className="h-4 w-[80%] bg-slate-200" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}

export default TableSkeleton;