import Plan from "../models/Plan.model.js";

export const getPlans = (req, res) => {
  try {
    Plan.find().then((plan) => res.status(200).json(plan));
  } catch (error) {
    res.status(404).json("Get Plan Error");
  }
};

export const createPlan = async (req, res) => {
  const { planName, planPrice, planDetails } = req.body;
  try {
    Plan.create({
      planName,
      planPrice,
      planDetails,
    });
    res.status(201).json("Plan Created");
  } catch (error) {
    res.status(402).json("Plan Create Error!");
  }
};

export const getPlanByID = async (req, res) => {
  const planID = req.params.planID;
  console.log(planID);
  try {
    Plan.findById({ _id: planID })
      .then((plan) => res.status(200).json(plan))
      .catch(() => res.status(404).json("Plan Not Found"));
  } catch (error) {
    res.status(404).json("Plan Not Found");
  }
};
