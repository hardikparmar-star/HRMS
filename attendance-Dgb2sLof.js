import { W as jsxRuntimeExports } from "./server-CRHjjnr4.js";
import { A as AppShell, L as LogOut } from "./AppShell-DGymYcXL.js";
import { u as useQuery } from "./useQuery-CLRXpZSF.js";
import { a as useQueryClient, u as useAuth, t as toast, s as supabase } from "./router-DKrS3J_0.js";
import { B as Button } from "./button-D2gbqy69.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DhV65VZj.js";
import { c as createLucideIcon, C as Clock } from "./users-BlVlNvSK.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode);
function AttendancePage() {
  const qc = useQueryClient();
  const {
    user,
    role
  } = useAuth();
  const {
    data: myEmployee
  } = useQuery({
    queryKey: ["my-employee", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("employees").select("*").eq("user_id", user.id).maybeSingle();
      return data;
    }
  });
  const {
    data: records = []
  } = useQuery({
    queryKey: ["attendance", role, myEmployee?.id],
    queryFn: async () => {
      let q = supabase.from("attendance").select("*, employees(full_name, employee_code)").order("date", {
        ascending: false
      }).limit(50);
      if (role !== "admin" && myEmployee) q = q.eq("employee_id", myEmployee.id);
      const {
        data,
        error
      } = await q;
      if (error) throw error;
      return data;
    }
  });
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const todayRecord = records.find((r) => r.date === today && r.employee_id === myEmployee?.id);
  const checkIn = async () => {
    if (!myEmployee) return toast.error("No employee profile linked. Ask admin.");
    const {
      error
    } = await supabase.from("attendance").insert({
      employee_id: myEmployee.id,
      date: today,
      check_in: (/* @__PURE__ */ new Date()).toISOString(),
      status: "present"
    });
    if (error) return toast.error(error.message);
    toast.success("Checked in");
    qc.invalidateQueries({
      queryKey: ["attendance"]
    });
  };
  const checkOut = async () => {
    if (!todayRecord) return;
    const start = new Date(todayRecord.check_in);
    const hours = Math.max(0, (Date.now() - start.getTime()) / 36e5);
    const {
      error
    } = await supabase.from("attendance").update({
      check_out: (/* @__PURE__ */ new Date()).toISOString(),
      hours_worked: Number(hours.toFixed(2))
    }).eq("id", todayRecord.id);
    if (error) return toast.error(error.message);
    toast.success("Checked out");
    qc.invalidateQueries({
      queryKey: ["attendance"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Attendance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Daily check-in tracking" })
      ] }),
      myEmployee && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        !todayRecord?.check_in && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: checkIn, className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "size-4" }),
          " Check in"
        ] }),
        todayRecord?.check_in && !todayRecord.check_out && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: checkOut, variant: "outline", className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
          " Check out"
        ] }),
        todayRecord?.check_out && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5 text-sm text-success", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
          " Done for today"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Date" }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Employee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Check in" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Check out" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Hours" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        records.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.date }),
          role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.employees?.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.check_in ? new Date(r.check_in).toLocaleTimeString() : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.check_out ? new Date(r.check_out).toLocaleTimeString() : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.hours_worked ?? 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-success/10 px-2 py-0.5 text-xs text-success capitalize", children: r.status }) })
        ] }, r.id)),
        records.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: role === "admin" ? 6 : 5, className: "py-12 text-center text-muted-foreground", children: "No records yet." }) })
      ] })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AttendancePage, {}) });
export {
  SplitComponent as component
};
