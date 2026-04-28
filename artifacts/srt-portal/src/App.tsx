import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/dashboard";
import Customers from "@/pages/customers";
import CustomerDetail from "@/pages/customer-detail";
import Assets from "@/pages/assets";
import AssetDetail from "@/pages/asset-detail";
import Installations from "@/pages/installations";
import InstallationDetail from "@/pages/installation-detail";
import Tickets from "@/pages/tickets";
import TicketDetail from "@/pages/ticket-detail";
import Invoices from "@/pages/invoices";
import InvoiceDetail from "@/pages/invoice-detail";
import Employees from "@/pages/employees";
import EmployeeDetail from "@/pages/employee-detail";
import Attendance from "@/pages/attendance";
import Leads from "@/pages/leads";
import LeadDetail from "@/pages/lead-detail";

import MarketingHome from "@/pages/marketing-home";
import MarketingAbout from "@/pages/marketing-about";
import MarketingServices from "@/pages/marketing-services";
import MarketingProducts from "@/pages/marketing-products";
import MarketingContact from "@/pages/marketing-contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Public marketing site */}
      <Route path="/" component={MarketingHome} />
      <Route path="/about" component={MarketingAbout} />
      <Route path="/services" component={MarketingServices} />
      <Route path="/products" component={MarketingProducts} />
      <Route path="/contact" component={MarketingContact} />

      {/* Internal portal (web app / ERP) */}
      <Route path="/portal" component={Dashboard} />
      <Route path="/portal/customers" component={Customers} />
      <Route path="/portal/customers/:id" component={CustomerDetail} />
      <Route path="/portal/assets" component={Assets} />
      <Route path="/portal/assets/:id" component={AssetDetail} />
      <Route path="/portal/installations" component={Installations} />
      <Route path="/portal/installations/:id" component={InstallationDetail} />
      <Route path="/portal/tickets" component={Tickets} />
      <Route path="/portal/tickets/:id" component={TicketDetail} />
      <Route path="/portal/invoices" component={Invoices} />
      <Route path="/portal/invoices/:id" component={InvoiceDetail} />
      <Route path="/portal/employees" component={Employees} />
      <Route path="/portal/employees/:id" component={EmployeeDetail} />
      <Route path="/portal/attendance" component={Attendance} />
      <Route path="/portal/leads" component={Leads} />
      <Route path="/portal/leads/:id" component={LeadDetail} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
