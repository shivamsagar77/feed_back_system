import React from "react";
import { Box, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function StarRating({ rating, onRate }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <IconButton key={value} onClick={() => onRate(value)}>
          <StarIcon
            sx={{ color: value <= rating ? "#ffc107" : "#ccc", fontSize: 32 }}
          />
        </IconButton>
      ))}
    </Box>
  );
}
