import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { t } from "i18next";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_URL;

const DB_NAMES = ["PostgreSQL", "MySQL", "MariaDB"];

function ScrapeDbForm() {
  const { t, i18n } = useTranslation();
  const [databaseAddress, setDatabaseAddress] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dbName, setDbName] = useState(DB_NAMES[0]);

  const sendScrapeData = () => {
    // console.log("username is " + username);
    // console.log("password is " + password);
    const toastId = toast.loading("Creating report ...");
    axios
      .post(`${BASE_URL}/api/connect`, {
        url: `jdbc:${dbName.toLowerCase()}://${databaseAddress}:${port}/`,
        username: username,
        password: password,
      })
      .then((response) =>
        toast.success(
          `successfully created report at /report/${response.data.id}`,
          { id: toastId }
        )
      )
      .catch((error) => {
        toast.error(error.message, { id: toastId });
        console.log(error);
      });
  };

  const onDbFormSubmit = (e) => {
    e.preventDefault();
    sendScrapeData();
  };

  return (
    <div className="w-xl mx-auto flex flex-col justify-center">
      <Toaster />
      <form
        className="px-4 py-2 bg-gray-100 rounded-2xl w-150"
        onSubmit={onDbFormSubmit}
      >
        <div className="p-2 grid ">
          <Label className="">{t("databaseUrlText")}</Label>
          <input
            className="border-b-1  focus:border-blue-300"
            placeholder="192.168.1.69"
            type="text"
            value={databaseAddress}
            onChange={(e) => setDatabaseAddress(e.target.value)}
          />
        </div>
        <div className="p-2 grid ">
          <Label className=" ">{t("portText")}</Label>
          <input
            className=""
            placeholder="3306"
            type="text"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </div>
        <div className="p-2 grid ">
          <Label>{t("usernameText")}</Label>
          <input
            type="text"
            placeholder="mysql"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-2 grid ">
          <Label>{t("passwordText")}</Label>
          <input
            type="password"
            placeholder="my-secret-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="p-2 grid ">
          <Label>{t("databaseTypeText")}</Label>
          <select
            className="text-2xl m-2"
            value={dbName}
            onChange={(e) => setDbName(e.target.value)}
          >
            {DB_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </form>

      <button
        className="w-150 mt-4 py-2 px-4 rounded-2xl border-2 border-transparent focus:border-blue-300 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer transition-colors duration-250 text-2xl "
        onClick={sendScrapeData}
      >
        {t("scrapeButtonText")}
      </button>
    </div>
  );
}

export default ScrapeDbForm;
