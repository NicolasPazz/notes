import { findFirstInvalidChar } from "../utils/sanitize";
import { useState } from "react";

type Props = {
    categoryName: string;
    setCategoryName: (name: string) => void;
    handleCategoryAdd: () => void;
};

const CategoryInput = ({
    categoryName,
    setCategoryName,
    handleCategoryAdd,
}: Props) => {
    const [error, setError] = useState<string | null>(null);

    return (
        <div>
            <label className="text-sm block">Category</label>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => {
                        const val = e.target.value;
                        const invalidChar = findFirstInvalidChar(val);
                        setCategoryName(val);
                        setError(
                            invalidChar
                                ? `Invalid character: ${invalidChar}`
                                : null
                        );
                    }}
                    className={`w-full p-2 border rounded ${
                        error ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g. Work"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="button"
                    disabled={!!error || !categoryName.trim()}
                    onClick={handleCategoryAdd}
                    className={`text-white px-4 py-2 rounded ${
                        error
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    Add
                </button>
            </div>
        </div>
    );
};

export default CategoryInput;