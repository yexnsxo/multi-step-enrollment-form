// 신청 완료 단계 컴포넌트
function CompleteStep() {
  return (
    <section className="space-y-6 text-center">
      {/* 완료 메시지 */}
      <div className="rounded-3xl bg-blue-50 p-8">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-4 text-2xl font-bold text-gray-900">
          수강 신청이 완료되었어요!
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          입력하신 신청 정보를 바탕으로 수강 신청이 접수되었습니다.
        </p>
      </div>

      {/* 안내 문구 */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 text-left">
        <h3 className="font-bold text-gray-900">다음 안내</h3>
        <p className="mt-2 text-sm text-gray-600">
          신청 내역은 담당자 확인 후 입력하신 이메일 또는 전화번호로 안내될
          예정입니다.
        </p>
      </div>
    </section>
  );
}

export default CompleteStep;
