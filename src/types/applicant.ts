// 개인 신청자 기본 정보
export interface Applicant {
  name: string;
  email: string;
  phone: string;
  motivation?: string;
}

// 단체 신청 시 참가자 정보
export interface Participant {
  name: string;
  email: string;
}

// 단체 신청 추가 정보
export interface GroupInfo {
  organizationName: string;
  headCount: number;
  participants: Participant[];
  contactPerson: string;
}
