export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowerCaseEachLetter(string: string) {
    return string.toLowerCase().replace(/ /g, '-');
}

export function addFileName(names: any[]) {
    const MihoyoNames = [
        {
            name: "Amber",
            fileName: "Ambor",
        },
        {
            name: "Baizhu",
            fileName: "Baizhuer",
        },
        {
            name: "Alhaitham",
            fileName: "Alhatham",
        },
        {
            name: "Arataki Itto",
            fileName: "Itto",
        },
        {
            name: "Hu Tao",
            fileName: "Hutao",
        },
        {
            name: "Kamisato Ayaka",
            fileName: "Ayaka",
        },
        {
            name: "Kamisato Ayato",
            fileName: "Ayato",
        },
        {
            name: "Jean",
            fileName: "Qin",
        },
        {
            name: "Aether",
            fileName: "PlayerBoy",
        },
        {
            name: "Kaedehara Kazuha",
            fileName: "Kazuha",
        },
        {
            name: "Kuki Shinobu",
            fileName: "Shinobu",
        },
        {
            name: "Kujou Sara",
            fileName: "Sara",
        },
        {
            name: "Lynette",
            fileName: "Linette",
        },
        {
            name: "Lyney",
            fileName: "Liney",
        },
        {
            name: "Noelle",
            fileName: "Noel",
        },
        {
            name: "Raiden Shogun",
            fileName: "Shougun",
            nameCardName: "Raiden"
        },
        {
            name: "Sangonomiya Kokomi",
            fileName: "Kokomi",
        },
        {
            name: "Shikanoin Heizou",
            fileName: "Heizo",
        },
        {
            name: "Yun Jin",
            fileName: "Yunjin",
        },
        {
            name: "Lumine",
            fileName: "PlayerGirl",
        },
        {
            name: "Yae Miko",
            fileName: "Yae",
        },
        {
            name: "Yanfei",
            fileName: "Feiyan",
        },
        {
            name: "Thoma",
            fileName: "Tohma",
        },
        {
            name: "Kirara",
            fileName: "Momoka",
        },
        {
            name: "Kirara",
            fileName: "Momoka",
        },
        {
            name: "Xianyun",
            fileName: "Liuyun"
        },
        {
            name:"Tartaglia",
            fileName:"Tartaglia",
            nameCardName:"Childe"
        }
    ];

    MihoyoNames.sort((a, b) => a.name.localeCompare(b.name));

    const mihoyoMap = new Map();
    MihoyoNames.forEach(({ name, fileName, nameCardName }) => {
        mihoyoMap.set(name, { fileName, nameCardName });
    });

    for (const nameEntry of names) {
        const mihoyoEntry = mihoyoMap.get(nameEntry.name);
        if (mihoyoEntry) {
            nameEntry.fileName = mihoyoEntry.fileName;
            nameEntry.nameCardName = mihoyoEntry.nameCardName;
        } else {
            nameEntry.fileName = nameEntry.name;
            nameEntry.nameCardName = undefined;
        }
    }

    return names;
}

export function parseColorTags(text: string) {
    const regex = /<color=(#[0-9A-Fa-f]{8})>(.*?)<\/color>/g;

    return text.replace(regex, (match, color, content) => {
        return `<span style="color: ${color};">${content}</span>`;
    });
}

export function getRandomNumber(min: number, max: number): number {

    return Math.random() * (max - min) + min;
}