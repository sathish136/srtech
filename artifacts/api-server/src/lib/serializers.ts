import type {
  Customer,
  Asset,
  Installation,
  Ticket,
  Invoice,
  Employee,
  Attendance,
  InvoiceItem,
} from "@workspace/db";

export function toDateString(d: Date | string | null | undefined): string | null {
  if (d == null) return null;
  if (typeof d === "string") return d.slice(0, 10);
  return d.toISOString().slice(0, 10);
}

export function toDateStringRequired(d: Date | string): string {
  if (typeof d === "string") return d.slice(0, 10);
  return d.toISOString().slice(0, 10);
}

export function serializeCustomer(row: Customer) {
  return {
    id: row.id,
    name: row.name,
    contactPerson: row.contactPerson,
    phone: row.phone,
    email: row.email,
    address: row.address,
    city: row.city,
    type: row.type,
    notes: row.notes ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeAsset(row: Asset) {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    category: row.category,
    brand: row.brand,
    model: row.model,
    unitPrice: Number(row.unitPrice),
    quantityInStock: row.quantityInStock,
    reorderLevel: row.reorderLevel,
    warrantyMonths: row.warrantyMonths,
    description: row.description ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeInstallationRow(row: Installation, customerName: string) {
  return {
    id: row.id,
    customerId: row.customerId,
    customerName,
    siteName: row.siteName,
    address: row.address,
    installedDate: row.installedDate,
    status: row.status,
    totalCameras: row.totalCameras,
    amcExpiry: row.amcExpiry ?? null,
    notes: row.notes ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeTicketRow(
  row: Ticket,
  customerName: string,
  assignee: Employee | null,
) {
  return {
    id: row.id,
    ticketNumber: row.ticketNumber,
    customerId: row.customerId,
    customerName,
    subject: row.subject,
    description: row.description,
    priority: row.priority,
    status: row.status,
    category: row.category,
    assignedToId: row.assignedToId ?? null,
    assignedToName: assignee?.name ?? null,
    resolvedAt: row.resolvedAt ? row.resolvedAt.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeInvoiceRow(row: Invoice, customerName: string) {
  return {
    id: row.id,
    invoiceNumber: row.invoiceNumber,
    customerId: row.customerId,
    customerName,
    issueDate: row.issueDate,
    dueDate: row.dueDate,
    status: row.status,
    subtotal: Number(row.subtotal),
    tax: Number(row.tax),
    total: Number(row.total),
    notes: row.notes ?? null,
    items: (row.items ?? []) as InvoiceItem[],
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeEmployee(row: Employee) {
  return {
    id: row.id,
    employeeCode: row.employeeCode,
    name: row.name,
    role: row.role,
    department: row.department,
    phone: row.phone,
    email: row.email,
    joinDate: row.joinDate,
    status: row.status,
    salary: Number(row.salary),
    address: row.address ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

export function serializeAttendance(row: Attendance, employeeName: string) {
  return {
    id: row.id,
    employeeId: row.employeeId,
    employeeName,
    date: row.date,
    checkIn: row.checkIn ?? null,
    checkOut: row.checkOut ?? null,
    status: row.status,
    notes: row.notes ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}
