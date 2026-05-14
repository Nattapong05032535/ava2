import type { SupportedProductModelKey } from "@/constants/products";
import { resolveProductPresentationByModelKey } from "@/constants/products";
import { MOCK_USERS } from "./user.constants";

export type SalePriceAssignment = {
  id: string;
  saleUserId: string;
  productId: SupportedProductModelKey;
  storage: string;
  salePrice: number;
};

export type SalePerformanceReport = {
  saleUserId: string;
  orders: number;
  unitsSold: number;
  revenue: number;
  target: number;
};

export type SaleUserOption = {
  id: string;
  fullName: string;
  email: string;
};

export type SalePerformanceReportRow = SalePerformanceReport & {
  saleName: string;
  progress: number;
};

export type SalePriceAssignmentRow = SalePriceAssignment & {
  saleName: string;
  productName: string;
};

export type SaleDashboardTotals = {
  orders: number;
  unitsSold: number;
  revenue: number;
  target: number;
};

export type BackOfficeDashboardData = {
  salesUsers: SaleUserOption[];
  performanceReports: SalePerformanceReport[];
  priceAssignments: SalePriceAssignment[];
};

export type BackOfficeDashboardViewData = {
  salesUsers: SaleUserOption[];
  reportRows: SalePerformanceReportRow[];
  totals: SaleDashboardTotals;
  priceAssignmentRows: SalePriceAssignmentRow[];
};

export const SALE_PRICE_ASSIGNMENTS: SalePriceAssignment[] = [
  {
    id: "assign-222-p89-256",
    saleUserId: "222",
    productId: "promax-p89",
    storage: "256 GB",
    salePrice: 23990,
  },
  {
    id: "assign-222-p89-512",
    saleUserId: "222",
    productId: "promax-p89",
    storage: "512 GB",
    salePrice: 27990,
  },
  {
    id: "assign-222-p63-256",
    saleUserId: "222",
    productId: "promax-p63",
    storage: "256 GB",
    salePrice: 18990,
  },
  {
    id: "assign-222-note-256",
    saleUserId: "222",
    productId: "note-p65",
    storage: "256 GB",
    salePrice: 13990,
  },
  {
    id: "assign-222-tab-256",
    saleUserId: "222",
    productId: "tab-p68",
    storage: "256 GB",
    salePrice: 17990,
  },
];

export const SALE_PERFORMANCE_REPORTS: SalePerformanceReport[] = [
  {
    saleUserId: "222",
    orders: 18,
    unitsSold: 24,
    revenue: 457760,
    target: 520000,
  },
];

export const BACK_OFFICE_DASHBOARD_DATA: BackOfficeDashboardData = {
  salesUsers: MOCK_USERS.filter((user) => user.role === "sale").map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
  })),
  performanceReports: SALE_PERFORMANCE_REPORTS,
  priceAssignments: SALE_PRICE_ASSIGNMENTS,
};

export function getSaleReportRows(
  reports: SalePerformanceReport[] = BACK_OFFICE_DASHBOARD_DATA.performanceReports,
  salesUsers: SaleUserOption[] = BACK_OFFICE_DASHBOARD_DATA.salesUsers
): SalePerformanceReportRow[] {
  return reports.map((report) => {
    const saleUser = salesUsers.find((user) => user.id === report.saleUserId);
    const progress = Math.min(
      100,
      Math.round((report.revenue / report.target) * 100)
    );

    return {
      ...report,
      saleName: saleUser?.fullName || "ไม่พบพนักงานขาย",
      progress,
    };
  });
}

export function getSaleDashboardTotals(
  reports: SalePerformanceReport[] = BACK_OFFICE_DASHBOARD_DATA.performanceReports
): SaleDashboardTotals {
  return reports.reduce(
    (summary, report) => ({
      orders: summary.orders + report.orders,
      unitsSold: summary.unitsSold + report.unitsSold,
      revenue: summary.revenue + report.revenue,
      target: summary.target + report.target,
    }),
    { orders: 0, unitsSold: 0, revenue: 0, target: 0 }
  );
}

export function getSalePriceAssignmentRows(
  assignments: SalePriceAssignment[] = BACK_OFFICE_DASHBOARD_DATA.priceAssignments,
  salesUsers: SaleUserOption[] = BACK_OFFICE_DASHBOARD_DATA.salesUsers
): SalePriceAssignmentRow[] {
  return assignments.map((assignment) => {
    const saleUser = salesUsers.find((user) => user.id === assignment.saleUserId);
    const product = resolveProductPresentationByModelKey(assignment.productId);

    return {
      ...assignment,
      saleName: saleUser?.fullName || "ไม่พบพนักงานขาย",
      productName: product.modelName,
    };
  });
}

export const BACK_OFFICE_DASHBOARD_VIEW_DATA: BackOfficeDashboardViewData = {
  salesUsers: BACK_OFFICE_DASHBOARD_DATA.salesUsers,
  reportRows: getSaleReportRows(),
  totals: getSaleDashboardTotals(),
  priceAssignmentRows: getSalePriceAssignmentRows(),
};
