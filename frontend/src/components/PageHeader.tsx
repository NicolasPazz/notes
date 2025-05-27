type Props = {
  archived: boolean;
  onToggle: () => void;
};

const PageHeader = ({ archived, onToggle }: Props) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">
        {archived ? 'Archived Notes' : 'Active Notes'}
      </h2>
      <button
        type="button"
        onClick={onToggle}
      >
        View {archived ? 'Active' : 'Archived'}
      </button>
    </div>
  );
};

export default PageHeader;
