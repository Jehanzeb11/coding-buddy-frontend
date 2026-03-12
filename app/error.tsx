'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl shadow-xl max-w-md border border-red-100 dark:border-red-900/30">
        <AlertCircle className="h-16 w-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Something went wrong!</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          An unexpected error occurred. We have been notified and are working on a fix.
        </p>
        <Button 
          onClick={() => reset()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all flex items-center gap-2 mx-auto"
        >
          <RefreshCcw className="h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
