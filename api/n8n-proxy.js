export default async function handler(req, res) {
  // ✅ CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://121bc4a5-c685-4085-97c9-d86a294c8ed9.dev38.app-preview.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Preflight check
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // ❌ Only POST allowed
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
  } catch (error) {
    console.error("Erreur dans le proxy N8N:", error);
    return res.status(500).json({ error: "Erreur proxy" });
  }
}
