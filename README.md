<div align= "center">
 <img width="230" alt="logo@2x" src="public/icon.svg">
</div>

<img src="public/icon.svg" align="right" width="90px"/>

# [Tenryou](https://Tenryou.live)

Tenryou is a companion website create for the action-rpg game [Genshin Impact](https://genshin.mihoyo.com/). Tenryou is intended to help players view information from the game in a visual and cohesive manner with via information pulled from various resources to provide up-to-date information with a teambuilder prototype to help you create your team.

<!-- [![Contributors][contributors-shield]][contributors-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url] -->

## Current Features
* User Card Profile/Team Builder
* Characters
* Artifacts
* Weapons
* Materials
* Achievements
* And more...

## Current Roadmap
- [ ] Add more options to edit user images
- [ ] Improve Teambuilder by migrating to a different AI and add example teams
- [ ] TCG Support
- [ ] Add calculator for stats, and ascension
- [ ] Multi-language Support
    - [ ] Japanese
    - [ ] Chinese
    - [ ] Korean
    - [ ] Etc...
- [ ] HSR/ZZZ support
- [ ] Discord Bot

## Development
Tenryou is create via Next.js and information is pulled using axios by these sources:

* [Genshin-db](https://github.com/theBowja/genshin-db)
* [Enka.network](https://enka.network/) via [Enka.network.js](https://github.com/Jelosus2/enkanetwork.js)
* [Ambr.top](https://ambr.top/)

## Built With

[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![TailwindCSS][TailwindCSS]][TailwindCSS-url]
[![Vercel][Vercel]][Vercel-url]
[![Framer-Motion][Framer-Motion]][Framer-Motion-url]

## Prerequisites

* [Git](https://git-scm.com/downloads) Installed.
* [Node.js](https://nodejs.org/en/) Installed.
* Some knowledge of bash (a shell) commands (ex.: cd, ls).
* An api key for the Team Builder [Gemini](https://ai.google.dev/gemini-api) or [OpenAI](https://platform.openai.com/) depending on which one you choose.

## Getting Started
``` bash
# clone repository
git clone https://github.com/Pho86/Tenryou.git

# change directory into the repository
cd Tenryou

# install dependencies
npm i, pnpm i

# create .env.local and add a key depending on which AI wanted
touch .env.local

# run in dev mode and open in http://localhost:3000.
npm run dev, pnpm dev

# export as production static site
npm run build, pnpm build

# run e2e tests
npm run cypress:open

```

## Contributing

Contribute by reporting a bug/suggesting an enhancement

1. Navigate to the [issues](https://github.com/pho86/Tenryou/issues) page in this repository
2. Add a new `Issue` and give it a clear and concise title and description. Include any other information, images, etc. that may be needed.
3. Give it an appropriate label
4. Thank you for your contribution!

Contribute through development,

1. Create an issue before contributing
2. Fork the Project
3. Create your Feature Branch (`git checkout -b Feature`)
4. Commit your Changes (`git commit -m 'Add some Feature'`)
5. Push to the Branch (`git push origin Feature`)
6. Open a Pull Request with a clear and concise title and description.
7. Thank you for your contribution!


## License

Distributed under the [MIT](https://github.com/pho86/Tenryou/blob/main/LICENSE) License. 

This website and repository is not affiliated with HoYoVerse.
All content and materials from the game Genshin Impact, are trademarks and copyrights of the original owners and HoYoVerse.


<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/pho86/Tenryou.svg?style=for-the-badge
[contributors-url]: https://github.com/pho86/Tenryou/graphs/contributors
[stars-shield]: https://img.shields.io/github/stars/pho86/Tenryou.svg?style=for-the-badge
[stars-url]: https://github.com/pho86/Tenryou/stargazers
[issues-shield]: https://img.shields.io/github/issues/pho86/Tenryou.svg?style=for-the-badge
[issues-url]: https://github.com/pho86/Tenryou/issues
[license-shield]: https://img.shields.io/github/license/pho86/Tenryou.svg?style=for-the-badge
[license-url]: https://github.com/pho86/Tenryou/blob/master/LICENSE.txt

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TailwindCSS]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Vercel]: https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[Framer-Motion]: https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=white
[Framer-Motion-url]: https://www.framer.com/motion/
