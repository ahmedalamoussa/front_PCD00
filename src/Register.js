import React, { useState, useEffect } from "react";

export default function Register() {
  // Charger les inscrits existants depuis localStorage
  const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    dateNaissance: "",
    job: "Patient",
    codeUnique: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [users, setUsers] = useState(savedUsers); // tous les inscrits

  const generateUniqueCode = () => {
    let code;
    do {
      code = Math.floor(100000 + Math.random() * 900000).toString();
    } while (users.some(u => u.codeUnique === code));
    return code;
  };

  useEffect(() => {
    if (form.job === "Kiné") {
      const newCode = generateUniqueCode();
      setForm(prev => ({ ...prev, codeUnique: newCode }));
    } else {
      setForm(prev => ({ ...prev, codeUnique: "" }));
    }
  }, [form.job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "email") {
      if (users.some(u => u.email === value)) {
        setErrors(prev => ({ ...prev, email: "Cet email existe déjà" }));
      } else {
        setErrors(prev => ({ ...prev, email: "" }));
      }
    }

    if (name === "password") {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
      if (!regex.test(value)) {
        setErrors(prev => ({
          ...prev,
          password: "Le mot de passe doit contenir lettres et chiffres",
        }));
      } else {
        setErrors(prev => ({ ...prev, password: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.email || errors.password) {
      alert("Veuillez corriger les erreurs avant de soumettre.");
      return;
    }

    const newUser = { ...form };
    setUsers(prev => {
      const updatedUsers = [...prev, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers)); // persister
      return updatedUsers;
    });

    if (form.job === "Kiné") {
      alert(`Inscription Kiné réussie ! Code unique : ${form.codeUnique}`);
    } else {
      alert(`Inscription Patient réussie pour ${form.nom} ${form.prenom}`);
    }

    // Réinitialiser le formulaire
    setForm({
      nom: "",
      prenom: "",
      email: "",
      password: "",
      dateNaissance: "",
      job: "Patient",
      codeUnique: "",
    });
    setErrors({ email: "", password: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Inscription</h2>

      <input type="text" name="nom" placeholder="Votre nom ..." value={form.nom} onChange={handleChange} className="input w-full" required />
      <input type="text" name="prenom" placeholder="Votre prénom ..." value={form.prenom} onChange={handleChange} className="input w-full" required />

      <div className="relative">
        <input type="email" name="email" placeholder="Votre email ..." value={form.email} onChange={handleChange} className="input w-full" required />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div className="relative">
        <input type="password" name="password" placeholder="Votre mot de passe ..." value={form.password} onChange={handleChange} className="input w-full" required />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
      </div>

      <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} className="input w-full" required />

      <select name="job" value={form.job} onChange={handleChange} className="select w-full">
        <option value="Patient">Patient</option>
        <option value="Kiné">Kiné</option>
      </select>

      {form.job === "Kiné" && (
        <input type="text" name="codeUnique" value={form.codeUnique} readOnly className="input w-full bg-gray-200 cursor-not-allowed" title="Code unique généré automatiquement" />
      )}

      <button type="submit" className="btn w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">S’inscrire</button>
    </form>
  );
}
