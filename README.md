# TaskFlow

TaskFlow is a modern, enterprise-grade project management application designed for teams to streamline their workflows. Built with Next.js 14, it features a highly interactive drag-and-drop Kanban board, isolated workspaces, and robust role-based access control.

## 🚀 Features

- **Multi-Tenant Workspaces:** Complete data isolation. Managers and Admins can switch between distinct workspaces to manage different teams or companies.
- **Interactive Kanban Board:** Real-time drag-and-drop task management built with `@dnd-kit`.
- **Role-Based Access Control (RBAC):** Strict permissions modeling for `ADMIN`, `MANAGER`, and `DEVELOPER` roles.
- **Analytics Dashboard:** Real-time data visualization showing active projects, pending tasks, and team productivity charts.
- **File & Media Uploads:** Cloudinary integration for user profile pictures and attachments.
- **Secure Authentication:** Password-based and provider-based authentication using `NextAuth.js`.
- **Modern UI:** A beautiful, responsive, dark-mode-first aesthetic built with Tailwind CSS and `shadcn/ui`.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Database:** SQLite (Easily swappable to PostgreSQL)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) & Radix UI
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Drag and Drop:** `@dnd-kit/core`

## ⚙️ Quick Start

Follow these steps to run TaskFlow locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/piyushht2003/taskflow.git
cd taskflow
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure the following environment variables:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-key-here"

# Cloudinary (For Profile Pictures)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_upload_preset"
```

### 4. Setup the Database
Push the Prisma schema to your SQLite database to create the necessary tables.
```bash
npx prisma db push
```

### 5. Start the Application
Start the Next.js development server and the separate WebSocket server for real-time features.
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 🗄️ Project Structure

- `src/app`: Next.js App Router pages and Server Actions.
- `src/components`: Reusable UI components (shadcn, layout elements).
- `src/features`: Domain-specific components (Kanban board, Settings, Dashboard).
- `src/lib`: Utility functions and Prisma client initialization.
- `prisma`: Database schema definition (`schema.prisma`).

## 🛡️ License
This project is open-source and available under the MIT License.
