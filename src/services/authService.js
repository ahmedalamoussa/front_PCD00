import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

export const login = async (email, motDePasse, userType) => {
    try {
        const response = await axios.post(API_URL + "login", {
            email,
            motDePasse,
            userType
        });
        
        // Si le backend renvoie juste le string du token :
        if (response.data) {
            localStorage.setItem("user_token", response.data);
        }
        return response.data;
    } catch (error) {
        console.error("Erreur de connexion", error);
        throw error;
    }
};

export const register = async (user) => {
    try {
        const response = await axios.post(API_URL + "register", user);
        return response.data;
    } catch (error) {
        console.error("Erreur d'inscription", error);
        throw error;
    }
};