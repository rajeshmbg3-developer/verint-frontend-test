import React, { useEffect, useState } from "react";
import { TextField, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setFilter } from "src/store/queueSlice";
import { useDebounce } from "src/hooks/useDebounce";
import { DEBOUNCE_TIME } from "src/constants/app.constant";

const CustomerFilter: React.FC = () => {
  const dispatch = useDispatch();
  // const filter = useSelector((state: RootState) => state.queue.filter);
  const [inputValue, setInputValue] = useState("");
  const debounceFilter = useDebounce(inputValue, DEBOUNCE_TIME);

  useEffect(() => {
    dispatch(setFilter(debounceFilter));
  }, [debounceFilter, dispatch]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Filter Customers"
        value={inputValue}
        onChange={handleFilterChange}
        placeholder="Search by name or ticket number"
      />
    </Box>
  );
};

export default CustomerFilter;
