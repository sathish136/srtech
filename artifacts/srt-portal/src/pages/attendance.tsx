import { Layout } from "@/components/layout";
import { useListAttendance, useGetTodayAttendanceSummary } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

export default function Attendance() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const { data: summary, isLoading: isLoadingSummary } = useGetTodayAttendanceSummary();
  const { data: attendance, isLoading: isLoadingAttendance } = useListAttendance({ date: today });

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Attendance Log</h2>
          <p className="text-muted-foreground">Track employee presence and time for {format(new Date(), 'dd MMM yyyy')}.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Present</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{isLoadingSummary ? '-' : summary?.present}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{isLoadingSummary ? '-' : summary?.absent}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Late</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">{isLoadingSummary ? '-' : summary?.late}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{isLoadingSummary ? '-' : summary?.onLeave}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Half Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">{isLoadingSummary ? '-' : summary?.halfDay}</div>
            </CardContent>
          </Card>
          <Card className="bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{isLoadingSummary ? '-' : summary?.total}</div>
            </CardContent>
          </Card>
        </div>

        <div className="border rounded-md bg-card mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Check In</TableHead>
                <TableHead>Check Out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingAttendance ? (
                [1, 2, 3, 4].map(i => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  </TableRow>
                ))
              ) : attendance?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No attendance records found for today.
                  </TableCell>
                </TableRow>
              ) : (
                attendance?.map(record => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.employeeName}</TableCell>
                    <TableCell>{format(new Date(record.date), 'dd MMM yyyy')}</TableCell>
                    <TableCell>{record.checkIn ? format(new Date(`2000-01-01T${record.checkIn}`), 'hh:mm a') : '-'}</TableCell>
                    <TableCell>{record.checkOut ? format(new Date(`2000-01-01T${record.checkOut}`), 'hh:mm a') : '-'}</TableCell>
                    <TableCell>
                      <Badge variant={record.status === 'present' ? 'default' : record.status === 'absent' ? 'destructive' : 'secondary'} className="capitalize">
                        {record.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{record.notes || '-'}</TableCell>
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
