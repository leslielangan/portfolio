# Leslie Langan Portfolio - Deployment Guide

This is your complete portfolio website featuring three interactive AI agents: GTM Strategy Agent, Onboarding Agent, and Customer Journey Agent.

## 📦 What's Included

- **Landing Page**: Professional portfolio homepage with your background and expertise
- **GTM Strategy Agent**: AI-powered go-to-market strategy generator
- **Onboarding Agent**: Psychology-informed user onboarding strategy tool
- **Customer Journey Agent**: Comprehensive customer journey mapping and optimization

## 🚀 Deployment Options

### Option 1: Deploy to Vercel (RECOMMENDED - Free & Easy)

Vercel is perfect for React apps and it's completely free. Your site will be fast, secure, and easy to update.

#### Step-by-Step Instructions:

1. **Create a GitHub Account** (if you don't have one)
   - Go to github.com and sign up

2. **Install Git on Your Computer**
   - Download from: https://git-scm.com/downloads
   - Follow the installation wizard

3. **Upload Your Code to GitHub**
   - Open Terminal (Mac) or Command Prompt (Windows)
   - Navigate to the project folder:
     ```bash
     cd path/to/leslie-portfolio
     ```
   - Initialize git and push to GitHub:
     ```bash
     git init
     git add .
     git commit -m "Initial portfolio commit"
     git branch -M main
     ```
   - Create a new repository on GitHub (github.com/new)
   - Name it: `leslie-portfolio`
   - Copy the commands GitHub shows you and run them

4. **Deploy to Vercel**
   - Go to vercel.com and sign up with your GitHub account
   - Click "New Project"
   - Import your `leslie-portfolio` repository
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy" - that's it!
   - Your site will be live at: `leslie-portfolio.vercel.app`

5. **Connect Your Custom Domain (leslielangan.com)**
   - In Vercel, go to your project → Settings → Domains
   - Add: `leslielangan.com` and `www.leslielangan.com`
   - Vercel will show you DNS records to add

6. **Update GoDaddy DNS**
   - Log into GoDaddy
   - Go to your domain → Manage DNS
   - Add these records (Vercel will give you the exact values):
     - Type: A, Name: @, Value: [Vercel's IP]
     - Type: CNAME, Name: www, Value: cname.vercel-dns.com
   - Save changes (DNS can take up to 24 hours to propagate)

**That's it!** Your portfolio will be live at leslielangan.com

### Option 2: Traditional GoDaddy Hosting (More Complex)

If you prefer to use your existing GoDaddy hosting, you'll need to build a static version:

1. **Build the Static Files**
   ```bash
   npm install
   npm run build
   ```

2. **Upload to GoDaddy**
   - The build will create a `dist` folder
   - Log into GoDaddy cPanel
   - Go to File Manager
   - Upload everything from the `dist` folder to `public_html`

Note: This option requires more technical setup and doesn't support the API calls the agents need. **I strongly recommend Option 1 (Vercel)**.

## 🛠️ Local Development

Want to test changes before deploying?

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - Go to: http://localhost:5173

## 📝 Customization

### Update Your Contact Information

Edit `src/pages/Home.jsx`:
- Line 92-94: Update LinkedIn and email links
- Line 52-60: Update your bio text

### Change Colors

Each agent has its own color scheme in Tailwind:
- GTM Agent: `indigo` (blue-purple)
- Onboarding Agent: `purple` 
- Customer Journey Agent: `emerald` (green)

To change colors, search for `bg-indigo-600` and replace with other Tailwind colors like `bg-blue-600`, `bg-rose-600`, etc.

### Add More Content

To add case studies, blog posts, or additional pages:
1. Create new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in `src/pages/Home.jsx`

## 🔧 Technical Details

- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Anthropic Claude API (Sonnet 4)

## 📧 Support

If you run into any issues deploying:
1. Check that all files are in the correct directories
2. Make sure you have Node.js installed (download from nodejs.org)
3. Try deleting `node_modules` and running `npm install` again

## 🎯 For Your HCI Applications

When referencing this portfolio in your applications:
- **Live URL**: leslielangan.com (after deployment)
- **GitHub**: Your repository URL
- **Technologies**: React, AI/ML (Claude API), HCI principles

Talking points for your personal statements:
- "Built interactive AI agents that demonstrate strategic product marketing frameworks"
- "Applied behavioral psychology and learning science to onboarding design"
- "Created user-centered AI experiences that bridge technical capability with human needs"

## 📋 File Structure

```
leslie-portfolio/
├── src/
│   ├── components/
│   │   ├── GTMAgent.jsx
│   │   ├── OnboardingAgent.jsx
│   │   └── CustomerJourneyAgent.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
└── README.md
```

---

Built with ❤️ by Leslie Langan
Powered by Claude AI
