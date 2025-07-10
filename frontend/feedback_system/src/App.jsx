import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/feedback/getdata");
      if (res.data.success && Array.isArray(res.data.data)) {
        setFeedbackData(res.data.data);
        setError("");
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

  const handleAddFeedback = async () => {
    const payload = {
      person_name: name,
      star_rating: rating,
      feedback: feedback, // ensure this is the correct value
    };
    setAddLoading(true);
    try {
      await axios.post("http://localhost:5000/api/feedback/add", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSnackbar({
        open: true,
        message: "Feedback submitted!",
        severity: "success",
      });
      setName("");
      setRating(0);
      setFeedback("");
      fetchFeedbackData();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error submitting feedback!",
        severity: "error",
      });
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
      await axios.put(`http://localhost:5000/api/feedback/update/${editId}`, {
        person_name: name,
        star_rating: rating,
        feedback: feedback, // use the current feedback state
      });
      setSnackbar({
        open: true,
        message: "Feedback updated successfully!",
        severity: "success",
      });
      setEditId(null);
      setName("");
      setRating(0);
      setEditValue("");
      setFeedback("");
      fetchFeedbackData();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error updating feedback!",
        severity: "error",
      });
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
      setSnackbar({
        open: true,
        message: "Feedback deleted!",
        severity: "success",
      });
      fetchFeedbackData();
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Error deleting feedback!",
        severity: "error",
      });
    } finally {
      setEditLoading(false);
    }
  };

  const ratingCounts = feedbackData.reduce((acc, item) => {
    acc[item.star_rating] = (acc[item.star_rating] || 0) + 1;
    return acc;
  }, {});

  return (
    <Box sx={bgGradient}>
      <Box
        sx={{
          width: "70%",
          maxWidth: "1100px",
          padding: "10px",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            mb: 4,
            borderRadius: 10,
            background: "linear-gradient(90deg, #4a90e2 0%, #63b8ff 100%)",
            boxShadow: "0 6px 20px rgba(74, 104, 126, 0.2)",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#fff",
              letterSpacing: 1,
              textAlign: "center",
              mb: 2,
            }}
          >
            💬 User Feedback
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#e6f0fa",
              textAlign: "center",
              maxWidth: "500px",
            }}
          >
            We value your input—share your thoughts with us!
          </Typography>
        </Box>

        {/* Form and Rating Summary in Flex Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 4,
            flexWrap: "wrap",
            minWidth:"100%"
          }}
        >
          <Box sx={{ flex: 1, minWidth: "300px", marginRight:"25px" }}>
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
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: "300px",
               mt: { xs: 3, sm: 0 },       // less top margin
    p: 2,  
              borderRadius: 10,
              // backgroundColor: "#ffffff",
              // boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 1.5, color: "#4a90e2", fontWeight: 600, textAlign: "center" }}
            >
              ⭐ Rating Summary
            </Typography>

            {[5, 4, 3, 2, 1].map((star) => (
              <Box
                key={star}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  mb: 1.5,
                  px: 1,
                }}
              >
                <Box display="flex" alignItems="center">
                  {[...Array(star)].map((_, i) => (
                    <StarIcon key={i} sx={{ fontSize: 20, color: "#fbbf24", mr: 0.3 }} />
                  ))}
                  <Typography fontSize={14} color="text.secondary" ml={1}>
                    ({star} Star{star > 1 ? "s" : ""})
                  </Typography>
                </Box>
                <Typography variant="body1" fontWeight={600} sx={{ color: "#4a90e2" }}>
                  {ratingCounts[star] || 0}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#e5e7eb", borderWidth: 1.5 }} />

        {/* Feedback List */}
        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
            <CircularProgress size={60} thickness={4} sx={{ color: "#4a90e2" }} />
            <Typography variant="h6" sx={{ mt: 3, color: "#4a90e2", fontWeight: 600 }}>
              Loading feedback...
            </Typography>
          </Box>
        ) : error ? (
          <Fade in={!!error}>
            <Alert
              severity="error"
              sx={{
                my: 4,
                fontSize: 16,
                borderRadius: 10,
                width: "100%",
                padding: 2,
                backgroundColor: "#fee2e2",
              }}
            >
              {error}
            </Alert>
          </Fade>
        ) : feedbackData.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              my: 4,
              color: "#6b7280",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            No feedback available yet.
          </Typography>
        ) : (
          <Grid container spacing={3}>
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
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          mb: 4,
          "& .MuiSnackbarContent-root": {
            backgroundColor: snackbar.severity === "success" ? "#d1fae5" : "#fee2e2",
            color: snackbar.severity === "success" ? "#065f46" : "#991b1b",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 14,
          },
        }}
      />
    </Box>
  );
};

export default App;