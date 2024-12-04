export interface ILessonLearn {
    _id: string;
    id: string;
    ordinal_number: number;
    owner: string;
    type: string;
    video_url: string;
    title: string;
    documents: any[];
    duration?: string;
    description?: string;
  }
  
  export interface IExerciseLearn {
    _id: string;
    id: string;
    ordinal_number: number;
    owner: string;
    type: string;
    question: any[];
    title: string;
    description?: string;
  }




  export interface ISectionLearn {
    _id: string;
    id: string;
    ordinal_number: number;
    owner: string;
    title: string;
    lessons: ILessonLearn[] | IExerciseLearn[];
  }



  export interface IReview {
    _id: string;         // ID của đánh giá
    course: string;      // ID khóa học mà đánh giá liên quan
    rating: number;      // Điểm đánh giá (thường là 1-5)
    comment: string;     // Bình luận của người đánh giá
    created_at: string;  // Thời gian tạo đánh giá
    updated_at: string;  // Thời gian cập nhật đánh giá
    owner: string;       // ID người sở hữu đánh giá (người dùng đánh giá)
  }
  