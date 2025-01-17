import React, { useState } from 'react';

const initialTasks = {
  new: [
    {
      id: '1',
      title: 'Dispute 1',
      reason: 'Customer complaint about incorrect charges',
      date: '2025-01-10',
      reporter: { name: 'John Doe', avatar: '/assets/no-pfp.jpg' },
    },
  ],
  inWorking: [
    {
      id: '2',
      title: 'Dispute 2',
      reason: 'Customer complaint about incorrect charges',
      date: '2025-01-10',
      reporter: { name: 'John Doe', avatar: '/assets/no-pfp.jpg' },
    },
  ],
  resolved: [],
};

const DisputesBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragStart = (e, task, sourceCategory) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, sourceCategory }));
  };

  const handleDrop = (e, targetCategory) => {
    e.preventDefault();
    const { task, sourceCategory } = JSON.parse(e.dataTransfer.getData('task'));
    const updatedSource = tasks[sourceCategory].filter((t) => t.id !== task.id);
    const updatedTarget = [...tasks[targetCategory], task];

    setTasks({
      ...tasks,
      [sourceCategory]: updatedSource,
      [targetCategory]: updatedTarget,
    });
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const renderTask = (task, category) => (
    <div
  key={task.id}
  className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-grab"
  draggable
  onDragStart={(e) => handleDragStart(e, task, category)}
>
  {/* First row: Title and ID */}
  <div className="flex justify-between items-center mb-3">
    <h4 className="text-lg font-semibold text-gray-800">{task.title}</h4>
    <h4 className="text-sm font-medium text-gray-600">#{task.id}</h4>
  </div>

  {/* Second row: Reason */}
  <p className="text-sm text-gray-700 mb-3">{task.reason}</p>

  {/* Third row: Date and Image */}
  <div className="flex justify-between items-center">
    <span className="text-xs text-gray-500">{task.date}</span>
    <img
      src='/assets/no-pfp.jpg'
      alt="Reporter"
      className="w-5 h-5 rounded-full"
    />
  </div>
</div>

  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'new':
        return 'bg-board-new'; // Light blue background for "New"
      case 'inWorking':
        return 'bg-board-working'; // Light yellow background for "In Working"
      case 'resolved':
        return 'bg-board-resolved'; // Light green background for "Resolved"
      default:
        return 'bg-gray-200'; // Default fallback
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-screen">
      {Object.entries(tasks).map(([category, categoryTasks]) => (
        <div
          key={category}
          className={`flex flex-col rounded-lg p-4 ${getCategoryColor(category)}`}
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, category)}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">
            {category}
          </h3>
          <div className="flex-1 overflow-y-auto max-h-[400px] space-y-4">
            {categoryTasks.map((task) => renderTask(task, category))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisputesBoard;