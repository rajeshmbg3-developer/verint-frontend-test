import React, { useEffect, useState } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import CustomerFilter from "src/components/CustomerFilter/CustomerFilter";
import CustomerCard from "src/components/CustomerCard/CustomerCard";
import queueService from "src/services/queueService";
import { setCustomers } from "src/store/queueSlice";

const CustomerList: React.FC = () => {
  const dispatch = useDispatch();
  const { customers, filter } = useSelector((state: RootState) => state.queue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customers
  const loadCustomers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedCustomers = await queueService.fetchCustomers();
      dispatch(setCustomers(fetchedCustomers));
    } catch (err) {
      setError("Failed to fetch customers");
      console.error("Failed to fetch customers", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
    // Periodic refresh every 30 seconds
    const intervalId = setInterval(loadCustomers, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(filter.toLowerCase()) ||
      customer.ticketNumber.toLowerCase().includes(filter.toLowerCase()),
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" variant="h6" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <CustomerFilter />
      {filteredCustomers.length === 0 ? (
        <Typography variant="h6" align="center" color="text.secondary">
          No customers found
        </Typography>
      ) : (
        filteredCustomers.map((customer) => <CustomerCard key={customer.id} customer={customer} />)
      )}
    </Container>
  );
};

export default CustomerList;
