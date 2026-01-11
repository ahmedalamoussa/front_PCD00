import React from "react";

export default function Home() {
  const heroImage = "https://www.medicaldoc.fr/wp-content/uploads/2024/07/Comment-lintelligence-artificielle-revolutionne-la-pratique-quotidienne-des-kines-liberaux-decouvrez-les-avantages-surprenants-1024x578.png";
  const infoImage = "https://www.pollensa.com/templates/yootheme/cache/8b/esports-cate-8bfbe8de.jpeg";
  const demoVideo = "https://www.bing.com/videos/riverview/relatedvideo?q=+kine+IA++r&&mid=BB9A1FA55D2AD5199513BB9A1FA55D2AD5199513&FORM=VCGVRP";

  return (
    <div className="home" style={{ fontFamily: "Arial, sans-serif" }}>

      {/* Section Hero */}
      <section
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          color: "white",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,50,0.6)"
          }}
        ></div>

        <div style={{
          position: "relative",
          maxWidth: "800px",
          padding: "0 20px",
        }}>
          <h1 style={{ fontSize: "3rem", marginBottom: "20px", lineHeight: "1.2" }}>
              <span style={{ color: "#3dd1f7" }}> Révolutionnez votre rééducation</span>
          </h1>
          <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
            KinelA transforme la rééducation du bas du dos grâce à l'intelligence artificielle.
            Exercices personnalisés, analyse en temps réel et suivi professionnel.
          </p>
        </div>
      </section>

      {/* Section Infos */}
      <section style={{
        display: "flex",
        flexWrap: "wrap-reverse",
        padding: "80px 20px",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        gap: "40px",
        justifyContent: "center"
      }}>
        <div style={{ flex: "1 1 400px", padding: "20px", minWidth: "300px" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "20px" }}>Qu'est-ce que KinelA ?</h2>
          <p style={{ marginBottom: "15px", lineHeight: "1.6" }}>
            KinelA est une solution innovante qui utilise l'intelligence artificielle pour accompagner les patients dans leur rééducation du bas du dos.
          </p>
          <p style={{ lineHeight: "1.6" }}>
            Elle fournit des exercices personnalisés, un suivi en temps réel, et des rapports professionnels pour améliorer votre récupération.
          </p>
        </div>
        <div style={{ flex: "1 1 400px", padding: "20px", minWidth: "300px" }}>
          <img
            src={infoImage}
            alt="Kine IA"
            style={{
              width: "100%",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={e => e.target.style.transform="scale(1.05)"}
            onMouseLeave={e => e.target.style.transform="scale(1)"}
          />
        </div>
      </section>

      {/* Section Avantages */}
      <section style={{ padding: "80px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "50px" }}>Pourquoi choisir KinelA ?</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "30px" }}>
          {[
            { title: "Exercices personnalisés", desc: "Chaque patient reçoit un plan adapté à ses besoins et son évolution." },
            { title: "Analyse en temps réel", desc: "Suivi instantané pour corriger et optimiser chaque mouvement." },
            { title: "Suivi professionnel", desc: "Des rapports détaillés pour les professionnels de santé et les patients." }
          ].map((item, i) => (
            <div key={i} style={{
              flex: "1 1 280px",
              backgroundColor: "white",
              padding: "30px 20px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.transform="translateY(-5px)"}
            onMouseLeave={e => e.currentTarget.style.transform="translateY(0)"
            }>
              <h3 style={{ marginBottom: "15px", fontSize: "1.25rem" }}>{item.title}</h3>
              <p style={{ fontSize: "1rem", color: "#555", lineHeight: "1.5" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section Démo Vidéo */}
      <section style={{ padding: "80px 20px", textAlign: "center", backgroundColor: "#eef6fb" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "30px" }}>Découvrez la démo</h2>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
        }}>
          <video
            src={demoVideo}
            controls
            style={{ width: "100%", display: "block" }}
          />
        </div>
      </section>

    </div>
  );
}
