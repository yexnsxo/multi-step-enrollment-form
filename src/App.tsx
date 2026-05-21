import "./App.css";
import { useState, useEffect, useRef } from "react";
import ApplicantStep from "./components/ApplicantStep";
import CourseStep from "./components/CourseStep";
import type { Course } from "./types/course";
import type { EnrollmentType } from "./types/enrollment";
import ConfirmStep from "./components/ConfirmStep";
import CompleteStep from "./components/CompleteStep";

type SubmitErrorCode = "COURSE_FULL" | "DUPLICATE_ENROLLMENT" | "INVALID_INPUT";

interface SubmitError {
  code: SubmitErrorCode;
  message: string;
  details?: Record<string, string>;
}

function App() {
  // 강의 선택 단계
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollmentType, setEnrollmentType] = useState<EnrollmentType | null>(
    null,
  );

  const pageTopRef = useRef<HTMLDivElement | null>(null);

  // 수강생 정보 입력 단계
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    motivation: "",
  });
  const [groupInfo, setGroupInfo] = useState({
    organizationName: "",
    contactPerson: "",
    headCount: 2,
    participants: [
      { name: "", email: "" },
      { name: "", email: "" },
    ],
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // 제출 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<SubmitError | null>(null);
  const [enrollmentId, setEnrollmentId] = useState("");

  // 수강 신청 mock 제출 함수
  const handleSubmitEnrollment = () => {
    setIsSubmitting(true);
    setSubmitError(null);

    setTimeout(() => {
      const submitResult = Math.random();

      // 정원 초과 에러
      if (submitResult < 0.2) {
        setSubmitError({
          code: "COURSE_FULL",
          message:
            "선택한 강의의 정원이 마감되었습니다. 다른 강의를 선택해주세요.",
        });
        setIsSubmitting(false);
        return;
      }

      // 중복 신청 에러
      if (submitResult < 0.4) {
        setSubmitError({
          code: "DUPLICATE_ENROLLMENT",
          message: "이미 신청한 강의입니다.",
        });
        setIsSubmitting(false);
        return;
      }

      // 입력값 에러
      if (submitResult < 0.6) {
        setSubmitError({
          code: "INVALID_INPUT",
          message: "작성하신 내용을 다시 확인해주세요.",
          details: {
            name: "이름을 다시 확인해주세요.",
            email: "이메일 형식을 다시 확인해주세요.",
            phone: "전화번호 형식을 다시 확인해주세요.",
          },
        });
        setIsSubmitting(false);
        return;
      }

      // 제출 성공
      const newEnrollmentId = `LC-${Date.now()}`;

      setEnrollmentId(newEnrollmentId);
      setIsSubmitting(false);
      setCurrentStep(4);
    }, 800);
  };

  const steps = [
    { step: 1, label: "강의 선택" },
    { step: 2, label: "정보 입력" },
    { step: 3, label: "확인 및 제출" },
    { step: 4, label: "신청 완료" },
  ];

  useEffect(() => {
    pageTopRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentStep]);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div ref={pageTopRef} />
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

        {/* 신청 단계 인디케이터 */}
        <div className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {steps.map(({ step, label }) => {
              const isActive = currentStep === step;
              const isCompleted = currentStep > step;
              return (
                <li key={step} className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : isCompleted
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isCompleted ? "✓" : step}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{step}단계</p>
                    <p
                      className={`text-sm font-semibold ${
                        isActive
                          ? "text-blue-700"
                          : isCompleted
                            ? "text-gray-700"
                            : "text-gray-400"
                      }`}
                    >
                      {label}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

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
            <ApplicantStep
              enrollmentType={enrollmentType}
              applicant={applicant}
              onChangeApplicant={setApplicant}
              groupInfo={groupInfo}
              onChangeGroupInfo={setGroupInfo}
              onPrev={() => setCurrentStep(1)}
              onNext={() => setCurrentStep(3)}
            />
          )}
          {currentStep === 3 && (
            <ConfirmStep
              selectedCourse={selectedCourse}
              enrollmentType={enrollmentType}
              applicant={applicant}
              groupInfo={groupInfo}
              agreedToTerms={agreedToTerms}
              onChangeAgreedToTerms={setAgreedToTerms}
              onEditCourse={() => setCurrentStep(1)}
              onEditApplicant={() => setCurrentStep(2)}
              onPrev={() => setCurrentStep(2)}
              onSubmit={handleSubmitEnrollment}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}
          {currentStep === 4 && (
            <CompleteStep
              enrollmentId={enrollmentId}
              selectedCourse={selectedCourse}
              enrollmentType={enrollmentType}
              applicant={applicant}
              groupInfo={groupInfo}
            />
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
