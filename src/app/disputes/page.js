// // // // import React, { useState } from 'react';
// // // // import DisputePopup from '@/components/dispute';
// // // // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // // // import { formatDate } from '@/utiks/formatDate';

// // // // const fetchDisputes = async () => {
// // // //   const response = await fetch('/api/disputes');
// // // //   if (!response.ok) throw new Error('Failed to fetch disputes');
// // // //   return response.json();
// // // // };

// // // // const updateDisputeStatus = async ({ id, status }) => {
// // // //   const response = await fetch(`/api/disputes/${id}`, {
// // // //     method: 'PATCH',
// // // //     headers: { 'Content-Type': 'application/json' },
// // // //     body: JSON.stringify({ status }),
// // // //   });
// // // //   if (!response.ok) throw new Error('Failed to update dispute status');
// // // //   return response.json();
// // // // };

// // // // const DisputesBoard = () => {
// // // //   const queryClient = useQueryClient();
// // // //   const { data: disputes = [], isLoading, isError } = useQuery({
// // // //     queryKey: ['disputes'], 
// // // //     queryFn: fetchDisputes,
// // // //   });

// // // //   const mutation = useMutation({
// // // //     mutationFn: updateDisputeStatus,
// // // //     onSuccess: () => queryClient.invalidateQueries(['disputes']),
// // // //   });

// // // //   const [selectedDispute, setSelectedDispute] = useState(null);

// // // //   const handleSaveChanges = async (id, newStatus, resolutionAction) => {
// // // //     const response = await fetch(`/api/disputes?DisputeID=${id}`, {
// // // //       method: 'PATCH',
// // // //       headers: {
// // // //         'Content-Type': 'application/json',
// // // //       },
// // // //       body: JSON.stringify({ status: newStatus, resolutionAction }),
// // // //     });

// // // //     if (response.ok) {
// // // //       queryClient.invalidateQueries(['disputes']);
// // // //       setSelectedDispute(null); // Close the popup after saving
// // // //     } else {
// // // //       const errorData = await response.json();
// // // //       console.error("Error updating dispute:", errorData.error);
// // // //     }
// // // //   };

// // // //   if (isLoading) return <p>Loading disputes...</p>;
// // // //   if (isError) return <p>Error loading disputes.</p>;

// // // //   console.log('Disputes:', disputes);

// // // //   const categorizedDisputes = disputes.reduce(
// // // //     (acc, dispute) => {
// // // //       acc[dispute.Status].push(dispute);
// // // //       return acc;
// // // //     },
// // // //     { New: [], InWorking: [], Resolved: [] }
// // // //   );

// // // //   console.log('Categorized Disputes:', categorizedDisputes);


// // // //   const renderTask = (task, category) => (
// // // //     <div
// // // //       key={task.DisputeID}
// // // //       className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
// // // //       onClick={() => setSelectedDispute(task)}
// // // //     >
// // // //       <div className="flex justify-between items-center mb-3">
// // // //         <h4 className="text-lg font-semibold text-gray-800">Dispute</h4>
// // // //         <h4 className="text-sm font-medium text-gray-600">#{task.DisputeID}</h4>
// // // //       </div>
// // // //       <p className="text-sm text-gray-700 mb-3">
// // // //         {task.Description || 'N/A'}
// // // //       </p>
// // // //       <div className="flex justify-between items-center">
// // // //         <span className="text-xs text-gray-500">{formatDate(task.Date)}</span>
// // // //         <img
// // // //           src="/assets/no-pfp.jpg"
// // // //           alt="Reporter"
// // // //           className="w-5 h-5 rounded-full"
// // // //         />
// // // //       </div>
// // // //     </div>
// // // //   );

// // // //   const getCategoryColor = (category) => {
// // // //     switch (category) {
// // // //       case 'New':
// // // //         return 'bg-board-new';
// // // //       case 'InWorking':
// // // //         return 'bg-board-working';
// // // //       case 'Resolved':
// // // //         return 'bg-board-resolved';
// // // //       default:
// // // //         return 'bg-gray-200';
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen">
// // // //       {Object.entries(categorizedDisputes).map(([category, categoryTasks]) => (
// // // //         <div
// // // //           key={category}
// // // //           className={`flex flex-col rounded-lg p-4 ${getCategoryColor(category)}`}
// // // //         >
// // // //           <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">{category}</h3>
// // // //           <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
// // // //             {categoryTasks.map((task) => renderTask(task, category))}
// // // //           </div>
// // // //         </div>
// // // //       ))}
// // // //       {selectedDispute && (
// // // //         <DisputePopup
// // // //           dispute={selectedDispute}
// // // //           onClose={() => setSelectedDispute(null)}
// // // //           onSave={(id,newStatus, resolutionAction) => handleSaveChanges(selectedDispute.DisputeID, newStatus, resolutionAction)}
// // // //         />
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DisputesBoard;

// import React, { useState } from 'react';
// import DisputePopup from '@/components/dispute';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { formatDate } from '@/utiks/formatDate';

// const fetchDisputes = async () => {
//   const response = await fetch('/api/disputes');
//   if (!response.ok) throw new Error('Failed to fetch disputes');
//   return response.json();
// };

// const updateDisputeStatus = async ({ id, status, resolutionAction }) => {
//   console.log(`/api/disputes/${id}`);
//   const response = await fetch(`/api/disputes/${id}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ status, resolutionAction }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.message || 'Failed to update dispute status');
//   }

//   return response.json();  // Return success response
// };


// const DisputesBoard = () => {
//   const queryClient = useQueryClient();
//   const { data: disputes = [], isLoading, isError } = useQuery({
//     queryKey: ['disputes'],
//     queryFn: fetchDisputes,
//   });

//   const mutation = useMutation({
//     mutationFn: updateDisputeStatus,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['disputes'] });
//     },
//   });

//   const [selectedDispute, setSelectedDispute] = useState(null);

//   // Save function for popup
//   const handleSaveChanges = async (id, status, resolutionAction) => {
//     await mutation.mutateAsync({ id, status, resolutionAction });
//     setSelectedDispute(null);
//   };

//   // Save function for drag and drop
//   const handleDragDropSave = async (id, newStatus, resolutionAction) => {
//     try {
//       await mutation.mutateAsync({ id, status: newStatus, resolutionAction });
//     } catch (error) {
//       console.error('Failed to update dispute via drag and drop:', error);
//     }
//   };

//   if (isLoading) return <p>Loading disputes...</p>;
//   if (isError) return <p>Error loading disputes.</p>;

//   const categorizedDisputes = disputes.reduce((acc, dispute) => {
//     acc[dispute.Status] = acc[dispute.Status] || [];
//     acc[dispute.Status].push(dispute);
//     return acc;
//   }, { New: [], InWorking: [], Resolved: [] });

//   const handleDragStart = (e, task, sourceCategory) => {
//     e.dataTransfer.setData('application/json', JSON.stringify({ task, sourceCategory }));
//   };

//   const handleDrop = async (e, targetCategory) => {
//     e.preventDefault();
//     try {
//       const data = e.dataTransfer.getData('application/json');
//       if (!data) return;
      
//       const { task, sourceCategory } = JSON.parse(data);
//       if (sourceCategory === targetCategory) return;

//       queryClient.setQueryData(['disputes'], (oldData) => {
//         return oldData.map((dispute) =>
//           dispute.DisputeID === task.DisputeID ? { ...dispute, Status: targetCategory } : dispute
//         );
//       });

//       await handleDragDropSave(task.DisputeID, targetCategory, task.ResolutionAction || '');
//     } catch (error) {
//       console.error('Failed to update dispute:', error);
//     }
//   };

//   const allowDrop = (e) => e.preventDefault();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen">
//       {Object.entries(categorizedDisputes).map(([category, categoryTasks]) => (
//         <div
//           key={category}
//           className={`flex flex-col rounded-lg p-4 ${category === 'New' ? 'bg-board-new' : category === 'InWorking' ? 'bg-board-working' : 'bg-board-resolved'}`}
//           onDragOver={allowDrop}
//           onDrop={(e) => handleDrop(e, category)}
//         >
//           <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">{category}</h3>
//           <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
//             {categoryTasks.map((task) => (
//               <div
//                 key={task.DisputeID}
//                 className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
//                 draggable
//                 onDragStart={(e) => handleDragStart(e, task, category)}
//                 onClick={() => setSelectedDispute(task)}
//               >
//                 <div className="flex justify-between items-center mb-3">
//                   <h4 className="text-lg font-semibold text-gray-800">Dispute</h4>
//                   <h4 className="text-sm font-medium text-gray-600">#{task.DisputeID}</h4>
//                 </div>
//                 <p className="text-sm text-gray-700 mb-3">{task.Description || 'N/A'}</p>
//                 <div className="flex justify-between items-center">
//                   <span className="text-xs text-gray-500">{formatDate(task.Date)}</span>
//                   <img src="/assets/no-pfp.jpg" alt="Reporter" className="w-5 h-5 rounded-full" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//       {selectedDispute && (
//         <DisputePopup
//           dispute={selectedDispute}
//           onClose={() => setSelectedDispute(null)}
//           onSave={handleSaveChanges}
//         />
//       )}
//     </div>
//   );
// };

// export default DisputesBoard;






// //mycode save logic

// // export default DisputesBoard;
// // import React, { useState } from 'react';
// // import DisputePopup from '@/components/dispute';
// // import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// // import { formatDate } from '@/utiks/formatDate';

// // // Fetch disputes from the API
// // const fetchDisputes = async () => {
// //   const response = await fetch('/api/disputes');
// //   if (!response.ok) throw new Error('Failed to fetch disputes');
// //   return response.json();
// // };

// // // Update dispute status and resolution action
// // const updateDisputeStatus = async ({ id, status, resolutionAction }) => {
// //   console.log('Updating dispute:', { id, status, resolutionAction });

// //   const response = await fetch(`/api/disputes/${id}`, {
// //     method: 'PATCH',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ status, resolutionAction }),
// //   });

// //   if (!response.ok) {
// //     const errorData = await response.json();
// //     console.error('Error updating dispute:', errorData);
// //     throw new Error(errorData.message || 'Failed to update dispute status');
// //   }

// //   return response.json();
// // };

// // const DisputesBoard = () => {
// //   const queryClient = useQueryClient();

// //   // Fetch disputes data with useQuery
// //   const { data: disputes = [], isLoading, isError } = useQuery({
// //     queryKey: ['disputes'],
// //     queryFn: fetchDisputes,
// //   });

// //   // Set up the mutation for updating dispute status
// //   const mutation = useMutation({
// //     mutationFn: updateDisputeStatus,
// //     onSuccess: () => {
// //       console.log('Dispute status updated successfully!');
// //       queryClient.invalidateQueries(['disputes']);
// //     },
// //     onError: (error) => {
// //       // Log error to console for more details
// //       console.error('Error updating dispute:', error);

// //       // Optionally, log the response if it's available
// //       if (error.response) {
// //         console.error('Response Error:', error.response);
// //       }

// //       // Handling specific error cases
// //       alert(error.message || 'An error occurred while updating the dispute.');
// //     },
// //   });

// //   const [selectedDispute, setSelectedDispute] = useState(null);

// //   // Save changes for dispute
// //   const handleSaveChanges = async (id, newStatus, resolutionAction) => {
// //     console.log('Saving changes for dispute ID:', id, 'with new status:', newStatus, 'and resolution action:', resolutionAction);

// //     const response = await fetch(`/api/disputes?DisputeID=${id}`, {
// //       method: 'PATCH',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify({ status: newStatus, resolutionAction }),
// //     });

// //     if (response.ok) {
// //       queryClient.invalidateQueries(['disputes']);
// //       setSelectedDispute(null); // Close the popup after saving
// //       console.log('Dispute updated successfully!');
// //     } else {
// //       const errorData = await response.json();
// //       console.error('Error updating dispute:', errorData.error);
// //     }
// //   };

// //   // Loading and error handling for disputes
// //   if (isLoading) return <p>Loading disputes...</p>;
// //   if (isError) return <p>Error loading disputes.</p>;

// //   // Categorize disputes by their status
// //   const categorizedDisputes = Array.isArray(disputes)
// //     ? disputes.reduce(
// //         (acc, dispute) => {
// //           acc[dispute.Status]?.push(dispute) || (acc[dispute.Status] = [dispute]);
// //           return acc;
// //         },
// //         { New: [], InWorking: [], Resolved: [] }
// //       )
// //     : { New: [], InWorking: [], Resolved: [] };

// //   console.log('Categorized Disputes:', categorizedDisputes);

// //   // Render each task in the board
// //   const renderTask = (task, category) => (
// //     <div
// //       key={task.DisputeID}
// //       className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
// //       draggable
// //       onDragStart={(e) => handleDragStart(e, task, category)} // Handle drag start
// //       onClick={() => setSelectedDispute(task)}
// //     >
// //       <div className="flex justify-between items-center mb-3">
// //         <h4 className="text-lg font-semibold text-gray-800">Dispute</h4>
// //         <h4 className="text-sm font-medium text-gray-600">#{task.DisputeID}</h4>
// //       </div>
// //       <p className="text-sm text-gray-700 mb-3">
// //         {task.Description || 'N/A'}
// //       </p>
// //       <div className="flex justify-between items-center">
// //         <span className="text-xs text-gray-500">{formatDate(task.Date)}</span>
// //         <img
// //           src="/assets/no-pfp.jpg"
// //           alt="Reporter"
// //           className="w-5 h-5 rounded-full"
// //         />
// //       </div>
// //     </div>
// //   );

// //   // Get category color
// //   const getCategoryColor = (category) => {
// //     switch (category) {
// //       case 'New':
// //         return 'bg-board-new';
// //       case 'InWorking':
// //         return 'bg-board-working';
// //       case 'Resolved':
// //         return 'bg-board-resolved';
// //       default:
// //         return 'bg-gray-200';
// //     }
// //   };

// //   // Handle dragging start
// //   const handleDragStart = (e, task, sourceCategory) => {
// //     console.log('Dragging task:', task, 'from category:', sourceCategory);
// //     e.dataTransfer.setData('task', JSON.stringify({ task, sourceCategory }));
// //   };

// //   // Handle drop to change the status
// //   const handleDrop = (e, targetCategory) => {
// //     e.preventDefault();
// //     const { task, sourceCategory } = JSON.parse(e.dataTransfer.getData('task'));

// //     // Ensure both source and target categories exist before updating
// //     if (!categorizedDisputes[sourceCategory] || !categorizedDisputes[targetCategory]) {
// //       console.error('Invalid source or target category');
// //       return;
// //     }

// //     // Remove the task from the source category
// //     const updatedSource = categorizedDisputes[sourceCategory].filter((t) => t.DisputeID !== task.DisputeID);
    
// //     // Add the task to the target category
// //     const updatedTarget = [...categorizedDisputes[targetCategory], task];

// //     // Update dispute status in the backend using the mutation
// //     mutation.mutate({ id: task.DisputeID, status: targetCategory, resolutionAction: task.ResolutionAction });

// //     // Update the local state for the drag and drop effect
// //     queryClient.setQueryData(['disputes'], {
// //       ...categorizedDisputes,
// //       [sourceCategory]: updatedSource,
// //       [targetCategory]: updatedTarget,
// //     });

// //     // Update the status and resolution action of the task in the backend
// //     task.Status = targetCategory;
// //     task.ResolutionAction = 'In Progress'; // You can adjust this value based on the category or logic
// //   };

// //   // Prevent default behavior for onDragOver
// //   const allowDrop = (e) => e.preventDefault();

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen">
// //       {Object.entries(categorizedDisputes).map(([category, categoryTasks]) => (
// //         <div
// //           key={category}
// //           className={`flex flex-col rounded-lg p-4 ${getCategoryColor(category)}`}
// //           onDragOver={allowDrop} // Allow drop by preventing default behavior
// //           onDrop={(e) => handleDrop(e, category)} // Handle drop event
// //         >
// //           <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">{category}</h3>
// //           <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
// //             {categoryTasks.map((task) => renderTask(task, category))}
// //           </div>
// //         </div>
// //       ))}
// //       {selectedDispute && (
// //         <DisputePopup
// //           dispute={selectedDispute}
// //           onClose={() => setSelectedDispute(null)}
// //           onSave={(id, newStatus, resolutionAction) => handleSaveChanges(id, newStatus, resolutionAction)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default DisputesBoard;




// //abdullah

// // import React, { useState } from 'react';
// // import DisputePopup from '@/components/dispute';

// // const initialTasks = {
// //   new: [
// //     { id: '1', title: 'Dispute 1', reason: 'Incorrect charges', date: '2025-01-10', reporter: { name: 'John Doe', avatar: '/assets/no-pfp.jpg' } },
// //   ],
// //   inWorking: [
// //     { id: '2', title: 'Dispute 2', reason: 'Damaged product', date: '2025-01-11', reporter: { name: 'Jane Smith', avatar: '/assets/no-pfp.jpg' } },
// //   ],
// //   resolved: [],
// // };

// // const DisputesBoard = () => {
// //   const [tasks, setTasks] = useState(initialTasks);
// //   const [selectedDispute, setSelectedDispute] = useState(null);

// //   const handleDragStart = (e, task, sourceCategory) => {
// //     e.dataTransfer.setData('task', JSON.stringify({ task, sourceCategory }));
// //   };

// //   const handleDrop = (e, targetCategory) => {
// //     e.preventDefault();
// //     const { task, sourceCategory } = JSON.parse(e.dataTransfer.getData('task'));
// //     const updatedSource = tasks[sourceCategory].filter((t) => t.id !== task.id);
// //     const updatedTarget = [...tasks[targetCategory], task];

// //     setTasks({
// //       ...tasks,
// //       [sourceCategory]: updatedSource,
// //       [targetCategory]: updatedTarget,
// //     });
// //   };

// //   const allowDrop = (e) => e.preventDefault();

// //   const renderTask = (task, category) => (
// //     <div
// //       key={task.id}
// //       className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
// //       draggable
// //       onDragStart={(e) => handleDragStart(e, task, category)}
// //       onClick={() => setSelectedDispute(task)}
// //     >
// //       <div className="flex justify-between items-center mb-3">
// //         <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
// //         <h4 className="text-sm font-medium text-gray-600">#{task.id}</h4>
// //       </div>
// //       <p className="text-sm text-gray-700 mb-3">{task.reason}</p>
// //       <div className="flex justify-between items-center">
// //         <span className="text-xs text-gray-500">{task.date}</span>
// //         <img src={task.reporter.avatar} alt="Reporter" className="w-5 h-5 rounded-full" />
// //       </div>
// //     </div>
// //   );

// //   const getCategoryColor = (category) => {
// //     switch (category) {
// //       case 'new':
// //         return 'bg-board-new'; // Light blue background for "New"
// //       case 'inWorking':
// //         return 'bg-board-working'; // Light yellow background for "In Working"
// //       case 'resolved':
// //         return 'bg-board-resolved'; // Light green background for "Resolved"
// //       default:
// //         return 'bg-gray-200'; // Default fallback
// //     }
// //   };

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen">
// //       {Object.entries(tasks).map(([category, categoryTasks]) => (
// //         <div 
// //           key={category} 
// //           className={`flex flex-col rounded-lg p-4 ${getCategoryColor(category)}`} 
// //           onDragOver={allowDrop} 
// //           onDrop={(e) => handleDrop(e, category)}
// //         >
// //           <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">{category}</h3>
// //           <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
// //             {categoryTasks.map((task) => renderTask(task, category))}
// //           </div>
// //         </div>
// //       ))}
// //       {selectedDispute && <DisputePopup onClose={() => setSelectedDispute(null)} />}
// //     </div>
// //   );
// // };

// // export default DisputesBoard;




//drag logic
import React, { useState } from 'react';
import DisputePopup from '@/components/dispute';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@/utiks/formatDate';

// Fetch disputes from the API
const fetchDisputes = async () => {
  const response = await fetch('/api/disputes');
  if (!response.ok) throw new Error('Failed to fetch disputes');
  return response.json();
};

const updateDisputeStatusSave = async ({ id, status, resolutionAction }) => {
  console.log('Saving dispute:', { id, status, resolutionAction });

  const response = await fetch(`/api/disputes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, resolutionAction }),
  });

  if (!response.ok) {
    // Try to read the error response as JSON first
    try {
      const errorData = await response.json();
      console.error('Error updating dispute:', errorData);
      throw new Error(errorData.message || 'Failed to update dispute');
    } catch (jsonError) {
      // If JSON fails, fallback to reading the response as text
      const errorText = await response.text();
      console.error('Error updating dispute (non-JSON response):', errorText);
      throw new Error(errorText || 'Failed to update dispute');
    }
  }

  // If successful, return the JSON response
  return response.json();
};



// Mutation for updating dispute status from drag-and-drop
const updateDisputeStatusDragDrop = async ({ id, status, resolutionAction }) => {
  console.log('Dragging dispute:', { id, status, resolutionAction });

  const response = await fetch(`/api/disputes/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, resolutionAction }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Error updating dispute:', errorData);
    throw new Error(errorData.message || 'Failed to update dispute');
  }

  return response.json();
};

const DisputesBoard = () => {
  const queryClient = useQueryClient();

  // Fetch disputes data with useQuery
  const { data: disputes = [], isLoading, isError } = useQuery({
    queryKey: ['disputes'],
    queryFn: fetchDisputes,
  });

  // Set up the mutation for saving dispute status
  const mutationSave = useMutation({
    mutationFn: updateDisputeStatusSave,
    onSuccess: () => {
      console.log('Dispute status saved successfully!');
      queryClient.invalidateQueries(['disputes']);
    },
    onError: (error) => {
      console.error('Error saving dispute:', error);
      alert(error.message || 'An error occurred while saving the dispute.');
    },
  });

  // Set up the mutation for drag-and-drop dispute status
  const mutationDragDrop = useMutation({
    mutationFn: updateDisputeStatusDragDrop,
    onSuccess: () => {
      console.log('Dispute status updated successfully via drag and drop!');
      queryClient.invalidateQueries(['disputes']);
    },
    onError: (error) => {
      console.error('Error updating dispute via drag and drop:', error);
      alert(error.message || 'An error occurred while updating the dispute via drag and drop.');
    },
  });

  const [selectedDispute, setSelectedDispute] = useState(null);

// Save changes for dispute from the popup
const handleSaveChanges = async (id, newStatus, resolutionAction) => {
  try {
    // Trigger the mutation to update the dispute status
    await mutationSave.mutateAsync({ id, status: newStatus, resolutionAction });
    
    // Optionally, invalidate queries if you want to refetch the data
    queryClient.invalidateQueries(['disputes']); // This ensures disputes data is fresh
    
    // Close the popup after saving
    setSelectedDispute(null); 
    
    console.log('Dispute updated successfully!');
  } catch (error) {
    console.error('Error saving dispute changes:', error.message || error);
    alert(error.message || 'An error occurred while saving the dispute.');
  }
};


  // Handle dragging start
  const handleDragStart = (e, task, sourceCategory) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, sourceCategory }));
  };

  // Handle drop to change the status via drag and drop
  const handleDrop = async (e, targetCategory) => {
    e.preventDefault();
    const { task, sourceCategory } = JSON.parse(e.dataTransfer.getData('task'));

    if (!task || sourceCategory === targetCategory) return;

    // Update dispute status via mutation for drag-and-drop
    mutationDragDrop.mutate({ id: task.DisputeID, status: targetCategory, resolutionAction: task.ResolutionAction });

    // Update the local state to reflect the change
    queryClient.setQueryData(['disputes'], (oldData) =>
      oldData.map((dispute) =>
        dispute.DisputeID === task.DisputeID ? { ...dispute, Status: targetCategory } : dispute
      )
    );
  };

  // Allow dropping by preventing default behavior
  const allowDrop = (e) => e.preventDefault();

  if (isLoading) return <p>Loading disputes...</p>;
  if (isError) return <p>Error loading disputes.</p>;

  // Categorize disputes by their status
  const categorizedDisputes = disputes.reduce(
    (acc, dispute) => {
      acc[dispute.Status] = acc[dispute.Status] || [];
      acc[dispute.Status].push(dispute);
      return acc;
    },
    { New: [], InWorking: [], Resolved: [] }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen">
      {Object.entries(categorizedDisputes).map(([category, categoryTasks]) => (
        <div
          key={category}
          className={`flex flex-col rounded-lg p-4 ${category === 'New' ? 'bg-board-new' : category === 'InWorking' ? 'bg-board-working' : 'bg-board-resolved'}`}
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, category)}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">{category}</h3>
          <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
            {categoryTasks.map((task) => (
              <div
                key={task.DisputeID}
                className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer"
                draggable
                onDragStart={(e) => handleDragStart(e, task, category)}
                onClick={() => setSelectedDispute(task)}
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-gray-800">Dispute</h4>
                  <h4 className="text-sm font-medium text-gray-600">#{task.DisputeID}</h4>
                </div>
                <p className="text-sm text-gray-700 mb-3">{task.Description || 'N/A'}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{formatDate(task.Date)}</span>
                  <img src="/assets/no-pfp.jpg" alt="Reporter" className="w-5 h-5 rounded-full" />
                </div>
              </div>
            ))}
          </div>
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
