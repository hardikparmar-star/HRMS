import { r as reactExports, W as jsxRuntimeExports } from "./server-CRHjjnr4.js";
import { u as useAuth, h as useNavigate, M as Link } from "./router-DKrS3J_0.js";
import { B as Button } from "./button-D2gbqy69.js";
import { c as createLucideIcon, U as Users, C as Clock, F as FileText } from "./users-BlVlNvSK.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function Landing() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!loading && user) navigate({
      to: "/dashboard"
    });
  }, [loading, user, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "container mx-auto flex items-center justify-between px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-xl gradient-primary shadow-elegant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xl font-bold", children: "Pulse HR" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", children: "Sign in" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Get started" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container mx-auto px-6 pt-16 pb-24 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-success" }),
        " Now with automated payroll"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mx-auto mt-6 max-w-3xl text-5xl font-bold tracking-tight md:text-6xl", children: [
        "Run your people ops ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent", children: "like clockwork" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-xl text-lg text-muted-foreground", children: "A modern HRMS for startups and growing teams. Employees, attendance, leaves and payroll — beautifully unified." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2", children: [
          "Start free ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", children: "Book demo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-20 grid max-w-5xl gap-4 md:grid-cols-4", children: [{
        icon: Users,
        title: "Employees",
        desc: "Profiles, docs, lifecycle"
      }, {
        icon: Clock,
        title: "Attendance",
        desc: "Check-in & overtime"
      }, {
        icon: FileText,
        title: "Leaves",
        desc: "Requests & approvals"
      }, {
        icon: TrendingUp,
        title: "Payroll",
        desc: "Auto slips in PDF"
      }].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border bg-card p-6 text-left shadow-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 inline-flex size-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: f.desc })
      ] }, f.title)) })
    ] })
  ] });
}
export {
  Landing as component
};
