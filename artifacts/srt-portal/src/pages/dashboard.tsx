import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import {
  useGetDashboardSummary,
  useGetRevenueByMonth,
  useGetTicketStatusBreakdown,
  useGetAssetCategoryBreakdown,
  useGetRecentActivity,
  useGetLowStockAssets,
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Users,
  Wrench,
  AlertCircle,
  Package,
  UserCircle,
  CheckCircle,
  IndianRupee,
  CreditCard,
  LayoutDashboard,
  Activity,
  TrendingDown,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const PIE_COLORS = [
  "hsl(217, 91%, 56%)",
  "hsl(173, 70%, 42%)",
  "hsl(271, 81%, 60%)",
  "hsl(38, 92%, 55%)",
  "hsl(340, 82%, 60%)",
];

export default function Dashboard() {
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary();
  const { data: recentActivity, isLoading: isLoadingActivity } = useGetRecentActivity();
  const { data: lowStock, isLoading: isLoadingLowStock } = useGetLowStockAssets();
  const { data: revenue, isLoading: isLoadingRevenue } = useGetRevenueByMonth();
  const { data: ticketBreakdown, isLoading: isLoadingTickets } = useGetTicketStatusBreakdown();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={LayoutDashboard}
          title="Dashboard"
          description="Overview of Sree Ram Technologies operations."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            title="Total Customers"
            value={summary?.totalCustomers}
            icon={Users}
            accent="blue"
            loading={isLoadingSummary}
          />
          <KpiCard
            title="Active Installations"
            value={summary?.activeInstallations}
            icon={Wrench}
            accent="violet"
            loading={isLoadingSummary}
          />
          <KpiCard
            title="Open Tickets"
            value={summary?.openTickets}
            icon={AlertCircle}
            accent="rose"
            loading={isLoadingSummary}
          />
          <KpiCard
            title="Assets in Stock"
            value={summary?.assetsInStock}
            icon={Package}
            accent="cyan"
            loading={isLoadingSummary}
          />
          <KpiCard
            title="Total Employees"
            value={summary?.employeesTotal}
            icon={UserCircle}
            accent="indigo"
            loading={isLoadingSummary}
          />
          <KpiCard
            title="Present Today"
            value={summary?.presentToday}
            icon={CheckCircle}
            accent="emerald"
            loading={isLoadingSummary}
          />
          <KpiCard
            title="Revenue This Month"
            value={
              summary
                ? `₹${(summary.revenueThisMonth ?? 0).toLocaleString()}`
                : undefined
            }
            icon={IndianRupee}
            accent="emerald"
            loading={isLoadingSummary}
          />
          <KpiCard
            title="Outstanding Amount"
            value={
              summary
                ? `₹${(summary.outstandingAmount ?? 0).toLocaleString()}`
                : undefined
            }
            icon={CreditCard}
            accent="amber"
            loading={isLoadingSummary}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly billing performance</CardDescription>
              </div>
              <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <IndianRupee className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoadingRevenue ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenue} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(220 20% 92%)" />
                    <XAxis
                      dataKey="month"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      stroke="hsl(220 12% 45%)"
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}`}
                      stroke="hsl(220 12% 45%)"
                    />
                    <Tooltip
                      cursor={{ fill: "hsl(220 25% 95%)" }}
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid hsl(220 20% 92%)",
                        boxShadow: "0 8px 16px -4px rgb(15 23 42 / 0.10)",
                      }}
                      formatter={(value) => [`₹${value}`, "Revenue"]}
                    />
                    <Bar dataKey="revenue" fill="hsl(217, 91%, 56%)" radius={[6, 6, 0, 0]} maxBarSize={42} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Tickets by Status</CardTitle>
                <CardDescription>Live distribution</CardDescription>
              </div>
              <div className="rounded-lg bg-rose-500/10 p-2 text-rose-500">
                <AlertCircle className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoadingTickets ? (
                <Skeleton className="h-full w-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
                      dataKey="count"
                      nameKey="status"
                      strokeWidth={2}
                      stroke="hsl(0 0% 100%)"
                    >
                      {ticketBreakdown?.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid hsl(220 20% 92%)",
                        boxShadow: "0 8px 16px -4px rgb(15 23 42 / 0.10)",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      iconType="circle"
                      formatter={(value) => (
                        <span className="text-xs capitalize text-muted-foreground">
                          {String(value).replace("_", " ")}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-full lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest events across the portal</CardDescription>
              </div>
              <div className="rounded-lg bg-violet-500/10 p-2 text-violet-500">
                <Activity className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingActivity ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity?.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-none">
                          {activity.title}
                        </p>
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                          {activity.subtitle}
                        </p>
                      </div>
                      <div className="shrink-0 text-xs text-muted-foreground">
                        {format(new Date(activity.timestamp), "dd MMM yyyy HH:mm")}
                      </div>
                    </div>
                  ))}
                  {recentActivity?.length === 0 && (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      No recent activity
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="col-span-full lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Low Stock Alerts</CardTitle>
                <CardDescription>Items needing reorder</CardDescription>
              </div>
              <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600">
                <TrendingDown className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingLowStock ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {lowStock?.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{asset.name}</p>
                        <p className="truncate font-mono text-xs text-muted-foreground">
                          {asset.sku}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-rose-600">
                          {asset.quantityInStock} left
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Reorder at {asset.reorderLevel}
                        </p>
                      </div>
                    </div>
                  ))}
                  {lowStock?.length === 0 && (
                    <div className="py-6 text-center text-sm text-muted-foreground">
                      All stock levels are optimal
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
