import IUser from "../types/IUser";
import Ilogin from '../types/Ilogin';
import Cookies from 'js-cookie';

let base_url: string;
const dev: string = `${import.meta.env.VITE_ENV}`;
if (dev === "DEV") {
    base_url = `${import.meta.env.VITE_MONOLITH_URL}`
} else {
    base_url = "";
}

export const manageCookies = (token : string) => {
    Cookies.set('access_token', token.toString(), { expires: 7, path: '/' }); /* secure: true Permet de n'accepter que HTTPS */
}

// registration du user, renvoie le token
export const register = async (user: IUser): Promise<Ilogin> => {
    const url: string = base_url+"/users";
    console.log(`Payload ${user} sent to ${url}`);

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

/**
 * Méthode pour authentifier un utilisateur via la backend
 * @param username Nom d'utilisateur
 * @param password Mot de passe
 * @returns Promise Une promesse contenant l'ID de l'utilisateur
 */
export const login = async (login: string, password: string): Promise<Ilogin> => {
    const url: string = base_url+"/login";
    console.log("try to request for login : ", login, password);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect !");
    }
    return await response.json();
};

export const fetchUserByName = async (userName: string): Promise<IUser> => {
    const url: string = base_url+"/users/login/"+userName;

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