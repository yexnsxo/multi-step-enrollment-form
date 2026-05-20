// 수강생 정보 입력 단계 컴포넌트
function ApplicantStep() {
  return (
    <section className="space-y-6">
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
            수강 동기
          </label>
          <textarea
            id="motivation"
            placeholder="수강 동기를 입력해주세요."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </div>
      </div>
    </section>
  );
}

export default ApplicantStep;
