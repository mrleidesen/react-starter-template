import { Trans, useTranslation } from 'react-i18next';

const HomeView: React.FC = () => {
  const { i18n } = useTranslation();

  const handleToggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div>
      <button onClick={handleToggleLanguage}>Change</button>
      <h1 className="text-blue-500 font-bold text-2xl">
        <Trans>title</Trans>
      </h1>
    </div>
  );
};

export default HomeView;
