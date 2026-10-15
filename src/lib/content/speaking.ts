export type Talk = {
  id: string;
  title: string;
  event: string;
  date: string; // "YYYY-MM"
  language?: string;
  description: string;
  url?: string;
};

export const talks: Talk[] = [
  {
    id: "aws-student-community-day-iusjc-2026",
    title:
      "Haute Disponibilité & Résilience Cloud : le scénario de la panne de 14h02",
    event: "AWS Student Community Day — IUSJC 2026",
    date: "2026-09",
    language: "French",
    description:
      "A talk built around a single outage at 14:02. It follows one application from a monolith on a single EC2 instance to a distributed, stateless AWS architecture, and shows what each step buys you when the instance disappears.",
    url: "https://github.com/AristideWafo/aws-student-community-day-iusjc-2026",
  },
];
