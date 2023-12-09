export type Status = 'inProgress' | 'inReview' | 'completed';

export interface Task {
   id: string;
   title: string;
   status: Status;
}

const tasks: Task[] = [
   {
      id: '1',
      title: 'Create a vite application',
      status: 'inProgress',
   },
   {
      id: '2',
      title: 'Create a React application',
      status: 'inReview',
   },
   {
      id: '3',
      title: 'Create a React Native application',
      status: 'completed',
   },
   {
      id: '4',
      title: 'Create a web application',
      status: 'completed',
   },
];

export default tasks;
