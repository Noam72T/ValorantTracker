export const Loading = ({ message = 'Chargement...' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-gray-600 border-t-red-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-400">{message}</p>
    </div>
  );
};
