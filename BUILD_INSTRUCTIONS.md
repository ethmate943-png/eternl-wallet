# How to Deploy to Netlify

You can deploy this Next.js application to Netlify using either the Netlify CLI or by connecting your Git repository.

## Option 1: Git Integration (Recommended)

1.  Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2.  Log in to [Netlify](https://app.netlify.com/).
3.  Click **"Add new site"** > **"Import an existing project"**.
4.  Select your Git provider and authorize Netlify.
5.  Search for your repository and select it.
6.  **Build Settings**:
    *   **Base directory**: `/` (leave empty)
    *   **Build command**: `npm run build`
    *   **Publish directory**: `.next`
7.  Click **"Deploy site"**.

Netlify will automatically detect the `netlify.toml` file and configure the `@netlify/plugin-nextjs` for you.

## Option 2: Netlify CLI (Manual)

1.  Install the Netlify CLI globally:
    ```bash
    npm install -g netlify-cli
    ```

2.  Login to your Netlify account:
    ```bash
    netlify login
    ```

3.  Initialize the site (run inside the project folder):
    ```bash
    netlify init
    ```
    *   Select "Create & configure a new site".
    *   Follow the prompts.

4.  Deploy:
    ```bash
    netlify deploy --prod
    ```
    *   Build command: `npm run build`
    *   Publish directory: `.next`

---

## Environment Variables

If your application uses environment variables (e.g., in `.env`), remember to add them to Netlify:

1.  Go to **Site settings** > **Build & deploy** > **Environment**.
2.  Click **"Edit variables"** and add your keys and values.
