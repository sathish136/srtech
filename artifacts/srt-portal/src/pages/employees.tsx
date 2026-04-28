import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { useListEmployees } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, UserCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Employees() {
  const { data: employees, isLoading } = useListEmployees();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={UserCircle}
          title="Employees"
          description="Manage your staff, technicians, and their roles."
          actions={
            <Button>
              <Plus className="h-4 w-4" /> Add Employee
            </Button>
          }
        />

        <DataToolbar placeholder="Search employees…" />

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">Code</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Role</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Department</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="px-4 py-3"><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : employees?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                employees?.map((employee) => (
                  <TableRow key={employee.id} className="cursor-pointer transition-colors hover:bg-muted/40">
                    <TableCell className="px-4 py-3 font-mono text-sm text-muted-foreground">
                      {employee.employeeCode}
                    </TableCell>
                    <TableCell className="py-3 font-medium">
                      <Link href={`/employees/${employee.id}`}>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {employee.name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()}
                          </div>
                          <span className="hover:underline">{employee.name}</span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="py-3 capitalize">{employee.role}</TableCell>
                    <TableCell className="py-3">{employee.department}</TableCell>
                    <TableCell className="py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          employee.status === "active"
                            ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
                            : "bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20"
                        )}
                      >
                        {employee.status.replace("_", " ")}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
