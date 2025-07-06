"use client";
import React, { useState } from 'react';
import DisputePopup from '@/components/dispute';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/utiks/formatDate';

const fetchDisputes = async () => {
  const response = await fetch('/api/disputes');
  if (!response.ok) throw new Error('Failed to fetch disputes');
  return response.json();
};

const updateDisputeStatus = async ({ id, status, resolutionAction }) => {
  const response = await fetch(`/api/disputes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, resolutionAction }),
  });
  if (!response.ok) throw new Error('Failed to update dispute');
  return response.json();
};

const DisputesBoard = () => {
  const queryClient = useQueryClient();
  const { data: disputes = [], isLoading, isError } = useQuery({
    queryKey:['disputes'], 
    queryFn: fetchDisputes});


    const mutation = useMutation({
      mutationFn: updateDisputeStatus, 
      onSuccess: () => queryClient.invalidateQueries(['disputes']),
      onError: (error) => {
        console.error('Error updating dispute:', error);
      }
    });
    
  const [selectedDispute, setSelectedDispute] = useState(null);

  const handleSaveChanges = async (id, status, resolutionAction) => {
    await mutation.mutateAsync({ id, status, resolutionAction });
    setSelectedDispute(null);
  };

  const handleDragStart = (e, dispute) => {
    e.dataTransfer.setData('dispute', JSON.stringify(dispute));
  };

  const handleDrop = async (e, status) => {
    e.preventDefault();
    const dispute = JSON.parse(e.dataTransfer.getData('dispute'));
    if (dispute.Status === status) return;
    mutation.mutate({ id: dispute.DisputeID, status, resolutionAction: dispute.ResolutionAction });
  };

  if (isLoading) return <p>Loading disputes...</p>;
  if (isError) return <p>Error loading disputes.</p>;

  const categorizedDisputes = disputes.reduce((acc, dispute) => {
    acc[dispute.Status] = acc[dispute.Status] || [];
    acc[dispute.Status].push(dispute);
    return acc;
  }, { New: [], InWorking: [], Resolved: [] });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen">
      {Object.entries(categorizedDisputes).map(([status, list]) => (
        <div key={status} className={`flex flex-col rounded-lg p-4 ${status === 'New' ? 'bg-board-new' : status === 'InWorking' ? 'bg-board-working' : 'bg-board-resolved'}`}
        onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, status)}>
          <h3 className="text-xl font-bold mb-4 capitalize">{status}</h3>
          {list.map((dispute) => (
            <div
              key={dispute.DisputeID}
              className="p-4 bg-white rounded-lg shadow-md cursor-pointer"
              draggable
              onDragStart={(e) => handleDragStart(e, dispute)}
              onClick={() => setSelectedDispute(dispute)}
            >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-black">{dispute.Title}</h4>
                  <h4 className="text-sm font-medium text-black">#{dispute.DisputeID}</h4>
                </div>              
              <p className="text-sm text-black"><strong>Reason: </strong>{dispute.Description || 'N/A'}</p>
              <div className="flex justify-between items-center">
                  <span className="text-xs text-black">{formatDate(dispute.Date)}</span>
                  <img src="/assets/no-pfp.jpg" alt="Reporter" className="w-5 h-5 rounded-full" />
                </div>
            </div>
          ))}
        </div>
      ))}
      {selectedDispute && (
        <DisputePopup
          dispute={selectedDispute}
          onClose={() => setSelectedDispute(null)}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default DisputesBoard;
