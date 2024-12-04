import { Show, useShowContext } from 'react-admin';
import { Card, CardContent, Typography, Box, Grid, Avatar, Rating, Stack, CircularProgress, Alert, Button } from '@mui/material';
import CourseSection from './CourseSection';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SectionData from './SectionCard';
import ReviewList from './review';
const SimpleCourseShow = () => {
  const { record } = useShowContext();
  const [sectionData, setSectionData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  if (!record) {
    return null; // Return nothing if record is not available
  }
  const averageRating = record?.review?.average_rating || 0; // Default to 0 if not available
  const {
    _id,
    title,
    subtitle,
    description,
    owner,
    thumbnail,
    goals,
    tag,
    promotional_video,
    sections,
    status,
    language,
    level,
    objectives,
    time_spend,
  } = record || {};

  const totalReviews = record?.review?.total_reviews || 0;

  const handleApproval = async () => {
    try {
      // Lấy token từ localStorage hoặc từ nơi lưu trữ bạn đang sử dụng
      const token = localStorage.getItem("token");

      // Kiểm tra xem token có tồn tại không
      if (!token) {
        console.error("Authorization token not found!");
        return;
      }

      // Cấu hình header Authorization
      const config = {
        headers: {
          "Authorization": `Bearer ${token}`,  // Thêm token vào header
        },
      };

      // Gửi PUT request với header Authorization
      const response = await axios.put(
        `http://dev.brightora.online:8080/api/v1/courses/${_id}`,
        {
          "status": "Published",
        },
        config // Thêm config vào yêu cầu
      );

      console.log(response);

      // Sau khi thành công, reload trang
      window.location.reload(); // Tải lại trang để cập nhật dữ liệu mới
    } catch (error) {
      console.error("Error approving:", error);
    }
  };




  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 5 }}>
      <CardContent>
        {/* Course Thumbnail */}
        <Box
          sx={{
            width: '100%',
            height: 300, // Adjust the height as needed
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 3,
          }}
        >
          <img
            src={thumbnail}
            alt="Course Thumbnail"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* Course Title and Subtitle */}
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>

        {/* Course Description */}
        <Typography variant="body1" color="text.primary" paragraph>
          {description}

          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
            Status
          </Typography>
        </Typography>

        <Typography variant="body1" color="text.primary" paragraph>
          {status}
        </Typography>


        {
          status === "Pending" && <Button sx={{ my: 2 }} color="primary" variant="contained" onClick={handleApproval}>Approve</Button>
        }


        {/* Promotional Video */}


        {promotional_video && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Promotional Video
            </Typography>
            <iframe
              width="100%"
              height="315"
              src={promotional_video}
              title="Promotional Video"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        )}

        {/* Instructor Information */}
        {owner && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
              Instructor
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  src={owner.photo || ''}
                  alt="Instructor"
                  sx={{
                    width: 80,
                    height: 80,
                    border: '2px solid #ddd',
                    objectFit: 'cover',
                  }}
                />
              </Grid>
              <Grid item>
                <Typography variant="body1" fontWeight="bold">
                  {owner.first_name} {owner.last_name}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Course Goals */}
        {goals && goals.learningObjectives && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
              Learning Objectives
            </Typography>
            <ul>
              {goals.learningObjectives.map((goal: string, index: number) => (
                <li key={index}>
                  <Typography variant="body2">{goal}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}

        {/* Tags */}
        {tag && tag?.length > 0 && (
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
              Tags
            </Typography>
            <Stack direction="row" spacing={1}>
              {tag.map((tagItem: string, index: number) => (
                <Typography
                  key={index}
                  variant="body2"
                  color="primary"
                  sx={{
                    border: '1px solid',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {tagItem}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        {/* Course Details */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
            Course Details
          </Typography>
          <Typography variant="body2">
            <strong>Time Spend: </strong>{time_spend} hours
          </Typography>
          <Typography variant="body2">
            <strong>Language: </strong>{language.join(', ')}
          </Typography>
          <Typography variant="body2">
            <strong>Level: </strong>{level.join(', ')}
          </Typography>
        </Box>
        <ReviewList courseId={_id}></ReviewList>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Rating name="course-rating" value={averageRating} precision={0.5} readOnly />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {averageRating} / 5
          </Typography>
        </Box>


        {/* Course Objectives */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>
            Course Objectives
          </Typography>
          <Typography variant="body2">{objectives}</Typography>
        </Box>
        {/*Course sections*/}
        <SectionData courseId={_id}>

        </SectionData>
        {/* Sections List */}
        {/* <Box >
          {sectionData .map((section: any, index: any) => (
            <CourseSection key={index} section={section} />
          ))}
        </Box> */}
      </CardContent>
    </Card>
  );
};

const CourseShow = () => (
  <Show>
    <SimpleCourseShow />
  </Show>
);

export default CourseShow;
