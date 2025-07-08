import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FeedbackList({ feedbacks, onDelete }) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Submitted Feedback
      </Typography>

      <List>
        {feedbacks.map((fb, idx) => (
          <ListItem
            key={idx}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
              mb: 2,
              borderRadius: 2,
              backdropFilter: "blur(10px)",
            }}
            secondaryAction={
              <IconButton edge="end" onClick={() => onDelete(idx)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={
                <Typography>
                  <strong>{fb.name}</strong> gave {fb.rating} star(s)
                </Typography>
              }
              secondary={
                <>
                  {fb.comment && <Typography>{fb.comment}</Typography>}
                  <Typography variant="caption" color="gray">
                    {fb.timestamp}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
