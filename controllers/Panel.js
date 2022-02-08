import Panel from "../models/Panel.model.js";

export const getPanels = async (req, res) => {
  const userPanelAccess = "Standart";

  if (userPanelAccess == "Standart") {
    await Panel.find({ panelAccess: "Standart" })
      .then((panel) => res.json(panel))
      .catch(() => res.json("Get Panel Error"));
  } else if (userPanelAccess == "Profesyonel") {
    await Panel.find({ panelAccess: { $in: ["Standart", "Profesyonel"] } })
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
