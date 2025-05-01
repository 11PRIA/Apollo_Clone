const Doctor = require('../models/Doctor');

// @desc    Get doctors with filters and pagination
// @route   GET /api/doctors/list-doctor-with-filter
exports.getDoctors = async (req, res) => {
  try {
    const {
      speciality,
      location,
      mode_of_consult,
      fees,
      experience,
      language,
      facility,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Filter by speciality (case-insensitive)
    if (speciality) query.speciality = { $regex: speciality, $options: 'i' };

    // Filter by location (case-insensitive)
    if (location) query.location = { $regex: location, $options: 'i' };

    // Filter by mode_of_consult
    if (mode_of_consult) {
      const modes = Array.isArray(mode_of_consult)
        ? mode_of_consult
        : mode_of_consult.split(',');
      query.mode_of_consult = { $in: modes.map(mode => mode.trim()) };
    }

    // Filter by fees range
    if (fees) {
      const feeRanges = Array.isArray(fees) ? fees : fees.split(',');
      const orConditions = feeRanges.map(range => {
        const cleaned = range.replace('₹', '').trim();
        const [minStr, maxStr] = cleaned.split('-');
        const min = Number(minStr);
        const max = maxStr === '+' ? 1000000 : Number(maxStr);
        return { fees: { $gte: min, $lte: max } };
      });
      query.$or = query.$or || [];
      query.$or.push(...orConditions);
    }

    // Filter by experience range
    if (experience) {
      const expRanges = Array.isArray(experience) ? experience : experience.split(',');
      const orConditions = expRanges.map(range => {
        const cleaned = range.replace(' Years', '').trim();
        const [minStr, maxStr] = cleaned.split('-');
        const min = Number(minStr);
        const max = maxStr === '+' ? 100 : Number(maxStr);
        return { experience: { $gte: min, $lte: max } };
      });
      query.$or = query.$or || [];
      query.$or.push(...orConditions);
    }

    // Filter by language
    if (language) {
      const langs = Array.isArray(language) ? language : language.split(',');
      query.language = { $in: langs.map(lang => lang.trim()) };
    }

    // Filter by facility
    if (facility) {
      const facilities = Array.isArray(facility) ? facility : facility.split(',');
      query.facilities = { $in: facilities.map(fac => fac.trim()) };
    }

    console.log('Query:', JSON.stringify(query, null, 2));

    const total = await Doctor.countDocuments(query);
    const doctors = await Doctor.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      doctors,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Add a new doctor
// @route   POST /api/doctors/add-doctor
exports.addDoctor = async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    console.error('Error adding doctor:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
