export const Loading = ({ message = 'Chargement...' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16 mb-4">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-red-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-red-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-gray-400">{message}</p>
    </div>
  );
};
