import React from "react";
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Typography,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const glassCard = {
  borderRadius: 15,
  background: "rgba(255, 255, 255, 0.98)",
  boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.15)",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(255, 255, 255, 0.4)",
  transition: "transform 0.4s, box-shadow 0.4s",
  '&:hover': {
    transform: "translateY(-10px)",
    boxShadow: "0 20px 50px 0 rgba(31, 38, 135, 0.25)",
  },
};

const FeedbackCard = ({ item, onEdit, onDelete }) => {
  return (
    <Card elevation={0} sx={glassCard}>
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            sx={{
              bgcolor: "#4a90e2",
              mr: 4,
              width: 70,
              height: 70,
              fontSize: 38,
              boxShadow: "0 6px 15px 0 rgba(74, 144, 226, 0.25)",
              transition: "transform 0.3s",
              '&:hover': { transform: "scale(1.1)" },
            }}
          >
            <PersonIcon fontSize="inherit" />
          </Avatar>
          <Box flex={1}>
            <Typography variant="h5" fontWeight={700} sx={{ color: "#1e293b", mb: 2 }}>
              {item.person_name}
            </Typography>
            <Rating
              name={`rating-${item.id}`}
              value={item.star_rating}
              readOnly
              precision={0.5}
              size="large"
              sx={{ color: "#f59e0b", fontSize: 24 }}
            />
          </Box>
          <Box>
            <Tooltip title="Edit Feedback" arrow sx={{ mr: 2 }}>
              <IconButton color="primary" onClick={onEdit} sx={{ p: 1.5 }}>
                <EditIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Feedback" arrow>
              <IconButton color="error" onClick={onDelete} sx={{ p: 1.5 }}>
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        <Typography
          variant="body1"
          color="text.primary"
          sx={{ fontSize: 18, color: "#374151", fontWeight: 500, lineHeight: 1.75, paddingTop: 2 }}
        >
          {item.feedback}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeedbackCard;