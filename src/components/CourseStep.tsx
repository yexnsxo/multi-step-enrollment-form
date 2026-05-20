import { useState } from "react";
import { categories, courses } from "../data/courses";
import type { CourseCategory, Course } from "../types/course";
import type { EnrollmentType } from "../types/enrollment";

type CategoryFilter = CourseCategory | "all";
interface CourseStepProps {
  selectedCourse: Course | null;
  enrollmentType: EnrollmentType | null;
  onSelectCourse: (course: Course | null) => void;
  onSelectEnrollmentType: (type: EnrollmentType | null) => void;
  onNext: () => void;
}

// 강의 선택 단계 컴포넌트
function CourseStep({
  selectedCourse,
  enrollmentType,
  onSelectCourse,
  onSelectEnrollmentType,
  onNext,
}: CourseStepProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const canGoNext = selectedCourse !== null && enrollmentType !== null;

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
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
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
              onClick={() => onSelectCourse(isSelected ? null : course)}
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
      {/* 신청 유형 선택 */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800">신청 유형</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {/* 본인 신청 버튼 (1명) */}
          <button
            type="button"
            onClick={() =>
              onSelectEnrollmentType(
                enrollmentType === "personal" ? null : "personal",
              )
            }
            className={`cursor-pointer rounded-2xl border p-5 text-left transition ${
              enrollmentType === "personal"
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <p className="font-bold text-gray-900">개인 신청</p>
            <p className="mt-1 text-sm text-gray-600">
              해당 강의를 혼자 수강할 예정입니다.
            </p>
          </button>
          {/* 단체 신청 버튼 (2명 이상) */}
          <button
            type="button"
            onClick={() =>
              onSelectEnrollmentType(
                enrollmentType === "group" ? null : "group",
              )
            }
            className={`cursor-pointer rounded-2xl border p-5 text-left transition ${
              enrollmentType === "group"
                ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <p className="font-bold text-gray-900">단체 신청 (2 ~ 10명)</p>
            <p className="mt-1 text-sm text-gray-600">
              해당 강의를 단체로 수강할 예정입니다.
            </p>
          </button>
        </div>
      </div>
      {/* 다음 단계 버튼 */}
      <div className="flex justify-end border-t border-gray-200 pt-6">
        <button
          type="button"
          disabled={!canGoNext}
          onClick={onNext}
          className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
            canGoNext
              ? "cursor-pointer bg-gray-900 text-white hover:bg-gray-800"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }`}
        >
          다음 단계
        </button>
      </div>
    </section>
  );
}

export default CourseStep;
