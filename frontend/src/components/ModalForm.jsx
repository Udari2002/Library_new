import { useState } from "react";
import api from "../api/axios";

export default function ModalForm({ onClose, onAdded }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    isbn: "",
    available: true,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/books", form);
      onAdded();      // refresh book list
      onClose();      // close modal
    } catch (err) {
      console.error(err);
      setError("Failed to add book");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-indigo-700">Add New Book</h2>

        {error && <p className="text-red-600">{error}</p>}

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border rounded p-2"
          required
        />
        <input
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          className="w-full border rounded p-2"
        />

        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
}
