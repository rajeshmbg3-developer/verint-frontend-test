import React from "react";
import { TextField, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { setFilter } from "src/store/queueSlice";

export type FilterInputType = {
  input: string;
};

const CustomerFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.queue.filter);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter(event.target.value));
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Filter Customers"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search by name or ticket number"
      />
    </Box>
  );
};

export default CustomerFilter;
