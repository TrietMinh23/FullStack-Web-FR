import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import { Link } from "react-router-dom";

export default function ButtonReport() {
  return (
    <div className="btn-report">
      <Link to="/report">
        <ReportGmailerrorredIcon />
      </Link>
    </div>
  );
}
