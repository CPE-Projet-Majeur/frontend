import ISpell from "../types/ISpell";

let base_url: string;
const dev: string = `${import.meta.env.VITE_ENV}`;
if (dev === "DEV") {
    base_url = `${import.meta.env.VITE_SPELL_SERVICE_URL}`
} else {
    base_url = "";
}

// Acquisition de tous les spells pour affichage dans le caroussel
export const fetchAllSpells = async (): Promise<ISpell[]> => {
    const url: string = base_url+"/spells";
    console.log(url)

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de la recupération des sorts : ${response.statusText}`);
    }

    return await response.json();
};