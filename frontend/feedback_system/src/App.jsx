import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Fade,
  Snackbar,    
} from "@mui/material";
import axios from "axios";
import FeedbackCard from "./components/FeedbackCard";
import FeedbackForm from "./components/FeedbackForm";

const bgGradient = {
  minHeight: "100vh",
  width: "100vw",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  py: 0,
  px: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: 0,
  padding: 0,
};

const App = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/feedback/getdata");
      if (response.data.success && Array.isArray(response.data.data)) {
        setFeedbackData(response.data.data);
      } else {
        setFeedbackData([]);
        setError("No feedback found.");
      }
    } catch (err) {
      setError("Something went wrong while fetching feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const handleAddFeedback = async () => {
    setAddLoading(true);
    try {
      await axios.post("http://localhost:5000/api/feedback/add", { person_name: name, star_rating: rating, feedback });
      setSnackbar({ open: true, message: "Feedback submitted!", severity: "success" });
      setName("");
      setRating(0);
      setFeedback("");
      fetchFeedbackData();
    } catch (err) {
      setSnackbar({ open: true, message: "Error submitting feedback!", severity: "error" });
    } finally {
      setAddLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.person_name);
    setRating(item.star_rating);
    setEditValue(item.feedback);
    setFeedback(item.feedback);
  };

  const handleSave = async () => {
    setEditLoading(true);
    try {
      await axios.put(`http://localhost:5000/api/feedback/update/${editId}`, { person_name: name, star_rating: rating, feedback: editValue });
      setSnackbar({ open: true, message: "Feedback updated successfully!", severity: "success" });
      setEditId(null);
      setName("");
      setRating(0);
      setEditValue("");
      setFeedback("");
      fetchFeedbackData();
    } catch (err) {
      setSnackbar({ open: true, message: "Error updating feedback!", severity: "error" });
    } finally {
      setEditLoading(false);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setName("");
    setRating(0);
    setEditValue("");
    setFeedback("");
  };

  const handleDelete = async (item) => {
    setEditLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/feedback/delete/${item.id}`);
      setSnackbar({ open: true, message: "Feedback deleted!", severity: "success" });
      fetchFeedbackData();
    } catch (err) {
      setSnackbar({ open: true, message: "Error deleting feedback!", severity: "error" });
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <Box sx={bgGradient}>
      <Box sx={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <Box
          sx={{
            mb: 6,
            borderRadius: 16,
            background: "linear-gradient(90deg, #4a90e2 0%, #63b8ff 100%)",
            boxShadow: "0 10px 40px 0 rgba(74, 144, 226, 0.2)",
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h1"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#ffffff", letterSpacing: 1.5, mb: 3, textShadow: "1px 1px 4px rgba(0,0,0,0.1)" }}
          >
            <span role="img" aria-label="feedback">💬</span> User Feedback
          </Typography>
          <Typography variant="h5" sx={{ color: "#e6f0fa", fontWeight: 500, textAlign: "center", maxWidth: "600px" }}>
            We value your input—share your thoughts with us!
          </Typography>
        </Box>
        <FeedbackForm
          name={name}
          setName={setName}
          rating={rating}
          setRating={setRating}
          feedback={feedback}
          setFeedback={setFeedback}
          editValue={editValue}
          setEditValue={setEditValue}
          editId={editId}
          onSubmit={editId ? handleSave : handleAddFeedback}
          onCancel={handleCancel}
          loading={editId ? editLoading : addLoading}
        />
        <Divider sx={{ my: 6, borderColor: "#e5e7eb", borderWidth: 2 }} />

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
            <CircularProgress size={100} thickness={4} sx={{ color: "#4a90e2" }} />
            <Typography variant="h4" sx={{ mt: 5, color: "#4a90e2", fontWeight: 600 }}>
              Loading feedback...
            </Typography>
          </Box>
        ) : error ? (
          <Fade in={!!error}>
            <Alert severity="error" sx={{ my: 6, fontSize: 20, borderRadius: 12, width: "100%", padding: 3, backgroundColor: "#fee2e2" }}>
              {error}
            </Alert>
          </Fade>
        ) : feedbackData.length === 0 ? (
          <Typography variant="h4" sx={{ my: 6, color: "#6b7280", textAlign: "center", fontWeight: 600, maxWidth: "600px", margin: "0 auto" }}>
            No feedback available yet.
          </Typography>
        ) : (
          <Grid container spacing={5} sx={{ width: "100%" }}>
            {feedbackData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <FeedbackCard
                  item={item}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{ mb: 6, "& .MuiSnackbarContent-root": { backgroundColor: snackbar.severity === "success" ? "#d1fae5" : "#fee2e2", color: snackbar.severity === "success" ? "#065f46" : "#991b1b", borderRadius: 10, padding: "10px 20px" } }}
      />
    </Box>
  );
};

export default App;