# Hostel Dex - Hostel Issue Tracking Platform

![Hostel Dex Banner](https://collegedunia.com/university/25914-vellore-institute-of-technology-vit-university-vellore/hostel) <!-- Replace with actual banner image -->

A modern, full-stack hostel issue tracking system built with React, TypeScript, and Tailwind CSS. Hostel Dex streamlines maintenance request management for both students and administrators with a beautiful, responsive interface.

🚀 Features

- Role-based Authentication** (Mocked for demo)
  - Student and admin roles with different permissions
  - Secure login/logout functionality
- Comprehensive Ticket Management
  - Create tickets with title, description, priority, and category
  - Attach images/videos to tickets
  - Filter and search tickets by status, priority, or keywords
  - Update ticket status (Open, In Progress, Resolved)
- Admin Dashboard
  - Visual statistics of ticket status distribution
  - Urgent ticket highlighting
  - Issue type breakdown charts
- User Profiles
  - Edit profile information
  - Upload profile photos
- **Notification System
  - Real-time updates on ticket status changes
  - Unread notifications indicator
- Modern UI
  - Responsive design for all devices
  - Clean, intuitive interface with Tailwind CSS
  - Lucide React icons for consistent visuals
- Demo-Friendly
  - LocalStorage persistence (no backend required)
  - Pre-populated demo data

## Screenshots

| Login Screen | Dashboard | Ticket View |
|--------------|-----------|-------------|
| ![Login](./public/login-placeholder.png) | ![Dashboard](./public/dashboard-placeholder.png) | ![Ticket](./public/ticket-placeholder.png) |

| Admin Dashboard | Mobile View | Notifications |
|-----------------|-------------|---------------|
| ![Admin](./public/admin-placeholder.png) | ![Mobile](./public/mobile-placeholder.png) | ![Notifications](./public/notifications-placeholder.png) |

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm (v8 or higher) or yarn
- Git (for version control)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hostel-dex.git
   cd hostel-dex
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

### Other Scripts

- Build for production:
  ```bash
  npm run build
  ```

- Preview production build:
  ```bash
  npm run preview
  ```

- Lint code:
  ```bash
  npm run lint
  ```

- Format code:
  ```bash
  npm run format
  ```

## Folder Structure

```
hostel-dex/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # Reusable UI components
│   ├── constants/         # App constants and enums
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layout components
│   ├── pages/             # Main page components
│   ├── services/          # Mock API services
│   ├── stores/            # Zustand stores (state management)
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── .eslintrc.cjs          # ESLint configuration
├── .gitignore             # Git ignore rules
├── index.html             # Main HTML file
├── package.json           # Project dependencies and scripts
├── postcss.config.cjs     # PostCSS configuration
├── README.md              # This file
├── tailwind.config.cjs    # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Technologies Used

- **Frontend**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide React (icons)
  - Zustand (state management)
  - React Hook Form (form management)
  - Date-fns (date utilities)

- **Build Tools**
  - Vite (build tool)
  - ESLint (linting)
  - PostCSS (CSS processing)
  - Prettier (code formatting)

## Demo Credentials

For testing purposes, you can use the following credentials:

**Student Account:**
- Email: `student@example.com`
- Password: `student123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Hostel Dex** is a demo project created for educational purposes. The mock authentication system is not suitable for production use. For a production environment, you would need to implement proper backend authentication.
