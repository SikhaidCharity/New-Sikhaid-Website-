import blogs from './content/blogs.json';

const newestFirst = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

// Drafts stay in the admin panel and never reach the public site.
export const publishedBlogs = blogs.filter((b) => b.status === 'published').sort(newestFirst);

export const blogBySlug = (slug) => publishedBlogs.find((b) => b.slug === slug);

export const blogDate = (blog) =>
  new Date(blog.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });

// A post's text lives in one Content box. The admin's buttons add these simple marks:
//   ## Heading      ### Subheading      - list item      **bold**      ![caption](image-url)
// A blank line starts a new paragraph.
export function contentOf(blog) {
  if (typeof blog.content === 'string') return blog.content;
  // Older posts were saved as separate blocks.
  return (blog.blocks || [])
    .map((b) => {
      if (b.type === 'h2') return `## ${b.text}`;
      if (b.type === 'list') return b.text.split('\n').filter(Boolean).map((l) => `- ${l}`).join('\n');
      if (b.type === 'quote') return b.text;
      if (b.type === 'img') return `![${b.text || ''}](${b.src})`;
      return b.text;
    })
    .filter(Boolean)
    .join('\n\n');
}

// Turns the Content box into a list of pieces the pages can draw. No raw HTML is ever used.
export function parseContent(text) {
  const pieces = [];
  let list = null;
  let para = [];
  const flushPara = () => {
    if (para.length) pieces.push({ type: 'p', text: para.join(' ') });
    para = [];
  };
  const flushList = () => {
    if (list) pieces.push({ type: 'list', items: list });
    list = null;
  };

  String(text || '').split('\n').forEach((raw) => {
    const line = raw.trim();
    const image = line.match(/^!\[(.*?)\]\((\S+?)\)$/);
    if (!line) {
      flushPara();
      flushList();
    } else if (line.startsWith('- ') || line.startsWith('• ')) {
      flushPara();
      (list ||= []).push(line.slice(2));
    } else if (line.startsWith('### ')) {
      flushPara(); flushList();
      pieces.push({ type: 'h3', text: line.slice(4) });
    } else if (line.startsWith('## ')) {
      flushPara(); flushList();
      pieces.push({ type: 'h2', text: line.slice(3) });
    } else if (image) {
      flushPara(); flushList();
      pieces.push({ type: 'img', text: image[1], src: image[2] });
    } else {
      flushList();
      para.push(line);
    }
  });
  flushPara();
  flushList();
  return pieces;
}

// Splits "some **bold** words" into plain and bold parts.
export const boldParts = (text) =>
  String(text).split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part) =>
    part.startsWith('**') && part.endsWith('**') ? { bold: true, text: part.slice(2, -2) } : { bold: false, text: part }
  );
