import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Alert,
} from "@mui/material";

const FeedbackForm = ({ name, setName, rating, setRating, feedback, setFeedback, editValue, setEditValue, editId, onSubmit, onCancel, loading }) => {
  const isEditing = !!editId;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !feedback.trim() || rating === 0) {
      alert("Please fill in all fields.");
      return;
    }
    onSubmit();
  };

  return (
    <Card sx={{
      mb: 6,
      borderRadius: 15,
      boxShadow: "0 10px 40px 0 rgba(99, 102, 241, 0.15)",
      background: "rgba(255, 255, 255, 0.98)",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
      p: 4,
    }}>
      <CardContent>
        <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ mb: 4, color: "#1e293b", textAlign: "center" }}>
          {isEditing ? "Edit Your Feedback" : "Add Your Feedback"}
        </Typography>
        {isEditing && (
          <Alert severity="info" sx={{ mb: 4, borderRadius: 12, fontSize: 16, backgroundColor: "#e0f2fe", color: "#0369a1" }}>
            Editing feedback for {name}.
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={4}>
          <TextField
            label="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            disabled={loading}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 10, backgroundColor: "#ffffff", "&:hover": { borderColor: "#4a90e2" } } }}
          />
          <Rating
            name="rating"
            value={rating}
            onChange={(_, value) => setRating(value)}
            size="large"
            sx={{ mb: 3, color: "#f59e0b", fontSize: 30, "& .MuiRating-icon": { margin: "0 8px" } }}
          />
          <TextField
            label="Your Feedback"
            value={editValue || feedback}
            onChange={e => setEditValue(e.target.value)}
            multiline
            minRows={5}
            required
            disabled={loading}
            fullWidth
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 10, backgroundColor: "#ffffff", "&:hover": { borderColor: "#4a90e2" } } }}
          />
          <Box display="flex" gap={3} justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              color={isEditing ? "success" : "primary"}
              size="large"
              disabled={loading}
              sx={{ minWidth: 180, borderRadius: 10, fontSize: 18, padding: "10px 20px", backgroundColor: isEditing ? "#10b981" : "#4a90e2", "&:hover": { backgroundColor: isEditing ? "#059669" : "#357abd" } }}
            >
              {loading ? (isEditing ? "Saving..." : "Submitting...") : isEditing ? "Save Changes" : "Submit Feedback"}
            </Button>
            {isEditing && (
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={onCancel}
                disabled={loading}
                sx={{ minWidth: 180, borderRadius: 10, fontSize: 18, padding: "10px 20px", color: "#6b7280", borderColor: "#d1d5db", "&:hover": { borderColor: "#9ca3af", color: "#4b5563" } }}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;