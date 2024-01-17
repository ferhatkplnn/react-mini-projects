const Tag = ({ tag, onDelete }) => (
  <span className="border rounded-full px-2 bg-slate-300 mx-2">
    {tag}
    <button
      onClick={onDelete}
      className="ml-2 font-mono text-red-400 hover:text-red-500"
    >
      X
    </button>
  </span>
);

export default Tag;
