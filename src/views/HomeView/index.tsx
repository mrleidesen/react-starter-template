import { useQuery } from '@tanstack/react-query';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getUsers } from '@/api';

const StyledBox = styled.div`
  padding: 16px;
`;

const HomeView: React.FC = () => {
  const { i18n } = useTranslation();

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => {
      return getUsers();
    },
    initialData: [],
  });

  const handleToggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <StyledBox>
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
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </StyledBox>
  );
};

export default HomeView;
