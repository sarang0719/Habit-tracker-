# Deployment Guide

Since you have pushed your project to GitHub, the easiest way to deploy your React + Vite application is using **Vercel** or **Netlify**. Both services offer free hosting for personal projects and integrate seamlessly with GitHub.

## Option 1: Vercel (Recommended)

1.  **Create an Account**: Go to [Vercel.com](https://vercel.com) and sign up (login with GitHub).
2.  **Import Project**:
    *   Click **"Add New..."** -> **"Project"**.
    *   Select your GitHub repository: `sarang0719/Habit-tracker-`.
3.  **Configure**:
    *   Vercel usually detects Vite automatically.
    *   **Framework Preset**: Vite
    *   **Root Directory**: `./` (default)
    *   **Build Command**: `npm run build` (default)
    *   **Output Directory**: `dist` (default)
4.  **Deploy**: Click **Deploy**. Vercel will build your project and give you a live URL.

## Option 2: Netlify

1.  **Create an Account**: Go to [Netlify.com](https://www.netlify.com) and sign up.
2.  **Add New Site**:
    *   Click **"Add new site"** -> **"Import from an existing project"**.
    *   Choose **GitHub**.
    *   Authorize Netlify to access your repositories.
    *   Select `sarang0719/Habit-tracker-`.
3.  **Build Settings**:
    *   **Base directory**: (leave empty)
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
4.  **Deploy**: Click **Deploy Site**.

## Option 3: Manual Upload (If GitHub fails)

If you cannot connect GitHub, you can deploy manually:

1.  Run `npm run build` in your local terminal.
2.  Go to [Netlify Drop](https://app.netlify.com/drop).
3.  Drag and drop the `dist` folder from your project into the browser window.
