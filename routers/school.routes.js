import express from 'express';

const router = express.Router();

import { addSchool, listSchools } from '../controllers/school.controller.js';

router.post('/addschool', addSchool);
router.get('/listschools', listSchools);

export default router;