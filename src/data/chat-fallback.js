// Offline mini Q&A engine. Used when the Cloudflare Worker is unreachable or
// not configured yet. It matches recruiter intents with keyword scoring over
// the CV knowledge base — no server, no AI API required.
import {
  PROFILE,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  EDUCATION,
  CERTIFICATIONS
} from './cv-knowledge.js';

const normalise = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9+# .]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Whole-word matching on a space-padded string, with fuzzy tolerance so common
// typos ('exprence', 'conatct', 'skils') still match the right intent.
function editDistance(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const rows = [new Array(b.length + 1).fill(0), new Array(b.length + 1).fill(0)];
  for (let j = 0; j <= b.length; j++) rows[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    rows[i % 2][0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      rows[i % 2][j] = Math.min(
        rows[(i - 1) % 2][j] + 1,
        rows[i % 2][j - 1] + 1,
        rows[(i - 1) % 2][j - 1] + cost
      );
    }
  }
  return rows[a.length % 2][b.length];
}

// Tolerance grows with word length: 1-4 letters exact only, 5-6 allow 1 typo,
// longer words allow 2 typos — keeps short words like 'hi'/'who'/'pay' strict.
function wordMatches(textWord, keyword) {
  if (textWord === keyword) return true;
  const maxD = keyword.length > 6 ? 2 : keyword.length > 4 ? 1 : 0;
  if (maxD === 0) return false;
  if (Math.abs(textWord.length - keyword.length) > maxD) return false;
  return editDistance(textWord, keyword, maxD) <= maxD;
}

const score = (text, keywords) => {
  const padded = ` ${text} `;
  const words = text.split(' ');
  return keywords.reduce(
    (acc, kw) => {
      if (kw.includes(' ')) {
        // Multi-word keyword: allow a typo inside each part
        const parts = kw.split(' ');
        const hit = padded.includes(` ${kw} `) || parts.every((p) => words.some((w) => wordMatches(w, p)));
        return acc + (hit ? 2 : 0);
      }
      const hit =
        padded.includes(` ${kw} `) || (kw.length > 4 && words.some((w) => wordMatches(w, kw)));
      return acc + (hit ? 1 : 0);
    },
    0
  );
};

const experienceText = () =>
  EXPERIENCE.map(
    (exp) => `${exp.title} at ${exp.company}, ${exp.period} (${exp.location || 'Kathmandu'}). Key work: ${exp.highlights.join(' ')}`
  ).join('\n\n');

const projectsText = () =>
  PROJECTS.map((p) => `${p.name} — ${p.desc} (Stack: ${p.stack})${p.live ? ` Live: ${p.live}` : ''}${p.github ? ` Code: ${p.github}` : ''}`).join('\n\n');

const skillsText = () => Object.entries(SKILLS).map(([group, list]) => `${group}: ${list}`).join('\n');

const educationText = () =>
  EDUCATION.map((e) => `${e.degree} at ${e.institution}, ${e.period}${e.location ? `, ${e.location}` : ''}`).join('\n');

const certsText = () => CERTIFICATIONS.join('; ');

const contactText = () =>
  `You can reach Aryan directly:\n• Email: ${PROFILE.email}\n• Phone: ${PROFILE.phone} (${PROFILE.location})\n• LinkedIn: ${PROFILE.linkedin}\n• GitHub: ${PROFILE.github}`;

const INTENTS = [
  {
    name: 'salary',
    keywords: ['salary', 'pay', 'compensation', 'expectations'],
    answer: () => 'Aryan does not publish salary expectations publicly — it is best to discuss that directly with him. ' + contactText().split('\n')[1]
  },
  {
    name: 'contact',
    keywords: ['contact', 'reach', 'email', 'mail', 'phone', 'call', 'whatsapp', 'linkedin', 'github', 'hire', 'connect', 'touch'],
    answer: contactText
  },
  {
    name: 'experience',
    keywords: ['experience', 'experienced', 'worked', 'work', 'job', 'jobs', 'intern', 'associate', 'amnil', 'company', 'companies', 'years'],
    answer: () => `Aryan is an Associate Software Engineer with 8 months of professional experience.\n\n${experienceText()}`
  },
  {
    name: 'skills',
    keywords: ['skill', 'skills', 'stack', 'tech', 'technology', 'technologies', 'language', 'languages', 'framework', 'frameworks', 'strong', 'good at', 'knows'],
    answer: () => `Aryan's technical skills:\n${skillsText()}`
  },
  {
    name: 'education',
    keywords: ['education', 'study', 'studied', 'degree', 'college', 'university', 'school', 'bca', 'graduate', 'academic'],
    answer: () => `Aryan's education:\n${educationText()}\n\nCertifications:\n${certsText()}`
  },
  {
    name: 'projects',
    keywords: ['project', 'projects', 'built', 'build', 'portfolio', 'showcase', 'examples', 'work samples'],
    answer: () => `Aryan has built a range of backend and full-stack projects:\n\n${projectsText()}`
  },
  {
    name: 'whoami',
    keywords: ['who', 'about', 'summary', 'introduce', 'introduction', 'tell me about', 'background', 'overview'],
    answer: () => `${PROFILE.name} is a ${PROFILE.role} based in ${PROFILE.location}. ${PROFILE.summary}`
  },
  {
    name: 'resume',
    keywords: ['resume', 'cv', 'download'],
    answer: () => 'The latest CV is available on the site — use the "VIEW CV" button at the top of the page.'
  },
  {
    name: 'greeting',
    keywords: ['hi', 'hello', 'hey', 'namaste', 'yo'],
    answer: () => `Hi! I'm Aryan's AI assistant. Ask me about his experience, skills, projects, education, or how to reach him.`
  },
  {
    name: 'thanks',
    keywords: ['thanks', 'thank', 'great', 'awesome', 'cool'],
    answer: () => "Happy to help! Anything else you'd like to know about Aryan?"
  }
];

const MAX_ANSWER_LENGTH = 700;

export function offlineAnswer(message) {
  const text = normalise(message);
  if (!text) {
    return "I didn't catch that — ask me anything about Aryan's work, skills or projects.";
  }

  // Direct project lookup (e.g. "tell me about Sky Rush" — typos tolerated)
  const project = PROJECTS.find((p) => {
    // split camelCase names (e.g. 'TrashTrack' -> 'trash track') before comparing
    const nameWords = normalise(p.name.replace(/([a-z0-9])([A-Z])/g, '$1 $2')).split(' ');
    const textWords = text.split(' ');
    const condensedText = text.replace(/ /g, '');
    const condensedName = normalise(p.name).replace(/ /g, '');
    const matched = condensedText.includes(condensedName)
      ? true
      : nameWords.every((nw) => text.includes(` ${nw} `) || textWords.some((w) => nw.length >= 3 && w.length >= 2 && editDistance(w, nw, 1) <= 1));
    return matched;
  });
  if (project) {
    const extra = profileLookup(text);
    return `${project.name}\n${project.desc}\nStack: ${project.stack}${extra ? `\n\n${extra}` : ''}`;
  }

  // Rank intents and answer the best 2 scoring ones (recruiter questions often
  // touch two topics at once, e.g. "what experience does he have and how do I contact him?")
  const scored = INTENTS.map((intent) => ({ intent, s: score(text, intent.keywords) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);

  const noise = new Set(['greeting', 'thanks', 'whoami']);
  const specific = scored.filter((x) => !noise.has(x.intent.name));
  // If a concrete topic matched (experience/skills/projects/contact...), prefer it
  // over the generic "tell me about..." intent even when its score is higher.
  const top = specific.length ? specific.slice(0, 2) : scored.slice(0, 2);

  if (!top.length) {
    // Last resort: quote the CV lines that share words with the question.
    const relevant = [experienceText(), projectsText(), skillsText(), educationText()].find((chunk) =>
      text.split(' ').some((w) => w.length > 3 && chunk.toLowerCase().includes(w))
    );
    if (relevant) {
      return `From Aryan's CV:\n\n${relevant.slice(0, MAX_ANSWER_LENGTH)}${relevant.length > MAX_ANSWER_LENGTH ? '…' : ''}`;
    }
    return "I can answer questions about Aryan's experience, skills, projects, education, certifications, or contact details. Ask me about one of those!";
  }

  return top.map((x) => x.intent.answer()).join('\n\n');
}

// Follow-ups like "email?" or "github" inside project answers
function profileLookup(text) {
  if (text.includes('contact') || text.includes('email') || text.includes('phone')) return contactText();
  if (text.includes('github')) return `GitHub: ${PROFILE.github}`;
  if (text.includes('linkedin')) return `LinkedIn: ${PROFILE.linkedin}`;
  return '';
}
