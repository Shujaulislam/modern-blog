const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const posts = [
  {
    title: "Getting Started with Next.js 14",
    slug: "getting-started-with-nextjs-14",
    content: "Next.js 14 introduces several groundbreaking features including Server Actions, Partial Prerendering, and improved caching. It's a modern way to create and use API routes in Next.js for backend functionality. For more information, visit the Next.js documentation. In this blog post, we will explore the various features of Next.js and how to use them effectively in your projects. We will also provide some examples of how to use Next.js in your projects and how it can help you create more robust and maintainable code.",
    excerpt: "Learn about the latest features in Next.js 14 and how to implement them in your projects.",
    status: "PUBLISHED",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    categories: {
      connect: [{ slug: "technology" }, { slug: "development" }]
    }
  },
  {
    title: "Modern Web Development with TypeScript",
    slug: "modern-web-development-typescript",
    content: "TypeScript has become the standard for large-scale JavaScript applications. It's a statically typed superset of JavaScript that compiles to plain JavaScript. TypeScript provides a way to catch errors early in the development process and make your code more readable and maintainable. For more information, visit the TypeScript documentation. In this blog post, we will explore the various features of TypeScript and how to use them effectively in your projects. We will also provide some examples of how to use TypeScript in your projects and how it can help you create more robust and maintainable code.",
    excerpt: "Discover how TypeScript can improve your development workflow and catch errors early.",
    status: "PUBLISHED",
    featured: false,
    featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    categories: {
      connect: [{ slug: "development" }, { slug: "tutorial" }]
    }
  },
  {
    title: "Building Beautiful UIs with Tailwind CSS",
    slug: "building-beautiful-uis-tailwind-css",
    content: "Tailwind CSS provides a utility-first approach to styling that can dramatically speed up your development process and make your code more readable and maintainable. It's a modern way to style your components without the need for traditional CSS frameworks. For more information, visit the Tailwind CSS documentation. In this blog post, we will explore the various features of Tailwind CSS and how to use them effectively in your projects. We will also provide some examples of how to use Tailwind CSS in your projects and how it can help you create beautiful user interfaces.",
    excerpt: "Learn how to create stunning user interfaces using Tailwind CSS's utility classes.",
    status: "PUBLISHED",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1550439062-609e1531270e",
    categories: {
      connect: [{ slug: "design" }, { slug: "tutorial" }]
    }
  },
  {
    title: "API Routes in Next.js",
    slug: "api-routes-nextjs",
    content: "Next.js provides a powerful way to create API endpoints right within your application. It's a modern way to create and use API routes in Next.js for backend functionality. For more information, visit the Next.js documentation. In this blog post, we will explore the various features of Next.js and how to use them effectively in your projects. We will also provide some examples of how to use Next.js in your projects and how it can help you create more robust and maintainable code.",
    excerpt: "Explore how to create and use API routes in Next.js for backend functionality.",
    status: "PUBLISHED",
    featured: false,
    featuredImage: "https://images.unsplash.com/photo-1556075798-4825dfaaf498",
    categories: {
      connect: [{ slug: "development" }, { slug: "tutorial" }]
    }
  },
  {
    title: "State Management with Zustand",
    slug: "state-management-zustand",
    content: "Zustand offers a lightweight and flexible approach to state management in React applications. It's a modern way to manage state in your React applications. For more information, visit the Zustand documentation. In this blog post, we will explore the various features of Zustand and how to use them effectively in your projects. We will also provide some examples of how to use Zustand in your projects and how it can help you create more robust and maintainable code.",
    excerpt: "Learn how to manage application state effectively using Zustand.",
    status: "PUBLISHED",
    featured: false,
    featuredImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
    categories: {
      connect: [{ slug: "development" }, { slug: "tutorial" }]
    }
  }
];

async function seedPosts() {
  try {
    // First, ensure we have categories
    const categories = [
      { name: "Technology", slug: "technology" },
      { name: "Development", slug: "development" },
      { name: "Design", slug: "design" },
      { name: "Tutorial", slug: "tutorial" },
      { name: "News", slug: "news" }
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      });
    }

    // Get the first user to set as author
    const user = await prisma.user.findFirst();
    if (!user) throw new Error("No user found to assign as author");

    // Create posts
    for (const post of posts) {
      await prisma.post.create({
        data: {
          ...post,
          authorId: user.id,
        },
      });
    }

    console.log("Posts seeded successfully");
  } catch (error) {
    console.error("Error seeding posts:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPosts(); 