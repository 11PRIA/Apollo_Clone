import React from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

export default function DoctorCard({ doctor }) {
  const ratingValue = typeof doctor?.rating === 'number' ? doctor.rating : 0;
  const roundedRating = Math.max(0, Math.round(ratingValue));

  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden flex">
      {/* Doctor Image */}
      <div className="w-1/4 md:w-1/5">
        <img
          src={doctor?.imageUrl || '/images/default-doctor.png'}
          alt={doctor?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Doctor Details */}
      <div className="p-4 flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{doctor?.name}</h2>
        <p className="text-sm text-gray-600 mb-1">{doctor?.specialty}</p>
        <div className="flex items-center text-sm text-yellow-500 mb-1">
          {[...Array(roundedRating)].map((_, i) => (
            <StarIcon key={i} className="h-4 w-4 fill-current" />
          ))}
          {typeof doctor?.rating === 'number' && (
            <span className="text-gray-500 ml-1">({doctor.rating})</span>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-1">{doctor?.experience} Years Experience</p>
        {doctor?.location && <p className="text-sm text-gray-600 mb-2">{doctor.location}</p>}
        {doctor?.language && (
          <p className="text-sm text-gray-600 mb-1">
            Language: {Array.isArray(doctor.language) ? doctor.language.join(', ') : doctor.language}
          </p>
        )}
        {doctor?.facility && (
          <p className="text-sm text-gray-600 mb-1">
            Facility: {Array.isArray(doctor.facility) ? doctor.facility.join(', ') : doctor.facility}
          </p>
        )}
        {doctor?.modeOfConsult && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xs bg-blue-100 text-blue-800 py-0.5 px-2 rounded-full">
              {Array.isArray(doctor.modeOfConsult)
                ? doctor.modeOfConsult.join(', ')
                : doctor.modeOfConsult}
            </span>
          </div>
        )}
      </div>

      {/* Booking Info */}
      <div className="p-4 flex flex-col items-end justify-center w-1/3 md:w-1/4 border-l border-gray-200">
        <div className="text-right mb-2">
          {typeof doctor?.fees === 'number' && (
            <>
              <span className="text-sm text-gray-500 line-through mr-1">
                ₹{Math.round(doctor.fees * 1.2)}
              </span>
              <span className="text-lg font-semibold text-green-600">₹{doctor.fees}</span>
            </>
          )}
          {typeof doctor?.fees !== 'number' && doctor?.fees && (
            <span className="text-lg font-semibold text-green-600">₹{doctor.fees}</span>
          )}
        </div>
        <button className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-700">
          Consult Online
        </button>
      </div>
    </div>
  );
}