export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const { image, notes } = req.body;

  // Mocked MedGemma logic - replace with actual AI calls later
  const result = {
    status: "Energetic Imbalance Detected",
    recommendations: "Try 10 mins of breathwork, hydrate, and use lavender aromatherapy."
  };

  res.status(200).json(result);
}