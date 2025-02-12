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
      <div className="bg-gray-100 text-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-6 w-96 custom-flex-third-container">
              <div className="flex flex-col gap-4">
              <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Nom d'utilisateur</label>
              <input
                  className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          type="text"
          value={editedUser.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Email</label>
        <input
            className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          type="email"
          value={editedUser.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Mot de passe</label>
        <input
            className="mt-1 block w-full border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
          type="password"
          value={editedUser.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />

        <div className="flex items-center gap-2">
          <input
              className="block border-gray-400 dark:border-gray-600 rounded shadow-sm focus:ring-primary focus:border-primary px-1 text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700"
            type="checkbox"
            checked={editedUser.isAdmin}
            onChange={(e) => handleChange('isAdmin', e.target.checked)}
          />
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">Administrateur</label>
        </div>
      </div>

          <div className="flex justify-end mt-4">

              <button
                  className="font-bold text-green-500 flex justify-around items-center rounded pl-2 pr-2 text-xl">
                  <Save/>
              </button>
          </div>
      </div>
  );
}
