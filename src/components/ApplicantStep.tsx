import { useState, useRef } from "react";
import type { EnrollmentType } from "../types/enrollment";
import type { Participant } from "../types/applicant";
import { formatPhoneNumber } from "../utils/format";
import {
  areParticipantsValid,
  hasDuplicateEmails,
  isValidEmail,
} from "../utils/validation";

interface ApplicantStepProps {
  enrollmentType: EnrollmentType | null;
  applicant: {
    name: string;
    email: string;
    phone: string;
    motivation: string;
  };
  onChangeApplicant: (applicant: {
    name: string;
    email: string;
    phone: string;
    motivation: string;
  }) => void;
  groupInfo: {
    groupName: string;
    headCount: number;
    participants: Participant[];
  };
  onChangeGroupInfo: (groupInfo: {
    groupName: string;
    headCount: number;
    participants: Participant[];
  }) => void;
  onPrev: () => void;
  onNext: () => void;
}

// 신청 정보 입력 단계 컴포넌트
function ApplicantStep({
  enrollmentType,
  applicant,
  onChangeApplicant,
  groupInfo,
  onChangeGroupInfo,
  onPrev,
  onNext,
}: ApplicantStepProps) {
  const [toastMessage, setToastMessage] = useState("");
  const toastTimerRef = useRef<number | null>(null);

  // 토스트 함수
  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage("");
    }, 2000);
  };

  // 신청 인원 변경 시 참가자 입력 배열 길이 조정
  const updateHeadCount = (value: number) => {
    const getNextParticipants = (targetCount: number) => {
      return groupInfo.participants.slice(0, targetCount).concat(
        Array.from(
          {
            length: Math.max(0, targetCount - groupInfo.participants.length),
          },
          () => ({ name: "", email: "" }),
        ),
      );
    };

    if (value < 2) {
      onChangeGroupInfo({
        ...groupInfo,
        headCount: 2,
        participants: getNextParticipants(2),
      });
      showToast("단체 신청은 최소 2명부터 가능해요!");
      return;
    }

    if (value > 10) {
      onChangeGroupInfo({
        ...groupInfo,
        headCount: 10,
        participants: getNextParticipants(10),
      });
      showToast("최대 10명까지만 신청할 수 있어요!");
      return;
    }

    onChangeGroupInfo({
      ...groupInfo,
      headCount: value,
      participants: getNextParticipants(value),
    });
  };

  // 공통 정보 검증
  const isNameValid = applicant.name.trim().length >= 2; // 공백 제거 후 2글자 이상
  const isEmailValid = isValidEmail(applicant.email); // example@mail.com 형태
  const isPhoneValid = /^010-\d{4}-\d{4}$/.test(applicant.phone); // 010-1234-5678 형태

  // 단체 정보 검증
  const isGroupEnrollment = enrollmentType === "group";
  const isGroupNameValid = groupInfo.groupName.trim().length > 0;

  const hasDuplicateParticipantEmail = hasDuplicateEmails(
    groupInfo.participants,
  );

  const isGroupInfoValid =
    isGroupNameValid &&
    areParticipantsValid(groupInfo.participants) &&
    !hasDuplicateParticipantEmail;

  const isBasicInfoValid = isNameValid && isEmailValid && isPhoneValid;

  const canGoNext = isGroupEnrollment
    ? isBasicInfoValid && isGroupInfoValid
    : isBasicInfoValid;

  return (
    <section className="space-y-6">
      {/* 토스트 메시지 */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-red-100 px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg">
          🚨 {toastMessage}
        </div>
      )}
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
          [2단계] 신청 정보 입력 ✔️
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isGroupEnrollment
            ? "대표 신청자분의 정보를 입력해주세요."
            : "수강 신청에 필요한 기본 정보를 입력해주세요."}
        </p>
      </div>

      {/* 기본 정보 입력 폼 */}
      <div className="space-y-4">
        {/* 이름 입력 */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            이름
          </label>
          <input
            id="name"
            type="text"
            value={applicant.name}
            onChange={(event) =>
              onChangeApplicant({
                ...applicant,
                name: event.target.value,
              })
            }
            placeholder="이름을 입력해주세요."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </div>

        {/* 이메일 입력 */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={applicant.email}
            onChange={(event) =>
              onChangeApplicant({
                ...applicant,
                email: event.target.value,
              })
            }
            placeholder="example@email.com"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </div>

        {/* 전화번호 입력 */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            전화번호
          </label>
          <input
            id="phone"
            type="tel"
            value={applicant.phone}
            onChange={(event) =>
              onChangeApplicant({
                ...applicant,
                phone: formatPhoneNumber(event.target.value),
              })
            }
            maxLength={13}
            placeholder="010-1234-5678"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </div>

        {/* 수강 동기 입력 */}
        <div>
          <label
            htmlFor="motivation"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            수강 동기 <span className="text-gray-400">(선택)</span>
          </label>
          <textarea
            id="motivation"
            value={applicant.motivation}
            onChange={(event) =>
              onChangeApplicant({
                ...applicant,
                motivation: event.target.value,
              })
            }
            placeholder="수강 동기를 입력해주세요."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* 단체 신청 추가 정보 */}
      {isGroupEnrollment && (
        <div className="space-y-4 rounded-2xl border border-blue-100 bg-blue-50 p-5">
          <div>
            <h3 className="font-bold text-blue-900">단체 신청 정보</h3>
            <p className="mt-1 text-sm text-blue-700">
              단체 신청에 필요한 추가 정보를 입력해주세요.
            </p>
          </div>

          {/* 단체명 입력 */}
          <div>
            <label
              htmlFor="groupName"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              단체명
            </label>
            <input
              id="groupName"
              type="text"
              value={groupInfo.groupName}
              onChange={(event) =>
                onChangeGroupInfo({
                  ...groupInfo,
                  groupName: event.target.value,
                })
              }
              placeholder="단체명을 입력해주세요."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
            />
          </div>

          {/* 신청 인원 입력 */}
          <div>
            <label
              htmlFor="headCount"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              신청 인원
            </label>
            <input
              id="headCount"
              type="number"
              value={groupInfo.headCount}
              onChange={(event) => updateHeadCount(Number(event.target.value))}
              placeholder="2명 이상 입력해주세요."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600"
            />
          </div>

          {/* 참가자 명단 입력 */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-800">참가자 명단</h4>
            <p className="text-sm text-blue-700">
              실제 수강할 참가자 정보를 입력해주세요. 대표 신청자가 수강생인
              경우에도 참가자 명단에 포함해주세요.
            </p>
            <div className="space-y-3">
              {groupInfo.participants.map((participant, index) => {
                const participantNumber = index + 1;
                return (
                  <div
                    key={participantNumber}
                    className="grid gap-3 rounded-xl border border-blue-100 bg-white p-4 sm:grid-cols-2"
                  >
                    <div>
                      <label
                        htmlFor={`participant-name-${participantNumber}`}
                        className="mb-2 block text-sm font-semibold text-gray-800"
                      >
                        참가자 {participantNumber} 이름
                      </label>
                      <input
                        id={`participant-name-${participantNumber}`}
                        type="text"
                        value={participant.name}
                        onChange={(event) => {
                          const nextParticipants = [...groupInfo.participants];
                          nextParticipants[index] = {
                            ...nextParticipants[index],
                            name: event.target.value,
                          };
                          onChangeGroupInfo({
                            ...groupInfo,
                            participants: nextParticipants,
                          });
                        }}
                        placeholder="이름"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`participant-email-${participantNumber}`}
                        className="mb-2 block text-sm font-semibold text-gray-800"
                      >
                        참가자 {participantNumber} 이메일
                      </label>
                      <input
                        id={`participant-email-${participantNumber}`}
                        type="email"
                        value={participant.email}
                        onChange={(event) => {
                          const nextParticipants = [...groupInfo.participants];
                          nextParticipants[index] = {
                            ...nextParticipants[index],
                            email: event.target.value,
                          };
                          onChangeGroupInfo({
                            ...groupInfo,
                            participants: nextParticipants,
                          });
                        }}
                        placeholder="example@email.com"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
                      />
                    </div>
                  </div>
                );
              })}
              {hasDuplicateParticipantEmail && (
                <p className="text-sm font-medium text-red-600">
                  참가자 이메일은 중복될 수 없어요!
                </p>
              )}
            </div>
          </div>
        </div>
      )}

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

export default ApplicantStep;
