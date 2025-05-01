import React from 'react';

const consultationModes = ['Hospital Visit', 'Online Consult'];
const feeRanges = ['₹0-₹500', '₹500-₹1000', '₹1000+'];
const experienceLevels = ['0-5 Years', '6-10 Years', '11-16 Years', '16+ Years'];
const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Bengali', 'Marathi', 'Malayalam', 'Gujarati', 'Urdu', 'Punjabi'];
const facilities = ['Apollo Hospital', 'Max Healthcare', 'Fortis Healthcare', 'Other Clinics'];

export default function Filters({ onChange }) {
 const handleMultiCheckboxChange = (e) => {
  const { name, value, checked } = e.target;
  onChange((prev) => {
    const updatedValues = prev[name] ? [...prev[name]] : [];
    if (checked) {
      updatedValues.push(value);
    } else {
      const index = updatedValues.indexOf(value);
      if (index !== -1) updatedValues.splice(index, 1);
    }
    return { ...prev, [name]: updatedValues };
  });
};

const handleFeeCheckboxChange = (e) => {
  const { value, checked } = e.target;
  onChange((prev) => {
    const updatedFees = prev.fees ? [...prev.fees] : [];
    if (checked) {
      updatedFees.push(value);
    } else {
      const index = updatedFees.indexOf(value);
      if (index !== -1) updatedFees.splice(index, 1);
    }
    return { ...prev, fees: updatedFees };
  });
};

  

  return (
    <div className="space-y-4">
      {/* Mode of Consult */}
      <div>
        <h3 className="font-semibold mb-2">Mode of Consult</h3>
        {consultationModes.map((mode) => (
          <div key={mode} className="flex items-center">
            <input
              type="checkbox"
              id={`mode-${mode.toLowerCase().replace(' ', '-')}`}
              name="modeOfConsult"
              value={mode}
              className="mr-2 form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={handleMultiCheckboxChange}
            />
            <label htmlFor={`mode-${mode.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-700">
              {mode}
            </label>
          </div>
        ))}
      </div>

      {/* Fees (In ₹) */}
      <div>
        <h3 className="font-semibold mb-2">Fees (In ₹)</h3>
        {feeRanges.map((range) => {
          const value = range;
          return (
            <div key={range} className="flex items-center">
              <input
                type="checkbox"
                id={`fees-${range.toLowerCase().replace('+', '')}`}
                name="fees"
                value={value}
                className="mr-2 form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                onChange={handleFeeCheckboxChange}
              />
              <label htmlFor={`fees-${range.toLowerCase().replace('+', '')}`} className="text-sm text-gray-700">
                {range}
              </label>
            </div>
          );
        })}
      </div>

      {/* Experience (In Years) */}
      <div>
        <h3 className="font-semibold mb-2">Experience (In Years)</h3>
        {experienceLevels.map((level) => {
          const value = level;
          return (
            <div key={level} className="flex items-center">
              <input
                type="checkbox"
                id={`exp-${level.toLowerCase().replace(' ', '-')}`}
                name="experience"
                value={value}
                className="mr-2 form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                onChange={handleMultiCheckboxChange}
              />
              <label htmlFor={`exp-${level.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-700">
                {level}
              </label>
            </div>
          );
        })}
      </div>

      {/* Language */}
      <div>
        <h3 className="font-semibold mb-2">Language</h3>
        {languages.map((lang) => (
          <div key={lang} className="flex items-center">
            <input
              type="checkbox"
              id={`lang-${lang.toLowerCase()}`}
              name="language"
              value={lang}
              className="mr-2 form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={handleMultiCheckboxChange}
            />
            <label htmlFor={`lang-${lang.toLowerCase()}`} className="text-sm text-gray-700">
              {lang}
            </label>
          </div>
        ))}
      </div>

      {/* Facility */}
      <div>
        <h3 className="font-semibold mb-2">Facility</h3>
        {facilities.map((facility) => (
          <div key={facility} className="flex items-center">
            <input
              type="checkbox"
              id={`facility-${facility.toLowerCase().replace(' ', '-')}`}
              name="facility"
              value={facility}
              className="mr-2 form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              onChange={handleMultiCheckboxChange}
            />
            <label htmlFor={`facility-${facility.toLowerCase().replace(' ', '-')}`} className="text-sm text-gray-700">
              {facility}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}