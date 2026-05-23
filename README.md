# CV

Write your CV in Markdown and generate both a responsive web page and a professional PDF with minimal setup.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
[![code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Features](#features)
- [Quick Start](#quick-start)
- [Customization](#customization)
  - [Content](#content)
  - [Customization Examples](#customization-examples)
    - [Styling Changes](#styling-changes)
    - [Icons and Section Headings](#icons-and-section-headings)
    - [Customize Technical Skills Display](#customize-technical-skills-display)
    - [Modify Contact Information Display](#modify-contact-information-display)
  - [PDF Generation](#pdf-generation)
- [Deployment](#deployment)
  - [Automated Deployment](#automated-deployment)
    - [GitHub Pages](#github-pages)
    - [GitLab Pages](#gitlab-pages)
- [Resources](#resources)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- 📝 Write your CV in simple Markdown (parsed with [Marked](https://marked.js.org/))
- 🎨 Modern, responsive webpage built with [Vite](https://vite.dev/)
- 📄 Print-optimized PDF generation using [Puppeteer](https://pptr.dev/), with automatic PDF rebuilds via CI
- 💅 Beautiful icons from [Phosphor Icons](https://phosphoricons.com)
- 🛠️ Easy to customize with [SCSS](https://sass-lang.com/) and vanilla JavaScript
- 🚀 Ready to deploy to GitHub/GitLab Pages (or your preferred platform)
- ✨ No LaTeX knowledge required

## Quick Start

1. Clone the repository
2. Install dependencies (requires Node.js 20+):
   ```bash
   npm install
   ```
3. Edit `src/cv.md` with your information
4. Preview your CV:
   ```bash
   npm run dev     # Start a dev server with live reload
   ```
5. Generate PDF:
   ```bash
   npm run pdf     # Generate PDF
   ```

## Customization

### Content

Edit `src/cv.md` using Markdown. The file supports front matter for your personal information:

```yaml
---
title: Your Name
headline: Your Title
email: you@example.com
github: '@username'
---
```

> [!TIP]
> This project uses [Marked](https://github.com/markedjs/marked) to parse markdown. Marked supports the original `markdown.pl` implementation, [CommonMark](http://spec.commonmark.org/0.31.2/) and [GitHub Flavored Markdown](https://github.github.com/gfm/), which should generally suffice for most use cases. You could even add [custom extensions](https://marked.js.org/using_pro#extensions) to extend the functionality, if you needed to.

### Customization Examples

#### Styling Changes

Modify colors, fonts, and layout in `src/css/main.scss`:

```scss
// Change the primary color
$color-primary: #0073e6;  // Default blue
$color-primary: #2ecc71;  // Change to green

// Change font family
$font-sans: avenir, montserrat, corbel, 'URW Gothic', sans-serif;       // default
$font-sans: optima, candara, 'Noto Sans', source-sans-pro, sans-serif;  // Use different fonts
// or, if you prefer a Serif font, you could specify $font-serif to replace $font-sans
```

#### Icons and Section Headings

Add icons to your section headings using [Phosphor Icons](https://phosphoricons.com). The project uses the regular style by default, but you can switch to thin, light, bold, fill, or duotone styles by updating the import in `src/js/main.js`:

```javascript
// Default style
import '@phosphor-icons/web/regular'

// Or use another style
import '@phosphor-icons/web/bold'
import '@phosphor-icons/web/duotone'
```

Add icons to your markdown:

```markdown
## Skills [ph-wrench]           <!-- Adds wrench icon -->

## Experience [ph-briefcase]    <!-- Adds briefcase icon -->

## Education [ph-graduation-cap] <!-- Adds graduation cap icon -->
```

#### Customize Technical Skills Display

Modify skill categories and icons in `src/js/utils/skills.js`:

```javascript
// Change icons for skill categories
function getCategoryIcon(categoryText) {
  const category = categoryText.toLowerCase()
  const iconMap = {
    frontend: 'ph ph-browser',
    backend: 'ph ph-database',
    devops: 'ph ph-cloud',
    mobile: 'ph ph-device-mobile',
    // Add your own categories
  }
  // change Default icon from 'ph ph-toolbox' to, say 'ph-caret-double-right'
  return Object.entries(iconMap).find(([key]) => category.includes(key))?.[1] || 'ph-caret-double-right'
}
```

#### Modify Contact Information Display

Adjust contact info layout in `src/js/utils/header.js`:

```javascript
// Add new social media or contact types, for example, gitlab
if (metadata.gitlab) {
  const gitlabUsername = metadata.gitlab.replace(/^@/, '')
  contactDiv.appendChild(
    createContactItem('ph-gitlab-logo', metadata.gitlab, `https://gitlab.com/${gitlabUsername}`)
  )
}

// Change icon styles
// First update main.js to import duotone icons:
// import '@phosphor-icons/web/duotone'
// Then update the icon class:
iconElement.className = `ph-duotone ${iconClass}`  // Use duotone icons instead of regular
```

These files control the main aspects of the CV:

- `src/css/main.scss` - Overall styling and layout
- `src/js/utils/skills.js` - Technical skills section logic
- `src/js/utils/header.js` - Contact information and header
- `src/js/utils/timeline.js` - Experience and education entries
- `src/js/utils/headings.js` - Section headings and icons
- `src/js/utils/table.js` - Responsive table handling

### PDF Generation

- Run `npm run pdf` locally to create a PDF version of your CV
- PDFs are automatically generated by CI when you push to your repository:
  - For GitLab: The PDF is generated as a job artifact in the CI pipeline
  - For GitHub: The PDF will be generated as part of the GitHub Actions workflow

## Deployment

To build your project for production:

```sh
npm run build
```

The built site will be in the `./dist` directory. You can preview the build via

```sh
npm run preview
```

### Automated Deployment

This project includes ready-to-use CI/CD configurations for both GitHub and GitLab Pages.

#### GitHub Pages

1. Enable GitHub Pages in your repository:
   - Go to your repository's Settings
   - Navigate to "Pages" in the sidebar
   - Under "Build and deployment", select "GitHub Actions" as your source
2. Push your code to GitHub - the included GitHub Actions workflow will handle the rest!

#### GitLab Pages

1. The included `.gitlab-ci.yml` configuration will automatically deploy to GitLab Pages
2. For proper URL handling:
   - Go to your repository's Settings > Pages
   - Uncheck "Use unique domain" (this is checked by default)
   - Your CV will be available at `https://<username>.gitlab.io/<repo-name>`

You can also deploy your CV to other platforms like Cloudflare Pages, Vercel, Netlify, or your own server. See the [Vite docs](https://vite.dev/guide/build.html) for more information.

## Resources

- [Vite Guide](https://vite.dev/guide/)
- [Marked Documentation](https://marked.js.org/)
- [Modern Font Stacks](https://github.com/system-fonts/modern-font-stacks)
- favicon generated via <https://favicon.io/favicon-generator/>
- og image by [Amjith S on Unsplash](https://unsplash.com/photos/black-and-orange-computer-keyboard-NOY_FzRublM)

## License

MIT - Feel free to use and adapt for your needs.
