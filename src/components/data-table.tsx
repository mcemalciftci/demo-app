"use client"

import { useEffect, useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Search, RotateCcw, MoreVertical, ChevronLeft, ChevronRight, ArrowUpDown, CheckCircle2, Ban, Hourglass, ListFilter, CirclePlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

// Define product type
type Product = {
  id: number
  name: string
  category: string
  productCode: string
  stock: number
  price: string
  status: boolean
  imageUrl: string
}



// Sample data


const getStatusBadgeClass = (status: Product["status"]) => {
  switch (status) {
    case true:
      return "bg-green-100 text-green-600"
    case false:
      return "bg-red-100 text-red-600"
    default:
      return ""
  }
}

const StatusIcon = ({ status }: { status: Product["status"] }) => {
  switch (status) {
    case true:
      return <CheckCircle2 className="mr-1 h-4 w-4  " />
    case false:
      return <Ban className="mr-1 h-4 w-4 " />
    
    default:
      return null
  }
}

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
  fetch("https://devcase.isiksoftyazilim.com/api/products")
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setProducts(data?.data)
    })
    .catch((error) => {
      // handle error here
      console.error(error)
    })
}, [])

  // Define columns
  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-regal-blue data-[state=checked]:bg-regal-blue "
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-regal-blue data-[state=checked]:bg-regal-blue "
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original
        return (
          <div className="flex items-center">
            <div className=" flex-shrink-0 overflow-hidden rounded-md bg-gray-200 ">
              <img className="h-10 w-10 object-cover p-0.5" src={product.imageUrl} alt="" />
            </div>
            <div className="ml-4">
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500">{product.category}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "productCode",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium md:flex hidden "
          >
            Product Code
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell : ({ row }) =>
        {
          const product = row.original
          return (
            <div className="md:flex hidden">{product.productCode}</div>
            )
            },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="font-medium lg:flex hidden"
          >
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      
      },
      cell: ({ row }) => {
        const stock = row.getValue("stock") as Product["stock"]
        return (
         <div className="  text-center pl-4 lg:flex hidden">{stock}</div>
            
         
        )
      }
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-medium lg:flex hidden"
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) =>
        {
          
          const price = row.getValue("price") as Product["price"]
          return (
              <div className="lg:flex hidden">
                {price}
              </div>
          )
        }
    },
    {
      accessorKey: "status",
      header:()=>{return(<div className="lg:flex hidden" >Status</div>)},
      enableHiding:false,
      cell: ({ row }) => {
        const status = row.getValue("status") as Product["status"]
        return (
          <div
            className={cn(
              "lg:inline-flex items-center rounded-md w-30  p-2 text-xs font-medium pl-4 gap-2 hidden ",
              getStatusBadgeClass(status),
            )}
          >
            <StatusIcon status={status} />
            {status ? "Completed" : "Canceled"}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original
        return (<div className="lg:flex hidden">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  })

  return (
    <div className="w-full rounded-lg border shadow-sm bg-white dark:bg-zinc-900">
      {/* Header */}
      <div className="flex flex-col items-start justify-between border-b w-full p-4 sm:flex-row sm:items-center">
        <div>

          <h2 className="text-xl font-semibold">All Products</h2>
        </div>
        <div className="mt-4 flex  flex-col space-y-4 md:mt-0 md:w-auto md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative  md:w-64 lg:flex hidden">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search item..."
              className="pl-10 "
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">

            <Button variant="outline" size="icon" className="hidden lg:flex">
              <RotateCcw className="h-4 w-4 " />
            </Button>
            <Button variant="outline" size="icon" className="hidden lg:flex">
              <ListFilter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="flex lg:hidden">
              <Search className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          <Button className="bg-regal-blue text-white hover:bg-indigo-500 flex items-center ">
            <CirclePlus className="h-4 w-4" />
                Add Product
          </Button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-4">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b "
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Tablo için Pagination ayarlanması */}
      <div className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-gray-500">
          Showing <strong>{table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}</strong>-
          <strong>{Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            products.length,
          )}</strong>{" "}
          from <strong>{products.length}</strong> data
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: table.getPageCount() }).map((_, index) => (
            <Button
              key={index}
              variant={table.getState().pagination.pageIndex === index ? "default" : "outline"}
              size="icon"
              className={cn(
                "h-8 w-8",
                table.getState().pagination.pageIndex === index && "bg-regal-blue hover:bg-[#1e3a5f]",
              )}
              onClick={() => table.setPageIndex(index)}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
