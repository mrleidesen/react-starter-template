import { useQuery } from '@tanstack/react-query';
import { Trans, useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

import { getUsers } from '@/api';
import { idAndPath } from '@/router';

const HomeView: React.FC = () => {
  const { i18n } = useTranslation();

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const result = await getUsers();

      return result
        .map((user) => {
          const path = idAndPath?.[user.id];

          return {
            ...user,
            path,
          };
        })
        .filter((user) => user?.path);
    },
    initialData: [],
  });

  const handleToggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div>
      <button
        onClick={handleToggleLanguage}
        className="bg-gray-200 p-2 rounded"
      >
        <Trans>changeLanguage</Trans>
      </button>

      <h1 className="text-blue-500 font-bold text-2xl mb-4">
        <Trans>title</Trans>
      </h1>

      <h1 className="text-2xl font-bold">User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={user.path}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeView;
