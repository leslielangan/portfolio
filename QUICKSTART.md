# QUICK START GUIDE

## 🎯 Get Your Portfolio Live in 15 Minutes

### Prerequisites
- A computer (Mac or Windows)
- Internet connection
- Your leslielangan.com domain (already owned ✓)

### Step 1: Download This Folder
You should have a folder called `leslie-portfolio` with all your files.

### Step 2: Install Node.js
1. Go to: https://nodejs.org
2. Download the LTS version (left button)
3. Install it (just click next through everything)
4. Verify: Open Terminal/Command Prompt and type `node --version`

### Step 3: Set Up The Project
Open Terminal (Mac) or Command Prompt (Windows) and:

```bash
cd path/to/leslie-portfolio
npm install
```

This will download all the needed packages (~2 minutes).

### Step 4: Test It Locally
```bash
npm run dev
```

Open your browser to: http://localhost:5173

You should see your portfolio! Test the agents by clicking through them.

### Step 5: Deploy to Vercel (FREE)

**5a. Create GitHub Account**
- Go to github.com
- Sign up (free)

**5b. Create Repository**
- Click the "+" in top right → New repository
- Name: `leslie-portfolio`
- Click "Create repository"

**5c. Upload Your Code**
Back in Terminal:
```bash
git init
git add .
git commit -m "My portfolio"
git remote add origin https://github.com/YOUR-USERNAME/leslie-portfolio.git
git push -u origin main
```

**5d. Deploy with Vercel**
- Go to vercel.com
- Click "Continue with GitHub"
- Import `leslie-portfolio`
- Click "Deploy"
- Wait 2 minutes - done!

**5e. Connect Your Domain**
In Vercel:
- Go to Settings → Domains
- Add: `leslielangan.com`
- Copy the DNS records shown

In GoDaddy:
- Log in → My Products → Domains
- Click your domain → Manage DNS
- Add the records Vercel gave you
- Save

**Done!** Your site will be live at leslielangan.com in ~1 hour (DNS propagation).

## 🆘 Troubleshooting

**"npm command not found"**
→ Install Node.js from nodejs.org

**"Permission denied" on Mac**
→ Use `sudo npm install`

**Site shows 404 after deployment**
→ Wait 24 hours for DNS, or use the Vercel URL first

**Agents not working**
→ They need the live deployment (not local testing)

## 📞 Need Help?

1. Check README.md for detailed docs
2. Google the error message
3. Ask Claude AI for help! 😊

## ✨ What You've Built

- Professional portfolio website
- 3 working AI agents
- Hosted on fast, global CDN
- Custom domain
- Perfect for HCI applications

**Total cost:** $0 (Vercel is free)
**Time to deploy:** 15 minutes
**Impressiveness:** 📈📈📈

Good luck with your HCI applications!
