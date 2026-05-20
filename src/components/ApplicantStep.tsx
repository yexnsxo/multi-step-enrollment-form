import { useState } from "react";

interface ApplicantStepProps {
  onPrev: () => void;
}

// 수강생 정보 입력 단계 컴포넌트
function ApplicantStep({ onPrev }: ApplicantStepProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [motivation, setMotivation] = useState("");

  // 전화번호 010-0000-0000 형태로 자동 포맷팅
  const formatPhoneNumber = (value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");
    if (onlyNumbers.length <= 3) {
      return onlyNumbers;
    }
    if (onlyNumbers.length <= 7) {
      return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    }
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
  };

  const isNameValid = name.trim().length >= 2; // 공백 제거 후 2글자 이상
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // example@email.com 형태
  const isPhoneValid = /^010-\d{4}-\d{4}$/.test(phone); // 010-1234-5678 형태

  const canGoNext = isNameValid && isEmailValid && isPhoneValid;
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
          [2단계] 수강생 정보 입력 ✔️
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          수강 신청에 필요한 기본 정보를 입력해주세요.
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
            value={name}
            onChange={(event) => setName(event.target.value)}
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={phone}
            onChange={(event) =>
              setPhone(formatPhoneNumber(event.target.value))
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
            value={motivation}
            onChange={(event) => setMotivation(event.target.value)}
            placeholder="수강 동기를 입력해주세요."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </div>
      </div>

      {/* 다음 단계 버튼 */}
      <div className="flex justify-end border-t border-gray-200 pt-6">
        <button
          type="button"
          disabled={!canGoNext}
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
