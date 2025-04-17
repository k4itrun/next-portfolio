# Next.js Portfolio

<a href='https://ko-fi.com/A0A11481X5'><img width=150 src='https://storage.ko-fi.com/cdn/kofi3.png'></a>

This is a simple Next.js portfolio template, designed with a theme that changes based on the time of day. The layout is clean and modern, making it perfect for showcasing your work, skills, and projects.

<img src="https://img.shields.io/badge/No-252121?logo=github&style=flat-square&label=Maintained%3F&color=252121">

## Table of Contents

1. [Information](#information)
   - [Config](#config)
2. [Deployment](#deployment)
   - [Self Hosting](#self-Hosting)
   - [▲ Vercel (recommended)](#-vercel-recommended-for-nextjs)
   - [Other options](#other-options)
3. [Environment Variables](#environment-variables)
4. [Contributing](#contributing)
5. [License](#license)

## Information

### Config

Make sure to update the pre-configured values in the [k4itrun.config.ts](https://github.com/k4itrun/next-portfolio/blob/main/k4itrun.config.ts#L4) file (such as `name`, `description`, `socials`, etc.) before deploying your site. Edit them in your forked repository.

## Deployment

### Self Hosting

1. Clone the repo: `git clone https://github.com/k4itrun/next-portfolio.git`
2. Install dependencies: `npm i`
3. Copy `.env.example` and rename it to `.env`.
4. Set these values in `.env`:
   - `DISCORD_USER_ID`: for public account info.
   - `DISCORD_WEBHOOK_URL`: for the contact form (coming soon).
5. Edit [k4itrun.config.ts](https://github.com/k4itrun/next-portfolio/blob/main/k4itrun.config.ts#L4) (e.g., `name`, `description`, `socials`).
6. Build the project: `npm run build`
7. For development, run: `npm run dev`
8. Open [http://localhost:3000](http://localhost:3000) to view the site!

### ▲ Vercel (recommended for Next.js)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fnext-portfolio&env=DISCORD_USER_ID,DISCORD_WEBHOOK_URL&envDescription=Environment%20Variables%20Docs&envLink=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fnext-portfolio%23deployment&project-name=portfolio&repo-name=k4itrun-portfolio&demo-title=Example%20deploy&demo-description=Example%20production%20deploy%20from%20Github%20Repository&demo-url=https%3A%2F%2F9ll.fun&demo-image=https%3A%2F%2Fi.imgur.com%2FT4VsRuy.png)

1. Click the button above or go to: [Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fnext-portfolio&env=DISCORD_USER_ID,DISCORD_WEBHOOK_URL&envDescription=Environment%20Variables%20Docs&envLink=https%3A%2F%2Fgithub.com%2Fk4itrun%2Fnext-portfolio%23deployment&project-name=portfolio&repo-name=k4itrun-portfolio&demo-title=Example%20deploy&demo-description=Example%20production%20deploy%20from%20Github%20Repository&demo-url=https%3A%2F%2F9ll.fun&demo-image=https%3A%2F%2Fi.imgur.com%2FT4VsRuy.png)
1. Add your `DISCORD_USER_ID` for account info.
1. Add the `DISCORD_WEBHOOK_URL` for the contact form (coming soon).
1. Click the `Deploy` button and wait.
1. In your forked repo, update the values in the [k4itrun.config.ts](https://github.com/k4itrun/next-portfolio/blob/main/k4itrun.config.ts#L4) file (e.g., `name`, `description`, `socials`, etc.).

### Other options

To deploy this site, you can use platforms like:

1. [Vercel](https://vercel.com/) (recommended for Next.js)
2. [Netlify](https://www.netlify.com/)
3. [AWS](https://aws.amazon.com/)
4. [DigitalOcean](https://www.digitalocean.com/) and more...

Simply push your code to a GitHub repository, and connect it to your preferred platform for continuous deployment.

## Environment Variables

You can configure environment variables in the `.env` file. Example:

| Variable              | Description                         | Required |
| --------------------- | ----------------------------------- | -------- |
| `DISCORD_WEBHOOK_URL` | For the contact form (coming soon). | `No`     |
| `DISCORD_USER_ID`     | For account info (public).          | `Yes`    |

## Contributing

We greatly appreciate any contributions to this project! Whether you want to open new issues, submit pull requests, or share suggestions for improvements, your input is invaluable. We encourage you to refer to our [Contributing Guidelines](CONTRIBUTING.md) to facilitate a seamless collaboration process.

You can also support the development of this software through a donation, helping me bring new optimal and improved projects to life.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/A0A11481X5)

Thank you for your interest and support! ✌️

## License

This project uses the MIT license. You can find the full license details in the [LICENSE](license.md) file.

## Contact

For any inquiries or support, you can reach out via [contact@w1sh.xyz](mailto:contact@w1sh.xyz).
