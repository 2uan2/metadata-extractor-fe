import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ScrapeDbForm from "./features/create/ScrapeDbForm.jsx";
import RootLayout from "./layout/RootLayout.jsx";
import ReportList from "./features/list/ReportList.jsx";
import axios from "axios";
import ReportEditor from "./features/detail/ReportEditor.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

let router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        path: "list",
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
              responseData = response.data;
            });
          return { report: responseData };
        },
        Component: ReportEditor,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
