const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// FAQ データ（多言語対応）
const faqData = {
  ja: [
    {
      id: 1,
      category: 'general',
      question: 'アニコレとは何ですか？',
      answer: 'アニコレは、アニメキャラクターと作品を管理し、聖地巡礼を計画できるiOSアプリです。お気に入りのキャラクターや作品を登録し、関連する場所を訪れる計画を立てることができます。'
    },
    {
      id: 2,
      category: 'general',
      question: 'アプリは無料で使えますか？',
      answer: '最初の40日間は無料でご利用いただけます。その後、継続してご利用いただく場合は600円（600ポイント）の料金が必要となります。'
    },
    {
      id: 3,
      category: 'payment',
      question: '支払い方法は何がありますか？',
      answer: 'App内課金（Apple IDに登録された支払い方法）またはアプリ内で購入できるポイントでお支払いいただけます。ポイントは事前に購入しておくことで、いつでも利用できます。'
    },
    {
      id: 4,
      category: 'features',
      question: 'キャラクターは何人まで登録できますか？',
      answer: 'キャラクターの登録数に制限はありません。好きなだけお気に入りのキャラクターを追加できます。'
    },
    {
      id: 5,
      category: 'features',
      question: 'アニメ作品の情報はどのように管理できますか？',
      answer: 'アニメ作品はタイトル、カテゴリ（アクション、恋愛、コメディなど）、評価（1-5つ星）、視聴状況などで管理できます。検索機能も備えています。'
    },
    {
      id: 6,
      category: 'features',
      question: '聖地巡礼プランとは何ですか？',
      answer: '聖地巡礼プランは、アニメに登場する実際の場所を訪れるための計画機能です。訪問したい場所、日程、メモなどを記録し、効率的な聖地巡礼を計画できます。'
    },
    {
      id: 7,
      category: 'data',
      question: 'データのバックアップはできますか？',
      answer: 'アプリのデータは端末に保存されます。アカウントでログインすることで、データを安全に保持できます。'
    },
    {
      id: 8,
      category: 'trouble',
      question: 'アプリが起動しない場合はどうすればいいですか？',
      answer: '1. アプリを完全に終了して再起動してください\n2. iOSが最新バージョンか確認してください\n3. ストレージ容量に余裕があるか確認してください\n4. それでも解決しない場合は、アプリを再インストールしてください'
    },
    {
      id: 9,
      category: 'account',
      question: 'アカウントを削除するにはどうすればいいですか？',
      answer: '設定画面からログアウトすることができます。アカウントの完全削除をご希望の場合は、サポートまでお問い合わせください。'
    },
    {
      id: 10,
      category: 'features',
      question: '画像はどこに保存されますか？',
      answer: 'キャラクターや背景の画像は、アプリ内の専用ストレージに保存されます。端末の写真アプリには保存されません。'
    }
  ],
  en: [
    {
      id: 1,
      category: 'general',
      question: 'What is AniColle?',
      answer: 'AniColle is an iOS app that lets you manage anime characters and works, and plan anime pilgrimage trips. You can register your favorite characters and works, and plan visits to related locations.'
    },
    {
      id: 2,
      category: 'general',
      question: 'Is the app free to use?',
      answer: 'The first 40 days are free. After that, you\'ll need to pay 600 yen (600 points) to continue using the app.'
    },
    {
      id: 3,
      category: 'payment',
      question: 'What payment methods are available?',
      answer: 'You can pay through In-App Purchase (using payment methods registered to your Apple ID) or with points purchased within the app. Points can be purchased in advance for use anytime.'
    },
    {
      id: 4,
      category: 'features',
      question: 'How many characters can I register?',
      answer: 'There\'s no limit to the number of characters you can register. Add as many favorite characters as you like.'
    },
    {
      id: 5,
      category: 'features',
      question: 'How can I manage anime works information?',
      answer: 'Anime works can be managed by title, category (action, romance, comedy, etc.), rating (1-5 stars), and viewing status. A search function is also available.'
    },
    {
      id: 6,
      category: 'features',
      question: 'What is the Pilgrimage Plan feature?',
      answer: 'The Pilgrimage Plan feature helps you plan visits to real locations that appear in anime. You can record places to visit, schedules, notes, and plan efficient anime pilgrimages.'
    },
    {
      id: 7,
      category: 'data',
      question: 'Can I backup my data?',
      answer: 'App data is saved on your device. By logging in with an account, you can keep your data secure.'
    },
    {
      id: 8,
      category: 'trouble',
      question: 'What should I do if the app won\'t start?',
      answer: '1. Completely close and restart the app\n2. Check if iOS is up to date\n3. Check if you have enough storage space\n4. If the problem persists, reinstall the app'
    },
    {
      id: 9,
      category: 'account',
      question: 'How do I delete my account?',
      answer: 'You can log out from the settings screen. If you want to completely delete your account, please contact support.'
    },
    {
      id: 10,
      category: 'features',
      question: 'Where are images saved?',
      answer: 'Character and background images are saved in the app\'s dedicated storage. They are not saved to your device\'s Photos app.'
    }
  ],
  'zh-Hans': [
    {
      id: 1,
      category: 'general',
      question: '什么是AniColle？',
      answer: 'AniColle是一款iOS应用，可以让您管理动漫角色和作品，并计划圣地巡礼之旅。您可以注册喜欢的角色和作品，并计划访问相关地点。'
    },
    {
      id: 2,
      category: 'general',
      question: '这个应用是免费的吗？',
      answer: '前40天免费使用。之后，如果要继续使用需要支付600日元（600积分）。'
    },
    {
      id: 3,
      category: 'payment',
      question: '有哪些支付方式？',
      answer: '您可以通过应用内购买（使用Apple ID注册的支付方式）或应用内购买的积分支付。积分可以提前购买，随时使用。'
    },
    {
      id: 4,
      category: 'features',
      question: '可以注册多少个角色？',
      answer: '注册角色数量没有限制。您可以添加任意数量的喜欢的角色。'
    },
    {
      id: 5,
      category: 'features',
      question: '如何管理动漫作品信息？',
      answer: '动漫作品可以按标题、类别（动作、恋爱、喜剧等）、评分（1-5星）和观看状态进行管理。还提供搜索功能。'
    },
    {
      id: 6,
      category: 'features',
      question: '什么是圣地巡礼计划？',
      answer: '圣地巡礼计划功能帮助您计划访问动漫中出现的真实地点。您可以记录要访问的地点、日程、备注，并计划高效的动漫圣地巡礼。'
    },
    {
      id: 7,
      category: 'data',
      question: '可以备份数据吗？',
      answer: '应用数据保存在您的设备上。通过登录账户，可以安全地保存数据。'
    },
    {
      id: 8,
      category: 'trouble',
      question: '如果应用无法启动该怎么办？',
      answer: '1. 完全关闭并重新启动应用\n2. 检查iOS是否为最新版本\n3. 检查是否有足够的存储空间\n4. 如果问题仍然存在，请重新安装应用'
    },
    {
      id: 9,
      category: 'account',
      question: '如何删除我的账户？',
      answer: '您可以从设置界面退出登录。如果想要完全删除账户，请联系客服。'
    },
    {
      id: 10,
      category: 'features',
      question: '图片保存在哪里？',
      answer: '角色和背景图片保存在应用的专用存储中。不会保存到设备的相册应用中。'
    }
  ],
  ko: [
    {
      id: 1,
      category: 'general',
      question: 'AniColle은 무엇인가요?',
      answer: 'AniColle은 애니메이션 캐릭터와 작품을 관리하고 성지순례를 계획할 수 있는 iOS 앱입니다. 좋아하는 캐릭터와 작품을 등록하고 관련 장소 방문을 계획할 수 있습니다.'
    },
    {
      id: 2,
      category: 'general',
      question: '앱은 무료로 사용할 수 있나요?',
      answer: '처음 40일간은 무료로 이용할 수 있습니다. 그 이후 계속 사용하려면 600엔(600포인트)의 요금이 필요합니다.'
    },
    {
      id: 3,
      category: 'payment',
      question: '어떤 결제 방법이 있나요?',
      answer: '인앱 구매(Apple ID에 등록된 결제 방법) 또는 앱 내에서 구매할 수 있는 포인트로 결제할 수 있습니다. 포인트는 미리 구매해두면 언제든지 사용할 수 있습니다.'
    },
    {
      id: 4,
      category: 'features',
      question: '캐릭터는 몇 명까지 등록할 수 있나요?',
      answer: '캐릭터 등록 수에는 제한이 없습니다. 좋아하는 캐릭터를 원하는 만큼 추가할 수 있습니다.'
    },
    {
      id: 5,
      category: 'features',
      question: '애니메이션 작품 정보는 어떻게 관리할 수 있나요?',
      answer: '애니메이션 작품은 제목, 카테고리(액션, 로맨스, 코미디 등), 평점(1-5점), 시청 상태 등으로 관리할 수 있습니다. 검색 기능도 제공됩니다.'
    },
    {
      id: 6,
      category: 'features',
      question: '성지순례 플랜이란 무엇인가요?',
      answer: '성지순례 플랜은 애니메이션에 나오는 실제 장소를 방문하기 위한 계획 기능입니다. 방문할 장소, 일정, 메모 등을 기록하고 효율적인 성지순례를 계획할 수 있습니다.'
    },
    {
      id: 7,
      category: 'data',
      question: '데이터 백업이 가능한가요?',
      answer: '앱 데이터는 기기에 저장됩니다. 계정으로 로그인하면 데이터를 안전하게 보관할 수 있습니다.'
    },
    {
      id: 8,
      category: 'trouble',
      question: '앱이 실행되지 않을 때는 어떻게 해야 하나요?',
      answer: '1. 앱을 완전히 종료하고 다시 시작하세요\n2. iOS가 최신 버전인지 확인하세요\n3. 저장 공간이 충분한지 확인하세요\n4. 문제가 계속되면 앱을 다시 설치하세요'
    },
    {
      id: 9,
      category: 'account',
      question: '계정을 삭제하려면 어떻게 해야 하나요?',
      answer: '설정 화면에서 로그아웃할 수 있습니다. 계정을 완전히 삭제하려면 고객 지원팀에 문의하세요.'
    },
    {
      id: 10,
      category: 'features',
      question: '이미지는 어디에 저장되나요?',
      answer: '캐릭터와 배경 이미지는 앱 전용 저장소에 저장됩니다. 기기의 사진 앱에는 저장되지 않습니다.'
    }
  ],
  de: [
    {
      id: 1,
      category: 'general',
      question: 'Was ist AniColle?',
      answer: 'AniColle ist eine iOS-App, mit der Sie Anime-Charaktere und -Werke verwalten und Anime-Pilgerreisen planen können. Sie können Ihre Lieblingscharaktere und -werke registrieren und Besuche an verwandten Orten planen.'
    },
    {
      id: 2,
      category: 'general',
      question: 'Ist die App kostenlos?',
      answer: 'Die ersten 40 Tage sind kostenlos. Danach müssen Sie 600 Yen (600 Punkte) bezahlen, um die App weiter zu nutzen.'
    },
    {
      id: 3,
      category: 'payment',
      question: 'Welche Zahlungsmethoden gibt es?',
      answer: 'Sie können per In-App-Kauf (mit bei Ihrer Apple ID registrierten Zahlungsmethoden) oder mit in der App gekauften Punkten bezahlen. Punkte können im Voraus gekauft und jederzeit verwendet werden.'
    },
    {
      id: 4,
      category: 'features',
      question: 'Wie viele Charaktere kann ich registrieren?',
      answer: 'Es gibt keine Begrenzung für die Anzahl der Charaktere, die Sie registrieren können. Fügen Sie so viele Lieblingscharaktere hinzu, wie Sie möchten.'
    },
    {
      id: 5,
      category: 'features',
      question: 'Wie kann ich Anime-Werke verwalten?',
      answer: 'Anime-Werke können nach Titel, Kategorie (Action, Romanze, Comedy usw.), Bewertung (1-5 Sterne) und Ansichtsstatus verwaltet werden. Eine Suchfunktion ist ebenfalls verfügbar.'
    },
    {
      id: 6,
      category: 'features',
      question: 'Was ist die Pilgerreise-Planungsfunktion?',
      answer: 'Die Pilgerreise-Planungsfunktion hilft Ihnen, Besuche an realen Orten zu planen, die in Anime vorkommen. Sie können Orte, Zeitpläne und Notizen aufzeichnen und effiziente Anime-Pilgerreisen planen.'
    },
    {
      id: 7,
      category: 'data',
      question: 'Kann ich meine Daten sichern?',
      answer: 'App-Daten werden auf Ihrem Gerät gespeichert. Durch die Anmeldung mit einem Konto können Sie Ihre Daten sicher aufbewahren.'
    },
    {
      id: 8,
      category: 'trouble',
      question: 'Was soll ich tun, wenn die App nicht startet?',
      answer: '1. Schließen Sie die App vollständig und starten Sie sie neu\n2. Überprüfen Sie, ob iOS auf dem neuesten Stand ist\n3. Überprüfen Sie, ob genügend Speicherplatz vorhanden ist\n4. Wenn das Problem weiterhin besteht, installieren Sie die App neu'
    },
    {
      id: 9,
      category: 'account',
      question: 'Wie lösche ich mein Konto?',
      answer: 'Sie können sich über den Einstellungsbildschirm abmelden. Wenn Sie Ihr Konto vollständig löschen möchten, kontaktieren Sie bitte den Support.'
    },
    {
      id: 10,
      category: 'features',
      question: 'Wo werden Bilder gespeichert?',
      answer: 'Charakter- und Hintergrundbilder werden im dedizierten Speicher der App gespeichert. Sie werden nicht in der Fotos-App Ihres Geräts gespeichert.'
    }
  ],
  es: [
    {
      id: 1,
      category: 'general',
      question: '¿Qué es AniColle?',
      answer: 'AniColle es una aplicación iOS que te permite gestionar personajes y obras de anime, y planificar viajes de peregrinación anime. Puedes registrar tus personajes y obras favoritas, y planificar visitas a lugares relacionados.'
    },
    {
      id: 2,
      category: 'general',
      question: '¿La aplicación es gratuita?',
      answer: 'Los primeros 40 días son gratuitos. Después, necesitarás pagar 600 yenes (600 puntos) para continuar usando la aplicación.'
    },
    {
      id: 3,
      category: 'payment',
      question: '¿Qué métodos de pago están disponibles?',
      answer: 'Puedes pagar mediante compra dentro de la aplicación (usando métodos de pago registrados en tu Apple ID) o con puntos comprados dentro de la aplicación. Los puntos se pueden comprar por adelantado para usar en cualquier momento.'
    },
    {
      id: 4,
      category: 'features',
      question: '¿Cuántos personajes puedo registrar?',
      answer: 'No hay límite en el número de personajes que puedes registrar. Añade tantos personajes favoritos como quieras.'
    },
    {
      id: 5,
      category: 'features',
      question: '¿Cómo puedo gestionar la información de obras de anime?',
      answer: 'Las obras de anime se pueden gestionar por título, categoría (acción, romance, comedia, etc.), calificación (1-5 estrellas) y estado de visualización. También hay una función de búsqueda disponible.'
    },
    {
      id: 6,
      category: 'features',
      question: '¿Qué es la función Plan de Peregrinación?',
      answer: 'La función Plan de Peregrinación te ayuda a planificar visitas a lugares reales que aparecen en el anime. Puedes registrar lugares para visitar, horarios, notas y planificar peregrinaciones anime eficientes.'
    },
    {
      id: 7,
      category: 'data',
      question: '¿Puedo hacer copias de seguridad de mis datos?',
      answer: 'Los datos de la aplicación se guardan en tu dispositivo. Al iniciar sesión con una cuenta, puedes mantener tus datos seguros.'
    },
    {
      id: 8,
      category: 'trouble',
      question: '¿Qué debo hacer si la aplicación no se inicia?',
      answer: '1. Cierra completamente y reinicia la aplicación\n2. Verifica si iOS está actualizado\n3. Verifica si tienes suficiente espacio de almacenamiento\n4. Si el problema persiste, reinstala la aplicación'
    },
    {
      id: 9,
      category: 'account',
      question: '¿Cómo elimino mi cuenta?',
      answer: 'Puedes cerrar sesión desde la pantalla de configuración. Si deseas eliminar completamente tu cuenta, contacta con soporte.'
    },
    {
      id: 10,
      category: 'features',
      question: '¿Dónde se guardan las imágenes?',
      answer: 'Las imágenes de personajes y fondos se guardan en el almacenamiento dedicado de la aplicación. No se guardan en la aplicación Fotos de tu dispositivo.'
    }
  ],
  fr: [
    {
      id: 1,
      category: 'general',
      question: 'Qu\'est-ce qu\'AniColle ?',
      answer: 'AniColle est une application iOS qui vous permet de gérer des personnages et des œuvres d\'anime, et de planifier des pèlerinages anime. Vous pouvez enregistrer vos personnages et œuvres préférés, et planifier des visites aux lieux associés.'
    },
    {
      id: 2,
      category: 'general',
      question: 'L\'application est-elle gratuite ?',
      answer: 'Les 40 premiers jours sont gratuits. Après cela, vous devrez payer 600 yens (600 points) pour continuer à utiliser l\'application.'
    },
    {
      id: 3,
      category: 'payment',
      question: 'Quels sont les moyens de paiement disponibles ?',
      answer: 'Vous pouvez payer par achat intégré (en utilisant les méthodes de paiement enregistrées sur votre Apple ID) ou avec des points achetés dans l\'application. Les points peuvent être achetés à l\'avance pour une utilisation à tout moment.'
    },
    {
      id: 4,
      category: 'features',
      question: 'Combien de personnages puis-je enregistrer ?',
      answer: 'Il n\'y a pas de limite au nombre de personnages que vous pouvez enregistrer. Ajoutez autant de personnages favoris que vous le souhaitez.'
    },
    {
      id: 5,
      category: 'features',
      question: 'Comment puis-je gérer les informations sur les œuvres d\'anime ?',
      answer: 'Les œuvres d\'anime peuvent être gérées par titre, catégorie (action, romance, comédie, etc.), évaluation (1-5 étoiles) et statut de visionnage. Une fonction de recherche est également disponible.'
    },
    {
      id: 6,
      category: 'features',
      question: 'Qu\'est-ce que la fonction Plan de Pèlerinage ?',
      answer: 'La fonction Plan de Pèlerinage vous aide à planifier des visites dans des lieux réels qui apparaissent dans les anime. Vous pouvez enregistrer des lieux à visiter, des horaires, des notes et planifier des pèlerinages anime efficaces.'
    },
    {
      id: 7,
      category: 'data',
      question: 'Puis-je sauvegarder mes données ?',
      answer: 'Les données de l\'application sont enregistrées sur votre appareil. En vous connectant avec un compte, vous pouvez conserver vos données en toute sécurité.'
    },
    {
      id: 8,
      category: 'trouble',
      question: 'Que dois-je faire si l\'application ne démarre pas ?',
      answer: '1. Fermez complètement et redémarrez l\'application\n2. Vérifiez si iOS est à jour\n3. Vérifiez si vous avez suffisamment d\'espace de stockage\n4. Si le problème persiste, réinstallez l\'application'
    },
    {
      id: 9,
      category: 'account',
      question: 'Comment supprimer mon compte ?',
      answer: 'Vous pouvez vous déconnecter depuis l\'écran des paramètres. Si vous souhaitez supprimer complètement votre compte, veuillez contacter le support.'
    },
    {
      id: 10,
      category: 'features',
      question: 'Où les images sont-elles enregistrées ?',
      answer: 'Les images de personnages et d\'arrière-plan sont enregistrées dans le stockage dédié de l\'application. Elles ne sont pas enregistrées dans l\'application Photos de votre appareil.'
    }
  ],
  it: [
    {
      id: 1,
      category: 'general',
      question: 'Cos\'è AniColle?',
      answer: 'AniColle è un\'app iOS che ti permette di gestire personaggi e opere anime, e pianificare pellegrinaggi anime. Puoi registrare i tuoi personaggi e opere preferiti, e pianificare visite ai luoghi correlati.'
    },
    {
      id: 2,
      category: 'general',
      question: 'L\'app è gratuita?',
      answer: 'I primi 40 giorni sono gratuiti. Dopo, dovrai pagare 600 yen (600 punti) per continuare a usare l\'app.'
    },
    {
      id: 3,
      category: 'payment',
      question: 'Quali metodi di pagamento sono disponibili?',
      answer: 'Puoi pagare tramite acquisto in-app (usando i metodi di pagamento registrati sul tuo Apple ID) o con punti acquistati nell\'app. I punti possono essere acquistati in anticipo per l\'uso in qualsiasi momento.'
    },
    {
      id: 4,
      category: 'features',
      question: 'Quanti personaggi posso registrare?',
      answer: 'Non c\'è limite al numero di personaggi che puoi registrare. Aggiungi tutti i personaggi preferiti che vuoi.'
    },
    {
      id: 5,
      category: 'features',
      question: 'Come posso gestire le informazioni sulle opere anime?',
      answer: 'Le opere anime possono essere gestite per titolo, categoria (azione, romance, commedia, ecc.), valutazione (1-5 stelle) e stato di visione. È disponibile anche una funzione di ricerca.'
    },
    {
      id: 6,
      category: 'features',
      question: 'Cos\'è la funzione Piano di Pellegrinaggio?',
      answer: 'La funzione Piano di Pellegrinaggio ti aiuta a pianificare visite a luoghi reali che appaiono negli anime. Puoi registrare luoghi da visitare, orari, note e pianificare pellegrinaggi anime efficienti.'
    },
    {
      id: 7,
      category: 'data',
      question: 'Posso fare il backup dei miei dati?',
      answer: 'I dati dell\'app sono salvati sul tuo dispositivo. Accedendo con un account, puoi mantenere i tuoi dati al sicuro.'
    },
    {
      id: 8,
      category: 'trouble',
      question: 'Cosa devo fare se l\'app non si avvia?',
      answer: '1. Chiudi completamente e riavvia l\'app\n2. Controlla se iOS è aggiornato\n3. Controlla se hai abbastanza spazio di archiviazione\n4. Se il problema persiste, reinstalla l\'app'
    },
    {
      id: 9,
      category: 'account',
      question: 'Come elimino il mio account?',
      answer: 'Puoi disconnetterti dalla schermata delle impostazioni. Se vuoi eliminare completamente il tuo account, contatta il supporto.'
    },
    {
      id: 10,
      category: 'features',
      question: 'Dove vengono salvate le immagini?',
      answer: 'Le immagini di personaggi e sfondi sono salvate nell\'archivio dedicato dell\'app. Non sono salvate nell\'app Foto del tuo dispositivo.'
    }
  ],
  pt: [
    {
      id: 1,
      category: 'general',
      question: 'O que é AniColle?',
      answer: 'AniColle é um aplicativo iOS que permite gerenciar personagens e obras de anime, e planejar peregrinações de anime. Você pode registrar seus personagens e obras favoritos, e planejar visitas a locais relacionados.'
    },
    {
      id: 2,
      category: 'general',
      question: 'O aplicativo é gratuito?',
      answer: 'Os primeiros 40 dias são gratuitos. Depois disso, você precisará pagar 600 ienes (600 pontos) para continuar usando o aplicativo.'
    },
    {
      id: 3,
      category: 'payment',
      question: 'Quais métodos de pagamento estão disponíveis?',
      answer: 'Você pode pagar através de compra no aplicativo (usando métodos de pagamento registrados no seu Apple ID) ou com pontos comprados dentro do aplicativo. Os pontos podem ser comprados antecipadamente para uso a qualquer momento.'
    },
    {
      id: 4,
      category: 'features',
      question: 'Quantos personagens posso registrar?',
      answer: 'Não há limite para o número de personagens que você pode registrar. Adicione quantos personagens favoritos quiser.'
    },
    {
      id: 5,
      category: 'features',
      question: 'Como posso gerenciar informações de obras de anime?',
      answer: 'As obras de anime podem ser gerenciadas por título, categoria (ação, romance, comédia, etc.), classificação (1-5 estrelas) e status de visualização. Uma função de pesquisa também está disponível.'
    },
    {
      id: 6,
      category: 'features',
      question: 'O que é o recurso Plano de Peregrinação?',
      answer: 'O recurso Plano de Peregrinação ajuda você a planejar visitas a locais reais que aparecem em anime. Você pode registrar lugares para visitar, horários, notas e planejar peregrinações de anime eficientes.'
    },
    {
      id: 7,
      category: 'data',
      question: 'Posso fazer backup dos meus dados?',
      answer: 'Os dados do aplicativo são salvos no seu dispositivo. Ao fazer login com uma conta, você pode manter seus dados seguros.'
    },
    {
      id: 8,
      category: 'trouble',
      question: 'O que devo fazer se o aplicativo não iniciar?',
      answer: '1. Feche completamente e reinicie o aplicativo\n2. Verifique se o iOS está atualizado\n3. Verifique se você tem espaço de armazenamento suficiente\n4. Se o problema persistir, reinstale o aplicativo'
    },
    {
      id: 9,
      category: 'account',
      question: 'Como excluo minha conta?',
      answer: 'Você pode sair da tela de configurações. Se quiser excluir completamente sua conta, entre em contato com o suporte.'
    },
    {
      id: 10,
      category: 'features',
      question: 'Onde as imagens são salvas?',
      answer: 'Imagens de personagens e fundos são salvas no armazenamento dedicado do aplicativo. Elas não são salvas no aplicativo Fotos do seu dispositivo.'
    }
  ]
};

// 言語ごとのコンタクト情報
const contactInfo = {
  ja: { email: 'koyasutsubame529@gmail.com', hours: '平日 9:00-18:00' },
  en: { email: 'koyasutsubame529@gmail.com', hours: 'Weekdays 9:00-18:00 JST' },
  'zh-Hans': { email: 'koyasutsubame529@gmail.com', hours: '工作日 9:00-18:00 JST' },
  ko: { email: 'koyasutsubame529@gmail.com', hours: '평일 9:00-18:00 JST' },
  de: { email: 'koyasutsubame529@gmail.com', hours: 'Werktags 9:00-18:00 JST' },
  es: { email: 'koyasutsubame529@gmail.com', hours: 'Días laborables 9:00-18:00 JST' },
  fr: { email: 'koyasutsubame529@gmail.com', hours: 'Jours ouvrables 9h00-18h00 JST' },
  it: { email: 'koyasutsubame529@gmail.com', hours: 'Giorni feriali 9:00-18:00 JST' },
  pt: { email: 'koyasutsubame529@gmail.com', hours: 'Dias úteis 9:00-18:00 JST' }
};

// API Routes
app.get('/api/faq', (req, res) => {
  const lang = req.query.lang || 'ja';
  res.json(faqData[lang] || faqData.ja);
});

app.get('/api/faq/:category', (req, res) => {
  const { category } = req.params;
  const lang = req.query.lang || 'ja';
  const faqs = (faqData[lang] || faqData.ja).filter(faq => faq.category === category);
  res.json(faqs);
});

app.get('/api/contact', (req, res) => {
  const lang = req.query.lang || 'ja';
  res.json(contactInfo[lang] || contactInfo.ja);
});

// For Vercel serverless function
module.exports = app;