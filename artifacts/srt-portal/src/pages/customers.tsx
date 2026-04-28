import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { useListCustomers } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Link } from "wouter";
import { useMemo, useState } from "react";

export default function Customers() {
  const { data: customers, isLoading } = useListCustomers();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(() => {
    if (!customers) return [];
    const s = search.trim().toLowerCase();
    return customers.filter((c) => {
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (!s) return true;
      return (
        c.name.toLowerCase().includes(s) ||
        (c.contactPerson ?? "").toLowerCase().includes(s) ||
        (c.phone ?? "").toLowerCase().includes(s) ||
        (c.city ?? "").toLowerCase().includes(s)
      );
    });
  }, [customers, search, typeFilter]);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={Users}
          title="Customers"
          description="Manage your client base and view their details."
          actions={
            <Button>
              <Plus className="h-4 w-4" /> Add Customer
            </Button>
          }
        />

        <DataToolbar
          placeholder="Search by name, contact, phone, city…"
          value={search}
          onChange={setSearch}
          filters={
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[170px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Contact Person</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Phone</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">City</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Type</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Added</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="px-4 py-3"><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No customers match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((customer) => (
                  <TableRow key={customer.id} className="cursor-pointer transition-colors hover:bg-muted/40">
                    <TableCell className="px-4 py-3 font-medium">
                      <Link href={`/customers/${customer.id}`}>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {customer.name.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="hover:underline">{customer.name}</span>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="py-3">{customer.contactPerson}</TableCell>
                    <TableCell className="py-3 font-mono text-sm">{customer.phone}</TableCell>
                    <TableCell className="py-3">{customer.city}</TableCell>
                    <TableCell className="py-3">
                      <Badge variant="outline" className="capitalize">
                        {customer.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-muted-foreground">
                      {format(new Date(customer.createdAt), "dd MMM yyyy")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && customers && (
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {customers.length} customers
          </p>
        )}
      </div>
    </Layout>
  );
}
