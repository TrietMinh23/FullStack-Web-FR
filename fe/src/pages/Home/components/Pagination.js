import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({ setPage, page }) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="flex justify-center mt-10">
      <Stack spacing={2}>
        <Pagination
          count={20}
          defaultPage={1}
          page={page}
          size="large"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
