import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  data,
  Navigate,
  RouterProvider,
} from "react-router";
import ScrapeDbForm from "./features/create/ScrapeDbForm.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import ReportList from "./features/list/ReportList.jsx";
import axios from "axios";
import ReportEditor from "./features/detail/ReportEditor.jsx";
import CatalogList from "./features/catalogs/list/CatalogList";
import TableList from "./features/tables/list/TableList";
import TableDetail from "./features/tables/detail/TableDetail";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import CatalogDetail from "./features/catalogs/detail/CatalogDetail";
import ReportCatalogDetail from "./features/detail/ReportCatalogDetail";
import TemplateList from "./features/template/TemplateList";

const BASE_URL = import.meta.env.VITE_API_URL;

// axios.defaults.headers.common["ngrok-skip-browser-warning"] = "true";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/reports" replace />,
  },
  {
    path: "/reports",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: ReportList,
      },
      {
        path: "create",
        Component: ScrapeDbForm,
      },
      {
        path: ":id",
        loader: async ({ params }) => {
          let responseData;
          await axios
            .get(`${BASE_URL}/api/reports/${params.id}`)
            .then((response) => {
              if (!response) throw data("Report not found", { status: 404 });
              responseData = response.data;
            });
          return { reportData: responseData };
        },
        Component: ReportCatalogDetail,
      },
      {
        path: ":id/old",
        loader: async ({ params }) => {
          let responseData;
          await axios
            .get(`${BASE_URL}/api/reports/${params.id}`)
            .then((response) => {
              if (!response) throw data("Report not found", { status: 404 });
              responseData = response.data;
            });
          return { report: responseData };
        },
        Component: ReportEditor,
      },
    ],
  },
  {
    path: "templates",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: TemplateList,
      },
      // {
      //   path: ":id",
      //   loader: async ({ params }) => {
      //     let responseData;
      //     await axios
      //       .get(`${BASE_URL}/api/catalogs/${params.id}`)
      //       .then((response) => {
      //         responseData = response.data;
      //       })
      //       .catch((error) => console.log(error));
      //     return { catalogData: responseData };
      //   },
      //   Component: CatalogDetail,
      // },
    ],
  },
  {
    path: "catalogs",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: CatalogList,
      },
      {
        path: ":id",
        loader: async ({ params }) => {
          let responseData;
          await axios
            .get(`${BASE_URL}/api/catalogs/${params.id}`)
            .then((response) => {
              responseData = response.data;
            })
            .catch((error) => console.log(error));
          return { catalogData: responseData };
        },
        Component: CatalogDetail,
      },
    ],
  },
  {
    path: "tables",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: TableList,
      },
      {
        path: ":id",
        loader: async ({ params }) => {
          let responseData;
          await axios
            .get(`${BASE_URL}/api/tables/${params.id}`)
            .then((response) => {
              responseData = response.data;
            })
            .catch((error) => console.log(error));
          return { tableData: responseData };
        },
        Component: TableDetail,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18n}>
    <RouterProvider router={router} />
  </I18nextProvider>
);
