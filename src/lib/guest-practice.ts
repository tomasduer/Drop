// Public practice content, deliberately separate from private campaign validators.
export const guestQuestions = [
  { question: "¿Cuál de estos álbumes es de LALI?", options: ["BRAVA", "Quimera", "Por cesárea"], answer: 0 },
  { question: "¿Quién lanzó Quimera?", options: ["Dillom", "María Becerra", "LALI"], answer: 1 },
  { question: "¿Quién lanzó Por cesárea?", options: ["TINI", "LALI", "Dillom"], answer: 2 },
];
export function guestPracticeResult(answers: number[]) {
  return { correct: guestQuestions.filter((q, i) => answers[i] === q.answer).length, total: guestQuestions.length, generalAward: 0, campaignAward: 0 };
}