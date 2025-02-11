import { useState } from 'react';
import { Save } from 'lucide-react';
import { User } from '../types/user';
interface ManageUserCardProps {
    user?: User;
    onSave: (updatedUser: User) => void;
}

export function ManageUserCard({ user, onSave }: ManageUserCardProps) {
    const [editedUser, setEditedUser] = useState<User>(
        user || { username: '', email: '', password: '', isAdmin: false }
    );

    const handleChange = (field: keyof User, value: string | boolean) => {
        setEditedUser((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <div className="bg-gray-900 text-gray-100 dark:bg-white rounded-xl shadow-lg p-6 w-96 text-gray-900 custom-flex-third-container">
      <div className="flex flex-col gap-4">
        <label className="text-gray-700 text-lg">Nom d'utilisateur</label>
        <input
          className="bg-gray-200 pl-2 pr-2 rounded"
          type="text"
          value={editedUser.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />

        <label className="text-gray-700 text-lg">Email</label>
        <input
          className="bg-gray-200 pl-2 pr-2 rounded"
          type="email"
          value={editedUser.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <label className="text-gray-700 text-lg">Mot de passe</label>
        <input
          className="bg-gray-200 pl-2 pr-2 rounded"
          type="password"
          value={editedUser.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
            className="bg-gray-200 pl-2 pr-2 rounded"
            type="checkbox"
            checked={editedUser.isAdmin}
            onChange={(e) => handleChange('isAdmin', e.target.checked)}
          />
          <label className="text-gray-700 text-lg">Administrateur</label>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={() => onSave(editedUser)} className="bg-blue-500 text-white px-4 py-2 rounded">
          <Save className="w-4 h-4 mr-2 inline" /> Sauvegarder
        </button>
      </div>
    </div>
  );
}
