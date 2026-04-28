import { Layout } from "@/components/layout";
import { useGetTicket, getGetTicketQueryKey } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function TicketDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: ticket, isLoading } = useGetTicket(id, { query: { enabled: !!id, queryKey: getGetTicketQueryKey(id) } });

  if (isLoading) {
    return <Layout><div className="space-y-6"><Skeleton className="h-12 w-1/3" /><Skeleton className="h-64 w-full" /></div></Layout>;
  }

  if (!ticket) {
    return <Layout><div className="p-8 text-center text-muted-foreground">Ticket not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{ticket.subject}</h2>
              <Badge variant="outline">{ticket.ticketNumber}</Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              For {ticket.customerName} • Opened {format(new Date(ticket.createdAt), 'dd MMM yyyy')}
            </p>
          </div>
          <div className="flex gap-2">
             <Badge variant="secondary" className="capitalize">{ticket.status.replace('_', ' ')}</Badge>
             <Badge variant="outline" className="capitalize">{ticket.priority}</Badge>
          </div>
        </div>

        <div className="bg-card border rounded-lg p-6 whitespace-pre-wrap">
          {ticket.description}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Category</h3>
            <p className="capitalize font-medium">{ticket.category.replace('_', ' ')}</p>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Assigned To</h3>
            <p className="font-medium">{ticket.assignedToName || 'Unassigned'}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
