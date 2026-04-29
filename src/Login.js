import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useKine } from './context/KineContext';
import { login } from './services/authService';

export default function Login() {
  const navigate = useNavigate();
  const { activateKineSession, clearKineSession } = useKine();
  const [form, setForm] = useState({
    email: "",
    motDePasse: "",
    userType: "patient", // par défaut patient
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await login(form.email, form.motDePasse, form.userType);

      if (form.userType === "patient") {
        clearKineSession();
        navigate("/exercises");
      } else {
        activateKineSession(form.email.trim().toLowerCase());
        navigate("/kine-dashboard");
      }
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setErrorMessage("Email, mot de passe ou type utilisateur incorrect.");
      } else {
        setErrorMessage("Erreur serveur. Reessayez dans un instant.");
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Se connecter
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="votre email"
            value={form.email}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            name="motDePasse"
            id="motDePasse"
            placeholder="votre mot de passe"
            value={form.motDePasse}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>

        {errorMessage && (
          <p className="mb-4 text-sm text-red-600">{errorMessage}</p>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="userType">
            Type d'utilisateur
          </label>
          <select
            name="userType"
            id="userType"
            value={form.userType}
            onChange={handleChange}
            className="input w-full"
          >
            <option value="patient">Patient</option>
            <option value="kine">Kinésithérapeute</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {loading ? "Connexion en cours..." : "Connexion"}
        </button>

        <p className="text-sm text-center text-gray-500 mt-4">
          Pas encore de compte ?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            S'inscrire
          </a>
        </p>
      </form>
    </div>
  );
}
