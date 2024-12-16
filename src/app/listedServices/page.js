import React from 'react';
const { default: ListedServiceCard } = require("@/components/ListedServiceCard");

const ListedServices = () => {
  const services = [
    {
      id: 1,
      mainImage: "/shoes1.jpeg",
      serviceName: "Nike Shoes",
      serviceType: "Sale",
      priceType: "Negotiable",
      location: "Raiwand road Lahore",
    },
    {
      id: 2,
      mainImage: "/shoes1.jpeg",
      serviceName: "Nike Shoes",
      serviceType: "Sale",
      priceType: "Negotiable",
      location: "Raiwand road Lahore",
    },
    {
      id: 3,
      mainImage: "/shoes1.jpeg",
      serviceName: "Nike Shoes",
      serviceType: "Sale",
      priceType: "Negotiable",
      location: "Raiwand road Lahore",
    },
    {
      id: 4,
      mainImage: "/shoes1.jpeg",
      serviceName: "Nike Shoes",
      serviceType: "Sale",
      priceType: "Negotiable",
      location: "Raiwand road Lahore",
    },
    {
      id: 5,
      mainImage: "/shoes1.jpeg",
      serviceName: "Nike Shoes",
      serviceType: "Sale",
      priceType: "Negotiable",
      location: "Raiwand road Lahore",
    },
    {
      id: 6,
      mainImage: "/shoes1.jpeg",
      serviceName: "Nike Shoes",
      serviceType: "Sale",
      priceType: "Negotiable",
      location: "Raiwand road Lahore",
    },
  ];

  return (
    <div className="flex flex-col gap-4 m-10">
      {/* Sticky header */}
      <h1 className="sticky top-0 bg-dark-green text-white rounded-lg z-10 p-4 text-2xl font-bold shadow-md">
        Listed Services
      </h1>
      {/* List of services */}
      {services.map((service) => (
        <ListedServiceCard
          key={service.id}
          mainImage={service.mainImage}
          serviceName={service.serviceName}
          serviceType={service.serviceType}
          priceType={service.priceType}
          location={service.location}
        />
      ))}
    </div>
  );
};

export default ListedServices;
