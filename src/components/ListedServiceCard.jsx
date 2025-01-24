import Image from "next/image"; // Assuming you're using Next.js for image handling

const ListedServiceCard = ({ mainImage, serviceName, serviceType, priceType, location }) => {
  return (
    <div className="flex w-full bg-white rounded-lg shadow-md cursor-pointer">
      {/* Left part: Image */}
      <div className="flex-shrink-0 w-1/3 relative">
        <Image
          src={mainImage}
          alt="Product"
          layout="fill"
          objectFit="cover"
          className="rounded-l-lg"
        />
      </div>

      {/* Right part: Details */}
      <div className="flex-1 p-4">
        <h3 className="text-lg font-semibold text-gray-800">{serviceName}</h3>
        <p className="text-sm text-gray-600">{serviceType}</p>
        <p className="text-sm text-gray-600">{priceType?'Negotiable':'Fixed Price'}</p>
        <p className="text-sm text-gray-600">{location}</p>
      </div>
    </div>
  );
};

export default ListedServiceCard;
