import React from "react";

export default function Services() {
  const exercises = [
    {
      type: "Renforcement du dos",
      image: "https://i.ytimg.com/vi/XitXEl62TsM/maxresdefault.jpg",
      comment: "Exercice pour renforcer le bas du dos et améliorer la posture."
    },
    {
      type: "RTC (Rééducation fonctionnelle)",
      image: "https://tse2.mm.bing.net/th/id/OIP.XAzLfHaKozR2lU1JNO4b-wHaE8?w=1068&h=712&rs=1&pid=ImgDetMain&o=7&rm=3",
      comment: "Rééducation contrôlée en temps réel pour corriger les mouvements."
    },
    {
      type: "Étirement",
      image: "https://tse2.mm.bing.net/th/id/OIP.8QDsMDEWwrRXdiEmJ2tP6gHaEc?w=768&h=461&rs=1&pid=ImgDetMain&o=7&rm=3",
      comment: "Étirement pour améliorer la flexibilité et réduire la douleur."
    },
    {
      type: "Renforcement abdominal",
      image: "https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg",
      comment: "Exercices ciblés pour renforcer la sangle abdominale."
    },
    {
      type: "Équilibre et stabilité",
      image: "https://images.pexels.com/photos/4324022/pexels-photo-4324022.jpeg",
      comment: "Travail de l’équilibre pour prévenir les chutes et améliorer la coordination."
    },
    {
      type: "Renforcement des jambes",
      image: "https://www.nvcoaching.fr/wp-content/uploads/2020/02/coaching-groupe-illkirch-ateliers-teamtraining.jpg",
      comment: "Exercices pour muscler les jambes et soutenir le bas du dos."
    },
    {
      type: "Étirement du cou et épaules",
      image: "https://tuinasimo.com/wp-content/uploads/2023/03/Etirement-du-cou-en-position-assise-1024x1024.jpg",
      comment: "Étirement doux pour soulager la tension du cou et des épaules."
    },
    {
      type: "Respiration et relaxation",
      image: "https://i0.wp.com/gritdaily.com/wp-content/uploads/2023/01/AHIMSA-6-1.jpg",
      comment: "Exercices de respiration pour réduire le stress et améliorer la récupération."
    }
  ];

  return (
    <section style={{ padding: "60px 20px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "50px" }}>
        Nos Services et Exercices
      </h2>
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "30px"
      }}>
        {exercises.map((ex, index) => (
          <div key={index} style={{
            flex: "1 1 250px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            overflow: "hidden",
            textAlign: "center"
          }}>
            <img
              src={ex.image}
              alt={ex.type}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{ex.type}</h3>
              <p style={{ fontSize: "0.95rem", color: "#555" }}>{ex.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
