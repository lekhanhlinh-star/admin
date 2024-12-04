import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box, Typography, Stack, Card, CardContent, Rating } from "@mui/material";
import { IReview } from "./models/Course"; // Import IReview

interface ReviewListProps {
  courseId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ courseId }) => {
  const [openModal, setOpenModal] = useState(false); // Modal state
  const [reviews, setReviews] = useState<IReview[]>([]); // Reviews state

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://dev.brightora.online:8080/api/v1/review/get_by_course?course=${courseId}`);
        const data = await response.json();
        setReviews(data.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [courseId]);

  // Open Modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box>
      <Button 
        variant="contained" 
        sx={{ mb: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }} 
        onClick={handleOpenModal}>
        Show Reviews
      </Button>

      {/* Modal displaying reviews */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="lg">
        <DialogTitle sx={{ fontWeight: 600 }}>All Reviews</DialogTitle>
        <DialogContent sx={{ backgroundColor: '#f7f7f7', padding: '24px' }}>
          <Box sx={{ maxHeight: '500px', overflowY: 'auto' }}>
            {/* Review List */}
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id} sx={{ mb: 2, borderRadius: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Stack spacing={1}>
                      {/* <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {review.user.name}
                      </Typography> */}
                      <Rating name="read-only" value={review.rating} readOnly />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {review.comment}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No reviews yet.
              </Typography>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ReviewList;
