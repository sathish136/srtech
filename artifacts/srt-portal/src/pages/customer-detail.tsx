import { Layout } from "@/components/layout";
import { useGetCustomer, getGetCustomerQueryKey } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { MapPin, Phone, Mail, User } from "lucide-react";

export default function CustomerDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: customer, isLoading } = useGetCustomer(id, { query: { enabled: !!id, queryKey: getGetCustomerQueryKey(id) } });

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!customer) {
    return <Layout><div className="p-8 text-center text-muted-foreground">Customer not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{customer.name}</h2>
              <Badge variant="outline" className="capitalize">{customer.type}</Badge>
            </div>
            <p className="text-muted-foreground mt-1">Added on {format(new Date(customer.createdAt), 'dd MMM yyyy')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium leading-none">Contact Person</p>
              <p className="text-sm text-muted-foreground mt-1">{customer.contactPerson}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium leading-none">Phone</p>
              <p className="text-sm text-muted-foreground mt-1">{customer.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium leading-none">Email</p>
              <p className="text-sm text-muted-foreground mt-1">{customer.email || 'N/A'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border rounded-lg bg-card">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium leading-none">Location</p>
              <p className="text-sm text-muted-foreground mt-1 truncate" title={`${customer.address}, ${customer.city}`}>
                {customer.city}
              </p>
            </div>
          </div>
        </div>

        {customer.notes && (
          <div className="p-4 border rounded-lg bg-muted/50">
            <p className="text-sm font-medium mb-1">Notes</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{customer.notes}</p>
          </div>
        )}

        <Tabs defaultValue="installations" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="installations">Installations ({customer.installations?.length || 0})</TabsTrigger>
            <TabsTrigger value="tickets">Tickets ({customer.tickets?.length || 0})</TabsTrigger>
            <TabsTrigger value="invoices">Invoices ({customer.invoices?.length || 0})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="installations" className="mt-4">
            <div className="border rounded-md bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Site Name</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Installed</TableHead>
                    <TableHead>Cameras</TableHead>
                    <TableHead>AMC Expiry</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.installations?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No installations found</TableCell>
                    </TableRow>
                  ) : (
                    customer.installations?.map(inst => (
                      <TableRow key={inst.id}>
                        <TableCell className="font-medium">{inst.siteName}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={inst.address}>{inst.address}</TableCell>
                        <TableCell>{format(new Date(inst.installedDate), 'dd MMM yyyy')}</TableCell>
                        <TableCell>{inst.totalCameras}</TableCell>
                        <TableCell>{inst.amcExpiry ? format(new Date(inst.amcExpiry), 'dd MMM yyyy') : '-'}</TableCell>
                        <TableCell>
                          <Badge variant={inst.status === 'active' ? 'default' : 'secondary'} className="capitalize">{inst.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="mt-4">
            <div className="border rounded-md bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket #</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.tickets?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No tickets found</TableCell>
                    </TableRow>
                  ) : (
                    customer.tickets?.map(ticket => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono text-sm">{ticket.ticketNumber}</TableCell>
                        <TableCell className="font-medium">{ticket.subject}</TableCell>
                        <TableCell><Badge variant="outline" className="capitalize">{ticket.priority}</Badge></TableCell>
                        <TableCell><Badge variant="secondary" className="capitalize">{ticket.status.replace('_', ' ')}</Badge></TableCell>
                        <TableCell>{format(new Date(ticket.createdAt), 'dd MMM yyyy')}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="mt-4">
            <div className="border rounded-md bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.invoices?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No invoices found</TableCell>
                    </TableRow>
                  ) : (
                    customer.invoices?.map(invoice => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-mono text-sm">{invoice.invoiceNumber}</TableCell>
                        <TableCell>{format(new Date(invoice.issueDate), 'dd MMM yyyy')}</TableCell>
                        <TableCell>{format(new Date(invoice.dueDate), 'dd MMM yyyy')}</TableCell>
                        <TableCell><Badge variant="outline" className="capitalize">{invoice.status}</Badge></TableCell>
                        <TableCell className="text-right font-medium">₹{invoice.total.toLocaleString()}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
