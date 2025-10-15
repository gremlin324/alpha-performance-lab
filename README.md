# Alpha Performance Lab - Edison Wave Affiliate Website

A comprehensive affiliate marketing website for The Edison Wave brainwave entrainment product, built with Astro, Tailwind CSS, and Cloudflare Pages.

## 🚀 Features

### Core Pages
- **Homepage**: Hero section with product overview and key benefits
- **Review Page**: Comprehensive 5,000-word review with scientific analysis
- **Science Page**: Detailed explanation of alpha brainwaves and entrainment
- **Frequency Explorer**: Interactive tool to explore different brainwave frequencies
- **Blog**: Content hub with articles and tips
- **Bonuses Page**: $197 bonus package showcase

### Bonus System
- **Automated Email Worker**: Cloudflare Email Worker for bonus delivery
- **Secure Access**: Token-based access control for bonus content
- **Multiple Bonuses**: Audio collection, habit tracker, email course, Discord community

### Technical Features
- **Astro Framework**: Fast, modern static site generation
- **Tailwind CSS**: Utility-first CSS framework
- **React Integration**: Interactive components (frequency slider)
- **Cloudflare Pages**: Global CDN hosting
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, structured data, sitemap

## 📁 Project Structure

```
ad-website-4-app/
├── public/
│   ├── images/         # Logos, author photos, charts
│   ├── audio/          # Non-product audio samples
│   └── assets/         # Bonus PDFs and files
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ComparisonTable.astro
│   │   ├── CallToAction.astro
│   │   └── InteractiveFrequencySlider.jsx
│   ├── layouts/
│   │   └── MainLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── review.astro
│       ├── science-of-alpha-waves.astro
│       ├── frequency-explorer.astro
│       ├── bonuses.astro
│       ├── blog/
│       │   ├── index.astro
│       │   └── natural-alpha-boost.astro
│       └── bonuses/
│           ├── audio.astro
│           ├── tracker.astro
│           ├── course.astro
│           └── discord.astro
├── workers/
│   └── bonus-delivery.js
├── package.json
├── astro.config.mjs
├── tailwind.config.js
└── wrangler.toml
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Cloudflare account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ad-website-4-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚀 Deployment

### Cloudflare Pages Deployment

1. **Connect GitHub Repository**
   - Go to Cloudflare Dashboard > Pages
   - Click "Create a project" > "Connect to Git"
   - Select your GitHub repository

2. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `ad-website-4-app`

3. **Environment Variables**
   Set these in Cloudflare Pages dashboard:
   ```
   AIRTABLE_API_KEY=your_airtable_api_key
   AIRTABLE_BASE_ID=your_airtable_base_id
   CLICKBANK_API_KEY=your_clickbank_api_key
   ```

4. **Deploy**
   - Push to main branch triggers automatic deployment
   - Custom domain: `alphaperformancelab.com`

### Email Worker Deployment

1. **Install Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Set Secrets**
   ```bash
   wrangler secret put AIRTABLE_API_KEY
   wrangler secret put AIRTABLE_BASE_ID
   wrangler secret put CLICKBANK_API_KEY
   ```

4. **Deploy Worker**
   ```bash
   wrangler deploy
   ```

## 📧 Email Worker Configuration

The bonus delivery system uses Cloudflare Email Workers to automatically send bonus packages to customers.

### Features
- **Receipt Verification**: Validates ClickBank receipts
- **Duplicate Prevention**: Checks if bonuses already sent
- **Secure Tokens**: Generates unique access tokens
- **Airtable Integration**: Records delivery status
- **Professional Emails**: HTML email templates

### Setup
1. Configure email routing in Cloudflare
2. Set up Airtable base for delivery tracking
3. Configure ClickBank API access
4. Test with sample receipts

## 🎯 Affiliate Marketing Strategy

### Target Audience
- **Primary**: Productivity enthusiasts, students, professionals
- **Secondary**: Meditation practitioners, biohackers, self-improvement seekers
- **Tertiary**: People seeking stress relief, better sleep, enhanced focus

### Content Strategy
- **Pillar Content**: Comprehensive review (5,000+ words)
- **Supporting Content**: Science explanations, blog posts, guides
- **Interactive Tools**: Frequency explorer, habit tracker
- **Community Building**: Discord server, email course

### Conversion Optimization
- **Social Proof**: Testimonials, success stories
- **Urgency**: Limited-time bonuses, exclusive access
- **Value Stacking**: $197 bonus package
- **Risk Reversal**: 365-day money-back guarantee

## 📊 Analytics & Tracking

### Key Metrics
- **Traffic**: Unique visitors, page views, bounce rate
- **Conversions**: Click-through rates, sales, revenue
- **Engagement**: Time on site, pages per session
- **Content Performance**: Most popular pages, blog posts

### Tools
- **Google Analytics**: Traffic and behavior analysis
- **Google Search Console**: SEO performance
- **Cloudflare Analytics**: CDN and performance metrics
- **ClickBank Analytics**: Affiliate sales tracking

## 🔧 Customization

### Branding
- Update logo and colors in `tailwind.config.js`
- Modify site title and description in `MainLayout.astro`
- Customize hero section in `index.astro`

### Content
- Edit review content in `review.astro`
- Update science information in `science-of-alpha-waves.astro`
- Add new blog posts in `src/pages/blog/`

### Bonuses
- Modify bonus descriptions in `bonuses.astro`
- Update email templates in `workers/bonus-delivery.js`
- Add new bonus pages in `src/pages/bonuses/`

## 🛡️ Security

### Access Control
- Token-based bonus access
- Receipt verification
- Duplicate prevention
- Rate limiting

### Data Protection
- No sensitive data storage
- Secure API communications
- HTTPS enforcement
- Privacy-compliant tracking

## 📈 Performance Optimization

### Site Speed
- **Astro**: Static site generation
- **Cloudflare CDN**: Global content delivery
- **Image Optimization**: WebP format, lazy loading
- **Code Splitting**: Minimal JavaScript bundles

### SEO
- **Meta Tags**: Optimized titles and descriptions
- **Structured Data**: Rich snippets
- **Sitemap**: XML sitemap generation
- **Internal Linking**: Strategic content connections

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version (18+)
   - Clear `node_modules` and reinstall
   - Verify all dependencies are installed

2. **Deployment Issues**
   - Check Cloudflare Pages build logs
   - Verify environment variables
   - Ensure build command and output directory are correct

3. **Email Worker Issues**
   - Check Wrangler configuration
   - Verify API keys and secrets
   - Test with sample data

### Support
- Check Cloudflare Pages documentation
- Review Astro documentation
- Contact support for critical issues

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

- **Email**: support@alphaperformancelab.com
- **Discord**: Join our community server
- **Website**: https://alphaperformancelab.com

---

**Alpha Performance Lab** - Enhancing cognitive performance through alpha wave entrainment technology.