'use client';

import { useUser } from '@clerk/nextjs';
import { Id } from '../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Button } from './ui/button';
import { Loader2Icon } from 'lucide-react';
import { useState } from 'react';

const PurchaseButton = ({ courseId }: { courseId: Id<'courses'> }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const userData = useQuery(
    api.users.getUserByClerkId,
    user ? { clerkId: user.id } : 'skip'
  );
  const userAccess = useQuery(
    api.users.getUserAccess,
    userData ? { userId: userData._id, courseId } : 'skip'
  ) || { hasAccess: false };

  if (!userAccess.hasAccess) {
    return <Button variant='outline'>Enrol now</Button>;
  }
  if (userAccess.hasAccess) {
    return <Button variant='outline'>Enrolled</Button>;
  }
  if (isLoading) {
    return (
      <Button variant='outline'>
        <Loader2Icon className='mr-2 size-4 animate-spin' /> Processing...
      </Button>
    );
  }
};
export default PurchaseButton;
