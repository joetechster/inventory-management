import React from "react";
import Wrapper from "./Wrapper";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Dashboard, GifBox } from "@mui/icons-material";

const sales = [{ a: 33 }, { a: 22 }, { a: 23 }, { a: 3 }, { a: 99 }];

export default function MostSold() {
  return (
    <Wrapper>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="flex-end">
          <Typography variant="h6" color="#666">
            SUMMARY
          </Typography>
          <Typography color="blue">View all</Typography>
        </Box>
        <List sx={{ py: 0 }}>
          {sales.map((sale, index) => (
            <ListItemButton
              key={index}
              sx={{
                px: 0,
                pb: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                  cursor: "initial  ",
                },
              }}
            >
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary={sale.a} />
              <ListItemText primary={sale.a} sx={{ textAlign: "right" }} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Wrapper>
  );
}
