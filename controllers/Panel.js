import Panel from "../models/Panel.model.js";

export const getPanels = async (req, res) => {
  const userPanelAccess = "Baslangic";

  if (userPanelAccess == "Baslangic") {
    await Panel.find({ panelAccess: "Baslangic" })
      .then((panel) => res.json(panel))
      .catch(() => res.json("Get Panel Error"));
  } else if (userPanelAccess == "Profesyonel") {
    await Panel.find({ panelAccess: { $in: ["Baslangic", "Profesyonel"] } })
      .then((panel) => res.json(panel))
      .catch(() => res.json("Get Panel Error"));
  }
};

export const createNewPanel = async (req, res) => {
  const { panelTitle, panelURL, panelAccess } = req.body;
  await Panel.create({
    panelTitle,
    panelURL,
    panelAccess,
  }).then((newPanel) => res.json(newPanel));
};
