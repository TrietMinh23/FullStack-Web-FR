import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function PaginationComponent({ setPage, page, totalPage }) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="flex justify-center mt-10">
      <Stack spacing={2}>
        <Pagination
          count={Number(totalPage)}
          defaultPage={1}
          page={Number(page)}
          size="large"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
