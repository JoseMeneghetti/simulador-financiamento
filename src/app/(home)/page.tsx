"use client";

import MainTable from "@/components/main-table/main-table";
import { ModeToggle } from "@/components/theme/theme-toggle";

import { columns } from "@/components/main-table/columns";
import { tasks } from "@/components/main-table/data/tasks";
import TableProvider from "@/context/table-context";

export default function Page() {
  return (
    <TableProvider>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <ModeToggle />
          </div>
        </div>
        <MainTable columns={columns} />
      </div>
    </TableProvider>
  );
}
