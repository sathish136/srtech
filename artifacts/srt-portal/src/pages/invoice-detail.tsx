import { Layout } from "@/components/layout";
import { useGetInvoice, getGetInvoiceQueryKey } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function InvoiceDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: invoice, isLoading } = useGetInvoice(id, { query: { enabled: !!id, queryKey: getGetInvoiceQueryKey(id) } });

  if (isLoading) {
    return <Layout><div className="space-y-6"><Skeleton className="h-12 w-1/3" /><Skeleton className="h-64 w-full" /></div></Layout>;
  }

  if (!invoice) {
    return <Layout><div className="p-8 text-center text-muted-foreground">Invoice not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto bg-card border rounded-lg p-8 shadow-sm">
        <div className="flex items-start justify-between border-b pb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">INVOICE</h2>
            <p className="text-muted-foreground mt-1 font-mono">{invoice.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="capitalize mb-2 text-lg px-4 py-1">{invoice.status}</Badge>
            <p className="text-sm text-muted-foreground">Issue Date: {format(new Date(invoice.issueDate), 'dd MMM yyyy')}</p>
            <p className="text-sm text-muted-foreground">Due Date: {format(new Date(invoice.dueDate), 'dd MMM yyyy')}</p>
          </div>
        </div>

        <div className="py-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Billed To</h3>
          <p className="font-semibold text-lg">{invoice.customerName}</p>
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items?.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">₹{item.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">₹{item.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>₹{invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>₹{invoice.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t">
              <span>Total</span>
              <span>₹{invoice.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="mt-8 pt-6 border-t text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Notes</p>
            {invoice.notes}
          </div>
        )}
      </div>
    </Layout>
  );
}
