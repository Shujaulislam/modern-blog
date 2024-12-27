# Modern Blog 🗒️

A modern, feature-rich blog platform built with Next.js 15, featuring beautiful UI components from Aceternity UI and comprehensive content management capabilities.

## 🌟 Features

### Implemented ✅
- Responsive Design (Mobile First)
- Dark/Light Theme Support
- Interactive World Map with Location Connections
- Contact Form with Validation
- Database Integration with Prisma
- Modern UI Components with Aceternity UI

### In Progress 🚧
- Authentication with Clerk
- Blog Post Management
- Admin Dashboard
- Content Management System

### Planned 📋
- Rich Text Editor Integration
- Image Upload System
- Performance Optimization
- Comprehensive Testing Suite

## 🛠️ Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS, Aceternity UI
- **Database:** MongoDB with Prisma
- **Authentication:** Clerk
- **UI Components:** 
  - Framer Motion
  - Aceternity UI Components
  - Interactive World Map
- **Form Handling:** React Hook Form with Zod

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
