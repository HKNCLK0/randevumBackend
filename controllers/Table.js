import Table from "../models/Tables.model.js";

export const createTable = async (req, res) => {
  const businessID = req.business.id;
  const { tableName, tablePeopleCount, tableFeatures } = req.body;

  await Table.create({
    businessID,
    tableName,
    tablePeopleCount,
    tableFeatures,
  })
    .then((newTable) => res.json(newTable))
    .catch(() => res.json("Table Create Error"));
};

export const getBusinessTables = async (req, res) => {
  const businessID = req.business.id;

  await Table.find({ businessID: businessID })
    .then((tables) => res.json(tables))
    .catch(() => res.json("Table Get Error"));
};

export const deleteTable = async (req, res) => {
  const { tableID } = req.body;

  await Table.findByIdAndRemove({ _id: tableID })
    .then((deletedTable) => res.json(deletedTable))
    .catch(() => res.json("Table Delete Error"));
};
