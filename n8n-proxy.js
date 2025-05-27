export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  try {
    const response = await fetch("https://n8n.srv836405.hstgr.cloud/webhook/reviu-formulaire-v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    return res.status(200).json(result);

  } catch (err) {
    console.error("Erreur dans le proxy N8N :", err);
    return res.status(500).json({ error: "Erreur serveur proxy" });
  }
}
