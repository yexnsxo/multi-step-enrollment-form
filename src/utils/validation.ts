import type { Participant } from "../types/applicant";

// 이메일 검증 함수 (example@email.com 형태)
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 참가자 정보 검증
export const areParticipantsValid = (participants: Participant[]) => {
  return participants.every(
    (participant) =>
      participant.name.trim().length > 0 && isValidEmail(participant.email),
  );
};

// 참가자 이메일 중복 검증
export const hasDuplicateEmails = (participants: Participant[]) => {
  const participantEmails = participants
    .map((participant) => participant.email.trim())
    .filter(Boolean);
  return participantEmails.length !== new Set(participantEmails).size;
};
