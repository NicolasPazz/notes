import type { CategoryDTO } from '../types/CategoryDTO';

type Props = {
  selectedCategoryId?: number;
  onChange: (id: number | undefined) => void;
  categories: CategoryDTO[];
};

const CategoryFilter = ({ selectedCategoryId, onChange, categories }: Props) => {
  return (
    <select
      value={selectedCategoryId ?? ''}
      onChange={(e) => {
        const val = e.target.value;
        onChange(val ? parseInt(val) : undefined);
      }}
      className="p-2 border rounded mb-4"
    >
      <option value="">All categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
