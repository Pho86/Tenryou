import axios from "axios";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    return [
        {
            url: `${process.env.VERCEL_URL}/`,
            lastModified: new Date(),
            priority: 1,
        },
        {
            url: `${process.env.VERCEL_URL}/characters`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${process.env.VERCEL_URL}/weapons`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${process.env.VERCEL_URL}/artifacts`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${process.env.VERCEL_URL}/users`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${process.env.VERCEL_URL}/teambuilder`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...(await generateCharacterData()).map((character: any) => ({
            url: `${process.env.VERCEL_URL}/characters/${character.slug}`,
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