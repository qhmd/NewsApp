import { mockData } from "./mockData";

export const getnewsFromApi = async () => {
    try {
        console.log("Mulai fetch data dari NYT...");
        const res = await fetch('http://api.nytimes.com/svc/topstories/v2/home.json?api-key=gtORzHRECZwa9jePeHX6R2a4wQfzOz5q',{
            method: 'GET',
            headers: {
                'User-Agent': 'expo-app', // atau string lain yang valid
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        // return mockData
        return data;
    } catch (error) {
            console.error('Fetch GAGAL:', error.message || error);
            console.error('GAGAL FETCH!');
            console.error("Error full object:", error); // Full error object
            console.error("Error message:", error.message); // Message
            console.error("Error stack:", error.stack); // Stack trace
        // Fallback ke mockData
        return mockData;
    }
};

