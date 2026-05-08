import { W as jsxRuntimeExports } from "./server-CRHjjnr4.js";
import { A as AppShell } from "./AppShell-DGymYcXL.js";
import { u as useQuery } from "./useQuery-CLRXpZSF.js";
import { u as useAuth, s as supabase } from "./router-DKrS3J_0.js";
import { B as Button } from "./button-D2gbqy69.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DhV65VZj.js";
import { F as FileDown, g as generatePayslipPDF } from "./payslip-C-0eImt5.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./users-BlVlNvSK.js";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function PayslipsPage() {
  const {
    user,
    role
  } = useAuth();
  const {
    data: myEmployee
  } = useQuery({
    queryKey: ["my-employee", user?.id],
    enabled: !!user,
    queryFn: async () => (await supabase.from("employees").select("id").eq("user_id", user.id).maybeSingle()).data
  });
  const {
    data: slips = []
  } = useQuery({
    queryKey: ["payslips", role, myEmployee?.id],
    queryFn: async () => {
      let q = supabase.from("payslips").select("*, payroll_runs(period_month, period_year), employees(*)").order("created_at", {
        ascending: false
      });
      if (role !== "admin" && myEmployee) q = q.eq("employee_id", myEmployee.id);
      const {
        data,
        error
      } = await q;
      if (error) throw error;
      return data;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Salary Slips" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Download monthly payslips as PDF." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Period" }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Employee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Gross" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Deductions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Net pay" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        slips.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "font-medium", children: [
            months[s.payroll_runs.period_month - 1],
            " ",
            s.payroll_runs.period_year
          ] }),
          role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.employees?.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right", children: [
            "₹",
            Number(s.gross).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-destructive", children: [
            "₹",
            Number(s.total_deductions).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right font-semibold", children: [
            "₹",
            Number(s.net_pay).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "gap-2", onClick: () => generatePayslipPDF(s), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, { className: "size-3.5" }),
            " PDF"
          ] }) })
        ] }, s.id)),
        slips.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: role === "admin" ? 6 : 5, className: "py-12 text-center text-muted-foreground", children: "No payslips yet." }) })
      ] })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PayslipsPage, {}) });
export {
  SplitComponent as component
};
