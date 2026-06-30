export default function ToolLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6" />
      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-3" />
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-full max-w-lg mb-8" />
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-40 mb-8" />
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl" />
        <div className="h-16 bg-gray-100 dark:bg-gray-800 rounded-xl" />
      </div>
    </div>
  );
}
