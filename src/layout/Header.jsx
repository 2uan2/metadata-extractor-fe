import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-gray-200 py-2 5xl flex justify-between">
      <div className="">
        <Link className="" to="/reports/create">
          <Button size="lg" variant="link">
            {t("createHeader")}
          </Button>
        </Link>
        <Link to="/reports?page=0&size=3">
          <Button size="lg" variant="link">
            {t("reportList")}
          </Button>
        </Link>
        <Link to="/catalogs?page=0&size=3">
          <Button size="lg" variant="link">
            {t("catalogList")}
          </Button>
        </Link>
        <Link to="/tables?page=0&size=3">
          <Button size="lg" variant="link">
            {t("tableList")}
          </Button>
        </Link>
        <Link to="/templates?page=0&size=3">
          <Button size="lg" variant="link">
            {t("templateList")}
          </Button>
        </Link>
      </div>
      <div className="mr-2 space-x-2">
        <Button
          className="hover: cursor-pointer"
          variant={"outline"}
          onClick={() => changeLanguage("en")}
        >
          {t("englishOption")}
        </Button>
        <Button
          className="hover: cursor-pointer"
          variant={"outline"}
          onClick={() => changeLanguage("vn")}
        >
          {t("vietnameseOption")}
        </Button>
      </div>
    </div>
  );
};

export default Header;
