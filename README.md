NAA Admin Panel

National Aviation Academy Admin Panel - News and Announcements Management System


🚀 Live Demo

Live Demo: https://adminpanel-naa.vercel.app/


🎯 Core Functionality

Full CRUD Operations - Create, Read, Update, Delete news and announcements

Real-time Database - Powered by Supabase with instant data synchronization

Advanced Filtering - Filter by category (News/Announcements), status (Active/Inactive), and search by title

Pagination - Efficient data display with 10 items per page

Rich Text Editor - Comprehensive content management with dual language support


🎨 User Interface

Modern Dashboard - Clean and intuitive admin interface

Professional Styling - Tailwind CSS with custom color scheme (#2c3e82)

Interactive Components - Modal windows, dropdowns, and real-time notifications

Bilingual Support - Azerbaijani and English content management


🔧 Advanced Features

Image Management - Cover image upload and display

Status Management - Active/Inactive and Published/Draft status control

Slug System - Automatic unique URL slug generation

Author Tracking - Post authorship and metadata

Real-time Validation - Form validation with error handling


🛠 Technologies Used

Frontend

React 18 - Modern React with functional components and hooks

TypeScript - Full type safety and better development experience

Tailwind CSS - Utility-first CSS framework for rapid UI development

Lucide React - Beautiful & consistent icons


Backend & Database

Supabase - Open source Firebase alternative with PostgreSQL

PostgreSQL - Powerful relational database

Row Level Security - Advanced security policies


Development Tools
Vite - Fast build tool and development server
React Hooks - Custom hooks for state management and API calls
ESLint - Code linting and quality assurance

Deployment

Vercel - Serverless deployment platform


🎮 Usage

Managing Posts

View All Posts - Main dashboard displays all news and announcements

Add New Post - Click "Add News or Announcement" button

Edit Post - Click edit icon (✏️) on any post

Delete Post - Click delete icon (🗑️) with confirmation modal

Filter Posts - Use dropdowns to filter by category and status

Search - Use search bar to find posts by title


Post Form Fields

Title (AZ/EN) - Bilingual title support

Slug - Unique URL identifier 

Category - News or Announcement

Cover Image - URL or file upload

Content (AZ/EN) - Detailed content in both languages

Status - Active or Inactive

Publish Status - Published or Draft

Author - Post author name


📁 Project Structure

src/

├── components/

│   ├── PostsTable.tsx      # Main posts management table

│   ├── PostModal.tsx       # Add/Edit post form modal

│   ├── Sidebar.tsx         # Navigation sidebar

│   ├── SuccessModal.tsx    # Success notification

│   └── DeleteModal.tsx     # Delete confirmation

├── hooks/

│   └── usePosts.ts         # Custom hook for posts CRUD operations

├── lib/

│   └── supabase.ts         # Supabase client configuration

├── pages/

│   └── MainPage.tsx        # Main application page component

├── types/

│   └── index.ts            # TypeScript type definitions

├── utils/

│   └── mockData.ts         # Mock data for development

└── App.tsx                 # Root application component
