import React, { useState } from "react";
import {
    ListItem,
    ListItemText,
    ListItemIcon,
    Box,
    Typography,
    Link,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    RadioGroup,
    CardContent,
    Card,
    List
} from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import {  ILessonLearn } from "./models/Course";



interface IAnswer {
    option_text: string;
    is_correct: boolean;
  }
  
  interface IQuestion {
    question_text: string;
    choices: IAnswer[];
  }
  
  interface IExerciseLearn {
    _id: string;
    title: string;
    description: string | null;
    questions: IQuestion[];
  }
  
  

interface ContentItemProps {
    lesson: ILessonLearn | IExerciseLearn;
    textColor: string;
    canReview: boolean;
    durationVideo: number;
}

const ContentItem: React.FC<ContentItemProps> = ({
    lesson,
    textColor,
    canReview,
    durationVideo,
}) => {
    const [openVideoModal, setOpenVideoModal] = useState(false);
    const [openQuizModal, setOpenQuizModal] = useState(false); // Modal cho bài tập
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Lưu chỉ mục câu hỏi hiện tại

  const goToNextQuestion = () => {
    if (currentQuestionIndex < lesson.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Chuyển đến câu hỏi tiếp theo
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1); // Quay lại câu hỏi trước
    }
  };

    const handleOpenVideo = () => {
        setOpenVideoModal(true);
    };

    const handleCloseVideo = () => {
        setOpenVideoModal(false);
    };

    const handleOpenQuiz = () => {
        setOpenQuizModal(true);
    };

    const handleCloseQuiz = () => {
        setOpenQuizModal(false);
    };

    return (
        <>
            <ListItem sx={{ justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ListItemIcon>
                        {lesson.type === "lesson" ? (
                            <VideoLibraryIcon sx={{ color: textColor }} />
                        ) : (
                            <QuizIcon sx={{ color: textColor }} onClick={handleOpenQuiz} />
                        )}
                    </ListItemIcon>
                    <ListItemText
                        primary={
                            canReview && lesson.type === "lesson" ? (
                                <Link
                                    variant="body1"
                                    onClick={handleOpenVideo}  // Khi nhấn vào link thì mở modal video
                                    sx={{
                                        color: textColor,
                                        textDecoration: "underline",
                                        "&:hover": { textDecoration: "none" },
                                        cursor: "pointer",
                                    }}
                                >
                                    {lesson.title}
                                </Link>
                            ) : (
                                lesson.title
                            )
                        }
                        primaryTypographyProps={{ color: textColor }}
                    />
                </Box>
                <Typography
                    variant="body2"
                    sx={{ color: textColor, minWidth: "50px", textAlign: "right" }}
                >
                    {durationVideo} min
                </Typography>
            </ListItem>

            {/* Dialog hiển thị video */}
            <Dialog open={openVideoModal} onClose={handleCloseVideo} maxWidth="md" fullWidth>
                <DialogTitle>{lesson.title}</DialogTitle>
                <DialogContent>
                    <video width="100%" controls>
                        <source src={(lesson as ILessonLearn).video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseVideo} color="primary">
                        Đóng
                    </Button>
                </DialogActions>
            </Dialog>



            {lesson.type === "excercise" && (
                  <Dialog open={openQuizModal} onClose={handleCloseQuiz}>
                  <DialogTitle>{lesson.title}</DialogTitle>
                  <DialogContent>
                    <Card sx={{ marginBottom: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {lesson.questions[currentQuestionIndex]?.question_text}
                        </Typography>
                        <List>
                          {lesson.questions[currentQuestionIndex]?.choices.map((choice, index) => (
                            <ListItem key={index}>
                              <ListItemText
                                primary={choice.option_text}
                                sx={{
                                  padding: "8px 16px",
                                  backgroundColor: "#f5f5f5",
                                  borderRadius: "4px",
                                  marginBottom: "8px",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
            
                    {/* Thêm mô tả bài học nếu có */}
                    {lesson.description && (
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {lesson.description}
                      </Typography>
                    )}
                  </DialogContent>
            
                  <DialogActions>
                    <Button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                      Previous
                    </Button>
                    <Button onClick={goToNextQuestion} disabled={currentQuestionIndex === lesson.questions.length - 1}>
                      Next
                    </Button>
                    <Button onClick={handleCloseQuiz}>Close</Button>
                  </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default ContentItem;
