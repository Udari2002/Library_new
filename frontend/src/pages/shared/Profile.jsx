import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function Profile() {
  const { user, api, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
  const [avatarPreview, setAvatarPreview] = useState(user?.avatarBase64 || '/profileIcon.png');
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSelectAvatar = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatarFile(f);
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
    };
    reader.readAsDataURL(f);
  };

  const save = async () => {
    try {
      setLoading(true);
      const payload = { ...form };
      if (avatarPreview && avatarPreview.startsWith('data:')) payload.avatarBase64 = avatarPreview;
  const res = await api.patch('/auth/me', payload);
      const updated = res.data.user;
      // update local state and storage
      if (setUser) setUser(updated);
      setEditing(false);
    } catch (err) {
      console.error('Profile save failed', err);
      alert(err?.response?.data?.message || err.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-800">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">Profile</h1>

          <div className="bg-white shadow rounded-xl p-6 max-w-2xl">
            <div className="flex items-center gap-6">
              <img src={avatarPreview} alt="avatar" className="w-24 h-24 rounded-full object-cover border" />
              <div>
                <h2 className="text-xl font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-600">{user?.email}</p>
                <p className="text-sm text-gray-600">Role: {user?.role}</p>
              </div>
            </div>

            {!editing ? (
              <div className="mt-6">
                <button onClick={() => setEditing(true)} className="px-4 py-2 bg-indigo-600 text-white rounded">Edit Profile</button>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input name="name" value={form.name} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input name="email" value={form.email} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input name="phone" value={form.phone} onChange={onChange} className="mt-1 block w-full border rounded px-3 py-2" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Profile Image</label>
                  <input type="file" accept="image/*" onChange={onSelectAvatar} className="mt-1" />
                </div>

                <div className="flex gap-3">
                  <button onClick={save} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? 'Saving...' : 'Save'}</button>
                  <button onClick={() => setEditing(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
