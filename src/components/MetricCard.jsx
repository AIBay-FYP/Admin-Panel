'use client';
import React, { useEffect, useState } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import CountUp from 'react-countup';
import { useUser } from '@clerk/nextjs'; // Import to get the logged-in user

// API to fetch the counts
const fetchCounts = async () => {
  const response = await fetch('/api/metricCards'); // Update with your API endpoint
  if (!response.ok) {
    throw new Error('Failed to fetch counts');
  }
  return response.json();
};

const updateSelectedCard = async (selectedCardId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(selectedCardId), 300); // Simulate API delay
  });
};

const MetricsCard = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedSidebar, setSelectedSidebar] = useState(null);
  
  const { user } = useUser(); // Get user data (assuming user object contains role)
  const userRole = user?.publicMetadata.role; // Assuming role is stored in publicMetadata
  
  // Sync with localStorage on mount
  useEffect(() => {
    const storedSelectedCard = localStorage.getItem('selectedCard');
    const storedSelectedSidebar = localStorage.getItem('selectedSidebar');

    setSelectedCard(storedSelectedCard ? Number(storedSelectedCard) : null);
    setSelectedSidebar(storedSelectedSidebar ? Number(storedSelectedSidebar) : null);
  }, []);

  // Check and reset selectedCard if necessary
  useEffect(() => {
    if (selectedSidebar !== null && selectedSidebar !== selectedCard) {
      setSelectedCard(null);
      localStorage.removeItem('selectedCard');
    }
  }, [selectedSidebar, selectedCard]);

  const mutation = useMutation({
    mutationFn: updateSelectedCard,
    onMutate: async (newSelectedId) => {
      localStorage.setItem('selectedCard', newSelectedId);
      setSelectedCard(newSelectedId);

      // Update selectedSidebar
      localStorage.setItem('selectedSidebar', newSelectedId);
      queryClient.setQueryData(['selectedSidebar'], newSelectedId);
      setSelectedSidebar(newSelectedId);
    },
    onError: (error, newSelectedId) => {
      console.error('Error updating card:', error);
    },
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ['metricsCounts'], 
    queryFn: fetchCounts
  });

  const cards = [
    {
      id: 1,
      title: 'Total Registered Users',
      count: data ? data.usersCount : 0,
      color: 'bg-metric-1',
      icon: faUsers,
      route: '/totalUsers',
    },
    {
      id: 2,
      title: 'Number of Services Listed',
      count: data ? data.listingsCount : 0,
      color: 'bg-metric-2',
      icon: faClipboardCheck,
      route: '/listedServices',
    },
    {
      id: 3,
      title: 'Successful Transactions',
      count: data ? data.transactionsCount : 0,
      color: 'bg-metric-3',
      icon: faChartLine,
      route: '/transactions',
    },
  ];

  // If the user is a Compliance Manager, only render the Successful Transactions card
  const filteredCards = userRole === 'Compliance Manager' ? [cards[2]] : cards;

  const handleCardClick = (cardId, route) => {
    mutation.mutate(cardId);
    router.push(route);
  };

  return (
    <div className="flex flex-col gap-4">
      {filteredCards.map((card) => (
        <div
          key={card.id}
          onClick={() => handleCardClick(card.id, card.route)}
          className={`cursor-pointer transition-all duration-300 
            ${selectedCard === card.id ? 'h-[150px]' : 'h-[110px]'}
            w-[180px] ${card.color} rounded-lg flex flex-col items-center justify-between shadow-lg p-3`}
        >          <div className="flex items-center justify-between w-full">
            <h1 className="text-3xl font-bold text-white">
              <CountUp
                start={0}
                end={data ? card.count : 0}
                duration={isLoading ? 3 : 2.5} // Animate for longer while loading
                separator=","
                delay={0}
              />
            </h1>
            <FontAwesomeIcon icon={card.icon} className="text-white text-2xl" />
          </div>
          <p className="text-sm text-white/80">{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsCard;
