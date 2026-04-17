import db from '../config/db.js';
import shortPath from '../service/ShortPath.services.js';
import asyncHandler from "../utils/asynchandler.js"

export const addSchool =  asyncHandler( async (req, res) => {

    const { name, address, latitude, longitude } = req.body;


    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({
            status: 400,
            message: 'please provide all required fields'
        })
    };

    const query = `
    INSERT INTO schools (name, address, latitude, longitude)
    VALUES (?, ?, ?, ?)
  `;

    await db.query(query, [name, address, latitude, longitude]);
    res.json({ message: "School added successfully" });

});


export const listSchools = asyncHandler( async (req, res) => {

    const { latitude, longitude } = req.query;

    // validation
  if (!latitude || !longitude) {
    return res.status(400).json({
      message: "latitude and longitude required"
    });
  };

  const [schools] = await db.query(`SELECT * FROM schools`);

  const result = schools.map((school) => {
    const distance = shortPath(
        parseFloat(latitude),
        parseFloat(longitude),
        school.latitude,
        school.longitude
    );

    return {
        ...school,
        distance
    };
  });

  result.sort((a, b) => a.distance - b.distance);

  res.json(result);

})