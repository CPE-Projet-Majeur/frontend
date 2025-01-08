import IUser from "../types/IUser";
//import { formUser } from "../pages/Signup"

let base_url: string;
const dev: string = `${import.meta.env.VITE_ENV}`;
if (dev === "DEV") {
    base_url = `${import.meta.env.VITE_MONOLITH_URL}`
} else {
    base_url = "";
}

/**
 * Méthode pour authentifier un utilisateur via la backend
 * @param username Nom d'utilisateur
 * @param password Mot de passe
 * @returns Promise Une promesse contenant l'ID de l'utilisateur
 */
export const login = async (username: string, password: string): Promise<number> => {
    const url: string = base_url+"/auth";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect !");
    }

    const result = await response.json();

    if (typeof result === "number") {
        return result; // ID de l'utilisateur trouvé
    }

    throw new Error("Utilisateur non trouvé ou réponse inattendue !");
};

export const fetchUserById = async (userId: number): Promise<IUser> => {
    const url: string = base_url+"/user/"+userId;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de la récupération de l'utilisateur : ${response.statusText}`);
    }

    return await response.json();
};

export const fetchAllUsers = async (): Promise<IUser[]> => {
    try{
        const url: string = base_url+"/users";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur lors de la récupération des utilisateurs`);
        }

        return await response.json();
    } catch (error){
        console.error('Erreur lors de la requête fetchAllUsers:', error);
        return [];
    }
};

export const register = async (user: IUser): Promise<IUser> => {
    const url: string = base_url+"/user";
    console.log(url)

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({...user}),
    });

    if (!response.ok) {
        throw new Error(`Erreur lors de l'inscription : ${response.statusText}`);
    }

    return await response.json();
};