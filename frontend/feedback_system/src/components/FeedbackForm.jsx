import React from "react";
import { TextField, Button, Rating, Card, CardContent, Box } from "@mui/material";

const FeedbackForm = ({
  name, setName,
  rating, setRating,
  feedback, setFeedback,
  onSubmit, onCancel, loading, editId
}) => {
  return (
    <Card>
      <CardContent>
        <Box component="form" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
          <TextField
            label="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Rating
            value={rating}
            onChange={(_, value) => setRating(value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Your Feedback"
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            minRows={3}
          />
          <Box display="flex" gap={2} mt={2}>
            {editId && (
              <Button variant="outlined" onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
            )}
            <Button type="submit" variant="contained" disabled={loading}>
              {editId ? "Save" : "Submit"}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
