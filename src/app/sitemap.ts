import axios from "axios";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    return [
        {
            url: `https://www.tenryou.live`,
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: `https://www.tenryou.live/characters`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/weapons`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/artifacts`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/achievements`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/namecards`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/outfits`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/elements`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/materials`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/users`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `https://www.tenryou.live/teambuilder`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...(await generateCharacterData()).map((character: any) => ({
            url: `https://www.tenryou.live/characters/${character.slug}`,
            lastModified: character.updatedAt,
        })),
    ];
}
type sitemap = {
    slug: string,
    updatedAt: Date
}
const generateCharacterData = async () => {
    let characterNames: string[] = [];
    let sitemap: sitemap[] = [];
    try {
        const res = await axios.get<any[]>("https://genshin-db-api.vercel.app/api/v5/characters?query=names&matchCategories=true&dumpResults=true");
        characterNames = res.data;
        for (let i = 0; i < characterNames.length - 1; i++) {
            sitemap.push({
                slug: characterNames[i],
                updatedAt: new Date()
            });
        }
        return sitemap;
    } catch (error) {
        console.error("Error fetching player data:", error);
        return sitemap;
    }
};
