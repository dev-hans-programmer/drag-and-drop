import { DragEvent, useState } from 'react';
import tasks, { Status, Task } from '../data/tasks';
import './DragAndDrop.css';

function DragAndDrop() {
   const [tasksState, setTasksState] = useState<Task[]>(tasks);

   function handleDragStart(e: DragEvent<HTMLDivElement>, id: string) {
      e.dataTransfer.setData('dragId', id);
   }

   const tasksDistribution = tasksState.reduce(
      (acc, task) => {
         const item = (
            <div
               onDragStart={(e) => handleDragStart(e, task.id)}
               draggable
               className='draggable'
               key={task.id}
            >
               {task.title}
            </div>
         );

         acc[task.status].push(item);
         return acc;
      },
      { inProgress: [], inReview: [], completed: [] } as {
         inProgress: JSX.Element[];
         inReview: JSX.Element[];
         completed: JSX.Element[];
      }
   );

   function handleDragOver(e: DragEvent<HTMLDivElement>) {
      e.preventDefault();
   }

   function handleDrop(e: DragEvent<HTMLDivElement>, status: Status) {
      const dragElementId = e.dataTransfer.getData('dragId');

      const modifiedState = tasksState.map((task) =>
         task.id === dragElementId ? { ...task, status } : task
      );
      setTasksState(modifiedState);
   }

   const { inProgress, inReview, completed } = tasksDistribution;

   const stats = (
      <>
         <h2>In Progress: {inProgress.length}</h2>
         <h2>In Review: {inReview.length}</h2>
         <h2>In Progress: {completed.length}</h2>
      </>
   );

   return (
      <div className='DragAndDrop'>
         {/* Stats */}
         <div className='stats-container'>{stats}</div>
         <div className='stats'></div>
         <div className='tasks-container'>
            <div
               onDragOver={handleDragOver}
               onDrop={(e) => handleDrop(e, 'inProgress')}
               className='task inProgress'
            >
               {inProgress}
            </div>
            <div
               onDragOver={handleDragOver}
               onDrop={(e) => handleDrop(e, 'inReview')}
               className='task inReview'
            >
               {inReview}
            </div>
            <div
               onDragOver={handleDragOver}
               onDrop={(e) => handleDrop(e, 'completed')}
               className='task completed'
            >
               {completed}
            </div>
         </div>
         {/* in Progress */}
         {/* In Review */}
         {/* completed */}
      </div>
   );
}

export default DragAndDrop;
