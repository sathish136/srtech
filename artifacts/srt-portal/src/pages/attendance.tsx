import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { DataToolbar } from "@/components/data-toolbar";
import { useListAttendance, useGetTodayAttendanceSummary } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  CalendarClock,
  CheckCircle,
  XCircle,
  Clock,
  Plane,
  CircleDashed,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const STATUS_STYLES: Record<string, string> = {
  present: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  absent: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20",
  late: "bg-orange-500/10 text-orange-700 ring-1 ring-orange-500/20",
  on_leave: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20",
  half_day: "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/20",
};

export default function Attendance() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useState(today);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: summary, isLoading: isLoadingSummary } = useGetTodayAttendanceSummary();
  const { data: attendance, isLoading: isLoadingAttendance } = useListAttendance({ date });

  const filtered = useMemo(() => {
    if (!attendance) return [];
    const s = search.trim().toLowerCase();
    return attendance.filter((r) => {
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (!s) return true;
      return (r.employeeName ?? "").toLowerCase().includes(s);
    });
  }, [attendance, search, statusFilter]);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={CalendarClock}
          title="Attendance Log"
          description={`Today's snapshot — ${format(new Date(), "dd MMM yyyy")}.`}
        />

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <KpiCard title="Present" value={summary?.present} icon={CheckCircle} accent="emerald" loading={isLoadingSummary} />
          <KpiCard title="Absent" value={summary?.absent} icon={XCircle} accent="rose" loading={isLoadingSummary} />
          <KpiCard title="Late" value={summary?.late} icon={Clock} accent="orange" loading={isLoadingSummary} />
          <KpiCard title="On Leave" value={summary?.onLeave} icon={Plane} accent="blue" loading={isLoadingSummary} />
          <KpiCard title="Half Day" value={summary?.halfDay} icon={CircleDashed} accent="violet" loading={isLoadingSummary} />
          <KpiCard title="Total" value={summary?.total} icon={Users} accent="indigo" loading={isLoadingSummary} />
        </div>

        <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center">
            <Label className="shrink-0 text-xs uppercase tracking-wider text-muted-foreground">View date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 w-full bg-muted/40 sm:max-w-[180px]"
            />
          </div>
        </div>

        <DataToolbar
          placeholder="Search by employee name…"
          value={search}
          onChange={setSearch}
          filters={
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="on_leave">On Leave</SelectItem>
                <SelectItem value="half_day">Half Day</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">Employee</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Date</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Check In</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Check Out</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingAttendance ? (
                [1, 2, 3, 4].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="px-4 py-3"><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-32" /></TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No attendance records for this day or filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="px-4 py-3 font-medium">{record.employeeName}</TableCell>
                    <TableCell className="py-3 text-muted-foreground">
                      {format(new Date(record.date), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="py-3 font-mono text-sm">
                      {record.checkIn
                        ? format(new Date(`2000-01-01T${record.checkIn}`), "hh:mm a")
                        : "—"}
                    </TableCell>
                    <TableCell className="py-3 font-mono text-sm">
                      {record.checkOut
                        ? format(new Date(`2000-01-01T${record.checkOut}`), "hh:mm a")
                        : "—"}
                    </TableCell>
                    <TableCell className="py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          STATUS_STYLES[record.status] ?? "bg-muted text-muted-foreground"
                        )}
                      >
                        {record.status.replace("_", " ")}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-muted-foreground">{record.notes || "—"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoadingAttendance && attendance && (
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {attendance.length} records on {format(new Date(date), "dd MMM yyyy")}
          </p>
        )}
      </div>
    </Layout>
  );
}
