import type { Course } from "../types/course";
import type { EnrollmentType } from "../types/enrollment";
import type { Participant } from "../types/applicant";

type SubmitErrorCode = "COURSE_FULL" | "DUPLICATE_ENROLLMENT" | "INVALID_INPUT";

interface SubmitError {
  code: SubmitErrorCode;
  message: string;
  details?: Record<string, string>;
}

interface ConfirmStepProps {
  selectedCourse: Course | null;
  enrollmentType: EnrollmentType | null;
  applicant: {
    name: string;
    email: string;
    phone: string;
    motivation: string;
  };
  groupInfo: {
    groupName: string;
    contactPhone: string;
    headCount: number;
    participants: Participant[];
  };
  agreedToTerms: boolean;
  onChangeAgreedToTerms: (checked: boolean) => void;
  onEditCourse: () => void;
  onEditApplicant: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: SubmitError | null;
}

// 신청 내용 확인 단계 컴포넌트
function ConfirmStep({
  selectedCourse,
  enrollmentType,
  applicant,
  groupInfo,
  agreedToTerms,
  onChangeAgreedToTerms,
  onEditCourse,
  onEditApplicant,
  onPrev,
  onSubmit,
  isSubmitting,
  submitError,
}: ConfirmStepProps) {
  const enrollmentTypeLabel =
    enrollmentType === "group" ? "단체 신청" : "개인 신청";

  return (
    <section className="space-y-6">
      {/* 이전 단계 버튼 */}
      <div>
        <button
          type="button"
          onClick={onPrev}
          className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          ← 이전 단계로
        </button>
      </div>

      {/* 상단 안내 영역 */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          [3단계] 신청 내용 확인 ✔️
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          선택한 강의와 신청 유형을 확인해주세요.
        </p>
      </div>

      {/* 선택한 강의 정보 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-bold text-gray-900">선택한 강의</h3>
          <button
            type="button"
            onClick={onEditCourse}
            className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
          >
            수정
          </button>
        </div>

        {selectedCourse ? (
          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">강의명:</span>{" "}
              {selectedCourse.title}
            </p>
            <p>
              <span className="font-semibold">가격:</span>{" "}
              {selectedCourse.price.toLocaleString()}원
            </p>
            <p>
              <span className="font-semibold">일정:</span>{" "}
              {selectedCourse.startDate} ~ {selectedCourse.endDate}
            </p>
            <p>
              <span className="font-semibold">강사:</span>{" "}
              {selectedCourse.instructor}
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-red-600">
            선택한 강의 정보가 없습니다.
          </p>
        )}
      </div>

      {/* 신청 유형 정보 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-bold text-gray-900">신청 유형</h3>
          <button
            type="button"
            onClick={onEditCourse}
            className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
          >
            수정
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-700">{enrollmentTypeLabel}</p>
      </div>

      {/* 신청자 정보 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-bold text-gray-900">
            {enrollmentType === "group" ? "대표 신청자 정보" : "신청자 정보"}
          </h3>
          <button
            type="button"
            onClick={onEditApplicant}
            className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
          >
            수정
          </button>
        </div>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">이름:</span> {applicant.name}
          </p>
          <p>
            <span className="font-semibold">이메일:</span> {applicant.email}
          </p>
          <p>
            <span className="font-semibold">전화번호:</span> {applicant.phone}
          </p>
          <p>
            <span className="font-semibold">수강 동기:</span>{" "}
            {applicant.motivation.trim() || "작성하지 않음"}
          </p>
        </div>
      </div>

      {/* 단체 신청 정보 */}
      {enrollmentType === "group" && (
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-bold text-gray-900">단체 신청 정보</h3>
            <button
              type="button"
              onClick={onEditApplicant}
              className="cursor-pointer text-sm font-semibold text-blue-600 hover:underline"
            >
              수정
            </button>
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-700">
            <p>
              <span className="font-semibold">단체명:</span>{" "}
              {groupInfo.groupName}
            </p>
            <p>
              <span className="font-semibold">담당자 연락처:</span>{" "}
              {groupInfo.contactPhone}
            </p>
            <p>
              <span className="font-semibold">신청 인원:</span>{" "}
              {groupInfo.headCount}명
            </p>
          </div>

          <div className="mt-5 space-y-3">
            <h4 className="text-sm font-bold text-gray-800">참가자 명단</h4>
            <div className="space-y-2">
              {groupInfo.participants.map((participant, index) => (
                <div
                  key={`${participant.email}-${index}`}
                  className="rounded-xl bg-gray-50 p-4 text-sm text-gray-700"
                >
                  <p>
                    <span className="font-semibold">참가자 {index + 1}:</span>{" "}
                    {participant.name}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">이메일:</span>{" "}
                    {participant.email}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 이용약관 동의 */}
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(event) => onChangeAgreedToTerms(event.target.checked)}
          className="mt-1 h-4 w-4 cursor-pointer"
        />
        <span className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">
            이용약관 및 개인정보 수집
          </span>
          에 동의합니다. <span className="text-red-500">(필수)</span>
        </span>
      </label>

      {/* 제출 에러 메시지 */}
      {submitError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-bold text-red-700">
            {submitError.message}
          </p>

          {submitError.code === "INVALID_INPUT" && submitError.details && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-600">
              {Object.entries(submitError.details).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-xs text-red-500">
            작성하신 정보는 유지됩니다. 안내 내용을 확인한 뒤 다시 시도해주세요!
          </p>
        </div>
      )}

      {/* 제출 버튼 */}
      <div className="flex justify-end border-t border-gray-200 pt-6">
        <button
          type="button"
          disabled={!agreedToTerms || isSubmitting}
          onClick={onSubmit}
          className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
            agreedToTerms && !isSubmitting
              ? "cursor-pointer bg-gray-900 text-white hover:bg-gray-800"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }`}
        >
          {isSubmitting ? "제출 중..." : "제출"}
        </button>
      </div>
    </section>
  );
}

export default ConfirmStep;
