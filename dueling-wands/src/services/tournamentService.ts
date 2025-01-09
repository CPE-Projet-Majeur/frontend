import ITournament from "../types/ITournament";

let base_url: string; // Changer pour mettre la base url de nodejs
const dev: string = `${import.meta.env.VITE_ENV}`;
if (dev === "DEV") {
    base_url = `${import.meta.env.VITE_MONOLITH_URL}`
} else {
    base_url = "";
}

export const fetchTournamentByCode = async (code : string): Promise<ITournament> => {
    const url: string = base_url+"/tournament/code";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({code}),
    });
    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du tournois : ${response.statusText}`);
    }
    return await response.json();
};

export const fetchTournamentCode = async (): Promise<string> => {
    const url: string = base_url+"/tournament/code";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération du code de tournois : ${response.statusText}`);
    }
    return await response.json().then((data) => {return data.code});
};

export const joinRoom = async (code : string): Promise<number> => {
    const url: string = base_url+"/tournament/code";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({code}),
    });
    if (!response.ok) {
        throw new Error(`Erreur lors de l'entrée en room de tournois : ${response.statusText}`);
    }
    return await response.json();
};

export const startTournament = async (userId : number): Promise<boolean> => {
    const url: string = base_url+"/tournament/code";
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({userId}),
    });
    if (!response.ok) {
        throw new Error(`Erreur lors du lancement du Tournoi : ${response.statusText}`);
    }
    return await response.json();
};