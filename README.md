<img src="public/icon.svg" align="right" width="90px"/>

# [Tenryou](https://tenryou.live)

Tenryou is a companion website for the action-RPG game [Genshin Impact](https://genshin.mihoyo.com/). It lets players browse game data in a visual and cohesive way, pulling up-to-date information from various sources, with an AI-powered team builder to help you put together your roster.

## Features
* Character, Weapon, Artifact, Material, Achievement, Namecard, and Outfit browsers
* Daily Domains — see what's farmable today
* Birthday calendar
* Team Builder with AI recommendations powered by Gemini
* User profile via Enka.Network UID lookup
* Elements reference page
* Dark mode

## Roadmap
- [ ] Add more customization options to user images
- [ ] Improve Team Builder with example teams
- [ ] TCG support
- [ ] Stats and ascension calculator
- [ ] Discord Bot

## Development
Tenryou is built with Next.js. Data is fetched using the native Fetch API from:

* [Genshin-db](https://github.com/theBowja/genshin-db) — game data via the [genshin-db-api](https://genshin-db-api.vercel.app/)
* [Enka.Network](https://enka.network/) — images and user profile data via [enkanetwork.js](https://github.com/Jelosus2/enkanetwork.js)

## Built With

[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![TailwindCSS][TailwindCSS]][TailwindCSS-url]
[![Vercel][Vercel]][Vercel-url]
[![Motion][Motion]][Motion-url]

## Prerequisites

* [Git](https://git-scm.com/downloads) installed
* [Node.js](https://nodejs.org/en/) installed
* A [Gemini API key](https://ai.google.dev/gemini-api) for the Team Builder

## Getting Started

```bash
# clone repository
git clone https://github.com/Pho86/Tenryou.git

# change directory into the repository
cd Tenryou

# install dependencies
npm install

# create .env.local and add your Gemini API key
# GOOGLE_API_KEY=your_key_here
touch .env.local

# run in dev mode at http://localhost:3000
npm run dev

# build for production
npm run build
```

## Contributing

**Reporting a bug or suggesting a feature:**

1. Go to the [issues](https://github.com/pho86/Tenryou/issues) page
2. Open a new issue with a clear title and description
3. Add an appropriate label

**Contributing code:**

1. Open an issue before starting work
2. Fork the project
3. Create a feature branch (`git checkout -b feature/my-feature`)
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/my-feature`)
6. Open a Pull Request

## License

Distributed under the [MIT](https://github.com/pho86/Tenryou/blob/main/LICENSE) License.

This website and repository is not affiliated with HoYoverse.  
All content and materials from Genshin Impact are trademarks and copyrights of their respective owners and HoYoverse.

<!-- MARKDOWN LINKS & IMAGES -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Motion]: https://img.shields.io/badge/Motion-black?style=for-the-badge&logo=framer&logoColor=white
[Motion-url]: https://motion.dev/
