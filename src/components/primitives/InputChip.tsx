import { X } from "lucide-react";

export default function InputChip({
  onDelete,
  children,
}: {
  onDelete: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="w-fit px-3 py-1 bg-base-300 rounded-xl flex items-center gap-2">
      {children}
      <button onClick={onDelete} className="cursor-pointer">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
