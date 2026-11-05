// Single source of truth about Aryan, used by both the chat widget and the
// Cloudflare Worker system prompt. Keep in sync with the on-site sections.

export const PROFILE = {
  name: 'Aryan Khatiwada',
  role: 'Associate Software Engineer',
  location: 'Kathmandu, Nepal',
  email: 'aryankhatiwoda9@gmail.com',
  phone: '+977 9818821006',
  github: 'https://github.com/Frrz23',
  linkedin: 'https://www.linkedin.com/in/aryan-khatiwoda',
  website: 'https://aryankhatiwada.com.np',
  summary:
    'Associate Software Engineer and BCA graduate with 8 months of professional ASP.NET Core experience building REST APIs and full-stack applications with C#, React.js, and SQL Server. Experienced in real-time systems (SignalR, WebSockets), background jobs, role-based access control, and Agile team delivery.'
};

export const EXPERIENCE = [
  {
    company: 'AMNIL Technologies Pvt. Ltd.',
    title: 'Intern → Associate Software Engineer',
    period: 'Sep 2025 – Apr 2026',
    highlights: [
      'Designed and developed RESTful APIs using ASP.NET Core and C#, delivering backend services for internal and client-facing applications.',
      'Modelled data and built database access with SQL Server and Entity Framework Core.',
      'Debugged, profiled, and optimized backend code through code reviews and performance tuning.',
      'Collaborated with cross-functional teams and senior engineers to ship features using Git and Agile practices.'
    ]
  }
];

export const PROJECTS = [
  {
    name: 'Sky Rush',
    live: 'https://skyrush.fun/',
    stack: 'React, Node.js, Express, Next.js, Socket.IO, Prisma, PostgreSQL, Supabase, Tailwind CSS',
    desc: 'A real-time multiplayer crash-style game platform (virtual coins only) with live game rounds over WebSockets, user accounts, wallet and bet-history tracking, and an admin dashboard.'
  },
  {
    name: 'AssetHub',
    stack: 'ASP.NET Core (ABP), React.js, Excel import/export, Background Jobs, Email',
    desc: 'A complete Asset Management System with role-based access, asset tracking, approval workflows, Excel import/export, audit logging, and email notifications.',
    github: 'https://github.com/Frrz23/AssetHub'
  },
  {
    name: 'SHAH (Bid Buzz)',
    stack: 'ASP.NET MVC, C#, EF Core, SignalR, Hangfire',
    desc: 'An online auction platform with real-time bidding, manual/automated bids, and admin-controlled item approvals and auction schedules.',
    github: 'https://github.com/Frrz23/BidBuzz'
  },
  {
    name: 'TrashTrack',
    stack: 'ASP.NET Core MVC, Razor Pages, SQL Server, ASP.NET Identity',
    desc: 'A waste management system with schedule visibility, user issue reporting, admin overrides, and secure login. Won 3rd place at BernHack.',
    github: 'https://github.com/MiniEnemy/Trash-Track-'
  },
  {
    name: 'GundrukReads',
    stack: 'React.js, Tailwind CSS',
    desc: 'An e-commerce platform designed for manga enthusiasts, featuring a dynamic and responsive user interface.',
    github: 'https://github.com/Frrz23/GundrukReads'
  },
  {
    name: 'Quillia',
    stack: 'ASP.NET MVC, C#, EF Core, Bootstrap',
    desc: 'An e-commerce website dedicated to showcasing and selling books across various genres.',
    github: 'https://github.com/Frrz23/Quillia'
  },
  {
    name: 'Elite Strike: Futsal Booking System',
    stack: 'HTML, CSS, JS, PHP, MySQL',
    desc: 'A user-friendly futsal booking system with real-time court availability, customizable user profiles, and an admin dashboard for venue management.'
  }
];

export const SKILLS = {
  Backend: 'ASP.NET Core, ASP.NET MVC, C#, Node.js, Express, PHP, REST APIs',
  Frontend: 'React.js, Next.js, HTML, CSS, Tailwind CSS, Bootstrap, JavaScript',
  Databases: 'SQL Server, MySQL, PostgreSQL, Supabase, Entity Framework Core, Prisma, LINQ',
  'Frameworks & Libraries': 'ABP Framework, SignalR, Socket.IO, Hangfire, NPOI, MailKit',
  'Other Languages': 'Python, Java',
  'Tools & Practices': 'Git, GitHub, Agile, Code Reviews, Debugging, Performance Optimization, ASP.NET Identity authentication, Role-Based Access Control, WebSockets, Cloudflare'
};

export const EDUCATION = [
  {
    degree: 'Bachelor in Computer Application (BCA)',
    institution: 'Bernhardt College, Tribhuvan University',
    period: 'Apr 2021 – Apr 2026',
    location: 'Kathmandu, Nepal'
  },
  {
    degree: 'High School Diploma — Computer Science',
    institution: 'Trinity College',
    period: 'Jul 2019 – Dec 2021',
    location: 'Kathmandu, Nepal'
  }
];

export const CERTIFICATIONS = [
  'Foundational C# with Microsoft — freeCodeCamp (Microsoft certified course)',
  '3rd Place — BernHack Hackathon, for the TrashTrack smart waste management system'
];

// Cloudflare Worker endpoint. When the Worker is deployed, paste its URL here,
// for example: 'https://aryan-portfolio-chat.<your-subdomain>.workers.dev/chat'
// An empty string means the chat runs fully offline using the built-in fallback engine.
export const CHAT_API_URL = '';
