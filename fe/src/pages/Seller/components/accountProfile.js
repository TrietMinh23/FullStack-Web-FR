import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
  } from '@mui/material';
  
  // Function to get the first character of the name in uppercase
  const getInitialLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };
  
  export const AccountProfile = ({ name, email, mobile, address }) => (
    <Card>
      <CardContent>
        <Box className="flex flex-col items-center">
          <div
            className="h-16 w-16 flex items-center justify-center bg-blue-500 rounded-full text-white text-3xl font-bold mb-2 shadow-md"
          >
            {getInitialLetter(name)}
          </div>
          <Typography
            gutterBottom
            variant="h5"
            className="font-bold text-xl" // Add this line to make the name bold
          >
            {name}
          </Typography>
          <div className="flex flex-row items-center">
            <Typography
              color="text.secondary"
              variant="body2"
              className="text-gray-500 mt-1 mr-2"
            >
              Phone:
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
              className="text-gray-500"
            >
              {mobile}
            </Typography>
          </div>
          <div className="flex flex-row items-center">
            <Typography
              color="text.secondary"
              variant="body2"
              className="text-gray-500"
            >
              {address}
            </Typography>
          </div>
          <Typography
            color="text.secondary"
            variant="body2"
            className="text-gray-500"
          >
            Email: {email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
  