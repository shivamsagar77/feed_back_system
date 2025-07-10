import React from "react";
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Rating,
  IconButton,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const FeedbackCard = ({ item, onEdit, onDelete }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
        p: 2,
      }}
    >
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar
            sx={{
              bgcolor: "#4a90e2",
              width: 40,
              height: 40,
              fontSize: 22,
              mr: 1.5,
            }}
          >
            <PersonIcon fontSize="inherit" />
          </Avatar>
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: 15 }}>
              {item.person_name}
            </Typography>
            <Rating
              value={item.star_rating}
              readOnly
              precision={0.5}
              size="small"
              sx={{ fontSize: 16 }}
            />
          </Box>
          <IconButton onClick={onEdit} size="small" sx={{ mr: 1 }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={onDelete} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          sx={{
            fontSize: 14,
            color: "#555",
            lineHeight: 1.4,
          }}
        >
          {item.feedback}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;
