# Modern Blog Platform 🗒️

A modern, feature-rich blog platform built with Next.js 15, featuring stunning UI components and robust functionality.

## 🌟 Features

### Completed Features ✅
- Responsive Design with Mobile-First Approach
- Dynamic Landing Page with Interactive UI
- Authentication & Authorization with Clerk
- Admin Dashboard with Protected Routes
- Database Integration with Prisma
- Modern UI Components with Aceternity UI
- Dark/Light Theme Support
- Contact Form with Validation
- API Routes Implementation
- Infinite Scroll Blog Posts
- Interactive 3D Components
- Particle Effects & Animations

### In Progress 🚧
- Rich Text Editor Integration
- Blog Post Management System
- User Profile Management
- Image Upload with Cloudinary

### Planned 📋
- Content Management System
- Post Categories & Tags
- Search Functionality
- Performance Optimization
- Analytics Dashboard
- Comprehensive Testing Suite

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** 
  - Framer Motion
  - Three.js
  - Aceternity UI Components

### Backend & Database
- **ORM:** Prisma ORM
- **Database:** MongoDB
- **API Routes:** Next.js API Routes

### Authentication & Storage
- **Authentication:** Clerk Authentication
- **Storage:** Cloudinary (for images)

### Development Tools
- **Language:** TypeScript
- **Linter:** ESLint
- **Formatter:** Prettier

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone [your-repo-link]
cd modern-blog
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```env
DATABASE_URL="your_mongodb_url"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📱 Mobile First Approach

The project follows a mobile-first design philosophy, ensuring a great user experience across all device sizes:
- Responsive layouts
- Touch-friendly interactions
- Optimized performance for mobile devices

## 🎨 UI/UX Features

- **Modern Design:** Clean and minimalist interface
- **Dark/Light Theme:** System-based and manual theme switching
- **Interactive Elements:** Smooth animations and transitions
- **World Map:** Interactive visualization with global connection points

## 🔒 Security Features

- Form validation with Zod
- Secure authentication with Clerk
- Protected API routes
- Type-safe database queries with Prisma

## 📦 Project Structure

```
modern-blog/
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable UI components
│   ├── lib/          # Utility functions and configurations
│   └── styles/       # Global styles and Tailwind config
├── prisma/           # Database schema and migrations
└── public/          # Static assets
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](your-issues-link).

## 📄 License

This project is [MIT](LICENSE) licensed.

---
Built with ❤️ using Next.js and Aceternity UI
