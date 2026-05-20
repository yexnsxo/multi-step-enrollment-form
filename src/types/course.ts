// 강의 카테고리
export type CourseCategory =
  | "development"
  | "design"
  | "marketing"
  | "business";

// 강의 정보
export interface Course {
  id: string;
  title: string;
  description: string;
  category: CourseCategory;
  price: number;
  maxCapacity: number;
  currentEnrollment: number;
  startDate: string;
  endDate: string;
  instructor: string;
}
