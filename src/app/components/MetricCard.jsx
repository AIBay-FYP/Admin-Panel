'use client';
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

// Simulate API call for data update
const updateSelectedCard = async (selectedCardId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(selectedCardId), 300); // Simulate API delay
  });
};

const MetricsCard = () => {
  const queryClient = useQueryClient();

  // Initialize selectedCard query
  const { data: selectedCard, isLoading } = useQuery({
    queryKey: ['selectedCard'],
    queryFn: () => null, // Default to no selection
    initialData: null,
  });

  // Handle state changes with mutation
  const mutation = useMutation({
    mutationFn: updateSelectedCard,
    onMutate: async (newSelectedId) => {
      await queryClient.cancelQueries({ queryKey: ['selectedCard'] });
      const previousSelectedId = queryClient.getQueryData(['selectedCard']);

      // Toggle logic: If the clicked card is already selected, deselect it
      const newSelection = selectedCard === newSelectedId ? null : newSelectedId;
      queryClient.setQueryData(['selectedCard'], newSelection);

      return { previousSelectedId };
    },
    onError: (error, newSelectedId, context) => {
      console.error('Error updating card:', error);
      if (context?.previousSelectedId) {
        queryClient.setQueryData(['selectedCard'], context.previousSelectedId);
      }
    },
    // Avoid invalidating the query to prevent resetting
    onSettled: () => {
      // Optionally, refresh other data if needed
    },
  });

  const cards = [
    {
      id: 1,
      title: 'Total Registered Users',
      count: 133,
      color: 'bg-metric-1',
      icon: faUsers,
    },
    {
      id: 2,
      title: 'Number of Services Listed',
      count: 78,
      color: 'bg-metric-2',
      icon: faClipboardCheck,
    },
    {
      id: 3,
      title: 'Successful Transactions',
      count: 25,
      color: 'bg-metric-3',
      icon: faChartLine,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => mutation.mutate(card.id)}
          className={`cursor-pointer transition-all duration-300 
            ${
              selectedCard === card.id
                ? 'h-[150px]'
                : 'h-[110px]'
            }
            w-[180px] ${card.color} rounded-lg flex flex-col items-center justify-between shadow-lg p-3`}
        >
          {isLoading && selectedCard === card.id ? (
            <p className="text-white text-lg">Loading...</p>
          ) : (
            <>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-3xl font-bold text-white">{card.count}</h1>
                <FontAwesomeIcon
                  icon={card.icon}
                  className="text-white text-2xl"
                />
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
