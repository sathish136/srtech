import { Layout } from "@/components/layout";
import { useListInstallations } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "wouter";

export default function Installations() {
  const { data: installations, isLoading } = useListInstallations();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Installations</h2>
            <p className="text-muted-foreground">Manage customer installation sites and AMC contracts.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Installation
          </Button>
        </div>

        <div className="flex items-center gap-2 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search installations..." className="w-full pl-8" />
          </div>
        </div>

        <div className="border rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site Name</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Installed On</TableHead>
                <TableHead>AMC Expiry</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : installations?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No installations found.
                  </TableCell>
                </TableRow>
              ) : (
                installations?.map(inst => (
                  <TableRow key={inst.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{inst.siteName}</TableCell>
                    <TableCell>
                      <Link href={`/customers/${inst.customerId}`} className="hover:underline">
                        {inst.customerName}
                      </Link>
                    </TableCell>
                    <TableCell>{format(new Date(inst.installedDate), 'dd MMM yyyy')}</TableCell>
                    <TableCell>
                      {inst.amcExpiry ? (
                        <span className={new Date(inst.amcExpiry) < new Date() ? "text-destructive font-medium" : ""}>
                          {format(new Date(inst.amcExpiry), 'dd MMM yyyy')}
                        </span>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={inst.status === 'active' ? "default" : "secondary"} className="capitalize">
                        {inst.status}
                      </Badge>
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
