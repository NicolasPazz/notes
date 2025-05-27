import type { CategoryDTO } from "../types/CategoryDTO";

type Props = {
    selectedCategoryIds: number[];
    categories: CategoryDTO[];
    onRemove: (id: number) => void;
};

const CategoryBadges = ({
    selectedCategoryIds,
    categories,
    onRemove,
}: Props) => {
    if (selectedCategoryIds.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mt-3">
            {selectedCategoryIds.map((id) => {
                const cat = categories.find((c) => c.id === id);
                return (
                    <span
                        key={id}
                        className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center"
                    >
                        {cat?.name}
                        <button
                            onClick={() => onRemove(id)}
                            className="text-red-600! hover:text-red-800! font-bold!"
                        >
                            X
                        </button>
                    </span>
                );
            })}
        </div>
    );
};

export default CategoryBadges;