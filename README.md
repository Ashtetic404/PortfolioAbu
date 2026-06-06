# Abu — Personal Website

A clean, modern personal portfolio site built with pure HTML, CSS, and JavaScript.

## Folder Structure

```
abu-portfolio/
├── index.html          ← Main HTML file (all sections)
├── css/
│   └── style.css       ← All styles (tokens, dark/light mode, animations, responsive)
├── js/
│   └── main.js         ← Theme toggle, scroll effects, mobile nav, animations
├── assets/             ← Put your images here (profile photo, etc.)
│   └── profile.jpg     ← (optional) Add your photo here
└── README.md           ← This file
```

---

## How to Customise

### Add your profile photo
1. Add your photo to the `assets/` folder (e.g. `assets/profile.jpg`)
2. In `index.html`, find the comment `<!-- Replace avatar -->` and swap:
   ```html
   <!-- Remove this block -->
   <div class="avatar-placeholder" aria-hidden="true">...</div>

   <!-- Add this instead -->
   <img src="assets/profile.jpg" alt="Abu smiling" class="avatar-img" />
   ```

### Update social links
Search for `href="https://github.com/"` etc. in `index.html` and replace with your real URLs.

### Add more projects
Find the comment `<!-- Add more project cards above this line -->` in `index.html` and copy the project card template provided in the comments.

### Change accent colour
In `css/style.css`, find `--color-primary` in both `:root` and `[data-theme='dark']` blocks and update to your preferred colour.

---

## Deploying to GitHub Pages

### Method 1 — Upload via GitHub website (easiest)

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it `username.github.io` (replace `username` with your GitHub username)
4. Set visibility to **Public**, click **Create repository**
5. Click **uploading an existing file**
6. Drag and drop ALL the files and folders:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `assets/` folder (if you have photos)
7. Scroll down, click **Commit changes**
8. Your site will be live at `https://username.github.io` within 1–2 minutes

### Method 2 — Git command line

```bash
# 1. Clone your new repository (replace USERNAME)
git clone https://github.com/USERNAME/USERNAME.github.io.git

# 2. Copy all site files into the cloned folder
cp -r abu-portfolio/* USERNAME.github.io/

# 3. Push to GitHub
cd USERNAME.github.io
git add .
git commit -m "Initial portfolio site"
git push origin main
```

### Enabling GitHub Pages (if not automatic)
1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose **main** branch, **/ (root)** folder
4. Click **Save**
5. Your site will appear at `https://username.github.io`

---

## Custom Domain (Optional)
1. Buy a domain (e.g. `abu.dev`)
2. In your repo, create a file called `CNAME` with your domain on the first line:
   ```
   abu.dev
   ```
3. Point your domain's DNS to GitHub's IPs — see [GitHub Pages custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

Made with care. No frameworks, no build tools — just HTML, CSS, and JavaScript.
