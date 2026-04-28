import {
  db,
  customersTable,
  assetsTable,
  installationsTable,
  employeesTable,
  ticketsTable,
  invoicesTable,
  attendanceTable,
} from "@workspace/db";
import { sql } from "drizzle-orm";
import type { InvoiceItem } from "@workspace/db";

function pad(n: number): string {
  return String(n).padStart(4, "0");
}
function dateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}
function daysAgo(n: number): Date {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d;
}
function monthsAgo(n: number): Date {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - n);
  return d;
}

async function main() {
  console.log("Clearing existing data...");
  await db.execute(sql`TRUNCATE TABLE attendance, tickets, invoices, installations, assets, employees, customers RESTART IDENTITY CASCADE`);

  console.log("Seeding customers...");
  const customers = await db
    .insert(customersTable)
    .values([
      {
        name: "Apollo Pharmacy",
        contactPerson: "Ravi Kumar",
        phone: "+91 98765 43210",
        email: "ravi@apollopharmacy.in",
        address: "Plot 12, Banjara Hills",
        city: "Hyderabad",
        type: "retail",
        notes: "12 store locations across the city",
      },
      {
        name: "Bharat Petroleum (Madhapur)",
        contactPerson: "Suresh Reddy",
        phone: "+91 90000 11122",
        email: "suresh.reddy@bpcl.in",
        address: "HITEC City Main Road",
        city: "Hyderabad",
        type: "enterprise",
        notes: "RF tower + perimeter CCTV",
      },
      {
        name: "Greenfield International School",
        contactPerson: "Priya Mehta",
        phone: "+91 91234 56780",
        email: "priya.mehta@greenfield.edu.in",
        address: "Gachibowli Campus, Survey No. 88",
        city: "Hyderabad",
        type: "education",
        notes: "Biometric attendance for staff and students",
      },
      {
        name: "Sai Krishna Residency",
        contactPerson: "K. Anand",
        phone: "+91 99887 76543",
        email: "anand@saikrishna.co.in",
        address: "Road No. 7, Jubilee Hills",
        city: "Hyderabad",
        type: "residential",
        notes: "Apartment complex, 4 blocks",
      },
      {
        name: "Lakshmi Textiles Pvt Ltd",
        contactPerson: "Lakshmi Narayanan",
        phone: "+91 88888 12345",
        email: "ln@lakshmitextiles.com",
        address: "Industrial Area Phase 2",
        city: "Warangal",
        type: "industrial",
        notes: "Factory floor monitoring, biometric access",
      },
    ])
    .returning();

  console.log("Seeding assets...");
  const assets = await db
    .insert(assetsTable)
    .values([
      {
        sku: "CCTV-DH-4MP-01",
        name: "Dahua 4MP Bullet Camera",
        category: "CCTV Camera",
        brand: "Dahua",
        model: "IPC-HFW2431S-S-S2",
        unitPrice: "4500",
        quantityInStock: 42,
        reorderLevel: 10,
        warrantyMonths: 24,
        description: "Outdoor IR bullet, IP67, PoE",
      },
      {
        sku: "CCTV-HK-2MP-01",
        name: "Hikvision 2MP Dome Camera",
        category: "CCTV Camera",
        brand: "Hikvision",
        model: "DS-2CD1123G0E-I",
        unitPrice: "3200",
        quantityInStock: 8,
        reorderLevel: 15,
        warrantyMonths: 24,
        description: "Indoor dome, fixed lens",
      },
      {
        sku: "NVR-HK-16CH-01",
        name: "Hikvision 16-Channel NVR",
        category: "NVR / DVR",
        brand: "Hikvision",
        model: "DS-7616NI-Q2",
        unitPrice: "18500",
        quantityInStock: 12,
        reorderLevel: 5,
        warrantyMonths: 36,
        description: "16ch, 8MP recording, 2 SATA",
      },
      {
        sku: "BIO-ESSL-X990",
        name: "eSSL X990 Biometric Reader",
        category: "Biometric",
        brand: "eSSL",
        model: "X990",
        unitPrice: "9800",
        quantityInStock: 20,
        reorderLevel: 6,
        warrantyMonths: 12,
        description: "Fingerprint + RFID, TCP/IP",
      },
      {
        sku: "BIO-MAT-MFS100",
        name: "Mantra MFS100 USB Scanner",
        category: "Biometric",
        brand: "Mantra",
        model: "MFS100",
        unitPrice: "2800",
        quantityInStock: 3,
        reorderLevel: 8,
        warrantyMonths: 12,
        description: "STQC certified fingerprint scanner",
      },
      {
        sku: "RFT-30M-GAL",
        name: "30m Galvanized RF Tower",
        category: "RF Tower",
        brand: "SRT",
        model: "GT-30",
        unitPrice: "185000",
        quantityInStock: 4,
        reorderLevel: 2,
        warrantyMonths: 60,
        description: "Hot-dip galvanized, 4-leg lattice",
      },
      {
        sku: "ACC-HDD-4TB",
        name: "Seagate Skyhawk 4TB Surveillance HDD",
        category: "Accessory",
        brand: "Seagate",
        model: "ST4000VX016",
        unitPrice: "8200",
        quantityInStock: 25,
        reorderLevel: 10,
        warrantyMonths: 36,
        description: "24x7 surveillance grade",
      },
      {
        sku: "ACC-CABLE-CAT6-305",
        name: "CAT6 Cable 305m Box",
        category: "Accessory",
        brand: "D-Link",
        model: "NCB-C6UGRYR-305",
        unitPrice: "6500",
        quantityInStock: 18,
        reorderLevel: 5,
        warrantyMonths: 12,
        description: "Outdoor grade UTP, copper",
      },
    ])
    .returning();

  console.log("Seeding employees...");
  const employees = await db
    .insert(employeesTable)
    .values([
      {
        employeeCode: "SRT-EMP-001",
        name: "Arjun Sharma",
        role: "manager",
        department: "Operations",
        phone: "+91 99001 11111",
        email: "arjun@srtech.in",
        joinDate: dateStr(monthsAgo(36)),
        status: "active",
        salary: "85000",
        address: "Madhapur, Hyderabad",
      },
      {
        employeeCode: "SRT-EMP-002",
        name: "Vikas Reddy",
        role: "technician",
        department: "Field Service",
        phone: "+91 99002 22222",
        email: "vikas@srtech.in",
        joinDate: dateStr(monthsAgo(28)),
        status: "active",
        salary: "32000",
        address: "Kukatpally, Hyderabad",
      },
      {
        employeeCode: "SRT-EMP-003",
        name: "Pooja Iyer",
        role: "support",
        department: "Customer Support",
        phone: "+91 99003 33333",
        email: "pooja@srtech.in",
        joinDate: dateStr(monthsAgo(18)),
        status: "active",
        salary: "28000",
        address: "Begumpet, Hyderabad",
      },
      {
        employeeCode: "SRT-EMP-004",
        name: "Mohammed Faraz",
        role: "installer",
        department: "Field Service",
        phone: "+91 99004 44444",
        email: "faraz@srtech.in",
        joinDate: dateStr(monthsAgo(14)),
        status: "active",
        salary: "30000",
        address: "Tolichowki, Hyderabad",
      },
      {
        employeeCode: "SRT-EMP-005",
        name: "Sneha Patil",
        role: "sales",
        department: "Sales",
        phone: "+91 99005 55555",
        email: "sneha@srtech.in",
        joinDate: dateStr(monthsAgo(9)),
        status: "active",
        salary: "38000",
        address: "Banjara Hills, Hyderabad",
      },
      {
        employeeCode: "SRT-EMP-006",
        name: "Karthik Nair",
        role: "technician",
        department: "Field Service",
        phone: "+91 99006 66666",
        email: "karthik@srtech.in",
        joinDate: dateStr(monthsAgo(6)),
        status: "on_leave",
        salary: "31000",
        address: "Secunderabad",
      },
    ])
    .returning();

  console.log("Seeding installations...");
  await db.insert(installationsTable).values([
    {
      customerId: customers[0].id,
      siteName: "Apollo Banjara Hills Flagship",
      address: "Plot 12, Banjara Hills, Hyderabad",
      installedDate: dateStr(monthsAgo(8)),
      status: "active",
      totalCameras: 12,
      amcExpiry: dateStr(monthsAgo(-4)),
      notes: "16ch NVR, 4TB storage",
    },
    {
      customerId: customers[1].id,
      siteName: "BPCL HITEC City RF Tower",
      address: "HITEC City Main Road, Hyderabad",
      installedDate: dateStr(monthsAgo(14)),
      status: "active",
      totalCameras: 6,
      amcExpiry: dateStr(monthsAgo(-10)),
      notes: "30m RF tower with perimeter cameras",
    },
    {
      customerId: customers[2].id,
      siteName: "Greenfield Gachibowli Campus",
      address: "Gachibowli, Hyderabad",
      installedDate: dateStr(monthsAgo(5)),
      status: "active",
      totalCameras: 24,
      amcExpiry: dateStr(monthsAgo(-7)),
      notes: "Biometric attendance + classroom CCTV",
    },
    {
      customerId: customers[4].id,
      siteName: "Lakshmi Textiles Factory",
      address: "Industrial Area Phase 2, Warangal",
      installedDate: dateStr(monthsAgo(2)),
      status: "maintenance",
      totalCameras: 18,
      amcExpiry: dateStr(monthsAgo(-10)),
      notes: "Awaiting NVR firmware upgrade",
    },
  ]);

  console.log("Seeding tickets...");
  const ticketSeed = [
    {
      customerId: customers[0].id,
      assignedToId: employees[1].id,
      subject: "Camera 4 offline at Banjara store",
      description: "PoE switch port shows no link. Needs onsite check.",
      priority: "high",
      status: "in_progress",
      category: "hardware",
      createdAt: daysAgo(1),
    },
    {
      customerId: customers[2].id,
      assignedToId: employees[3].id,
      subject: "Biometric reader not accepting fingerprint",
      description: "Reader at staff entrance failing for 3 users.",
      priority: "medium",
      status: "open",
      category: "biometric",
      createdAt: daysAgo(2),
    },
    {
      customerId: customers[1].id,
      assignedToId: employees[0].id,
      subject: "RF tower obstruction light replacement",
      description: "Quarterly maintenance — replace navigation light bulb.",
      priority: "low",
      status: "on_hold",
      category: "maintenance",
      createdAt: daysAgo(4),
    },
    {
      customerId: customers[3].id,
      assignedToId: employees[2].id,
      subject: "NVR storage 95% full",
      description: "Need to upgrade HDD or change retention policy.",
      priority: "medium",
      status: "resolved",
      category: "storage",
      createdAt: daysAgo(7),
    },
    {
      customerId: customers[4].id,
      assignedToId: employees[1].id,
      subject: "Factory floor camera angle adjustment",
      description: "Cameras 7 and 8 need re-aiming after machine layout change.",
      priority: "low",
      status: "resolved",
      category: "installation",
      createdAt: daysAgo(12),
    },
    {
      customerId: customers[0].id,
      assignedToId: employees[3].id,
      subject: "AMC renewal site survey",
      description: "Customer requested fresh quote for next year AMC.",
      priority: "medium",
      status: "closed",
      category: "amc",
      createdAt: daysAgo(20),
    },
  ];

  for (const t of ticketSeed) {
    const [inserted] = await db
      .insert(ticketsTable)
      .values({
        ticketNumber: "TEMP",
        customerId: t.customerId,
        assignedToId: t.assignedToId,
        subject: t.subject,
        description: t.description,
        priority: t.priority,
        status: t.status,
        category: t.category,
        resolvedAt: t.status === "resolved" || t.status === "closed" ? t.createdAt : null,
        createdAt: t.createdAt,
      })
      .returning();
    const year = t.createdAt.getUTCFullYear();
    await db
      .update(ticketsTable)
      .set({ ticketNumber: `SRT-${year}-${pad(inserted.id)}` })
      .where(sql`${ticketsTable.id} = ${inserted.id}`);
  }

  console.log("Seeding invoices...");
  const invoiceSeed: Array<{
    customerId: number;
    issueDate: Date;
    dueDate: Date;
    status: string;
    items: InvoiceItem[];
    notes: string;
  }> = [
    {
      customerId: customers[0].id,
      issueDate: monthsAgo(7),
      dueDate: monthsAgo(6),
      status: "paid",
      items: [
        { description: "Dahua 4MP Bullet Camera", quantity: 12, unitPrice: 4500, amount: 54000 },
        { description: "Hikvision 16ch NVR", quantity: 1, unitPrice: 18500, amount: 18500 },
        { description: "Installation & wiring", quantity: 1, unitPrice: 22000, amount: 22000 },
      ],
      notes: "Apollo Banjara Hills installation",
    },
    {
      customerId: customers[1].id,
      issueDate: monthsAgo(13),
      dueDate: monthsAgo(12),
      status: "paid",
      items: [
        { description: "30m Galvanized RF Tower", quantity: 1, unitPrice: 185000, amount: 185000 },
        { description: "Tower erection labour", quantity: 1, unitPrice: 65000, amount: 65000 },
      ],
      notes: "BPCL HITEC City RF tower",
    },
    {
      customerId: customers[2].id,
      issueDate: monthsAgo(4),
      dueDate: monthsAgo(3),
      status: "paid",
      items: [
        { description: "Hikvision Dome Cameras", quantity: 24, unitPrice: 3200, amount: 76800 },
        { description: "eSSL X990 Biometric Reader", quantity: 4, unitPrice: 9800, amount: 39200 },
        { description: "Installation & configuration", quantity: 1, unitPrice: 35000, amount: 35000 },
      ],
      notes: "Greenfield campus rollout",
    },
    {
      customerId: customers[4].id,
      issueDate: daysAgo(20),
      dueDate: daysAgo(-10),
      status: "sent",
      items: [
        { description: "Dahua 4MP Bullet Camera", quantity: 18, unitPrice: 4500, amount: 81000 },
        { description: "Seagate 4TB Surveillance HDD", quantity: 2, unitPrice: 8200, amount: 16400 },
        { description: "Onsite installation", quantity: 1, unitPrice: 28000, amount: 28000 },
      ],
      notes: "Lakshmi Textiles factory upgrade",
    },
    {
      customerId: customers[3].id,
      issueDate: daysAgo(45),
      dueDate: daysAgo(15),
      status: "overdue",
      items: [
        { description: "AMC — annual maintenance", quantity: 1, unitPrice: 24000, amount: 24000 },
      ],
      notes: "Sai Krishna Residency AMC FY26",
    },
    {
      customerId: customers[0].id,
      issueDate: daysAgo(2),
      dueDate: daysAgo(-28),
      status: "draft",
      items: [
        { description: "Mantra MFS100 USB Scanner", quantity: 6, unitPrice: 2800, amount: 16800 },
      ],
      notes: "Apollo new branch biometric add-on",
    },
  ];

  for (const inv of invoiceSeed) {
    const subtotal = inv.items.reduce((s, i) => s + i.amount, 0);
    const tax = Math.round(subtotal * 0.18);
    const total = subtotal + tax;
    const [inserted] = await db
      .insert(invoicesTable)
      .values({
        invoiceNumber: "TEMP",
        customerId: inv.customerId,
        issueDate: dateStr(inv.issueDate),
        dueDate: dateStr(inv.dueDate),
        status: inv.status,
        subtotal: String(subtotal),
        tax: String(tax),
        total: String(total),
        notes: inv.notes,
        items: inv.items,
        createdAt: inv.issueDate,
      })
      .returning();
    const year = inv.issueDate.getUTCFullYear();
    await db
      .update(invoicesTable)
      .set({ invoiceNumber: `INV-${year}-${pad(inserted.id)}` })
      .where(sql`${invoicesTable.id} = ${inserted.id}`);
  }

  console.log("Seeding today's attendance...");
  const today = dateStr(new Date());
  await db.insert(attendanceTable).values([
    { employeeId: employees[0].id, date: today, checkIn: "09:05", checkOut: null, status: "present" },
    { employeeId: employees[1].id, date: today, checkIn: "09:30", checkOut: null, status: "late", notes: "Traffic on ORR" },
    { employeeId: employees[2].id, date: today, checkIn: "09:00", checkOut: null, status: "present" },
    { employeeId: employees[3].id, date: today, checkIn: null, checkOut: null, status: "absent" },
    { employeeId: employees[4].id, date: today, checkIn: "09:10", checkOut: null, status: "present" },
    { employeeId: employees[5].id, date: today, checkIn: null, checkOut: null, status: "on_leave", notes: "Approved leave" },
  ]);

  console.log("Seeding past attendance for first 3 employees...");
  for (let i = 1; i <= 14; i++) {
    const d = dateStr(daysAgo(i));
    for (const emp of employees.slice(0, 5)) {
      const r = (i + emp.id) % 7;
      const status =
        r === 0 ? "absent" : r === 1 ? "late" : r === 6 ? "half_day" : "present";
      await db.insert(attendanceTable).values({
        employeeId: emp.id,
        date: d,
        checkIn: status === "absent" ? null : status === "late" ? "09:45" : "09:00",
        checkOut: status === "absent" ? null : status === "half_day" ? "13:00" : "18:00",
        status,
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
