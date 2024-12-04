import { Box, CircularProgress } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import CourseSection from "./CourseSection";



const SectionData = ({ courseId }) => {
  const [sectionData, setSectionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API để lấy dữ liệu khi courseId thay đổi
  useEffect(() => {
    if (!courseId) return;

    const fetchCourseData = async () => {
      try {
        setLoading(true);  // Bắt đầu loading
        const response = await axios.get(`http://dev.brightora.online:8080/api/v1/courses/get_curriculum/${courseId}`);
        console.log("Section Data:", response.data);
        setSectionData(response.data);  // Lưu dữ liệu vào state
      } catch (err) {
        setError('Error fetching course details');
        console.error(err);
      } finally {
        setLoading(false);  // Kết thúc loading
      }
    };

    fetchCourseData();
  }, [courseId]);  // Gọi lại API khi courseId thay đổi

  if (loading) {
    return <CircularProgress />;  // Hiển thị loading spinner trong khi đang tải
  }

  
  return (
  <Box>
     {sectionData?.map((section:any, index:any) => (
        <CourseSection key={index} section={section} />
      ))}
  </Box>)
}
export default SectionData;