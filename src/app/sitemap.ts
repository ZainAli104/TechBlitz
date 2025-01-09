import type { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/blog';
import { listQuestions } from '@/utils/data/questions/list';

export const baseUrl = 'https://techblitz.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all blog posts
  const posts = await getBlogPosts();

  // Create sitemap entries for blog posts
  const blogPosts = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Using the post date as lastModified
    lastModified: new Date(post.date as string),
  }));

  // get all questions
  const questions = await listQuestions({
    page: 1,
    pageSize: 1000,
    userUid: '',
  });

  const questionsPosts = questions.questions.map((question) => ({
    url: `${baseUrl}/questions/${question.uid}`,
    lastModified: new Date(question.createdAt),
  }));

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/roadmap`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/daily-challenges`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/features/statistics`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/daily-challenge`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/open-source`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
  ];

  // Combine static routes with dynamic blog posts
  return [...routes, ...blogPosts, ...questionsPosts];
}
