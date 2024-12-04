import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import axios from 'axios';

interface Document {
  title: string;
  file_url: string;
  description: string;
}

interface LessonCardProps {
  lesson_id: string;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson_id }) => {
  const [lessonData, setLessonData] = useState<any>(null); // Store fetched lesson data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(''); // For error handling

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await axios.get(`http://dev.brightora.online:8080/api/v1/courses/lessons/get_by_id/${lesson_id}`);
        setLessonData(response.data); // Update state with the lesson data
        console.log("Lesson Data:", response.data);
      } catch (err) {
        setError('Error fetching lesson details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonData();
  }, [lesson_id]); // Fetch when lesson_id changes

  if (loading) return <Typography>Loading...</Typography>; // Show loading state
  if (error) return <Typography color="error">{error}</Typography>; // Show error message if any

  // Destructure lessonData if it's available
  const { title, description, video_url, documents } = lessonData || {};

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>

        {video_url && (
          <Box sx={{ marginBottom: 2 }}>
            <video width="100%" controls>
              <source src={video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        )}

        {documents?.length > 0 && (
          <>
            <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
              Documents:
            </Typography>
            {documents.map((doc: Document, index: number) => (
              <Box key={index} sx={{ marginBottom: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer">{doc.title}</a>
                </Typography>
                <Typography variant="body2" color="text.secondary">{doc.description}</Typography>
              </Box>
            ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LessonCard;
