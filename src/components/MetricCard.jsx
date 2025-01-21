'use client';
import React, { useEffect, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

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

  const cards = [
    {
      id: 1,
      title: 'Total Registered Users',
      count: 133,
      color: 'bg-metric-1',
      icon: faUsers,
      route: '/totalUsers',
    },
    {
      id: 2,
      title: 'Number of Services Listed',
      count: 78,
      color: 'bg-metric-2',
      icon: faClipboardCheck,
      route: '/listedServices',
    },
    {
      id: 3,
      title: 'Successful Transactions',
      count: 25,
      color: 'bg-metric-3',
      icon: faChartLine,
      route: '/transactions',
    },
  ];

  const handleCardClick = (cardId, route) => {
    mutation.mutate(cardId);
    router.push(route);
  };

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => handleCardClick(card.id, card.route)}
          className={`cursor-pointer transition-all duration-300 
            ${selectedCard === card.id ? 'h-[150px]' : 'h-[110px]'}
            w-[180px] ${card.color} rounded-lg flex flex-col items-center justify-between shadow-lg p-3`}
        >
          {mutation.isLoading && selectedCard === card.id ? (
            <p className="text-white text-lg">Loading...</p>
          ) : (
            <>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-3xl font-bold text-white">{card.count}</h1>
                <FontAwesomeIcon icon={card.icon} className="text-white text-2xl" />
              </div>
              <p className="text-sm text-white">{card.title}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricsCard;
