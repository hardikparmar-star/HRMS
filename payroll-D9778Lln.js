import { W as jsxRuntimeExports, r as reactExports } from "./server-CRHjjnr4.js";
import { A as AppShell } from "./AppShell-DGymYcXL.js";
import { u as useQuery } from "./useQuery-CLRXpZSF.js";
import { a as useQueryClient, s as supabase, t as toast } from "./router-DKrS3J_0.js";
import { B as Button } from "./button-D2gbqy69.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-D5N8kwIb.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DhV65VZj.js";
import { F as FileDown, g as generatePayslipPDF } from "./payslip-C-0eImt5.js";
import { c as createLucideIcon } from "./users-BlVlNvSK.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-C4ow91QL.js";
import "./Combination-CYhu9sjl.js";
import "./index-DAsJMwEV.js";
const __iconNode$1 = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function PayrollPage() {
  const qc = useQueryClient();
  const now = /* @__PURE__ */ new Date();
  const [month, setMonth] = reactExports.useState(now.getMonth() + 1);
  const [year, setYear] = reactExports.useState(now.getFullYear());
  const {
    data: runs = []
  } = useQuery({
    queryKey: ["payroll-runs"],
    queryFn: async () => (await supabase.from("payroll_runs").select("*").order("period_year", {
      ascending: false
    }).order("period_month", {
      ascending: false
    })).data ?? []
  });
  const processPayroll = async () => {
    const {
      data: employees
    } = await supabase.from("employees").select("*").eq("status", "active");
    if (!employees || employees.length === 0) return toast.error("No active employees");
    const {
      data: run,
      error: runErr
    } = await supabase.from("payroll_runs").upsert({
      period_month: month,
      period_year: year,
      status: "processed",
      processed_at: (/* @__PURE__ */ new Date()).toISOString()
    }, {
      onConflict: "period_month,period_year"
    }).select().single();
    if (runErr || !run) return toast.error(runErr?.message ?? "Failed");
    const monthStart = `${year}-${String(month).padStart(2, "0")}-01`;
    const monthEnd = new Date(year, month, 0).toISOString().slice(0, 10);
    const {
      data: leaves
    } = await supabase.from("leaves").select("employee_id, days").eq("status", "approved").gte("start_date", monthStart).lte("end_date", monthEnd);
    const leaveMap = {};
    (leaves ?? []).forEach((l) => {
      leaveMap[l.employee_id] = (leaveMap[l.employee_id] ?? 0) + Number(l.days);
    });
    const workingDays = 30;
    const slips = employees.map((e) => {
      const leaveDays = Math.min(workingDays, leaveMap[e.id] ?? 0);
      const paidDays = workingDays - leaveDays;
      const factor = paidDays / workingDays;
      const basic = Number(e.basic_salary) * factor;
      const hra = Number(e.hra) * factor;
      const conveyance = Number(e.conveyance) * factor;
      const medical = Number(e.medical) * factor;
      const special = Number(e.special_allowance) * factor;
      const bonus = 0;
      const gross = basic + hra + conveyance + medical + special + bonus;
      const pf = Math.min(basic * 0.12, 1800);
      const esic = gross < 21e3 ? gross * 75e-4 : 0;
      const pt = gross > 15e3 ? 200 : 0;
      const tds = gross > 5e4 ? gross * 0.05 : 0;
      const leaveDeduction = Number(e.basic_salary) / workingDays * leaveDays * 0;
      const totalDed = pf + esic + pt + tds + leaveDeduction;
      return {
        payroll_run_id: run.id,
        employee_id: e.id,
        working_days: workingDays,
        paid_days: paidDays,
        basic,
        hra,
        conveyance,
        medical,
        special_allowance: special,
        bonus,
        pf,
        esic,
        pt,
        tds,
        leave_deduction: leaveDeduction,
        gross,
        total_deductions: totalDed,
        net_pay: gross - totalDed
      };
    });
    const {
      error: insErr
    } = await supabase.from("payslips").upsert(slips, {
      onConflict: "payroll_run_id,employee_id"
    });
    if (insErr) return toast.error(insErr.message);
    const totalNet = slips.reduce((s, p) => s + p.net_pay, 0);
    await supabase.from("payroll_runs").update({
      total_net: totalNet
    }).eq("id", run.id);
    toast.success(`Processed ${slips.length} payslips`);
    qc.invalidateQueries({
      queryKey: ["payroll-runs"]
    });
  };
  const lockRun = async (id) => {
    await supabase.from("payroll_runs").update({
      status: "locked"
    }).eq("id", id);
    toast.success("Payroll locked");
    qc.invalidateQueries({
      queryKey: ["payroll-runs"]
    });
  };
  const downloadAll = async (runId) => {
    const {
      data
    } = await supabase.from("payslips").select("*, payroll_runs(period_month, period_year), employees(*)").eq("payroll_run_id", runId);
    (data ?? []).forEach((p) => generatePayslipPDF(p));
    toast.success(`Generated ${data?.length ?? 0} slips`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Payroll" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Process monthly payroll and generate payslips." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-5 shadow-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold", children: "Run payroll" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-xs text-muted-foreground", children: "Month" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(month), onValueChange: (v) => setMonth(Number(v)), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: months.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(i + 1), children: m }, m)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-xs text-muted-foreground", children: "Year" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: String(year), onValueChange: (v) => setYear(Number(v)), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: [year - 1, year, year + 1].map((y) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(y), children: y }, y)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: processPayroll, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-4" }),
          " Process payroll"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Period" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Total net" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        runs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-medium", children: [
            months[r.period_month - 1],
            " ",
            r.period_year
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success capitalize", children: r.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right", children: [
            "₹",
            Number(r.total_net).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "space-x-2 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => downloadAll(r.id), className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "size-3.5" }),
              " Slips"
            ] }),
            r.status !== "locked" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", onClick: () => lockRun(r.id), className: "gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-3.5" }),
              " Lock"
            ] })
          ] })
        ] }, r.id)),
        runs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "py-12 text-center text-muted-foreground", children: "No payroll runs yet." }) })
      ] })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PayrollPage, {}) });
export {
  SplitComponent as component
};
