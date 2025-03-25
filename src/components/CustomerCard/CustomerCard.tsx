import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Stack } from "@mui/material";
import { Customer } from "src/models/queue";
import { getGravatarUrl } from "src/utils/gravatar";

interface CustomerCardProps {
  customer: Customer;
}

const CustomerCard: React.FC<CustomerCardProps> = ({ customer }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        p: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Avatar Section */}
          <Avatar
            src={getGravatarUrl(customer.emailAddress ?? "", 80)}
            alt={customer.name}
            sx={{ width: 80, height: 80 }}
          />

          {/* Customer Info */}
          <Box>
            {/* Name */}
            <Typography variant="h6" component="div" gutterBottom>
              {customer.name}
            </Typography>

            {/* Email (Optional) */}
            {customer.emailAddress && (
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word" }}>
                {customer.emailAddress}
              </Typography>
            )}

            {/* Ticket Info */}
            <Typography variant="body2">
              <strong>Ticket:</strong> {customer.ticketNumber}
            </Typography>

            {/* Current Position */}
            <Typography variant="body2">
              <strong>Position:</strong> {customer.currentPosition}
            </Typography>

            {/* Expected Time */}
            <Typography variant="body2" color="text.secondary">
              <strong>Expected Time:</strong> {new Date(customer.expectedTime).toLocaleString()}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CustomerCard;
