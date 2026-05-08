import { r as reactExports, W as jsxRuntimeExports } from "./server-CRHjjnr4.js";
import { A as AppShell } from "./AppShell-DGymYcXL.js";
import { u as useQuery } from "./useQuery-CLRXpZSF.js";
import { g as cn, a as useQueryClient, u as useAuth, t as toast, s as supabase } from "./router-DKrS3J_0.js";
import { B as Button } from "./button-D2gbqy69.js";
import { L as Label, I as Input } from "./label-C110OV--.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, C as Check } from "./select-D5N8kwIb.js";
import { D as Dialog, a as DialogTrigger, P as Plus, b as DialogContent, c as DialogHeader, d as DialogTitle, e as DialogFooter, X } from "./dialog-DQOeg1Au.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-DhV65VZj.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./users-BlVlNvSK.js";
import "./index-C4ow91QL.js";
import "./Combination-CYhu9sjl.js";
import "./index-DAsJMwEV.js";
const Textarea = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function LeavesPage() {
  const qc = useQueryClient();
  const {
    user,
    role
  } = useAuth();
  const [open, setOpen] = reactExports.useState(false);
  const {
    data: myEmployee
  } = useQuery({
    queryKey: ["my-employee", user?.id],
    enabled: !!user,
    queryFn: async () => (await supabase.from("employees").select("id, full_name").eq("user_id", user.id).maybeSingle()).data
  });
  const {
    data: leaves = []
  } = useQuery({
    queryKey: ["leaves", role, myEmployee?.id],
    queryFn: async () => {
      let q = supabase.from("leaves").select("*, employees(full_name, employee_code)").order("created_at", {
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
  const submit = async (e) => {
    e.preventDefault();
    if (!myEmployee) return toast.error("No employee profile linked.");
    const fd = new FormData(e.currentTarget);
    const start = String(fd.get("start_date"));
    const end = String(fd.get("end_date"));
    const days = Math.max(1, Math.round((+new Date(end) - +new Date(start)) / 864e5) + 1);
    const {
      error
    } = await supabase.from("leaves").insert({
      employee_id: myEmployee.id,
      leave_type: String(fd.get("leave_type")),
      start_date: start,
      end_date: end,
      days,
      reason: String(fd.get("reason") || "")
    });
    if (error) return toast.error(error.message);
    toast.success("Leave requested");
    setOpen(false);
    qc.invalidateQueries({
      queryKey: ["leaves"]
    });
  };
  const decide = async (id, status) => {
    const {
      error
    } = await supabase.from("leaves").update({
      status,
      approved_by: user.id
    }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(`Leave ${status}`);
    qc.invalidateQueries({
      queryKey: ["leaves"]
    });
  };
  const statusColor = {
    pending: "bg-warning/10 text-warning",
    approved: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold", children: "Leaves" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Requests and approvals" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
          " Request leave"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "New leave request" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { name: "leave_type", defaultValue: "casual", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "casual", children: "Casual" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sick", children: "Sick" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "paid", children: "Paid" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "start_date", children: "Start" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "start_date", name: "start_date", type: "date", required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "end_date", children: "End" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "end_date", name: "end_date", type: "date", required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reason", children: "Reason" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "reason", name: "reason" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Submit" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border bg-card shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Employee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "From" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "To" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Reason" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        leaves.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.employees?.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "capitalize", children: l.leave_type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.start_date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.end_date }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: l.days }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "max-w-xs truncate text-muted-foreground", children: l.reason }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rounded-full px-2 py-0.5 text-xs capitalize ${statusColor[l.status]}`, children: l.status }) }),
          role === "admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "space-x-1", children: l.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => decide(l.id, "approved"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 text-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => decide(l.id, "rejected"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4 text-destructive" }) })
          ] }) })
        ] }, l.id)),
        leaves.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: role === "admin" ? 8 : 6, className: "py-12 text-center text-muted-foreground", children: "No leaves yet." }) })
      ] })
    ] }) })
  ] });
}
const SplitComponent = () => /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeavesPage, {}) });
export {
  SplitComponent as component
};
