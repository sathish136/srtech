import {
  db,
  customersTable,
  assetsTable,
  installationsTable,
  employeesTable,
  ticketsTable,
  invoicesTable,
  attendanceTable,
  leadsTable,
  followupsTable,
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
  await db.execute(
    sql`TRUNCATE TABLE followups, leads, attendance, tickets, invoices, installations, assets, employees, customers RESTART IDENTITY CASCADE`,
  );

  console.log("Seeding customers...");
  const customers = await db
    .insert(customersTable)
    .values([
      { name: "Apollo Pharmacy", contactPerson: "Ravi Kumar", phone: "+91 98765 43210", email: "ravi@apollopharmacy.in", address: "Plot 12, Banjara Hills", city: "Hyderabad", type: "retail", notes: "12 store locations across the city" },
      { name: "Bharat Petroleum (Madhapur)", contactPerson: "Suresh Reddy", phone: "+91 90000 11122", email: "suresh.reddy@bpcl.in", address: "HITEC City Main Road", city: "Hyderabad", type: "enterprise", notes: "RF tower + perimeter CCTV" },
      { name: "Greenfield International School", contactPerson: "Priya Mehta", phone: "+91 91234 56780", email: "priya.mehta@greenfield.edu.in", address: "Gachibowli Campus, Survey No. 88", city: "Hyderabad", type: "education", notes: "Biometric attendance for staff and students" },
      { name: "Sai Krishna Residency", contactPerson: "K. Anand", phone: "+91 99887 76543", email: "anand@saikrishna.co.in", address: "Road No. 7, Jubilee Hills", city: "Hyderabad", type: "residential", notes: "Apartment complex, 4 blocks" },
      { name: "Lakshmi Textiles Pvt Ltd", contactPerson: "Lakshmi Narayanan", phone: "+91 88888 12345", email: "ln@lakshmitextiles.com", address: "Industrial Area Phase 2", city: "Warangal", type: "industrial", notes: "Factory floor monitoring, biometric access" },
      { name: "Sri Venkateswara Hospital", contactPerson: "Dr. Murthy", phone: "+91 98480 12121", email: "admin@svhospital.in", address: "Ameerpet Main Road", city: "Hyderabad", type: "healthcare", notes: "100-bed multi-specialty, 24x7 monitoring" },
      { name: "Karachi Bakery (Outlets)", contactPerson: "Imran Sheikh", phone: "+91 90909 30303", email: "imran@karachibakery.com", address: "Mozamjahi Market", city: "Hyderabad", type: "retail", notes: "All 8 outlets, central NVR" },
      { name: "GMR Office Park", contactPerson: "Anil Choudhury", phone: "+91 93939 40404", email: "anil.c@gmr.in", address: "Shamshabad", city: "Hyderabad", type: "enterprise", notes: "Corporate HQ + 2 satellite offices" },
      { name: "Royal Enfield Service Center", contactPerson: "Joseph K", phone: "+91 80808 50505", email: "joseph@retank.in", address: "SP Road", city: "Secunderabad", type: "automotive", notes: "Workshop + showroom CCTV" },
      { name: "Sai Datta Constructions", contactPerson: "Datta Reddy", phone: "+91 70707 60606", email: "datta@sdcons.in", address: "Kondapur", city: "Hyderabad", type: "construction", notes: "3 active sites + main office" },
      { name: "Padmavathi Jewellers", contactPerson: "Ramesh Babu", phone: "+91 90000 70707", email: "padma@jewels.in", address: "Charminar Road", city: "Hyderabad", type: "retail", notes: "Vault + showroom HD coverage" },
      { name: "Neredmet Police Station", contactPerson: "Inspector Rao", phone: "+91 90000 80808", email: "neredmet.ps@tspolice.gov.in", address: "Neredmet X Road", city: "Secunderabad", type: "government", notes: "Govt tender, ANPR cameras" },
    ])
    .returning();

  console.log("Seeding assets...");
  await db.insert(assetsTable).values([
    { sku: "CCTV-DH-4MP-01", name: "Dahua 4MP Bullet Camera", category: "CCTV Camera", brand: "Dahua", model: "IPC-HFW2431S-S-S2", unitPrice: "4500", quantityInStock: 42, reorderLevel: 10, warrantyMonths: 24, description: "Outdoor IR bullet, IP67, PoE" },
    { sku: "CCTV-HK-2MP-01", name: "Hikvision 2MP Dome Camera", category: "CCTV Camera", brand: "Hikvision", model: "DS-2CD1123G0E-I", unitPrice: "3200", quantityInStock: 8, reorderLevel: 15, warrantyMonths: 24, description: "Indoor dome, fixed lens" },
    { sku: "CCTV-CP-5MP-01", name: "CP Plus 5MP PTZ Camera", category: "CCTV Camera", brand: "CP Plus", model: "CP-UNP-5025L4-V3", unitPrice: "12500", quantityInStock: 6, reorderLevel: 3, warrantyMonths: 24, description: "25x optical zoom PTZ" },
    { sku: "NVR-HK-16CH-01", name: "Hikvision 16-Channel NVR", category: "NVR / DVR", brand: "Hikvision", model: "DS-7616NI-Q2", unitPrice: "18500", quantityInStock: 12, reorderLevel: 5, warrantyMonths: 36, description: "16ch, 8MP recording, 2 SATA" },
    { sku: "DVR-DH-8CH-01", name: "Dahua 8-Channel HDCVI DVR", category: "NVR / DVR", brand: "Dahua", model: "DH-XVR4108HS", unitPrice: "8900", quantityInStock: 14, reorderLevel: 5, warrantyMonths: 24, description: "8ch HDCVI/AHD/CVBS/IP" },
    { sku: "BIO-ESSL-X990", name: "eSSL X990 Biometric Reader", category: "Biometric", brand: "eSSL", model: "X990", unitPrice: "9800", quantityInStock: 20, reorderLevel: 6, warrantyMonths: 12, description: "Fingerprint + RFID, TCP/IP" },
    { sku: "BIO-MAT-MFS100", name: "Mantra MFS100 USB Scanner", category: "Biometric", brand: "Mantra", model: "MFS100", unitPrice: "2800", quantityInStock: 3, reorderLevel: 8, warrantyMonths: 12, description: "STQC certified fingerprint scanner" },
    { sku: "BIO-RD-FACEAI", name: "Realtime FaceAI Terminal", category: "Biometric", brand: "Realtime", model: "T501F", unitPrice: "16500", quantityInStock: 7, reorderLevel: 3, warrantyMonths: 12, description: "Face + fingerprint + temperature" },
    { sku: "RFT-30M-GAL", name: "30m Galvanized RF Tower", category: "RF Tower", brand: "SRT", model: "GT-30", unitPrice: "185000", quantityInStock: 4, reorderLevel: 2, warrantyMonths: 60, description: "Hot-dip galvanized, 4-leg lattice" },
    { sku: "RFT-15M-MNP", name: "15m Monopole RF Tower", category: "RF Tower", brand: "SRT", model: "MP-15", unitPrice: "95000", quantityInStock: 5, reorderLevel: 2, warrantyMonths: 60, description: "Single pole, rooftop type" },
    { sku: "ACC-HDD-4TB", name: "Seagate Skyhawk 4TB Surveillance HDD", category: "Accessory", brand: "Seagate", model: "ST4000VX016", unitPrice: "8200", quantityInStock: 25, reorderLevel: 10, warrantyMonths: 36, description: "24x7 surveillance grade" },
    { sku: "ACC-CABLE-CAT6-305", name: "CAT6 Cable 305m Box", category: "Accessory", brand: "D-Link", model: "NCB-C6UGRYR-305", unitPrice: "6500", quantityInStock: 18, reorderLevel: 5, warrantyMonths: 12, description: "Outdoor grade UTP, copper" },
    { sku: "ACC-SW-POE-8", name: "8-Port PoE Switch", category: "Accessory", brand: "TP-Link", model: "TL-SG1008P", unitPrice: "5400", quantityInStock: 11, reorderLevel: 4, warrantyMonths: 36, description: "4 PoE+ ports, 64W budget" },
    { sku: "ACC-UPS-2KVA", name: "2 KVA Online UPS", category: "Accessory", brand: "Microtek", model: "JMB+ 2000", unitPrice: "11500", quantityInStock: 6, reorderLevel: 3, warrantyMonths: 24, description: "Pure sinewave, sealed batteries" },
  ]);

  console.log("Seeding employees...");
  const employees = await db
    .insert(employeesTable)
    .values([
      { employeeCode: "SRT-EMP-001", name: "Arjun Sharma", role: "manager", department: "Operations", phone: "+91 99001 11111", email: "arjun@srtech.in", joinDate: dateStr(monthsAgo(36)), status: "active", salary: "85000", address: "Madhapur, Hyderabad" },
      { employeeCode: "SRT-EMP-002", name: "Vikas Reddy", role: "technician", department: "Field Service", phone: "+91 99002 22222", email: "vikas@srtech.in", joinDate: dateStr(monthsAgo(28)), status: "active", salary: "32000", address: "Kukatpally, Hyderabad" },
      { employeeCode: "SRT-EMP-003", name: "Pooja Iyer", role: "support", department: "Customer Support", phone: "+91 99003 33333", email: "pooja@srtech.in", joinDate: dateStr(monthsAgo(18)), status: "active", salary: "28000", address: "Begumpet, Hyderabad" },
      { employeeCode: "SRT-EMP-004", name: "Mohammed Faraz", role: "installer", department: "Field Service", phone: "+91 99004 44444", email: "faraz@srtech.in", joinDate: dateStr(monthsAgo(14)), status: "active", salary: "30000", address: "Tolichowki, Hyderabad" },
      { employeeCode: "SRT-EMP-005", name: "Sneha Patil", role: "sales", department: "Sales", phone: "+91 99005 55555", email: "sneha@srtech.in", joinDate: dateStr(monthsAgo(9)), status: "active", salary: "38000", address: "Banjara Hills, Hyderabad" },
      { employeeCode: "SRT-EMP-006", name: "Karthik Nair", role: "technician", department: "Field Service", phone: "+91 99006 66666", email: "karthik@srtech.in", joinDate: dateStr(monthsAgo(6)), status: "on_leave", salary: "31000", address: "Secunderabad" },
      { employeeCode: "SRT-EMP-007", name: "Deepika Rao", role: "sales", department: "Sales", phone: "+91 99007 77777", email: "deepika@srtech.in", joinDate: dateStr(monthsAgo(11)), status: "active", salary: "40000", address: "Kondapur, Hyderabad" },
      { employeeCode: "SRT-EMP-008", name: "Ravi Teja", role: "technician", department: "Field Service", phone: "+91 99008 88888", email: "raviteja@srtech.in", joinDate: dateStr(monthsAgo(4)), status: "active", salary: "29000", address: "LB Nagar, Hyderabad" },
    ])
    .returning();

  console.log("Seeding installations...");
  await db.insert(installationsTable).values([
    { customerId: customers[0].id, siteName: "Apollo Banjara Hills Flagship", address: "Plot 12, Banjara Hills, Hyderabad", installedDate: dateStr(monthsAgo(8)), status: "active", totalCameras: 12, amcExpiry: dateStr(monthsAgo(-4)), notes: "16ch NVR, 4TB storage" },
    { customerId: customers[1].id, siteName: "BPCL HITEC City RF Tower", address: "HITEC City Main Road, Hyderabad", installedDate: dateStr(monthsAgo(14)), status: "active", totalCameras: 6, amcExpiry: dateStr(monthsAgo(-10)), notes: "30m RF tower with perimeter cameras" },
    { customerId: customers[2].id, siteName: "Greenfield Gachibowli Campus", address: "Gachibowli, Hyderabad", installedDate: dateStr(monthsAgo(5)), status: "active", totalCameras: 24, amcExpiry: dateStr(monthsAgo(-7)), notes: "Biometric attendance + classroom CCTV" },
    { customerId: customers[4].id, siteName: "Lakshmi Textiles Factory", address: "Industrial Area Phase 2, Warangal", installedDate: dateStr(monthsAgo(2)), status: "maintenance", totalCameras: 18, amcExpiry: dateStr(monthsAgo(-10)), notes: "Awaiting NVR firmware upgrade" },
    { customerId: customers[5].id, siteName: "SV Hospital Main Block", address: "Ameerpet, Hyderabad", installedDate: dateStr(monthsAgo(10)), status: "active", totalCameras: 32, amcExpiry: dateStr(monthsAgo(-2)), notes: "Wards + corridors + parking" },
    { customerId: customers[6].id, siteName: "Karachi Bakery Central NVR", address: "Mozamjahi Market, Hyderabad", installedDate: dateStr(monthsAgo(7)), status: "active", totalCameras: 16, amcExpiry: dateStr(monthsAgo(-5)), notes: "All 8 outlets remote viewing" },
    { customerId: customers[7].id, siteName: "GMR Office Park HQ", address: "Shamshabad, Hyderabad", installedDate: dateStr(monthsAgo(20)), status: "active", totalCameras: 48, amcExpiry: dateStr(monthsAgo(-1)), notes: "Face recognition turnstiles" },
    { customerId: customers[10].id, siteName: "Padmavathi Jewellers Vault", address: "Charminar Road, Hyderabad", installedDate: dateStr(monthsAgo(3)), status: "active", totalCameras: 14, amcExpiry: dateStr(monthsAgo(-9)), notes: "Vault + showroom UHD" },
  ]);

  console.log("Seeding tickets...");
  const ticketSeed = [
    { customerId: customers[0].id, assignedToId: employees[1].id, subject: "Camera 4 offline at Banjara store", description: "PoE switch port shows no link. Needs onsite check.", priority: "high", status: "in_progress", category: "hardware", createdAt: daysAgo(1) },
    { customerId: customers[2].id, assignedToId: employees[3].id, subject: "Biometric reader not accepting fingerprint", description: "Reader at staff entrance failing for 3 users.", priority: "medium", status: "open", category: "biometric", createdAt: daysAgo(2) },
    { customerId: customers[1].id, assignedToId: employees[0].id, subject: "RF tower obstruction light replacement", description: "Quarterly maintenance — replace navigation light bulb.", priority: "low", status: "on_hold", category: "maintenance", createdAt: daysAgo(4) },
    { customerId: customers[3].id, assignedToId: employees[2].id, subject: "NVR storage 95% full", description: "Need to upgrade HDD or change retention policy.", priority: "medium", status: "resolved", category: "storage", createdAt: daysAgo(7) },
    { customerId: customers[4].id, assignedToId: employees[1].id, subject: "Factory floor camera angle adjustment", description: "Cameras 7 and 8 need re-aiming after machine layout change.", priority: "low", status: "resolved", category: "installation", createdAt: daysAgo(12) },
    { customerId: customers[0].id, assignedToId: employees[3].id, subject: "AMC renewal site survey", description: "Customer requested fresh quote for next year AMC.", priority: "medium", status: "closed", category: "amc", createdAt: daysAgo(20) },
    { customerId: customers[5].id, assignedToId: employees[7].id, subject: "ICU camera image flickering", description: "Camera in ICU-3 showing horizontal lines intermittently.", priority: "urgent", status: "in_progress", category: "hardware", createdAt: daysAgo(0) },
    { customerId: customers[6].id, assignedToId: null, subject: "New outlet camera installation", description: "Customer adding a new outlet at Kondapur, needs 4 cameras.", priority: "medium", status: "open", category: "installation", createdAt: daysAgo(0) },
    { customerId: customers[7].id, assignedToId: employees[1].id, subject: "Face recognition false rejects", description: "Multiple employees rejected at gate during morning peak.", priority: "high", status: "in_progress", category: "biometric", createdAt: daysAgo(3) },
    { customerId: customers[8].id, assignedToId: employees[3].id, subject: "Workshop DVR not booting", description: "Power on, no display. Likely HDD failure.", priority: "high", status: "open", category: "hardware", createdAt: daysAgo(1) },
    { customerId: customers[10].id, assignedToId: employees[5].id, subject: "Vault camera footage retention", description: "Customer wants 90-day retention instead of 30-day.", priority: "low", status: "on_hold", category: "storage", createdAt: daysAgo(5) },
    { customerId: customers[11].id, assignedToId: employees[0].id, subject: "ANPR camera commissioning", description: "Configure number plate recognition rules for entry/exit.", priority: "medium", status: "in_progress", category: "installation", createdAt: daysAgo(2) },
    { customerId: customers[2].id, assignedToId: employees[2].id, subject: "Attendance report not generating", description: "Monthly report missing for 2 employees. Software issue.", priority: "medium", status: "resolved", category: "biometric", createdAt: daysAgo(9) },
    { customerId: customers[5].id, assignedToId: employees[7].id, subject: "Parking camera blurry at night", description: "IR cut filter possibly stuck. Needs lens cleaning + check.", priority: "low", status: "closed", category: "hardware", createdAt: daysAgo(28) },
  ];

  const ticketIds: number[] = [];
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
    ticketIds.push(inserted.id);
  }

  console.log("Seeding ticket followups...");
  const ticketFollowups = [
    { ticketIdx: 0, action: "assigned", note: "Assigned to Vikas Reddy for site visit.", emp: 0, daysAgo: 1 },
    { ticketIdx: 0, action: "called_customer", note: "Confirmed appointment for tomorrow 10 AM.", emp: 1, daysAgo: 0 },
    { ticketIdx: 0, action: "site_visit", note: "Reached site, found PoE switch port damaged. Need replacement port.", emp: 1, daysAgo: 0 },
    { ticketIdx: 1, action: "assigned", note: "Assigned to Faraz to inspect biometric reader.", emp: 0, daysAgo: 2 },
    { ticketIdx: 1, action: "called_customer", note: "Asked customer to share affected user IDs. Waiting reply.", emp: 3, daysAgo: 1 },
    { ticketIdx: 2, action: "on_hold", note: "Waiting for navigation light bulb stock. ETA 3 days.", emp: 0, daysAgo: 3 },
    { ticketIdx: 3, action: "site_visit", note: "Cleaned up old footage, retention policy reduced to 30 days.", emp: 2, daysAgo: 7 },
    { ticketIdx: 3, action: "resolved", note: "Storage now at 45%. Customer informed.", emp: 2, daysAgo: 6 },
    { ticketIdx: 4, action: "site_visit", note: "Re-aimed cameras 7 and 8, shared new live view with customer.", emp: 1, daysAgo: 11 },
    { ticketIdx: 4, action: "resolved", note: "Customer approved angles. Marked resolved.", emp: 1, daysAgo: 11 },
    { ticketIdx: 6, action: "assigned", note: "Urgent — ICU camera flickering. Ravi Teja attending.", emp: 0, daysAgo: 0 },
    { ticketIdx: 6, action: "site_visit", note: "Power adapter found faulty. Swapped from spares. Monitoring.", emp: 7, daysAgo: 0 },
    { ticketIdx: 8, action: "site_visit", note: "Adjusted face recognition threshold from 0.7 to 0.65.", emp: 1, daysAgo: 2 },
    { ticketIdx: 8, action: "in_progress", note: "Re-enrolling 6 employees with better lighting.", emp: 1, daysAgo: 1 },
    { ticketIdx: 9, action: "assigned", note: "Assigned to Faraz, carrying spare HDD.", emp: 0, daysAgo: 1 },
    { ticketIdx: 11, action: "site_visit", note: "ANPR rules drafted. Pending customer approval for whitelist.", emp: 0, daysAgo: 1 },
    { ticketIdx: 12, action: "resolved", note: "Reset DB index, regenerated past month report. Sent to HR.", emp: 2, daysAgo: 8 },
  ];

  for (const f of ticketFollowups) {
    await db.insert(followupsTable).values({
      entityType: "ticket",
      entityId: ticketIds[f.ticketIdx],
      action: f.action,
      note: f.note,
      byEmployeeId: employees[f.emp].id,
      createdAt: daysAgo(f.daysAgo),
    });
  }

  console.log("Seeding leads...");
  const leadSeed = [
    { name: "Reliance Smart Bazaar", contactPerson: "Naveen Goyal", phone: "+91 90111 22233", email: "naveen.g@reliance.in", city: "Hyderabad", source: "referral", requirement: "30 cameras + 2 NVRs across 3 stores", estimatedValue: 280000, status: "qualified", assignedToId: employees[4].id, nextFollowUpDate: 2, notes: "Got referral from BPCL contact." },
    { name: "Bhanu Constructions", contactPerson: "Bhanu Prasad", phone: "+91 90111 33344", email: "bhanu@bhanucons.in", city: "Vijayawada", source: "website", requirement: "Site office + 2 project sites monitoring", estimatedValue: 145000, status: "proposal", assignedToId: employees[6].id, nextFollowUpDate: 1, notes: "Quote sent. Awaiting feedback." },
    { name: "Hyderabad Public School", contactPerson: "Dr. Saritha", phone: "+91 90111 44455", email: "saritha@hps.edu.in", city: "Hyderabad", source: "cold_call", requirement: "Biometric attendance + 60 classrooms CCTV", estimatedValue: 720000, status: "negotiation", assignedToId: employees[4].id, nextFollowUpDate: 0, notes: "Price negotiation ongoing." },
    { name: "Lulu Mall Hyderabad", contactPerson: "Anjali Krishnan", phone: "+91 90111 55566", email: "anjali@lulu.in", city: "Hyderabad", source: "tender", requirement: "Tender for retail floor cameras", estimatedValue: 1850000, status: "new", assignedToId: employees[6].id, nextFollowUpDate: 5, notes: "Tender doc downloaded, drafting bid." },
    { name: "Sandeep Garments", contactPerson: "Sandeep Jain", phone: "+91 90111 66677", email: "sandeep@sandeepgar.com", city: "Hyderabad", source: "walk_in", requirement: "Showroom CCTV + biometric for 12 staff", estimatedValue: 95000, status: "contacted", assignedToId: employees[4].id, nextFollowUpDate: 3, notes: "Walked in to office, interested." },
    { name: "Kaveri Logistics Warehouse", contactPerson: "Murali K", phone: "+91 90111 77788", email: "murali@kaverilog.in", city: "Hyderabad", source: "referral", requirement: "Warehouse perimeter + dock area CCTV", estimatedValue: 425000, status: "won", assignedToId: employees[6].id, nextFollowUpDate: null, notes: "Converted! PO received yesterday." },
    { name: "Trend Garments", contactPerson: "Praveen R", phone: "+91 90111 88899", email: "praveen@trendg.in", city: "Karimnagar", source: "website", requirement: "Single store, 4 cameras + DVR", estimatedValue: 38000, status: "lost", assignedToId: employees[4].id, nextFollowUpDate: null, notes: "Went with local cheaper vendor." },
    { name: "St. Anthony Church", contactPerson: "Father Jacob", phone: "+91 90111 99900", email: "office@stanthony.org", city: "Secunderabad", source: "referral", requirement: "Church premises + parking CCTV", estimatedValue: 65000, status: "qualified", assignedToId: employees[4].id, nextFollowUpDate: 4, notes: "Budget approved by trustees." },
    { name: "Ananya IT Park", contactPerson: "Vamsi Krishna", phone: "+91 90112 00011", email: "vamsi@ananyait.in", city: "Hyderabad", source: "cold_call", requirement: "Office park common area cameras", estimatedValue: 215000, status: "contacted", assignedToId: employees[6].id, nextFollowUpDate: 2, notes: "Site visit scheduled next week." },
    { name: "Devi Diagnostics", contactPerson: "Dr. Shilpa", phone: "+91 90112 11122", email: "shilpa@devidiag.in", city: "Hyderabad", source: "website", requirement: "Reception + sample area + 1 biometric", estimatedValue: 58000, status: "new", assignedToId: employees[4].id, nextFollowUpDate: 6, notes: "Web inquiry received." },
    { name: "Manish Steel Traders", contactPerson: "Manish Agarwal", phone: "+91 90112 22233", email: "manish@msteel.in", city: "Hyderabad", source: "walk_in", requirement: "Yard + office cameras", estimatedValue: 78000, status: "proposal", assignedToId: employees[6].id, nextFollowUpDate: 1, notes: "Quote v2 sent yesterday." },
  ];

  const leadIds: number[] = [];
  for (const l of leadSeed) {
    const [inserted] = await db
      .insert(leadsTable)
      .values({
        leadNumber: "TEMP",
        name: l.name,
        contactPerson: l.contactPerson,
        phone: l.phone,
        email: l.email,
        city: l.city,
        source: l.source,
        requirement: l.requirement,
        estimatedValue: String(l.estimatedValue),
        status: l.status,
        assignedToId: l.assignedToId,
        nextFollowUpDate: l.nextFollowUpDate != null ? dateStr(daysAgo(-l.nextFollowUpDate)) : null,
        notes: l.notes,
      })
      .returning();
    const year = new Date().getUTCFullYear();
    await db
      .update(leadsTable)
      .set({ leadNumber: `LEAD-${year}-${pad(inserted.id)}` })
      .where(sql`${leadsTable.id} = ${inserted.id}`);
    leadIds.push(inserted.id);
  }

  console.log("Seeding lead followups...");
  const leadFollowups = [
    { idx: 0, action: "called", note: "Spoke to Naveen, scheduled site survey.", emp: 4, daysAgo: 4 },
    { idx: 0, action: "site_visit", note: "Surveyed all 3 stores. Quote prep started.", emp: 4, daysAgo: 2 },
    { idx: 1, action: "quote_sent", note: "Sent quote of ₹1.45L. Awaiting reply.", emp: 6, daysAgo: 3 },
    { idx: 2, action: "called", note: "Customer asked for 5% discount.", emp: 4, daysAgo: 1 },
    { idx: 2, action: "negotiation", note: "Offered 3% + 6 months extra warranty.", emp: 4, daysAgo: 0 },
    { idx: 3, action: "received_inquiry", note: "Tender document downloaded from Lulu portal.", emp: 6, daysAgo: 1 },
    { idx: 4, action: "walk_in", note: "Customer walked into office, asked for catalogue.", emp: 4, daysAgo: 2 },
    { idx: 5, action: "site_visit", note: "Initial site survey completed.", emp: 6, daysAgo: 14 },
    { idx: 5, action: "quote_sent", note: "Quote ₹4.25L sent.", emp: 6, daysAgo: 10 },
    { idx: 5, action: "won", note: "PO received! Converting to customer.", emp: 6, daysAgo: 1 },
    { idx: 6, action: "lost", note: "Customer chose local vendor at lower price.", emp: 4, daysAgo: 8 },
    { idx: 7, action: "called", note: "Trustees approved budget. Will share PO soon.", emp: 4, daysAgo: 1 },
    { idx: 8, action: "called", note: "Spoke to facility manager, scheduling visit.", emp: 6, daysAgo: 2 },
    { idx: 10, action: "quote_sent", note: "Revised quote v2 with discount sent.", emp: 6, daysAgo: 1 },
  ];
  for (const f of leadFollowups) {
    await db.insert(followupsTable).values({
      entityType: "lead",
      entityId: leadIds[f.idx],
      action: f.action,
      note: f.note,
      byEmployeeId: employees[f.emp].id,
      createdAt: daysAgo(f.daysAgo),
    });
  }

  console.log("Seeding invoices...");
  const invoiceSeed: Array<{ customerId: number; issueDate: Date; dueDate: Date; status: string; items: InvoiceItem[]; notes: string }> = [
    { customerId: customers[0].id, issueDate: monthsAgo(7), dueDate: monthsAgo(6), status: "paid", items: [{ description: "Dahua 4MP Bullet Camera", quantity: 12, unitPrice: 4500, amount: 54000 }, { description: "Hikvision 16ch NVR", quantity: 1, unitPrice: 18500, amount: 18500 }, { description: "Installation & wiring", quantity: 1, unitPrice: 22000, amount: 22000 }], notes: "Apollo Banjara Hills installation" },
    { customerId: customers[1].id, issueDate: monthsAgo(13), dueDate: monthsAgo(12), status: "paid", items: [{ description: "30m Galvanized RF Tower", quantity: 1, unitPrice: 185000, amount: 185000 }, { description: "Tower erection labour", quantity: 1, unitPrice: 65000, amount: 65000 }], notes: "BPCL HITEC City RF tower" },
    { customerId: customers[2].id, issueDate: monthsAgo(4), dueDate: monthsAgo(3), status: "paid", items: [{ description: "Hikvision Dome Cameras", quantity: 24, unitPrice: 3200, amount: 76800 }, { description: "eSSL X990 Biometric Reader", quantity: 4, unitPrice: 9800, amount: 39200 }, { description: "Installation & configuration", quantity: 1, unitPrice: 35000, amount: 35000 }], notes: "Greenfield campus rollout" },
    { customerId: customers[4].id, issueDate: daysAgo(20), dueDate: daysAgo(-10), status: "sent", items: [{ description: "Dahua 4MP Bullet Camera", quantity: 18, unitPrice: 4500, amount: 81000 }, { description: "Seagate 4TB Surveillance HDD", quantity: 2, unitPrice: 8200, amount: 16400 }, { description: "Onsite installation", quantity: 1, unitPrice: 28000, amount: 28000 }], notes: "Lakshmi Textiles factory upgrade" },
    { customerId: customers[3].id, issueDate: daysAgo(45), dueDate: daysAgo(15), status: "overdue", items: [{ description: "AMC — annual maintenance", quantity: 1, unitPrice: 24000, amount: 24000 }], notes: "Sai Krishna Residency AMC FY26" },
    { customerId: customers[0].id, issueDate: daysAgo(2), dueDate: daysAgo(-28), status: "draft", items: [{ description: "Mantra MFS100 USB Scanner", quantity: 6, unitPrice: 2800, amount: 16800 }], notes: "Apollo new branch biometric add-on" },
    { customerId: customers[5].id, issueDate: monthsAgo(9), dueDate: monthsAgo(8), status: "paid", items: [{ description: "Dahua 4MP Camera", quantity: 32, unitPrice: 4500, amount: 144000 }, { description: "Hikvision 16ch NVR x2", quantity: 2, unitPrice: 18500, amount: 37000 }, { description: "Installation", quantity: 1, unitPrice: 45000, amount: 45000 }], notes: "SV Hospital main block install" },
    { customerId: customers[6].id, issueDate: daysAgo(60), dueDate: daysAgo(30), status: "paid", items: [{ description: "Hikvision Dome", quantity: 16, unitPrice: 3200, amount: 51200 }, { description: "Central NVR setup", quantity: 1, unitPrice: 22000, amount: 22000 }], notes: "Karachi Bakery rollout" },
    { customerId: customers[7].id, issueDate: monthsAgo(2), dueDate: monthsAgo(1), status: "paid", items: [{ description: "Realtime FaceAI Terminal", quantity: 6, unitPrice: 16500, amount: 99000 }, { description: "Integration with HRMS", quantity: 1, unitPrice: 18000, amount: 18000 }], notes: "GMR turnstiles" },
    { customerId: customers[10].id, issueDate: daysAgo(5), dueDate: daysAgo(-25), status: "sent", items: [{ description: "Dahua 4MP Bullet", quantity: 14, unitPrice: 4500, amount: 63000 }, { description: "Vault grade installation", quantity: 1, unitPrice: 38000, amount: 38000 }], notes: "Padmavathi vault & showroom" },
    { customerId: customers[11].id, issueDate: daysAgo(10), dueDate: daysAgo(-20), status: "sent", items: [{ description: "ANPR Camera (CP Plus 5MP)", quantity: 2, unitPrice: 12500, amount: 25000 }, { description: "ANPR software license", quantity: 1, unitPrice: 45000, amount: 45000 }], notes: "Neredmet PS commissioning" },
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
    { employeeId: employees[6].id, date: today, checkIn: "09:15", checkOut: null, status: "present" },
    { employeeId: employees[7].id, date: today, checkIn: "08:55", checkOut: null, status: "present" },
  ]);

  console.log("Seeding past attendance for last 14 days...");
  for (let i = 1; i <= 14; i++) {
    const d = dateStr(daysAgo(i));
    for (const emp of employees) {
      const r = (i + emp.id) % 7;
      const status = r === 0 ? "absent" : r === 1 ? "late" : r === 6 ? "half_day" : "present";
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
