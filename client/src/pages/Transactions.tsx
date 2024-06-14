import React, { useState } from "react";
import Wrapper from "../components/Wrapper";
import {
  InputAdornment,
  TextField,
  Typography,
  Button,
  Box,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Search, FileDownload } from "@mui/icons-material";
import { style } from "../utils/globals";
import InfiniteScroll from "react-infinite-scroller";
import useWindowDimensions from "../utils/useDimensiong";

const items = Array.from({ length: 40 });

export default function Transactions() {
  const { width } = useWindowDimensions();
  const [items, setItems] = useState(Array.from({ length: 20 }));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(false);
      return;
    }

    // Simulate an API call to fetch more data
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 20 })));
    }, 1500);
  };

  return (
    <Wrapper>
      <Typography variant="h6" gutterBottom>
        Transactions
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="stretch"
        height="35px"
        flexWrap="wrap"
        gap={1}
      >
        <TextField
          placeholder="Search.."
          sx={{
            p: 0,
            borderRadius: style.padding,
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
          inputProps={{
            sx: { padding: style.padding / 2 },
            height: "100%",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FileDownload />}
          sx={{ height: "100%", borderRadius: "5px" }}
        >
          Export
        </Button>
      </Box>
      <Divider sx={{ pt: 1 }} />
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={hasMore}
        loader={<CircularProgress />}
        useWindow={width > 900 ? false : true}
        getScrollParent={() => document.getElementById("scrollComponent")}
      >
        <List>
          {items.map((_, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Item ${index + 1}`} />
            </ListItem>
          ))}
        </List>
      </InfiniteScroll>
    </Wrapper>
  );
}
