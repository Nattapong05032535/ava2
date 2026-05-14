"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeDollarSign,
  BarChart3,
  ClipboardList,
  Lock,
  Save,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout";
import { useAuth } from "@/contexts/auth-context";
import {
  BACK_OFFICE_DASHBOARD_VIEW_DATA,
  canAccessBackOffice,
  type SalePriceAssignmentRow,
} from "@/constants/user";

const currencyFormatter = new Intl.NumberFormat("th-TH");

function formatCurrency(value: number): string {
  return `฿${currencyFormatter.format(value)}`;
}

export default function AdminDashboardPage() {
  const { currentUser, isLoggedIn } = useAuth();
  const [assignmentRows, setAssignmentRows] = useState<SalePriceAssignmentRow[]>(
    BACK_OFFICE_DASHBOARD_VIEW_DATA.priceAssignmentRows
  );

  const { salesUsers, reportRows: reports, totals } = useMemo(
    () => BACK_OFFICE_DASHBOARD_VIEW_DATA,
    []
  );

  const updateAssignmentPrice = (assignmentId: string, nextPrice: number) => {
    setAssignmentRows((current) =>
      current.map((assignment) =>
        assignment.id === assignmentId
          ? { ...assignment, salePrice: Math.max(0, nextPrice) }
          : assignment
      )
    );
  };

  const canViewDashboard =
    isLoggedIn && canAccessBackOffice(currentUser?.role);

  if (!canViewDashboard) {
    return (
      <div className="min-h-screen bg-[#f6f7f9]">
        <Navbar />
        <main className="flex min-h-screen items-center justify-center px-6 pt-20">
          <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-700">
              <Lock className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-[#1d1d1f]">
              สำหรับผู้ดูแลระบบ
            </h1>
            <p className="mb-6 text-sm leading-6 text-[#6e6e73]">
              กรุณาเข้าสู่ระบบด้วยบัญชี manager หรือ admin เพื่อเข้าใช้งานหลังบ้าน
            </p>
            <Link
              href="/login?redirect=/admin"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed]"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f7f9]">
      <Navbar />
      <main className="px-4 pb-16 pt-24 sm:px-6 lg:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-[#4b5563]">
                <ShieldCheck className="h-4 w-4 text-[#0071e3]" strokeWidth={1.8} />
                {currentUser?.roleLabel}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl">
                Sales Control Dashboard
              </h1>
              <p className="mt-2 text-sm text-[#6e6e73]">
                กำหนดราคาขายให้พนักงานขาย และติดตามภาพรวมยอดขายรายบุคคล
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800">
              <Save className="h-4 w-4" strokeWidth={1.8} />
              บันทึกการตั้งราคา
            </button>
          </div>

          <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={Users} label="พนักงานขาย" value={`${salesUsers.length} คน`} />
            <StatCard icon={ClipboardList} label="คำสั่งซื้อรวม" value={`${totals.orders} รายการ`} />
            <StatCard icon={BarChart3} label="จำนวนขายรวม" value={`${totals.unitsSold} เครื่อง`} />
            <StatCard icon={BadgeDollarSign} label="ยอดขายรวม" value={formatCurrency(totals.revenue)} />
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1.25fr]">
            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#1d1d1f]">
                  รายงานยอดขาย Sale
                </h2>
                <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-xs font-semibold text-[#6e6e73]">
                  Mock report
                </span>
              </div>

              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.saleUserId} className="rounded-2xl border border-gray-100 p-4">
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#1d1d1f]">{report.saleName}</p>
                        <p className="mt-1 text-xs text-[#6e6e73]">
                          {report.orders} ออเดอร์ · {report.unitsSold} เครื่อง
                        </p>
                      </div>
                      <p className="text-right text-sm font-semibold text-[#1d1d1f]">
                        {formatCurrency(report.revenue)}
                      </p>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#0071e3]"
                        style={{ width: `${report.progress}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-[#6e6e73]">
                      <span>เป้าหมาย {formatCurrency(report.target)}</span>
                      <span>{report.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-[#1d1d1f]">
                  กำหนดราคาขายราย Sale
                </h2>
                <p className="mt-1 text-sm text-[#6e6e73]">
                  ราคาในตารางนี้เป็นราคาที่อนุญาตให้ sale ใช้ขายแต่ละรุ่น
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs font-semibold uppercase tracking-wide text-[#6e6e73]">
                      <th className="px-3 py-3">Sale</th>
                      <th className="px-3 py-3">รุ่น</th>
                      <th className="px-3 py-3">ความจุ</th>
                      <th className="px-3 py-3 text-right">ราคาขาย</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {assignmentRows.map((assignment) => (
                      <tr key={assignment.id}>
                        <td className="px-3 py-4 text-sm font-medium text-[#1d1d1f]">
                          {assignment.saleName}
                        </td>
                        <td className="px-3 py-4 text-sm text-[#374151]">
                          {assignment.productName}
                        </td>
                        <td className="px-3 py-4 text-sm text-[#6e6e73]">
                          {assignment.storage}
                        </td>
                        <td className="px-3 py-4">
                          <div className="ml-auto flex w-36 items-center rounded-xl border border-gray-200 bg-[#fbfbfd] px-3 py-2 focus-within:border-[#0071e3]">
                            <span className="text-sm text-[#6e6e73]">฿</span>
                            <input
                              type="number"
                              min={0}
                              value={assignment.salePrice}
                              onChange={(event) =>
                                updateAssignmentPrice(
                                  assignment.id,
                                  Number(event.target.value)
                                )
                              }
                              className="w-full bg-transparent text-right text-sm font-semibold text-[#1d1d1f] outline-none"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

type StatCardProps = {
  icon: typeof Users;
  label: string;
  value: string;
};

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5f5f7] text-[#1d1d1f]">
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <p className="text-sm text-[#6e6e73]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#1d1d1f]">{value}</p>
    </div>
  );
}
