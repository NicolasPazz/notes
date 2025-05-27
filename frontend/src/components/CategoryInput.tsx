type Props = {
  categoryName: string;
  setCategoryName: (name: string) => void;
  handleCategoryAdd: () => void;
};

const CategoryInput = ({ categoryName, setCategoryName, handleCategoryAdd }: Props) => (
  <div>
    <label className="text-sm block">Category</label>
    <div className="flex space-x-2">
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="e.g. Work"
      />
      <button
        type="button"
        onClick={handleCategoryAdd}
        className="text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  </div>
);

export default CategoryInput;