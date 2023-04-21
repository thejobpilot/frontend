// Import React and necessary components from Material UI
import React from 'react';
import { Box, Typography } from '@mui/material';

// Define a functional React component
const IndexPage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center' }}>
      <Typography variant="h4" mb={3}>
        Dummy Index Page
      </Typography>
      <Typography variant="body1">
        This is a simple dummy index page created as a placeholder.
      </Typography>
    </Box>
  );
};

// Export the component as default
export default IndexPage;
