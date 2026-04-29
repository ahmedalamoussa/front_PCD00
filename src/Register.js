import React, { useState } from "react";
import { register } from "./services/authService";

export default function Register() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    userType: "patient",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await register(form);
      setSuccessMessage("Inscription reussie. Vous pouvez maintenant vous connecter.");
      setForm({
        nom: "",
        prenom: "",
        email: "",
        motDePasse: "",
        userType: "patient",
      });
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        setErrorMessage("Action non autorisee. Verifiez vos informations.");
      } else {
        setErrorMessage("Erreur lors de l'inscription. Reessayez.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Inscription</h2>

      <input type="text" name="nom" placeholder="Votre nom ..." value={form.nom} onChange={handleChange} className="input w-full" required />
      <input type="text" name="prenom" placeholder="Votre prénom ..." value={form.prenom} onChange={handleChange} className="input w-full" required />

      <div className="relative">
        <input type="email" name="email" placeholder="Votre email ..." value={form.email} onChange={handleChange} className="input w-full" required />
      </div>

      <div className="relative">
        <input type="password" name="motDePasse" placeholder="Votre mot de passe ..." value={form.motDePasse} onChange={handleChange} className="input w-full" required />
      </div>

      <select name="userType" value={form.userType} onChange={handleChange} className="select w-full">
        <option value="patient">Patient</option>
        <option value="kine">Kinesitherapeute</option>
      </select>

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

      <button type="submit" disabled={loading} className="btn w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">{loading ? "Inscription en cours..." : "S’inscrire"}</button>
    </form>
  );
}
