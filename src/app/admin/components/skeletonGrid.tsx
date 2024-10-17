// SkeletonGrid.tsx
const SkeletonGrid: React.FC = () => {
  // Define how many placeholders you want
  const skeletonItems = new Array(8).fill(0);

  return (
    <div className="gallery-grid w-full mb-32 px-[10%]">
      {skeletonItems.map((_, index) => (
        <div key={index} className="gallery-item skeleton-item">
          <div className="skeleton-image bg-gray-300 animate-pulse gallery-item w-[300px] h-[300px] rounded-lg"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
