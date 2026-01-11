import React, { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", form);
    alert(`Connexion avec ${form.email}`);
    // Ici tu peux appeler ton API pour vérifier l'email et le mot de passe
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

        <div className="mb-6">
          <label className="block text-gray-700 mb-1" htmlFor="password">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="votre mot de passe"
            value={form.password}
            onChange={handleChange}
            className="input w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Connexion
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
