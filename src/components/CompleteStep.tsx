import type { Course } from "../types/course";
import type { EnrollmentType } from "../types/enrollment";
import type { Participant } from "../types/applicant";

interface CompleteStepProps {
  enrollmentId: string;
  selectedCourse: Course | null;
  enrollmentType: EnrollmentType | null;
  applicant: {
    name: string;
    email: string;
    phone: string;
    motivation: string;
  };
  groupInfo: {
    organizationName: string;
    contactPerson: string;
    headCount: number;
    participants: Participant[];
  };
}

// 신청 완료 단계 컴포넌트
function CompleteStep({
  enrollmentId,
  selectedCourse,
  enrollmentType,
  applicant,
  groupInfo,
}: CompleteStepProps) {
  const isGroupEnrollment = enrollmentType === "group";
  const enrollmentTypeLabel = isGroupEnrollment ? "단체 신청" : "개인 신청";
  const headCount = isGroupEnrollment ? groupInfo.headCount : 1;
  const totalPrice = selectedCourse ? selectedCourse.price * headCount : 0;

  return (
    <section className="space-y-6 text-center">
      {/* 완료 메시지 */}
      <div className="rounded-3xl bg-blue-50 p-8">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          수강 신청이 완료되었습니다!
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          입력하신 신청 정보를 바탕으로 수강 신청이 접수되었습니다.
        </p>

        {/* 신청 번호 */}
        <div className="mt-5 rounded-2xl bg-white p-4">
          <p className="text-sm font-semibold text-gray-500">신청 번호</p>
          <p className="mt-1 text-xl font-bold text-blue-600">{enrollmentId}</p>
        </div>
      </div>

      {/* 신청 요약 정보 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-left">
        <h3 className="font-bold text-gray-900">신청 요약</h3>
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <p>
            <span className="font-semibold">강의명:</span>{" "}
            {selectedCourse?.title ?? "선택한 강의 정보 없음"}
          </p>
          <p>
            <span className="font-semibold">신청 유형:</span>{" "}
            {enrollmentTypeLabel}
          </p>
          <p>
            <span className="font-semibold">신청자:</span> {applicant.name}
          </p>
          <p>
            <span className="font-semibold">이메일:</span> {applicant.email}
          </p>
          <p>
            <span className="font-semibold">전화번호:</span> {applicant.phone}
          </p>
          <p>
            <span className="font-semibold">신청 인원:</span> {headCount}명
          </p>
          <p>
            <span className="font-semibold">총 금액:</span>{" "}
            {totalPrice.toLocaleString()}원
          </p>

          {isGroupEnrollment && (
            <>
              <p>
                <span className="font-semibold">단체명:</span>{" "}
                {groupInfo.organizationName}
              </p>
              <p>
                <span className="font-semibold">담당자 연락처:</span>{" "}
                {groupInfo.contactPerson}
              </p>
              <p>
                <span className="font-semibold">참가자 수:</span>{" "}
                {groupInfo.participants.length}명
              </p>
            </>
          )}
        </div>
      </div>

      {/* 안내 문구 */}
      <p className="mt-2 text-sm text-gray-600">
        신청 내역은 담당자 확인 후 입력하신 이메일 또는 전화번호로 안내됩니다.
      </p>
    </section>
  );
}

export default CompleteStep;
