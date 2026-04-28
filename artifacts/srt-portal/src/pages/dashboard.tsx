import { Layout } from "@/components/layout";
import { 
  useGetDashboardSummary, 
  useGetRevenueByMonth,
  useGetTicketStatusBreakdown,
  useGetAssetCategoryBreakdown,
  useGetRecentActivity,
  useGetLowStockAssets
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Wrench, AlertCircle, Package, UserCircle, CheckCircle, IndianRupee, CreditCard } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ['hsl(199, 80%, 51%)', 'hsl(173, 58%, 39%)', 'hsl(197, 37%, 24%)', 'hsl(43, 74%, 66%)', 'hsl(27, 87%, 67%)'];

export default function Dashboard() {
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary();
  const { data: recentActivity, isLoading: isLoadingActivity } = useGetRecentActivity();
  const { data: lowStock, isLoading: isLoadingLowStock } = useGetLowStockAssets();
  const { data: revenue, isLoading: isLoadingRevenue } = useGetRevenueByMonth();
  const { data: ticketBreakdown, isLoading: isLoadingTickets } = useGetTicketStatusBreakdown();
  const { data: assetBreakdown, isLoading: isLoadingAssets } = useGetAssetCategoryBreakdown();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of Sree Ram Technologies operations.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KpiCard 
            title="Total Customers" 
            value={summary?.totalCustomers} 
            icon={<Users className="h-4 w-4 text-muted-foreground" />} 
            loading={isLoadingSummary} 
          />
          <KpiCard 
            title="Active Installations" 
            value={summary?.activeInstallations} 
            icon={<Wrench className="h-4 w-4 text-muted-foreground" />} 
            loading={isLoadingSummary} 
          />
          <KpiCard 
            title="Open Tickets" 
            value={summary?.openTickets} 
            icon={<AlertCircle className="h-4 w-4 text-destructive" />} 
            loading={isLoadingSummary} 
          />
          <KpiCard 
            title="Assets in Stock" 
            value={summary?.assetsInStock} 
            icon={<Package className="h-4 w-4 text-muted-foreground" />} 
            loading={isLoadingSummary} 
          />
          <KpiCard 
            title="Total Employees" 
            value={summary?.employeesTotal} 
            icon={<UserCircle className="h-4 w-4 text-muted-foreground" />} 
            loading={isLoadingSummary} 
          />
          <KpiCard 
            title="Present Today" 
            value={summary?.presentToday} 
            icon={<CheckCircle className="h-4 w-4 text-green-500" />} 
            loading={isLoadingSummary} 
          />
          <KpiCard 
            title="Revenue This Month" 
            value={summary ? `₹${summary.revenueThisMonth.toLocaleString()}` : undefined} 
            icon={<IndianRupee className="h-4 w-4 text-primary" />} 
            loading={isLoadingSummary} 
          />
          <KpiCard 
            title="Outstanding Amount" 
            value={summary ? `₹${summary.outstandingAmount.toLocaleString()}` : undefined} 
            icon={<CreditCard className="h-4 w-4 text-orange-500" />} 
            loading={isLoadingSummary} 
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoadingRevenue ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenue}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                    <Tooltip cursor={{fill: 'transparent'}} formatter={(value) => [`₹${value}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Tickets by Status</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {isLoadingTickets ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ticketBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                      nameKey="status"
                    >
                      {ticketBreakdown?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingActivity ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="space-y-8">
                  {recentActivity?.map((activity) => (
                    <div key={activity.id} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
                      </div>
                      <div className="ml-auto font-medium text-xs text-muted-foreground">
                        {format(new Date(activity.timestamp), 'dd MMM yyyy HH:mm')}
                      </div>
                    </div>
                  ))}
                  {recentActivity?.length === 0 && (
                    <div className="text-center text-muted-foreground py-4">No recent activity</div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Low Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingLowStock ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : (
                <div className="space-y-4">
                  {lowStock?.map((asset) => (
                    <div key={asset.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-medium">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-destructive">{asset.quantityInStock} left</p>
                        <p className="text-xs text-muted-foreground">Reorder at {asset.reorderLevel}</p>
                      </div>
                    </div>
                  ))}
                  {lowStock?.length === 0 && (
                    <div className="text-center text-muted-foreground py-4">All stock levels are optimal</div>
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

function KpiCard({ title, value, icon, loading }: { title: string, value?: string | number, icon: React.ReactNode, loading: boolean }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-7 w-20" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
      </CardContent>
    </Card>
  );
}
