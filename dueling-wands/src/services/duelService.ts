let base_url: string;
const dev: string = `${import.meta.env.VITE_ENV}`;
if (dev === "DEV") {
    base_url = `${import.meta.env.VITE_SPELL_SERVICE_URL}`
} else {
    base_url = "";
}

