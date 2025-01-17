import { jwtDecode } from "jwt-decode";

export default function isTokenValid(token: string): boolean {
    if (!token) return false;

    try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now()/1000; // Temps actuel en secondes /1000
        const diff = (decoded.exp - currentTime);
        console.log("Expiration du token : "+decoded.exp +" Temps actuel : "+ currentTime+" Temps restant : " + diff);
        return decoded.exp > currentTime; // Token valide si `exp` est dans le futur
    } catch (error) {
        console.error("Invalid token:", error);
        return false;
    }
}


