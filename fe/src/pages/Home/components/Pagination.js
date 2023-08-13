import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";

export default function PaginationComponent({ setPage, page }) {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="flex justify-center mt-10">
      <Stack spacing={2}>
        <Pagination
          count={Number(sessionStorage.getItem("totalPage"))}
          defaultPage={1}
          page={Number(page)}
          size="large"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
}
