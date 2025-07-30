import React, { useState, useEffect } from 'react';
import './App.css';
import { faqData, contactInfo as staticContactInfo } from './faqData';

interface FAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

interface ContactInfo {
  email: string;
  hours: string;
}

interface UITexts {
  appTitle: string;
  appSubtitle: string;
  faqTitle: string;
  faqDescription: string;
  searchPlaceholder: string;
  noResults: string;
  contactTitle: string;
  contactDescription: string;
  featuresTitle: string;
  features: {
    characterManagement: { title: string; description: string };
    animeManagement: { title: string; description: string };
    pilgrimagePlan: { title: string; description: string };
    mediaManagement: { title: string; description: string };
  };
  categories: {
    all: string;
    general: string;
    payment: string;
    features: string;
    data: string;
    trouble: string;
    account: string;
  };
}

const uiTexts: { [key: string]: UITexts } = {
  ja: {
    appTitle: 'アニコレ サポート',
    appSubtitle: 'アニメキャラクター管理＆聖地巡礼アプリ',
    faqTitle: 'よくあるご質問',
    faqDescription: 'アニコレについてのよくある質問をまとめました',
    searchPlaceholder: '質問を検索...',
    noResults: '該当する質問が見つかりませんでした。',
    contactTitle: 'お問い合わせ',
    contactDescription: 'よくある質問で解決しない場合は、以下からお問い合わせください',
    featuresTitle: '主な機能',
    features: {
      characterManagement: { title: 'キャラクター管理', description: 'お気に入りのアニメキャラクターを登録・管理' },
      animeManagement: { title: 'アニメ作品管理', description: '視聴した作品を評価・記録' },
      pilgrimagePlan: { title: '聖地巡礼プラン', description: 'アニメの舞台を訪れる計画を作成' },
      mediaManagement: { title: '写真・動画管理', description: '思い出を記録して整理' }
    },
    categories: {
      all: 'すべて',
      general: '一般',
      payment: '支払い',
      features: '機能',
      data: 'データ',
      trouble: 'トラブルシューティング',
      account: 'アカウント'
    }
  },
  en: {
    appTitle: 'AniColle Support',
    appSubtitle: 'Anime Character Management & Pilgrimage App',
    faqTitle: 'Frequently Asked Questions',
    faqDescription: 'Common questions about AniColle',
    searchPlaceholder: 'Search questions...',
    noResults: 'No matching questions found.',
    contactTitle: 'Contact Us',
    contactDescription: 'If FAQs don\'t solve your issue, please contact us',
    featuresTitle: 'Main Features',
    features: {
      characterManagement: { title: 'Character Management', description: 'Register and manage your favorite anime characters' },
      animeManagement: { title: 'Anime Works Management', description: 'Rate and record watched works' },
      pilgrimagePlan: { title: 'Pilgrimage Plan', description: 'Plan visits to anime locations' },
      mediaManagement: { title: 'Photo/Video Management', description: 'Record and organize memories' }
    },
    categories: {
      all: 'All',
      general: 'General',
      payment: 'Payment',
      features: 'Features',
      data: 'Data',
      trouble: 'Troubleshooting',
      account: 'Account'
    }
  },
  'zh-Hans': {
    appTitle: 'AniColle 支持',
    appSubtitle: '动漫角色管理与圣地巡礼应用',
    faqTitle: '常见问题',
    faqDescription: '关于AniColle的常见问题',
    searchPlaceholder: '搜索问题...',
    noResults: '未找到匹配的问题。',
    contactTitle: '联系我们',
    contactDescription: '如果常见问题无法解决您的问题，请联系我们',
    featuresTitle: '主要功能',
    features: {
      characterManagement: { title: '角色管理', description: '注册和管理您喜欢的动漫角色' },
      animeManagement: { title: '动漫作品管理', description: '评分和记录观看的作品' },
      pilgrimagePlan: { title: '圣地巡礼计划', description: '计划访问动漫地点' },
      mediaManagement: { title: '照片/视频管理', description: '记录和整理回忆' }
    },
    categories: {
      all: '全部',
      general: '一般',
      payment: '付款',
      features: '功能',
      data: '数据',
      trouble: '故障排除',
      account: '账户'
    }
  },
  ko: {
    appTitle: 'AniColle 지원',
    appSubtitle: '애니메이션 캐릭터 관리 & 성지순례 앱',
    faqTitle: '자주 묻는 질문',
    faqDescription: 'AniColle에 대한 자주 묻는 질문',
    searchPlaceholder: '질문 검색...',
    noResults: '일치하는 질문을 찾을 수 없습니다.',
    contactTitle: '문의하기',
    contactDescription: 'FAQ로 문제가 해결되지 않으면 문의해 주세요',
    featuresTitle: '주요 기능',
    features: {
      characterManagement: { title: '캐릭터 관리', description: '좋아하는 애니메이션 캐릭터 등록 및 관리' },
      animeManagement: { title: '애니메이션 작품 관리', description: '시청한 작품 평가 및 기록' },
      pilgrimagePlan: { title: '성지순례 플랜', description: '애니메이션 장소 방문 계획' },
      mediaManagement: { title: '사진/동영상 관리', description: '추억 기록 및 정리' }
    },
    categories: {
      all: '전체',
      general: '일반',
      payment: '결제',
      features: '기능',
      data: '데이터',
      trouble: '문제 해결',
      account: '계정'
    }
  },
  de: {
    appTitle: 'AniColle Support',
    appSubtitle: 'Anime-Charakterverwaltung & Pilgerreise-App',
    faqTitle: 'Häufig gestellte Fragen',
    faqDescription: 'Häufige Fragen zu AniColle',
    searchPlaceholder: 'Fragen suchen...',
    noResults: 'Keine passenden Fragen gefunden.',
    contactTitle: 'Kontaktieren Sie uns',
    contactDescription: 'Wenn die FAQs Ihr Problem nicht lösen, kontaktieren Sie uns bitte',
    featuresTitle: 'Hauptfunktionen',
    features: {
      characterManagement: { title: 'Charakterverwaltung', description: 'Registrieren und verwalten Sie Ihre Lieblings-Anime-Charaktere' },
      animeManagement: { title: 'Anime-Werke-Verwaltung', description: 'Bewerten und aufzeichnen Sie gesehene Werke' },
      pilgrimagePlan: { title: 'Pilgerreiseplan', description: 'Planen Sie Besuche an Anime-Orten' },
      mediaManagement: { title: 'Foto-/Videoverwaltung', description: 'Aufzeichnen und organisieren Sie Erinnerungen' }
    },
    categories: {
      all: 'Alle',
      general: 'Allgemein',
      payment: 'Zahlung',
      features: 'Funktionen',
      data: 'Daten',
      trouble: 'Fehlerbehebung',
      account: 'Konto'
    }
  },
  es: {
    appTitle: 'Soporte AniColle',
    appSubtitle: 'App de Gestión de Personajes de Anime y Peregrinación',
    faqTitle: 'Preguntas Frecuentes',
    faqDescription: 'Preguntas comunes sobre AniColle',
    searchPlaceholder: 'Buscar preguntas...',
    noResults: 'No se encontraron preguntas coincidentes.',
    contactTitle: 'Contáctanos',
    contactDescription: 'Si las FAQ no resuelven tu problema, contáctanos',
    featuresTitle: 'Funciones Principales',
    features: {
      characterManagement: { title: 'Gestión de Personajes', description: 'Registra y gestiona tus personajes de anime favoritos' },
      animeManagement: { title: 'Gestión de Obras de Anime', description: 'Califica y registra obras vistas' },
      pilgrimagePlan: { title: 'Plan de Peregrinación', description: 'Planifica visitas a lugares de anime' },
      mediaManagement: { title: 'Gestión de Fotos/Videos', description: 'Registra y organiza recuerdos' }
    },
    categories: {
      all: 'Todas',
      general: 'General',
      payment: 'Pago',
      features: 'Funciones',
      data: 'Datos',
      trouble: 'Solución de problemas',
      account: 'Cuenta'
    }
  },
  fr: {
    appTitle: 'Support AniColle',
    appSubtitle: 'App de Gestion de Personnages d\'Anime et Pèlerinage',
    faqTitle: 'Questions Fréquemment Posées',
    faqDescription: 'Questions courantes sur AniColle',
    searchPlaceholder: 'Rechercher des questions...',
    noResults: 'Aucune question correspondante trouvée.',
    contactTitle: 'Contactez-nous',
    contactDescription: 'Si les FAQ ne résolvent pas votre problème, contactez-nous',
    featuresTitle: 'Fonctionnalités Principales',
    features: {
      characterManagement: { title: 'Gestion des Personnages', description: 'Enregistrez et gérez vos personnages d\'anime préférés' },
      animeManagement: { title: 'Gestion des Œuvres d\'Anime', description: 'Notez et enregistrez les œuvres regardées' },
      pilgrimagePlan: { title: 'Plan de Pèlerinage', description: 'Planifiez des visites aux lieux d\'anime' },
      mediaManagement: { title: 'Gestion Photos/Vidéos', description: 'Enregistrez et organisez vos souvenirs' }
    },
    categories: {
      all: 'Toutes',
      general: 'Général',
      payment: 'Paiement',
      features: 'Fonctionnalités',
      data: 'Données',
      trouble: 'Dépannage',
      account: 'Compte'
    }
  },
  it: {
    appTitle: 'Supporto AniColle',
    appSubtitle: 'App di Gestione Personaggi Anime e Pellegrinaggio',
    faqTitle: 'Domande Frequenti',
    faqDescription: 'Domande comuni su AniColle',
    searchPlaceholder: 'Cerca domande...',
    noResults: 'Nessuna domanda corrispondente trovata.',
    contactTitle: 'Contattaci',
    contactDescription: 'Se le FAQ non risolvono il tuo problema, contattaci',
    featuresTitle: 'Funzioni Principali',
    features: {
      characterManagement: { title: 'Gestione Personaggi', description: 'Registra e gestisci i tuoi personaggi anime preferiti' },
      animeManagement: { title: 'Gestione Opere Anime', description: 'Valuta e registra le opere viste' },
      pilgrimagePlan: { title: 'Piano di Pellegrinaggio', description: 'Pianifica visite ai luoghi degli anime' },
      mediaManagement: { title: 'Gestione Foto/Video', description: 'Registra e organizza i ricordi' }
    },
    categories: {
      all: 'Tutte',
      general: 'Generale',
      payment: 'Pagamento',
      features: 'Funzioni',
      data: 'Dati',
      trouble: 'Risoluzione problemi',
      account: 'Account'
    }
  },
  pt: {
    appTitle: 'Suporte AniColle',
    appSubtitle: 'App de Gerenciamento de Personagens de Anime e Peregrinação',
    faqTitle: 'Perguntas Frequentes',
    faqDescription: 'Perguntas comuns sobre AniColle',
    searchPlaceholder: 'Pesquisar perguntas...',
    noResults: 'Nenhuma pergunta correspondente encontrada.',
    contactTitle: 'Entre em Contato',
    contactDescription: 'Se as FAQ não resolverem seu problema, entre em contato',
    featuresTitle: 'Recursos Principais',
    features: {
      characterManagement: { title: 'Gerenciamento de Personagens', description: 'Registre e gerencie seus personagens de anime favoritos' },
      animeManagement: { title: 'Gerenciamento de Obras de Anime', description: 'Avalie e registre obras assistidas' },
      pilgrimagePlan: { title: 'Plano de Peregrinação', description: 'Planeje visitas a locais de anime' },
      mediaManagement: { title: 'Gerenciamento de Fotos/Vídeos', description: 'Registre e organize memórias' }
    },
    categories: {
      all: 'Todas',
      general: 'Geral',
      payment: 'Pagamento',
      features: 'Recursos',
      data: 'Dados',
      trouble: 'Solução de problemas',
      account: 'Conta'
    }
  }
};

const App: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [contactInfo, setContactInfo] = useState<ContactInfo>({ email: '', hours: '' });
  const [currentLang, setCurrentLang] = useState<string>(() => {
    return localStorage.getItem('selectedLanguage') || '';
  });
  const [showLanguageSelection, setShowLanguageSelection] = useState<boolean>(() => {
    return !localStorage.getItem('selectedLanguage');
  });

  const languages = [
    { code: 'ja', name: '日本語' },
    { code: 'en', name: 'English' },
    { code: 'zh-Hans', name: '简体中文' },
    { code: 'ko', name: '한국어' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' }
  ];

  useEffect(() => {
    loadFAQs();
    loadContactInfo();
  }, [currentLang]);

  const loadFAQs = () => {
    const langData = faqData[currentLang as keyof typeof faqData] || faqData.ja;
    setFaqs(langData);
  };

  const loadContactInfo = () => {
    const langContactInfo = staticContactInfo[currentLang as keyof typeof staticContactInfo] || staticContactInfo.ja;
    setContactInfo(langContactInfo);
  };

  const texts = uiTexts[currentLang] || uiTexts.ja;

  const categories = [
    { value: 'all', label: texts.categories.all },
    { value: 'general', label: texts.categories.general },
    { value: 'payment', label: texts.categories.payment },
    { value: 'features', label: texts.categories.features },
    { value: 'data', label: texts.categories.data },
    { value: 'trouble', label: texts.categories.trouble },
    { value: 'account', label: texts.categories.account }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLanguageSelect = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('selectedLanguage', langCode);
    setShowLanguageSelection(false);
  };

  if (showLanguageSelection) {
    return (
      <div className="language-selection-screen">
        <div className="language-selection-container">
          <h1>Select Language / 言語を選択</h1>
          <p>Choose your preferred language / お好みの言語を選択してください</p>
          <div className="language-grid">
            {languages.map(lang => (
              <button
                key={lang.code}
                className="language-option"
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <span className="lang-name">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="language-selector">
          <select value={currentLang} onChange={(e) => {
            setCurrentLang(e.target.value);
            localStorage.setItem('selectedLanguage', e.target.value);
          }}>
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
        <div className="header-content">
          <h1>{texts.appTitle}</h1>
          <p className="subtitle">{texts.appSubtitle}</p>
        </div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-content">
            <h2>{texts.faqTitle}</h2>
            <p>{texts.faqDescription}</p>
          </div>
        </section>

        <section className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder={texts.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </section>

        <section className="filter-section">
          <div className="category-buttons">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-list">
            {filteredFAQs.map(faq => (
              <div key={faq.id} className="faq-item">
                <h3 className="faq-question">Q: {faq.question}</h3>
                <p className="faq-answer">A: {faq.answer}</p>
              </div>
            ))}
            {filteredFAQs.length === 0 && (
              <p className="no-results">{texts.noResults}</p>
            )}
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-content">
            <h2>{texts.contactTitle}</h2>
            <p>{texts.contactDescription}</p>
            <div className="contact-info">
              <p>📧 {contactInfo.email}</p>
              <p>{contactInfo.hours}</p>
            </div>
          </div>
        </section>

        <section className="app-features">
          <h2>{texts.featuresTitle}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>{texts.features.characterManagement.title}</h3>
              <p>{texts.features.characterManagement.description}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📺</div>
              <h3>{texts.features.animeManagement.title}</h3>
              <p>{texts.features.animeManagement.description}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>{texts.features.pilgrimagePlan.title}</h3>
              <p>{texts.features.pilgrimagePlan.description}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📸</div>
              <h3>{texts.features.mediaManagement.title}</h3>
              <p>{texts.features.mediaManagement.description}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2024 AniColle. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;