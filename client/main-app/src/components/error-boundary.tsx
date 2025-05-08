'use client';

import { useEffect } from 'react';
import { Button } from './ui/button';

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full flex-col items-center justify-center gap-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Oops! Đã có lỗi xảy ra</h2>
        <p className="text-muted-foreground">
          {error.message || 'Không thể tải dữ liệu. Vui lòng thử lại.'}
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button onClick={() => window.location.reload()} variant="outline">
          Tải lại trang
        </Button>
        <Button onClick={reset} variant="default">
          Thử lại
        </Button>
      </div>
    </div>
  );
}