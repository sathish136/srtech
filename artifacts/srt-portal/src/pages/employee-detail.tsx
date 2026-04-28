import { Layout } from "@/components/layout";
import { useGetEmployee, getGetEmployeeQueryKey } from "@workspace/api-client-react";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function EmployeeDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: employee, isLoading } = useGetEmployee(id, { query: { enabled: !!id, queryKey: getGetEmployeeQueryKey(id) } });

  if (isLoading) {
    return <Layout><div className="space-y-6"><Skeleton className="h-12 w-1/3" /><Skeleton className="h-64 w-full" /></div></Layout>;
  }

  if (!employee) {
    return <Layout><div className="p-8 text-center text-muted-foreground">Employee not found</div></Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{employee.name}</h2>
              <Badge variant="outline">{employee.employeeCode}</Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              {employee.role} • {employee.department} • Joined {format(new Date(employee.joinDate), 'dd MMM yyyy')}
            </p>
          </div>
          <Badge variant={employee.status === 'active' ? "default" : "secondary"} className="capitalize">
            {employee.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Contact</h3>
            <p className="font-medium">{employee.phone}</p>
            <p className="text-muted-foreground">{employee.email}</p>
          </div>
        </div>
        
      </div>
    </Layout>
  );
}
