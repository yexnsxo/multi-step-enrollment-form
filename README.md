# 라이브클래스 수강 신청 폼

## 프로젝트 개요

멀티 스텝 수강 신청 폼 구현 과제입니다.
강의 선택 → 수강생 정보 입력 → 확인 및 제출 → 신청 완료의 4단계 플로우로 구성됩니다.

---

## 기술 스택

| 항목          | 선택                         |
| ------------- | ---------------------------- |
| 언어          | TypeScript                   |
| 프레임워크    | React 19                     |
| 빌드 도구     | Vite                         |
| 스타일링      | Tailwind CSS v4              |
| 폼 상태 관리  | React `useState` (직접 구현) |
| 패키지 매니저 | npm                          |

---

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

---

## 프로젝트 구조

```
src/
├── components/
│   ├── CourseStep.tsx      # 1단계: 강의 선택 (카테고리 필터, 신청 유형 선택)
│   ├── ApplicantStep.tsx   # 2단계: 수강생 정보 입력 (개인/단체 조건부 필드)
│   ├── ConfirmStep.tsx     # 3단계: 확인 및 제출 (요약 표시, 이용약관 동의)
│   └── CompleteStep.tsx    # 4단계: 신청 완료 (신청 번호, 요약 정보)
├── types/
│   ├── course.ts           # Course, CourseCategory 타입
│   ├── applicant.ts        # Applicant, Participant, GroupInfo 타입
│   └── enrollment.ts       # EnrollmentType 타입
├── data/
│   └── courses.ts          # Mock 강의 데이터 및 카테고리 목록
├── utils/
│   ├── validation.ts       # 유효성 검증 함수 (이름, 이메일, 참가자 중복 등)
│   └── format.ts           # 전화번호 자동 포맷팅 함수
└── App.tsx                 # 루트 컴포넌트 (전체 폼 상태 관리, 스텝 전환)
```

---

## 요구사항 해석 및 가정

### 담당자 연락처 필드

API 스키마의 `group.contactPerson` 필드는 타입이 `string`으로 정의되어 있으나,
요구사항 명세에 "담당자 연락처 (필수)"로 명시되어 있어 **전화번호 값**을 저장하는 필드로 해석했습니다.

### 참가자 명단 범위

단체 신청 시 "신청 인원수만큼 참가자를 입력"하는 조건에 따라,
`headCount` 변경 시 참가자 입력 배열의 길이를 동적으로 조정하도록 구현했습니다.
기존에 입력된 데이터는 인원 축소 시 앞에서부터 보존하고 나머지를 잘라냅니다.

### 수강 동기 필드

"선택" 필드이므로 값이 없어도 다음 단계로 진행 가능하며,
확인 단계에서 미입력 시 "작성하지 않음"으로 표시됩니다.

---

## 설계 결정과 이유

### 폼 상태를 App.tsx 최상위에서 통합 관리

각 스텝 컴포넌트가 독립적으로 상태를 가질 경우, 스텝 간 이동 시 데이터가 초기화됩니다.
이를 방지하기 위해 `applicant`, `groupInfo`, `agreedToTerms` 등 모든 폼 상태를
`App.tsx`에서 관리하고 각 스텝 컴포넌트에 props로 전달했습니다.

### 유효성 검증 로직을 utils/로 분리

`isValidEmail`, `isValidName`, `areParticipantsValid`, `hasDuplicateEmails` 등
검증 함수를 `utils/validation.ts`에 분리했습니다.
UI 컴포넌트에서 검증 로직을 재사용하기 용이하고, 테스트 작성 시에도 유리합니다.

### 유효성 검증 시점

다음 단계 버튼을 `canGoNext` 조건으로 비활성화하여 스텝 전환 시 검증을 강제합니다.
필드 에러 메시지는 값을 한 글자 이상 입력한 이후부터 표시하여,
빈 폼 진입 시 에러가 먼저 노출되는 불쾌한 UX를 방지했습니다.

### Mock API 구현 방식

`handleSubmitEnrollment` 함수 내에서 `setTimeout`으로 800ms 지연 후
`Math.random()`으로 성공/에러 케이스를 분기합니다.
`COURSE_FULL`, `DUPLICATE_ENROLLMENT`, `INVALID_INPUT` 세 가지 에러 코드를 모두 재현합니다.

---

## 미구현 / 제약사항

### 비동기 강의 목록 로딩

현재 강의 데이터는 `src/data/courses.ts`에 하드코딩되어 있습니다.
실제 환경이라면 `useEffect`에서 API를 호출하고, 로딩 스피너와 에러 상태를 처리해야 합니다.

### 단체 → 개인 신청 전환 시 데이터 초기화

신청 유형을 변경할 때 기존에 입력한 단체 정보(`groupInfo`)가 초기화되지 않고 유지됩니다.
다시 단체 신청으로 전환하면 이전 데이터가 복원되는 장점이 있으나,
확인 대화상자를 통해 사용자에게 명시적으로 안내하는 것이 더 나은 UX입니다.

### blur 이벤트 기반 개별 필드 검증

현재는 값 입력 시작 여부(`length > 0`)로만 에러를 노출합니다.
필드에서 포커스가 벗어날 때(`onBlur`) 개별 검증을 트리거하면 더 정교한 UX가 가능합니다.

### 정원 마감 강의 UX

`currentEnrollment >= maxCapacity`인 강의에 대해 "마감" 뱃지 표시나 선택 비활성화가 없습니다.

---

## AI 활용 범위

본 과제 구현 전반에서 AI를 개발 보조 도구로 활용했습니다.

**AI 도움을 받은 부분:**

- 요구사항을 기능 단위로 분해하고 구현 우선순위 정리
- 컴포넌트 구조, 상태 관리 방식, 유효성 검증 로직 초기 구현
- API 스키마와 코드 필드명 불일치(`groupName` → `organizationName`, `contactPhone` → `contactPerson`) 발견 후 수정
- 커밋 메시지 작성 보조
- README 초안 작성 보조

**직접 담당한 부분:**

- 개발 서버를 직접 실행하며 UI/UX를 눈으로 확인하고 스타일 반복 수정
  (완료 화면 레이아웃, 신청 유형 UI, 안내 문구 등)
- AI가 구현한 코드를 요구사항과 직접 대조하여 불일치 항목 발견
- `contactPerson` 필드를 담당자 연락처(전화번호)로 해석해야 한다고 판단
- 이용약관 동의 체크박스 위치, 에러 메시지 노출 방식 등 UX 세부사항 직접 검토 및 피드백
