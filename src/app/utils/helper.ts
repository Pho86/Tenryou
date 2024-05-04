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
            name:"Xianyun",
            fileName: "Liuyun"
        }
    ];
    
    MihoyoNames.sort((a, b) => a.name.localeCompare(b.name));

    for (let i = 0; i < names.length; i++) {
        let found = false;
        for (let j = 0; j < MihoyoNames.length; j++) {
            if (names[i].name === MihoyoNames[j].name) {
                names[i].fileName = MihoyoNames[j].fileName;
                found = true;
                break;
            }
        }
        if (!found) {
            names[i].fileName = names[i].name;
        }
    }
}

export function parseColorTags(text: string) {
    // Regular expression to match <color> tags with hex color values
    const regex = /<color=(#[0-9A-Fa-f]{8})>(.*?)<\/color>/g;

    // Replace <color> tags with span elements with inline style for color
    return text.replace(regex, (match, color, content) => {
        return `<span style="color: ${color};">${content}</span>`;
    });
}
export function getRandomNumber(min: number, max: number): number {

    return Math.random() * (max - min) + min;
  }