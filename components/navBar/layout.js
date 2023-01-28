import { Box } from "./box";

import { Text, Spacer } from "@nextui-org/react";

export const Layout = ({ children }) => (
  <Box
    css={
      {
        //maxW: "100%",
      }
    }
  >
    {children}
  </Box>
);
