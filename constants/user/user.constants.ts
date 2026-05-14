export type UserRole = "user" | "sale" | "admin" | "manager";

export interface MockUser {
  id: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  role: UserRole;
  roleLabel: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "111",
    password: "111",
    fullName: "สมชาย ใจดี",
    email: "somchai@ava.com",
    phone: "081-234-5678",
    address: "123/45 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    role: "user",
    roleLabel: "ลูกค้าทั่วไป",
  },
  {
    id: "222",
    password: "222",
    fullName: "วิภา สร้างสรรค์",
    email: "wipa.sale@ava.com",
    phone: "089-876-5432",
    address: "88/9 ถ.รัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400",
    role: "sale",
    roleLabel: "พนักงานขาย",
  },
  {
    id: "333",
    password: "333",
    fullName: "ณัฐพงษ์ ระบบดี",
    email: "nattapong.admin@ava.com",
    phone: "062-111-2233",
    address: "55/12 ถ.พหลโยธิน แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900",
    role: "admin",
    roleLabel: "ผู้ดูแลระบบ",
  },
  {
    id: "444",
    password: "444",
    fullName: "ปิยะ บริหารเก่ง",
    email: "piya.manager@ava.com",
    phone: "095-999-8877",
    address: "200/1 ถ.สีลม แขวงสีลม เขตบางรัก กรุงเทพฯ 10500",
    role: "manager",
    roleLabel: "ผู้บริหาร",
  },
];

export function canAccessBackOffice(role?: UserRole): boolean {
  return role === "admin" || role === "manager";
}
