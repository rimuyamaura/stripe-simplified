'use client';

import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const tasks = useQuery(api.tasks.getAllTasks);
  return (
    <>
      <h1>All tasks in db</h1>
      {tasks?.map((task) => (
        <div key={task.id}>
          <h2>
            {task.text} = is completed: {task.isCompleted ? 'true' : 'false'}
          </h2>
        </div>
      ))}
    </>
  );
}
