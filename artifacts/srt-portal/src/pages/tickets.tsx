import { Layout } from "@/components/layout";
import { useListTickets } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "wouter";

export default function Tickets() {
  const { data: tickets, isLoading } = useListTickets();

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return 'default';
      case 'in_progress': return 'secondary';
      case 'resolved': return 'outline';
      case 'closed': return 'outline';
      default: return 'secondary';
    }
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Service Tickets</h2>
            <p className="text-muted-foreground">Manage installation, repair, and AMC service requests.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Ticket
          </Button>
        </div>

        <div className="flex items-center gap-2 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search tickets..." className="w-full pl-8" />
          </div>
        </div>

        <div className="border rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket #</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : tickets?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No tickets found.
                  </TableCell>
                </TableRow>
              ) : (
                tickets?.map(ticket => (
                  <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono text-sm">
                      <Link href={`/tickets/${ticket.id}`} className="hover:underline text-primary">
                        {ticket.ticketNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium max-w-[200px] truncate" title={ticket.subject}>
                      {ticket.subject}
                    </TableCell>
                    <TableCell>
                      <Link href={`/customers/${ticket.customerId}`} className="hover:underline">
                        {ticket.customerName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(ticket.priority)} className="capitalize">
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(ticket.status)} className="capitalize">
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(ticket.createdAt), 'dd MMM yyyy')}</TableCell>
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
