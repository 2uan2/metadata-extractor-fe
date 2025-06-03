import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className="bg-gray-100 py-2 5xl">
      <Link className="" to="/create">
        <Button size="lg" variant="link">
          Create report
        </Button>
      </Link>
      <Link to="/list?page=0&size=3">
        <Button size="lg" variant="link">
          Report List
        </Button>
      </Link>
    </div>
  );
};

export default Header;
