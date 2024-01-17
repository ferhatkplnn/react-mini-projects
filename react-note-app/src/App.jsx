import { useState } from "react";
import NoteCard from "./components/NoteCard";
import Tag from "./components/Tag";
import ColorCircle from "./components/ColorCircle";

const ColorOptions = ["green", "pink", "yellow"];

const App = () => {
  const [selectedColor, setSelectedColor] = useState("pink");
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const filteredNotes = notes.filter((n) =>
    n.note.toLowerCase().includes(search.toLowerCase())
  );

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const addNote = () => {
    const newNote = {
      note,
      color: selectedColor,
      createAt: new Date(),
      id: Math.random().toString(),
      tags,
    };
    setNotes([...notes, newNote]);
    setNote("");
    setTags([]);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((n) => n.id !== id);
    setNotes(filteredNotes);
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      addNote();
    }
  };

  const handleTagSubmit = (e) => {
    e.preventDefault();
    const newTag = { tag: tagInput, id: Math.random().toString() };
    setTags([...tags, newTag]);
    setTagInput("");
  };

  const deleteTag = (id) => {
    const filteredTags = tags.filter((t) => t.id !== id);
    setTags(filteredTags);
  };

  return (
    <div className="p-8 space-y-8">
      <header className="text-3xl font-semibold text-center text-gray-500">
        NotesApp
      </header>

      <input
        type="text"
        placeholder="Search..."
        className="border-2 block mx-auto px-8 py-4 text-2xl font-medium rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="relative md:w-3/4 mx-auto">
        <textarea
          className="w-full h-60 p-8 font-medium placeholder:text-slate-500 shadow-md"
          placeholder="Enter your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {/* Color Circles */}
        <div className="absolute flex space-x-2 bottom-8 left-4">
          {ColorOptions.map((color) => (
            <ColorCircle
              key={color}
              color={color}
              selectedColor={selectedColor}
              onClick={handleColorChange}
            />
          ))}
        </div>
        <button
          onClick={addNote}
          className="absolute right-8 bottom-8 bg-green-400 text-white font-bold px-10 py-2 rounded-full hover:bg-green-500"
        >
          ADD
        </button>
      </div>

      <div className="md:w-3/4 mx-auto flex w-full bg-white h-10 items-center">
        {tags.map(({ tag, id }) => (
          <Tag key={id} tag={tag} onDelete={() => deleteTag(id)} />
        ))}

        <form onSubmit={handleTagSubmit} className="flex-1">
          <input
            onChange={(e) => setTagInput(e.target.value)}
            value={tagInput}
            type="text"
            placeholder="Enter tag"
            className="w-full h-full outline-none px-4"
          />
        </form>
      </div>

      {/* notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:w-3/4 mx-auto">
        {filteredNotes.map(({ note, color, createAt, id, tags }) => (
          <NoteCard
            key={id}
            note={note}
            color={color}
            createAt={createAt}
            tags={tags}
            onDelete={() => deleteNote(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
