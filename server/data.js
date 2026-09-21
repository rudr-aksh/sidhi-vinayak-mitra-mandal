// Placeholder content. Replace with your own, or load it from a database later.

export const projects = [
  {
    id: 1,
    name: "Harbor Books",
    summary: "Online bookshop with live inventory and a fast checkout.",
    stack: ["React", "Node.js", "PostgreSQL"],
    year: 2025,
  },
  {
    id: 2,
    name: "Tidewater Clinic",
    summary: "Appointment booking site with reminders by email.",
    stack: ["React", "Express"],
    year: 2025,
  },
  {
    id: 3,
    name: "Fieldnotes",
    summary: "Searchable internal knowledge base for a research team.",
    stack: ["React", "Node.js", "MongoDB"],
    year: 2024,
  },
];

export const services = [
  {
    id: 1,
    title: "Website design and build",
    description:
      "A complete multi-page site that is quick to load, easy to edit, and works on every screen size.",
    timeline: "3 to 6 weeks",
  },
  {
    id: 2,
    title: "Web apps with accounts and dashboards",
    description:
      "Sign-in, saved data, and admin screens, built with React on the front and Node.js behind it.",
    timeline: "6 to 12 weeks",
  },
  {
    id: 3,
    title: "APIs and backend work",
    description:
      "New REST APIs, or cleanup and speed-ups for an existing Node.js service.",
    timeline: "2 to 8 weeks",
  },
  {
    id: 4,
    title: "Hosting and care plan",
    description:
      "We deploy the site, watch it, apply updates, and fix problems as they come up.",
    timeline: "Monthly",
  },
];

// ---------- Portfolio ----------
// category must be one of: "Websites", "Web apps", "APIs"
// Add an `image` (a full URL or a file in client/public, e.g. "/images/harbor.jpg")
// to show a screenshot instead of the colored panel.
export const portfolio = [
  {
    id: 1,
    name: "Harbor Books",
    category: "Websites",
    year: 2025,
    summary: "Online bookshop with live inventory and a fast checkout.",
    details:
      "Rebuilt a local bookshop's slow site. Pages now load in under a second and stock levels update as items sell.",
    stack: ["React", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/",
  },
  {
    id: 2,
    name: "Tidewater Clinic",
    category: "Web apps",
    year: 2025,
    summary: "Appointment booking with email reminders.",
    details:
      "Patients pick a time slot and get a reminder the day before. Reception staff manage the calendar from one dashboard.",
    stack: ["React", "Express", "MongoDB"],
    liveUrl: "https://example.com",
    repoUrl: "",
  },
  {
    id: 3,
    name: "Fieldnotes",
    category: "Web apps",
    year: 2024,
    summary: "Searchable knowledge base for a research team.",
    details:
      "Team members write notes in a simple editor and find them again with full-text search and tags.",
    stack: ["React", "Node.js", "MongoDB"],
    liveUrl: "",
    repoUrl: "https://github.com/",
  },
  {
    id: 4,
    name: "Roastery Route",
    category: "Websites",
    year: 2024,
    summary: "Wholesale ordering portal for a coffee roaster.",
    details:
      "Cafe owners log in, repeat their last order in two clicks, and download invoices.",
    stack: ["React", "Node.js"],
    liveUrl: "https://example.com",
    repoUrl: "",
  },
  {
    id: 5,
    name: "Parcel Tracker API",
    category: "APIs",
    year: 2024,
    summary: "REST API that unifies tracking from three couriers.",
    details:
      "One endpoint returns the same tracking format no matter which courier ships the parcel. Responses are cached to stay within courier limits.",
    stack: ["Node.js", "Express", "Redis"],
    liveUrl: "",
    repoUrl: "https://github.com/",
  },
  {
    id: 6,
    name: "Studio Pass",
    category: "Websites",
    year: 2023,
    summary: "Class schedule and membership site for a yoga studio.",
    details:
      "Members browse the weekly timetable, book a spot, and manage their plan from their phone.",
    stack: ["React", "Express", "PostgreSQL"],
    liveUrl: "https://example.com",
    repoUrl: "",
  },
];

// ---------- Resume ----------
// Replace all of this with your own details.
export const resume = {
  name: "Alex Morgan",
  title: "Full-stack web developer",
  location: "Remote",
  email: "alex@brightline.example",
  website: "brightline.example",
  summary:
    "Web developer with 6 years of experience building fast React front ends and reliable Node.js APIs. I like clear code, small pull requests, and sites people can maintain without me.",
  experience: [
    {
      id: 1,
      role: "Senior web developer",
      company: "Brightline Studio",
      period: "2023 to present",
      points: [
        "Lead front-end and API work on client sites and web apps.",
        "Cut average page load time by 45% across three client projects.",
        "Mentor two junior developers through code review and pairing.",
      ],
    },
    {
      id: 2,
      role: "Web developer",
      company: "Northwind Digital",
      period: "2020 to 2023",
      points: [
        "Built and maintained 20+ React sites for small businesses.",
        "Designed a Node.js and Express booking API used by 5,000 customers.",
        "Moved deployments to GitHub Actions, shortening releases from an hour to five minutes.",
      ],
    },
    {
      id: 3,
      role: "Junior developer",
      company: "Pixel & Pine",
      period: "2018 to 2020",
      points: [
        "Turned design files into responsive HTML, CSS, and JavaScript.",
        "Fixed accessibility issues found in client audits.",
      ],
    },
  ],
  education: [
    {
      id: 1,
      title: "B.Sc. Computer Science",
      place: "State University",
      period: "2014 to 2018",
    },
  ],
  skills: [
    { group: "Front end", items: ["React", "JavaScript", "HTML and CSS", "Vite", "Accessibility"] },
    { group: "Back end", items: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"] },
    { group: "Tools", items: ["Git and GitHub", "Vercel", "Render", "Docker basics"] },
  ],
};
