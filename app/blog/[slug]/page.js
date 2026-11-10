import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogContent from '@/components/BlogContent';
import Photo from '@/components/Photo';
import { blogBySlug, blogDate, contentOf, publishedBlogs } from '@/lib/blog';
import '../blog.css';

export function generateStaticParams() {
  return publishedBlogs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogBySlug(slug);
  if (!post) return { title: 'Blog | SikhAid Charitable Trust' };
  return {
    title: `${post.title} | SikhAid Charitable Trust`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.image ? [post.image] : [] },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogBySlug(slug);
  if (!post) notFound();

  return (
    <main className="blog-post">
      {post.image && (
        <div className="blog-post-image">
          <Photo src={post.image} label={post.category} alt={post.title} />
        </div>
      )}

      <header className="blog-post-head">
        <h1>{post.title}</h1>
        <p className="blog-meta">{blogDate(post)}</p>
      </header>

      <article className="blog-post-body">
        <BlogContent content={contentOf(post)} />
      </article>

      <p className="blog-post-back">
        <Link href="/blog">← Back to all stories</Link>
      </p>
    </main>
  );
}
