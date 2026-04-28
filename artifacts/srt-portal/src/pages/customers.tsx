import { Layout } from "@/components/layout";
import { useListCustomers } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "wouter";

export default function Customers() {
  const { data: customers, isLoading } = useListCustomers();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
            <p className="text-muted-foreground">Manage your client base and view their details.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>

        <div className="flex items-center gap-2 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search customers..." className="w-full pl-8" />
          </div>
        </div>

        <div className="border rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : customers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No customers found. Add your first customer to get started.
                  </TableCell>
                </TableRow>
              ) : (
                customers?.map(customer => (
                  <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <Link href={`/customers/${customer.id}`}>
                        <div className="hover:underline">{customer.name}</div>
                      </Link>
                    </TableCell>
                    <TableCell>{customer.contactPerson}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.city}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">{customer.type}</Badge>
                    </TableCell>
                    <TableCell>{format(new Date(customer.createdAt), 'dd MMM yyyy')}</TableCell>
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
