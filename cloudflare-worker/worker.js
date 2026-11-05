/**
 * Aryan Khatiwada — portfolio AI chat worker.
 *
 * Answers recruiter questions strictly from Aryan's CV knowledge base using
 * Cloudflare Workers AI. No secrets are shipped to the website; the Worker holds
 * the AI binding and rate limiting.
 *
 * Deploy: create a Worker in the Cloudflare dashboard (Workers & Pages -> Create)
 * and paste this file (the dashboard wraps the default export automatically), or
 * deploy with `wrangler deploy` from this folder.
 *
 * Endpoint: POST /chat  { messages: [{ role: 'user' | 'assistant', content }...] }
 * Response: { reply: string, source: 'workers-ai' }
 */

const SYSTEM_PROMPT_TEMPLATE = `
You are "Aryan's AI Assistant" embedded on Aryan Khatiwada's personal portfolio website.
A recruiter or visitor is chatting with you. Answer ONLY using the FACTS below plus light
rephrasing. If something is not in the facts, say you do not have that information instead
of inventing it. Keep answers short (max ~110 words), friendly and professional. You may
share the contact details when asked how to reach Aryan.

FACTS ABOUT ARYAN:
^^FACTS^^

RULES:
- Only talk about Aryan (experience, skills, projects, education, certifications, contact).
- Refuse unrelated or personal questions not covered by the facts, politely.
- Never invent employers, degrees, dates, or technical details.
- If asked for a resume, point to the "VIEW CV" button and the links above.
- Write as "Aryan's assistant", not as Aryan himself.
`.trim();

const FACTS = JSON.stringify({
  profile: {
    name: 'Aryan Khatiwada',
    role: 'Associate Software Engineer',
    location: 'Kathmandu, Nepal',
    email: 'aryankhatiwoda9@gmail.com',
    phone: '+977 9818821006',
    github: 'https://github.com/Frrz23',
    linkedin: 'https://www.linkedin.com/in/aryan-khatiwoda',
    summary:
      'Associate Software Engineer and BCA graduate with 8 months of professional ASP.NET Core experience building REST APIs and full-stack applications with C#, React.js, and SQL Server. Experienced in real-time systems (SignalR, WebSockets), background jobs, role-based access control, and Agile team delivery.'
  },
  experience: [
    {
      company: 'AMNIL Technologies Pvt. Ltd.',
      title: 'Intern → Associate Software Engineer',
      period: 'Sep 2025 – Apr 2026',
      highlights: [
        'Designed and developed RESTful APIs using ASP.NET Core and C# for internal and client-facing applications.',
        'Modelled data and built database access with SQL Server and Entity Framework Core.',
        'Debugged, profiled and optimized backend code through code reviews and performance tuning.',
        'Collaborated cross-functionally with Git and Agile practices.'
      ]
    }
  ],
  projects: [
    { name: 'Sky Rush', stack: 'React, Node.js, Express, Next.js, Socket.IO, Prisma, PostgreSQL, Supabase, Tailwind, Cloudflare', desc: 'Real-time multiplayer crash-style game platform (virtual coins only) with live rounds over WebSockets, accounts, wallet/bet history, admin dashboard.', live: 'https://skyrush.fun/' },
    { name: 'AssetHub', stack: 'ASP.NET Core (ABP), React.js, Excel, Background Jobs, Email', desc: 'Complete Asset Management System with role-based access, asset tracking, approval workflows, Excel import/export, audit logging, email notifications.', github: 'https://github.com/Frrz23/AssetHub' },
    { name: 'SHAH (Bid Buzz)', stack: 'ASP.NET MVC, C#, EF Core, SignalR, Hangfire', desc: 'Online auction platform with real-time bidding, manual/automated bids, admin-controlled item approvals and auction schedules.', github: 'https://github.com/Frrz23/BidBuzz' },
    { name: 'TrashTrack', stack: 'ASP.NET Core MVC, Razor Pages, SQL Server, ASP.NET Identity', desc: 'Waste management system with schedule visibility, user issue reporting, admin overrides, secure login. Won 3rd place at BernHack.', github: 'https://github.com/MiniEnemy/Trash-Track-' },
    { name: 'GundrukReads', stack: 'React.js, Tailwind CSS', desc: 'E-commerce platform for manga enthusiasts with dynamic responsive UI.', github: 'https://github.com/Frrz23/GundrukReads' },
    { name: 'Quillia', stack: 'ASP.NET MVC, C#, EF Core, Bootstrap', desc: 'E-commerce website for selling books across genres.', github: 'https://github.com/Frrz23/Quillia' },
    { name: 'Elite Strike: Futsal Booking System', stack: 'HTML, CSS, JS, PHP, MySQL', desc: 'Futsal booking system with real-time availability, user profiles, admin dashboard.' }
  ],
  skills: {
    Backend: 'ASP.NET Core, ASP.NET MVC, C#, Node.js, Express, PHP, REST APIs',
    Frontend: 'React.js, Next.js, HTML, CSS, Tailwind CSS, Bootstrap, JavaScript',
    Databases: 'SQL Server, MySQL, PostgreSQL, Supabase, Entity Framework Core, Prisma, LINQ',
    Libraries: 'ABP Framework, SignalR, Socket.IO, Hangfire, NPOI, MailKit',
    OtherLanguages: 'Python, Java',
    Tools: 'Git, GitHub, Agile, Code Reviews, Performance Optimization, ASP.NET Identity, RBAC, WebSockets, Cloudflare'
  },
  education: [
    { degree: 'Bachelor in Computer Application (BCA)', institution: 'Bernhardt College, Tribhuvan University', period: 'Apr 2021 – Apr 2026' },
    { degree: 'High School Diploma — Computer Science', institution: 'Trinity College', period: 'Jul 2019 – Dec 2021' }
  ],
  certifications: [
    'Foundational C# with Microsoft — freeCodeCamp (Microsoft certified course)',
    '3rd Place — BernHack Hackathon (TrashTrack smart waste management system)'
  ]
}, null, 1);

const ALLOWED_ORIGINS = [
  'https://aryankhatiwada.com.np',
  'https://www.aryankhatiwada.com.np',
  'https://frrz23.github.io',
  'http://localhost:4199',
  'http://localhost:5173'
];

const MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const MAX_TOKENS = 512;
const MAX_MESSAGES = 12;
const MAX_MESSAGE_CHARS = 1000;
const RATE_LIMIT_MAX = 20;
const RATE_WINDOW_MS = 5 * 60 * 1000;

// Best-effort per-isolate rate limiting (resets occasionally, fine for a portfolio).
const hits = new Map();

function corsHeaders(origin) {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    if (url.pathname === '/chat' && request.method === 'POST') {
      if (!env.AI) {
        return json({ error: 'Workers AI binding (AI) is missing. Enable Workers AI for this Worker.' }, origin, 500);
      }

      let ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (isRateLimited(ip)) {
        return json({ error: 'Too many messages. Please try again in a few minutes.' }, origin, 429);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ error: 'Invalid JSON body.' }, origin, 400);
      }

      const history = Array.isArray(body.messages) ? body.messages : [];
      const cleaned = history
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-MAX_MESSAGES)
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_CHARS) }));

      if (!cleaned.length || cleaned[cleaned.length - 1].role !== 'user') {
        return json({ error: 'Send a conversation ending with a user message.' }, origin, 400);
      }

      try {
        const result = await env.AI.run(MODEL, {
          messages: [
            { role: 'system', content: SYSTEM_PROMPT_TEMPLATE.replace('^^FACTS^^', FACTS) },
            ...cleaned
          ],
          max_tokens: MAX_TOKENS
        });

        const reply = (result && result.response ? result.response : '').trim();
        if (!reply) {
          return json({ error: 'The assistant is unavailable right now.' }, origin, 502);
        }
        return json({ reply, source: 'workers-ai' }, origin);
      } catch (err) {
        return json({ error: 'The assistant is unavailable right now.' }, origin, 502);
      }
    }

    if (request.method === 'GET') {
      return json({ ok: true, service: 'aryan-portfolio-chat' }, origin);
    }

    return json({ error: 'Not found.' }, origin, 404);
  }
};

function json(data, origin, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) }
  });
}
