/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import AccountDetails from "views/AccountDetails.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import DebitCredit from "views/debitCredit";
import Reports from "views/Reports";
import Budgets from "views/Budgets";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin"
  // },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
   {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Transaction Details",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/accountDetails",
    name: "Account Details",
    icon: "nc-icon nc-single-02",
    component: AccountDetails,
    layout: "/admin"  
  },
  {
    path: "/debit/credit",
    name: "Debit/Credit",
    icon: "nc-icon nc-credit-card",
    component: DebitCredit,
    layout: "/admin"  
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin"
  // },
  {
    path: "/reports",
    name: "Reports",
    icon: "nc-icon nc-chart-bar-32",
    component: Reports,
    layout: "/admin"
  },
  {
    path: "/budgets",
    name: "Budgets",
    icon: "nc-icon nc-money-coins",
    component: Budgets,
    layout: "/admin"
  }
];

export default dashboardRoutes;
