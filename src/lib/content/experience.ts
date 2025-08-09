export type Experience = {
  company: string;
  role: string;
  start: string; // "YYYY-MM"
  end?: string; // "YYYY-MM" ou "present"
  duration?: string; // ex. "04 / 2024 — Present" (si fourni côté contenu)
  logo?: string; // chemin local ou URL distante
  url?: string;
};

export const work: Experience[] = [
  {
    company: "Astree Software",
    role: "Backend Developer",
    start: "2025-02",
    end: "2025-08",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGGKghGT0b6HA/company-logo_100_100/company-logo_100_100/0/1722346015738/astree_software_logo?e=1757548800&v=beta&t=zXTdsQYd93tKfoRJWA2zqd6MuJ8CDqsqylhDKG3gCqs",
    url: "https://www.astree-software.fr/en/",
  },
  {
    company: "Solidarity World",
    role: "DevOps (Freelance)",
    start: "2025-01",
    end: "2025-05",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQE-EAs9BrJYpA/company-logo_200_200/company-logo_200_200/0/1697330819330/solidarity_global_world_logo?e=1757548800&v=beta&t=cC7AoHBVDgJ5qGnQH-1UVSzgvP7YTXU6nd5mdERUpUs",
    url: "#",
  },
  {
    company: "SCI2M",
    role: "Backend Developer",
    start: "2024-05",
    end: "2024-09",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQGIkXe8HWszVg/company-logo_100_100/company-logo_100_100/0/1630566434921?e=1757548800&v=beta&t=Lac7pkhUdQmTxepjWSOktwbjQDxeey8u_isdyjlW8rE",
    url: "https://sci2m.com/",
  },
];
