import React from "react";
import { Container, Card, CardContent, Typography, Avatar, Stack, Divider, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { LINKEDIN_AVATAR_URL } from "src/constants";

const About: React.FC = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card elevation={3} sx={{ p: 3, borderRadius: 4, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
        <CardContent>
          {/* Avatar and Name Section */}
          <Stack spacing={2} alignItems="center">
            <Avatar alt="Rajesh Malakar" src={`${LINKEDIN_AVATAR_URL}`} sx={{ width: 100, height: 100 }} />
            <Typography variant="h5" fontWeight="bold">
              Rajesh Malakar
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Front-End Developer
            </Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {/* Contact Information */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <EmailIcon color="primary" />
              <Typography variant="body2" color="text.secondary">
                rajeshmbg3@gmail.com
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon color="primary" />
              <Typography variant="body2" color="text.secondary">
                +91 98765 43210
              </Typography>
            </Stack>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* About Section */}
          <Typography variant="h6" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            I am a passionate front-end developer with a strong background in building scalable web applications.
            Recently, I completed a front-end test given by Qudini by Verint, where I had the opportunity to showcase my
            skills in React, MUI, and creating elegant user interfaces.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
