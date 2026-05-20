import type { Participant } from "../types/applicant";

// 이메일 검증 함수 (example@email.com 형태)
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 이름 2~20자 검증
export const isValidName = (name: string) => {
  const trimmedName = name.trim();
  return trimmedName.length >= 2 && trimmedName.length <= 20;
};

// 참가자 정보 검증
export const areParticipantsValid = (participants: Participant[]) => {
  return participants.every(
    (participant) =>
      isValidName(participant.name) && isValidEmail(participant.email),
  );
};

// 참가자 이메일 중복 검증
export const hasDuplicateEmails = (participants: Participant[]) => {
  const participantEmails = participants
    .map((participant) => participant.email.trim())
    .filter(Boolean);
  return participantEmails.length !== new Set(participantEmails).size;
};
