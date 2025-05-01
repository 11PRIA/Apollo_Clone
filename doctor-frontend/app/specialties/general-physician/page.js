'use client';

import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import Filters from '../../../components/Filters';
import DoctorCard from '../../../components/DoctorCard';
import Head from 'next/head';
import Header from '../../../components/Header';

const doctorImages = [
  '/images/doctor1.jpg',
  '/images/doctor2.jpg',
  '/images/doctor3.jpg',
  '/images/doctor4.jpg',
  '/images/doctor5.jpg',
  '/images/doctor6.jpg',
  '/images/doctor7.jpg',
  '/images/doctor8.jpg',
  '/images/doctor9.jpg',
  '/images/doctor10.jpg',
];

const getRandomImage = () => doctorImages[Math.floor(Math.random() * doctorImages.length)];

export default function GeneralPhysicianPage() {
  const [doctors, setDoctors] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10 });
  const [filters, setFilters] = useState({
    specialty: 'General Physician',
    location: '',
    page: 1,
    limit: 10,
    modeOfConsult: [],
    fees: [],
    experience: [],
    language: [],
    facility: [],
  });
  const [showFilters, setShowFilters] = useState(true);

  const fetchDoctors = async () => {
    try {
      const params = { ...filters };
      console.log('Frontend API Request Params:', params); // Log the parameters sent to the backend
      const res = await api.get('/doctors/list-doctor-with-filter', { params });

      const transformedDoctors = res.data.doctors.map((apiDoc) => ({
        _id: apiDoc._id,
        name: apiDoc.name,
        specialty: apiDoc.speciality,
        location: apiDoc.location,
        experience: apiDoc.experience,
        rating: apiDoc.rating,
        fees: apiDoc.fees,
        modeOfConsult: apiDoc.modeOfConsult || [],
        language: apiDoc.language
          ? Array.isArray(apiDoc.language)
            ? apiDoc.language
            : [apiDoc.language]
          : [],
        facility: apiDoc.facility || [],
        imageUrl: getRandomImage(),
      }));
      setDoctors(transformedDoctors);

      setMeta({
        total: res.data.total,
        page: res.data.page,
        limit: res.data.limit,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters]);

  const handleFilterChange = (updateFn) => {
    setFilters((prev) => {
      const updatedPart = updateFn(prev);
      const updatedFilters = { ...prev, ...updatedPart, page: 1 };
      console.log('Updated Filters State in Page:', updatedFilters);
      return updatedFilters;
    });
  };
  

  const handlePage = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <>
      <Head>
        <title>General Physician | Apollo Clone</title>
        <meta name="description" content="Find top general physicians in your city" />
      </Head>

      <Header />

      <div className="bg-gray-100 text-gray-900 min-h-screen pt-20">

        <div className="container max-w-7xl mx-auto py-6">
          <div className="flex">
            <aside
              className={`w-full lg:w-1/4 xl:w-1/5 bg-white p-4 rounded-md shadow-md ${
                showFilters ? 'block' : 'hidden'
              } lg:block`}
            >
              <div className="flex justify-between items-center mb-4 lg:mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden text-blue-600">
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              <Filters onChange={handleFilterChange} />
            </aside>

            <main className="flex-1 lg:ml-6">
              <div className="mb-4 lg:mb-6 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Consult General Physicians Online - Internal Medicine Specialists</h1>
                <span className="text-sm text-gray-600">({meta.total} doctors)</span>
              </div>

              <div className="space-y-4">
                {doctors.length > 0 &&
                  doctors.map((doc) => {
                    console.log('Doctor Object being passed to DoctorCard:', doc);
                    return <DoctorCard key={doc._id} doctor={doc} />;
                  })}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button
                      key={pg}
                      onClick={() => handlePage(pg)}
                      className={`px-3 py-1 rounded border ${
                        pg === meta.page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 border-gray-300 hover:border-blue-600 hover:text-blue-600'
                      }`}
                    >
                      {pg}
                    </button>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}