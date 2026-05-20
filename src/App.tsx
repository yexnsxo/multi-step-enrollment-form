import "./App.css";
import { useState } from "react";
import ApplicantStep from "./components/ApplicantStep";
import CourseStep from "./components/CourseStep";
import type { Course } from "./types/course";
import type { EnrollmentType } from "./types/enrollment";

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollmentType, setEnrollmentType] = useState<EnrollmentType | null>(
    null,
  );
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        {/* 페이지 상단 */}
        <header className="mb-8">
          <p className="text-sm font-semibold text-blue-600">
            LiveClass Enrollment
          </p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            라이브클래스 수강 신청
          </h1>
          <p className="mt-3 text-gray-600">
            원하는 강의를 선택하고 신청 정보를 입력해주세요.
          </p>
        </header>

        {/* 신청 단계 영역 */}
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          {currentStep === 1 && (
            <CourseStep
              selectedCourse={selectedCourse}
              enrollmentType={enrollmentType}
              onSelectCourse={setSelectedCourse}
              onSelectEnrollmentType={setEnrollmentType}
              onNext={() => setCurrentStep(2)}
            />
          )}
          {currentStep === 2 && (
            <ApplicantStep onPrev={() => setCurrentStep(1)} />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
