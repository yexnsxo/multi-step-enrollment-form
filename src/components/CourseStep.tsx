import { useState } from "react";
import { categories, courses } from "../data/courses";
import type { CourseCategory, Course } from "../types/course";

// 강의 선택 단계 컴포넌트
function CourseStep() {
  type CategoryFilter = CourseCategory | "all";
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <section className="space-y-6 m-5">
      {/* 상단 안내 영역 */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          [1단계] 강의 선택 ✔️
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          수강할 강의를 선택해주세요.
        </p>
      </div>

      {/* 카테고리 필터 */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">카테고리</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.value;
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setSelectedCategory(category.value)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white hover:cursor-pointer"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:cursor-pointer"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 강의 목록 */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredCourses.map((course) => {
          const isSelected = selectedCourse?.id === course.id;

          return (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(isSelected ? null : course)}
              className={`cursor-pointer rounded-2xl border bg-white p-5 shadow-sm transition ${
                isSelected
                  ? "border-blue-600 ring-2 ring-blue-100"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <p className="text-xs font-semibold text-blue-600">
                {course.category}
              </p>
              <h3 className="mt-2 text-lg font-bold text-gray-900">
                {course.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{course.description}</p>

              {/* 강의 상세 정보 */}
              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p>강사: {course.instructor}</p>
                <p>가격: {course.price.toLocaleString()}원</p>
                <p>
                  일정: {course.startDate} ~ {course.endDate}
                </p>
                <p>
                  신청 인원: {course.currentEnrollment} / {course.maxCapacity}
                </p>
                <div className="mt-5">
                  <span
                    className={`inline-flex w-full justify-center rounded-xl px-4 py-3 text-sm font-semibold ${
                      isSelected
                        ? "bg-blue-700 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {isSelected ? "선택됨" : "강의 선택"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 선택한 강의 정보 */}
      {selectedCourse && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <h3 className="font-bold text-blue-900">선택한 강의</h3>
          <p className="mt-2 text-gray-800">{selectedCourse.title}</p>
          <p className="mt-1 text-sm text-gray-600">
            {selectedCourse.price.toLocaleString()}원 ·{" "}
            {selectedCourse.startDate} ~ {selectedCourse.endDate}
          </p>
        </div>
      )}
    </section>
  );
}

export default CourseStep;
