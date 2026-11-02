void (async () => {
    "use strict";

    const LOCK = "__gamePresence";
    const STORAGE_KEY = "game-presence-v2";

    if (window[LOCK]?.stop) {
        window[LOCK].stop();
    }

    let cancelledWhileLoading = false;
    const loadingLock = { loading: true, stop: () => { cancelledWhileLoading = true; } };
    window[LOCK] = loadingLock;

    const normalizeUiLocale = locale => String(locale || "en").toLowerCase().replace(/_/g, "-");
    const DEFAULT_UI_LOCALE = "en";
    let UI_LOCALE = normalizeUiLocale(
        navigator.languages?.[0] || navigator.language || DEFAULT_UI_LOCALE
    );

    const UI_TEXT = {
        en: {
            desktopRequiredTitle: "Discord Desktop Required",
            desktopRequiredBody: "This script must be run in the Discord Desktop client through its DevTools. The browser version does not provide the required modules.",
            close: "Close",
            showGamePresence: "Show Game Presence",
            chooseMode: "Choose a mode",
            chooseModeSubtitle: "Choose how the script should send game activity to Discord.",
            chooseModeBadge: "Choose mode",
            settings: "Settings",
            minimize: "Minimize",
            stop: "Stop",
            hoursPerGame: "Hours / game",
            games: "Games",
            all: "All",
            perRequest: "Per request",
            totalHours: "Total hours",
            requests: "Requests",
            estimatedTime: "Est. time",
            batchClaimProgress: "Batch claim progress",
            claim: "Claim",
            stopping: "Stopping…",
            claiming: "Claiming… click to stop",
            stopped: "Stopped · {count} games",
            done: "Done · {count} games",
            failed: "Failed{status} · see console",
            seconds: "{count}s",
            minutes: "{count} min"
        },
        fr: {
            desktopRequiredTitle: "Discord Desktop requis",
            desktopRequiredBody: "Ce script doit être exécuté dans le client Discord Desktop via ses DevTools. La version navigateur ne fournit pas les modules nécessaires.",
            close: "Fermer",
            showGamePresence: "Afficher Game Presence",
            chooseMode: "Choisir un mode",
            chooseModeSubtitle: "Choisissez comment le script doit envoyer l’activité de jeu à Discord.",
            chooseModeBadge: "Choisir un mode",
            settings: "Paramètres",
            minimize: "Réduire",
            stop: "Arrêter",
            hoursPerGame: "Heures / jeu",
            games: "Jeux",
            all: "Tous",
            perRequest: "Par requête",
            totalHours: "Heures totales",
            requests: "Requêtes",
            estimatedTime: "Temps estimé",
            batchClaimProgress: "Progression du batch claim",
            claim: "Claim",
            stopping: "Arrêt…",
            claiming: "Claim en cours… cliquez pour arrêter",
            stopped: "Arrêté · {count} jeux",
            done: "Terminé · {count} jeux",
            failed: "Échec{status} · voir la console",
            seconds: "{count}s",
            minutes: "{count} min"
        }
    };

    const withEnglish = overrides => ({ ...UI_TEXT.en, ...overrides });
    Object.assign(UI_TEXT, {
        es: withEnglish({
            desktopRequiredTitle: "Se requiere Discord Desktop",
            desktopRequiredBody: "Este script debe ejecutarse en el cliente Discord Desktop mediante sus DevTools. La versión del navegador no proporciona los módulos necesarios.",
            close: "Cerrar",
            showGamePresence: "Mostrar Game Presence",
            chooseMode: "Elige un modo",
            chooseModeSubtitle: "Elige cómo debe enviar el script la actividad del juego a Discord.",
            chooseModeBadge: "Elegir modo",
            settings: "Ajustes",
            minimize: "Minimizar",
            stop: "Detener",
            hoursPerGame: "Horas / juego",
            games: "Juegos",
            all: "Todos",
            perRequest: "Por solicitud",
            totalHours: "Horas totales",
            requests: "Solicitudes",
            estimatedTime: "Tiempo est.",
            batchClaimProgress: "Progreso del batch claim",
            claim: "Claim",
            stopping: "Deteniendo…",
            claiming: "Reclamando… haz clic para detener",
            stopped: "Detenido · {count} juegos",
            done: "Listo · {count} juegos",
            failed: "Error{status} · revisa la consola",
            seconds: "{count}s",
            minutes: "{count} min"
        }),
        pt: withEnglish({
            desktopRequiredTitle: "Discord Desktop necessário",
            desktopRequiredBody: "Este script tem de ser executado no cliente Discord Desktop através das DevTools. A versão do navegador não fornece os módulos necessários.",
            close: "Fechar",
            showGamePresence: "Mostrar Game Presence",
            chooseMode: "Escolher um modo",
            chooseModeSubtitle: "Escolha como o script deve enviar a atividade do jogo para o Discord.",
            chooseModeBadge: "Escolher modo",
            settings: "Definições",
            minimize: "Minimizar",
            stop: "Parar",
            hoursPerGame: "Horas / jogo",
            games: "Jogos",
            all: "Todos",
            perRequest: "Por pedido",
            totalHours: "Horas totais",
            requests: "Pedidos",
            estimatedTime: "Tempo estimado",
            batchClaimProgress: "Progresso do batch claim",
            claim: "Claim",
            stopping: "A parar…",
            claiming: "A fazer claim… clique para parar",
            stopped: "Parado · {count} jogos",
            done: "Concluído · {count} jogos",
            failed: "Falhou{status} · consulte a consola",
            seconds: "{count}s",
            minutes: "{count} min"
        }),
        "pt-br": withEnglish({
            desktopRequiredTitle: "Discord Desktop necessário",
            desktopRequiredBody: "Este script precisa ser executado no cliente Discord Desktop pelas DevTools. A versão do navegador não fornece os módulos necessários.",
            close: "Fechar",
            showGamePresence: "Mostrar Game Presence",
            chooseMode: "Escolha um modo",
            chooseModeSubtitle: "Escolha como o script deve enviar a atividade do jogo para o Discord.",
            chooseModeBadge: "Escolher modo",
            settings: "Configurações",
            minimize: "Minimizar",
            stop: "Parar",
            hoursPerGame: "Horas / jogo",
            games: "Jogos",
            all: "Todos",
            perRequest: "Por requisição",
            totalHours: "Horas totais",
            requests: "Requisições",
            estimatedTime: "Tempo est.",
            batchClaimProgress: "Progresso do batch claim",
            claim: "Claim",
            stopping: "Parando…",
            claiming: "Fazendo claim… clique para parar",
            stopped: "Parado · {count} jogos",
            done: "Concluído · {count} jogos",
            failed: "Falhou{status} · veja o console",
            seconds: "{count}s",
            minutes: "{count} min"
        }),
        de: withEnglish({
            desktopRequiredTitle: "Discord Desktop erforderlich",
            desktopRequiredBody: "Dieses Skript muss über die DevTools im Discord-Desktop-Client ausgeführt werden. Die Browserversion stellt die benötigten Module nicht bereit.",
            close: "Schließen",
            showGamePresence: "Game Presence anzeigen",
            chooseMode: "Modus auswählen",
            chooseModeSubtitle: "Wähle, wie das Skript die Spielaktivität an Discord senden soll.",
            chooseModeBadge: "Modus auswählen",
            settings: "Einstellungen",
            minimize: "Minimieren",
            stop: "Stopp",
            hoursPerGame: "Stunden / Spiel",
            games: "Spiele",
            all: "Alle",
            perRequest: "Pro Anfrage",
            totalHours: "Gesamtstunden",
            requests: "Anfragen",
            estimatedTime: "Geschätzte Zeit",
            batchClaimProgress: "Batch-Claim-Fortschritt",
            claim: "Claim",
            stopping: "Wird gestoppt…",
            claiming: "Claim läuft… zum Stoppen klicken",
            stopped: "Gestoppt · {count} Spiele",
            done: "Fertig · {count} Spiele",
            failed: "Fehler{status} · Konsole prüfen",
            seconds: "{count} Sek.",
            minutes: "{count} Min."
        }),
        it: withEnglish({
            desktopRequiredTitle: "Discord Desktop richiesto",
            desktopRequiredBody: "Questo script deve essere eseguito nel client Discord Desktop tramite i DevTools. La versione del browser non fornisce i moduli necessari.",
            close: "Chiudi",
            showGamePresence: "Mostra Game Presence",
            chooseMode: "Scegli una modalità",
            chooseModeSubtitle: "Scegli come lo script deve inviare l'attività di gioco a Discord.",
            chooseModeBadge: "Scegli modalità",
            settings: "Impostazioni",
            minimize: "Riduci",
            stop: "Ferma",
            hoursPerGame: "Ore / gioco",
            games: "Giochi",
            all: "Tutti",
            perRequest: "Per richiesta",
            totalHours: "Ore totali",
            requests: "Richieste",
            estimatedTime: "Tempo stimato",
            batchClaimProgress: "Avanzamento del batch claim",
            claim: "Claim",
            stopping: "Arresto…",
            claiming: "Claim in corso… fai clic per fermare",
            stopped: "Fermato · {count} giochi",
            done: "Fatto · {count} giochi",
            failed: "Errore{status} · controlla la console",
            seconds: "{count}s",
            minutes: "{count} min"
        }),
        nl: withEnglish({
            desktopRequiredTitle: "Discord Desktop vereist",
            desktopRequiredBody: "Dit script moet via de DevTools in de Discord Desktop-client worden uitgevoerd. De browserversie levert de benodigde modules niet.",
            close: "Sluiten",
            showGamePresence: "Game Presence tonen",
            chooseMode: "Kies een modus",
            chooseModeSubtitle: "Kies hoe het script game-activiteit naar Discord moet sturen.",
            chooseModeBadge: "Modus kiezen",
            settings: "Instellingen",
            minimize: "Minimaliseren",
            stop: "Stoppen",
            hoursPerGame: "Uren / game",
            games: "Games",
            all: "Alle",
            perRequest: "Per verzoek",
            totalHours: "Totale uren",
            requests: "Verzoeken",
            estimatedTime: "Geschatte tijd",
            batchClaimProgress: "Voortgang van batch claim",
            claim: "Claim",
            stopping: "Stoppen…",
            claiming: "Claimen… klik om te stoppen",
            stopped: "Gestopt · {count} games",
            done: "Klaar · {count} games",
            failed: "Mislukt{status} · controleer de console",
            seconds: "{count}s",
            minutes: "{count} min"
        }),
        ru: withEnglish({
            desktopRequiredTitle: "Требуется Discord Desktop",
            desktopRequiredBody: "Скрипт нужно запускать в клиенте Discord Desktop через DevTools. Версия в браузере не предоставляет необходимые модули.",
            close: "Закрыть",
            showGamePresence: "Показать Game Presence",
            chooseMode: "Выберите режим",
            chooseModeSubtitle: "Выберите, как скрипт будет отправлять игровую активность в Discord.",
            chooseModeBadge: "Выбрать режим",
            settings: "Настройки",
            minimize: "Свернуть",
            stop: "Остановить",
            hoursPerGame: "Часов / игра",
            games: "Игры",
            all: "Все",
            perRequest: "За запрос",
            totalHours: "Всего часов",
            requests: "Запросы",
            estimatedTime: "Примерное время",
            batchClaimProgress: "Прогресс batch claim",
            claim: "Claim",
            stopping: "Остановка…",
            claiming: "Выполняется claim… нажмите для остановки",
            stopped: "Остановлено · игр: {count}",
            done: "Готово · игр: {count}",
            failed: "Ошибка{status} · см. консоль",
            seconds: "{count} сек",
            minutes: "{count} мин"
        }),
        ja: withEnglish({
            desktopRequiredTitle: "Discord デスクトップ版が必要です",
            desktopRequiredBody: "このスクリプトは Discord デスクトップ版の DevTools から実行してください。ブラウザ版には必要なモジュールがありません。",
            close: "閉じる",
            showGamePresence: "Game Presence を表示",
            chooseMode: "モードを選択",
            chooseModeSubtitle: "ゲームアクティビティを Discord に送信する方法を選択してください。",
            chooseModeBadge: "モードを選択",
            settings: "設定",
            minimize: "最小化",
            stop: "停止",
            hoursPerGame: "ゲームごとの時間",
            games: "ゲーム",
            all: "すべて",
            perRequest: "リクエストごと",
            totalHours: "合計時間",
            requests: "リクエスト",
            estimatedTime: "推定時間",
            batchClaimProgress: "Batch Claim の進行状況",
            claim: "Claim",
            stopping: "停止中…",
            claiming: "Claim 中…停止するにはクリック",
            stopped: "停止しました · {count} ゲーム",
            done: "完了 · {count} ゲーム",
            failed: "失敗{status} · コンソールを確認してください",
            seconds: "{count}秒",
            minutes: "{count}分"
        }),
        ko: withEnglish({
            desktopRequiredTitle: "Discord 데스크톱이 필요합니다",
            desktopRequiredBody: "이 스크립트는 Discord 데스크톱 클라이언트의 DevTools에서 실행해야 합니다. 브라우저 버전에는 필요한 모듈이 없습니다.",
            close: "닫기",
            showGamePresence: "Game Presence 표시",
            chooseMode: "모드 선택",
            chooseModeSubtitle: "게임 활동을 Discord에 전송할 방식을 선택하세요.",
            chooseModeBadge: "모드 선택",
            settings: "설정",
            minimize: "최소화",
            stop: "중지",
            hoursPerGame: "게임당 시간",
            games: "게임",
            all: "전체",
            perRequest: "요청당",
            totalHours: "총 시간",
            requests: "요청",
            estimatedTime: "예상 시간",
            batchClaimProgress: "Batch Claim 진행률",
            claim: "Claim",
            stopping: "중지 중…",
            claiming: "Claim 중… 중지하려면 클릭",
            stopped: "중지됨 · {count}개 게임",
            done: "완료 · {count}개 게임",
            failed: "실패{status} · 콘솔을 확인하세요",
            seconds: "{count}초",
            minutes: "{count}분"
        }),
        "zh-cn": withEnglish({
            desktopRequiredTitle: "需要 Discord 桌面版",
            desktopRequiredBody: "此脚本必须通过 DevTools 在 Discord 桌面客户端中运行。浏览器版本不提供所需模块。",
            close: "关闭",
            showGamePresence: "显示 Game Presence",
            chooseMode: "选择模式",
            chooseModeSubtitle: "选择脚本向 Discord 发送游戏活动的方式。",
            chooseModeBadge: "选择模式",
            settings: "设置",
            minimize: "最小化",
            stop: "停止",
            hoursPerGame: "每个游戏的小时数",
            games: "游戏",
            all: "全部",
            perRequest: "每次请求",
            totalHours: "总小时数",
            requests: "请求数",
            estimatedTime: "预计时间",
            batchClaimProgress: "Batch Claim 进度",
            claim: "Claim",
            stopping: "正在停止…",
            claiming: "正在 Claim… 点击停止",
            stopped: "已停止 · {count} 个游戏",
            done: "完成 · {count} 个游戏",
            failed: "失败{status} · 请查看控制台",
            seconds: "{count}秒",
            minutes: "{count}分钟"
        }),
        "zh-tw": withEnglish({
            desktopRequiredTitle: "需要 Discord 桌面版",
            desktopRequiredBody: "此腳本必須透過 DevTools 在 Discord 桌面用戶端中執行。瀏覽器版本不提供所需模組。",
            close: "關閉",
            showGamePresence: "顯示 Game Presence",
            chooseMode: "選擇模式",
            chooseModeSubtitle: "選擇腳本將遊戲活動傳送到 Discord 的方式。",
            chooseModeBadge: "選擇模式",
            settings: "設定",
            minimize: "最小化",
            stop: "停止",
            hoursPerGame: "每個遊戲的小時數",
            games: "遊戲",
            all: "全部",
            perRequest: "每次請求",
            totalHours: "總小時數",
            requests: "請求數",
            estimatedTime: "預估時間",
            batchClaimProgress: "Batch Claim 進度",
            claim: "Claim",
            stopping: "正在停止…",
            claiming: "正在 Claim… 點擊停止",
            stopped: "已停止 · {count} 個遊戲",
            done: "完成 · {count} 個遊戲",
            failed: "失敗{status} · 請查看主控台",
            seconds: "{count}秒",
            minutes: "{count}分鐘"
        }),
        tr: withEnglish({
            desktopRequiredTitle: "Discord Desktop gerekli",
            desktopRequiredBody: "Bu script, DevTools üzerinden Discord Desktop istemcisinde çalıştırılmalıdır. Tarayıcı sürümü gerekli modülleri sağlamaz.",
            close: "Kapat",
            showGamePresence: "Game Presence göster",
            chooseMode: "Bir mod seç",
            chooseModeSubtitle: "Scriptin oyun etkinliğini Discord'a nasıl göndereceğini seç.",
            chooseModeBadge: "Mod seç",
            settings: "Ayarlar",
            minimize: "Küçült",
            stop: "Durdur",
            hoursPerGame: "Oyun başına saat",
            games: "Oyunlar",
            all: "Tümü",
            perRequest: "İstek başına",
            totalHours: "Toplam saat",
            requests: "İstekler",
            estimatedTime: "Tahmini süre",
            batchClaimProgress: "Batch claim ilerlemesi",
            claim: "Claim",
            stopping: "Durduruluyor…",
            claiming: "Claim yapılıyor… durdurmak için tıkla",
            stopped: "Durduruldu · {count} oyun",
            done: "Tamamlandı · {count} oyun",
            failed: "Başarısız{status} · konsolu kontrol et",
            seconds: "{count} sn",
            minutes: "{count} dk"
        }),
        hi: withEnglish({
            desktopRequiredTitle: "Discord Desktop आवश्यक है",
            desktopRequiredBody: "यह स्क्रिप्ट Discord Desktop क्लाइंट में DevTools के माध्यम से चलानी होगी। ब्राउज़र संस्करण आवश्यक मॉड्यूल उपलब्ध नहीं कराता।",
            close: "बंद करें",
            showGamePresence: "Game Presence दिखाएँ",
            chooseMode: "मोड चुनें",
            chooseModeSubtitle: "चुनें कि स्क्रिप्ट Discord को गेम गतिविधि कैसे भेजे।",
            chooseModeBadge: "मोड चुनें",
            settings: "सेटिंग्स",
            minimize: "छोटा करें",
            stop: "रोकें",
            hoursPerGame: "प्रति गेम घंटे",
            games: "गेम",
            all: "सभी",
            perRequest: "प्रति अनुरोध",
            totalHours: "कुल घंटे",
            requests: "अनुरोध",
            estimatedTime: "अनुमानित समय",
            batchClaimProgress: "Batch Claim प्रगति",
            claim: "Claim",
            stopping: "रोका जा रहा है…",
            claiming: "Claim हो रहा है… रोकने के लिए क्लिक करें",
            stopped: "रोक दिया गया · {count} गेम",
            done: "पूरा हुआ · {count} गेम",
            failed: "विफल{status} · कंसोल देखें",
            seconds: "{count} सेकंड",
            minutes: "{count} मिनट"
        }),
        pl: withEnglish({
            desktopRequiredTitle: "Wymagany Discord Desktop",
            desktopRequiredBody: "Ten skrypt musi być uruchomiony w kliencie Discord Desktop przez DevTools. Wersja przeglądarkowa nie udostępnia wymaganych modułów.",
            close: "Zamknij",
            showGamePresence: "Pokaż Game Presence",
            chooseMode: "Wybierz tryb",
            chooseModeSubtitle: "Wybierz, jak skrypt ma wysyłać aktywność gry do Discorda.",
            chooseModeBadge: "Wybierz tryb",
            settings: "Ustawienia",
            minimize: "Minimalizuj",
            stop: "Zatrzymaj",
            hoursPerGame: "Godziny / gra",
            games: "Gry",
            all: "Wszystkie",
            perRequest: "Na żądanie",
            totalHours: "Łączna liczba godzin",
            requests: "Żądania",
            estimatedTime: "Szacowany czas",
            batchClaimProgress: "Postęp batch claim",
            claim: "Claim",
            stopping: "Zatrzymywanie…",
            claiming: "Trwa claim… kliknij, aby zatrzymać",
            stopped: "Zatrzymano · {count} gier",
            done: "Gotowe · {count} gier",
            failed: "Błąd{status} · sprawdź konsolę",
            seconds: "{count} sek.",
            minutes: "{count} min"
        }),
        uk: withEnglish({
            desktopRequiredTitle: "Потрібен Discord Desktop",
            desktopRequiredBody: "Цей скрипт потрібно запускати в клієнті Discord Desktop через DevTools. Версія в браузері не надає необхідних модулів.",
            close: "Закрити",
            showGamePresence: "Показати Game Presence",
            chooseMode: "Виберіть режим",
            chooseModeSubtitle: "Виберіть, як скрипт надсилатиме ігрову активність у Discord.",
            chooseModeBadge: "Вибрати режим",
            settings: "Налаштування",
            minimize: "Згорнути",
            stop: "Зупинити",
            hoursPerGame: "Годин / гра",
            games: "Ігри",
            all: "Усі",
            perRequest: "За запит",
            totalHours: "Усього годин",
            requests: "Запити",
            estimatedTime: "Орієнтовний час",
            batchClaimProgress: "Прогрес batch claim",
            claim: "Claim",
            stopping: "Зупинка…",
            claiming: "Виконується claim… натисніть для зупинки",
            stopped: "Зупинено · {count} ігор",
            done: "Готово · {count} ігор",
            failed: "Помилка{status} · див. консоль",
            seconds: "{count} с",
            minutes: "{count} хв"
        }),
        ar: withEnglish({
            desktopRequiredTitle: "يلزم Discord Desktop",
            desktopRequiredBody: "يجب تشغيل هذا السكربت في عميل Discord Desktop عبر DevTools. إصدار المتصفح لا يوفر الوحدات المطلوبة.",
            close: "إغلاق",
            showGamePresence: "إظهار Game Presence",
            chooseMode: "اختر الوضع",
            chooseModeSubtitle: "اختر طريقة إرسال نشاط اللعبة إلى Discord.",
            chooseModeBadge: "اختر الوضع",
            settings: "الإعدادات",
            minimize: "تصغير",
            stop: "إيقاف",
            hoursPerGame: "الساعات / اللعبة",
            games: "الألعاب",
            all: "الكل",
            perRequest: "لكل طلب",
            totalHours: "إجمالي الساعات",
            requests: "الطلبات",
            estimatedTime: "الوقت المقدّر",
            batchClaimProgress: "تقدم Batch Claim",
            claim: "Claim",
            stopping: "جارٍ الإيقاف…",
            claiming: "جارٍ تنفيذ Claim… اضغط للإيقاف",
            stopped: "تم الإيقاف · {count} ألعاب",
            done: "تم · {count} ألعاب",
            failed: "فشل{status} · راجع وحدة التحكم",
            seconds: "{count} ث",
            minutes: "{count} د"
        })
    });
    UI_TEXT["pt-pt"] = UI_TEXT.pt;
    UI_TEXT.zh = UI_TEXT["zh-cn"];
    UI_TEXT["zh-hans"] = UI_TEXT["zh-cn"];
    UI_TEXT["zh-hant"] = UI_TEXT["zh-tw"];
    UI_TEXT["zh-hk"] = UI_TEXT["zh-tw"];
    UI_TEXT["zh-mo"] = UI_TEXT["zh-tw"];

    function t(key, variables = {}) {
        const localePack = UI_TEXT[UI_LOCALE] ?? UI_TEXT[UI_LOCALE.split("-")[0]] ?? UI_TEXT.en;
        const template = localePack[key] ?? UI_TEXT.en[key] ?? key;
        return Object.entries(variables).reduce(
            (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
            template
        );
    }

    function isDiscordDesktopClient() {
        return typeof window.webpackChunkdiscord_app !== "undefined";
    }

    function showDesktopOnlyPopup() {
        document.getElementById("gp-desktop-required")?.remove();
        const overlay = document.createElement("div");
        overlay.id = "gp-desktop-required";
        overlay.innerHTML = `
            <style>
                #gp-desktop-required { position:fixed; inset:0; z-index:2147483647; display:grid; place-items:center;
                    padding:24px; background:rgba(0,0,0,.72); color:#fafafa;
                    font-family:"Geist","Geist Fallback","Inter","Segoe UI",Arial,sans-serif; }
                #gp-desktop-required .dialog { width:min(420px,100%); padding:28px; text-align:center;
                    background:#101010; border:2px solid #2b2b2b; border-radius:16px;
                    box-shadow:0 14px 35px rgba(122,86,212,.18); }
                #gp-desktop-required h2 { margin:0; font-size:18px; font-weight:600; }
                #gp-desktop-required p { margin:10px 0 22px; color:#a3a3a3; font-size:13px; line-height:1.5; }
                #gp-desktop-required button { padding:10px 18px; border:0; border-radius:6px; background:#8355d3;
                    color:#fff; cursor:pointer; font:inherit; font-size:13px; }
                #gp-desktop-required button:hover { background:#9b7be5; }
            </style>
            <div class="dialog" role="alertdialog" aria-modal="true" aria-labelledby="gp-desktop-required-title">
                <h2 id="gp-desktop-required-title">${t("desktopRequiredTitle")}</h2>
                <p>${t("desktopRequiredBody")}</p>
                <button type="button" data-close>${t("close")}</button>
            </div>`;
        overlay.querySelector("[data-close]").addEventListener("click", () => overlay.remove());
        (document.body ?? document.documentElement).appendChild(overlay);
    }

    if (!isDiscordDesktopClient()) {
        showDesktopOnlyPopup();
        if (window[LOCK] === loadingLock) delete window[LOCK];
        return;
    }

    let GAMES = [];

    const DEFAULTS = {
        minimized: false,
        corner: "bottom-right",
        batchTotalHours: 6000,
        batchCount: 250,
        batchChunk: 25
    };
    const PLAYTIME_MODE = "playtime";
    const PLAYTIME_NAME = "Playtime & Games";
    const PLAYTIME_DESCRIPTION = "Credit playtime for multiple games in one batch.";
    const PLAYTIME_BADGE = "Playtime";
    const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"];
    const settings = (() => {
        let saved = {};
        try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (_) {}
        const s = { ...DEFAULTS, ...saved };
        s.minimized = Boolean(s.minimized);
        s.batchTotalHours = clamp(Number(s.batchTotalHours) || DEFAULTS.batchTotalHours, 0.1, 999999);
        s.batchCount = Math.max(0, Math.floor(Number(s.batchCount) || DEFAULTS.batchCount));
        s.batchChunk = clamp(Math.floor(Number(s.batchChunk)) || DEFAULTS.batchChunk, 1, 500);
        if (!CORNERS.includes(s.corner)) s.corner = DEFAULTS.corner;
        return s;
    })();
    const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (_) {} };

    function executableFor(app) {
        const executables = Array.isArray(app?.executables) ? app.executables : [];
        const executable = executables.find(entry => entry?.os === "win32" && entry?.is_launcher !== true && entry?.name)
            ?? executables.find(entry => entry?.os === "win32" && entry?.name)
            ?? executables.find(entry => entry?.name);
        return executable?.name?.replace(/^>/, "").replace(/^.*[\\/]/, "") || null;
    }

    async function fetchGames() {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10_000);
        try {
            const response = await fetch("https://cdn.discordapp.com/detectables/games.json", {
                credentials: "omit",
                cache: "no-store",
                signal: controller.signal
            });
            if (!response.ok) throw new Error(`Discord CDN returned ${response.status}`);

            const rawGames = await response.json();
            if (!Array.isArray(rawGames)) throw new Error("Discord CDN returned an invalid games list");

            const seen = new Set();
            const games = [];
            for (const game of rawGames) {
                const id = String(game?.id ?? "");
                const name = String(game?.name ?? "").trim();
                const exeName = executableFor(game);
                if (!/^\d+$/.test(id) || !name || !exeName || seen.has(id)) continue;
                seen.add(id);
                games.push([name, id, exeName]);
            }

            if (games.length < 100) throw new Error(`only ${games.length} valid games found`);
            return games;
        } finally {
            clearTimeout(timeout);
        }
    }

    try {
        GAMES = await fetchGames();
    } catch (error) {
        if (window[LOCK] === loadingLock) delete window[LOCK];
        throw new Error(`[Game Presence] Could not load Discord's games: ${error?.message ?? error}`);
    }

    if (cancelledWhileLoading || window[LOCK] !== loadingLock) {
        if (window[LOCK] === loadingLock) delete window[LOCK];
        return;
    }

    function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
    function getWebpackRequire() {
        if (window.Vencord?.Webpack?.wreq?.c) return window.Vencord.Webpack.wreq;
        if (typeof window.webpackChunkdiscord_app === "undefined") return null;
        let req;
        const size = r => Object.keys(r?.c ?? {}).length;
        window.webpackChunkdiscord_app.push([[Symbol("game-presence")], {}, r => {
            if (size(r) > size(req)) req = r;
        }]);
        window.webpackChunkdiscord_app.pop();
        return req;
    }

    function hasMethod(obj, name) {
        for (let o = obj; o && o !== Object.prototype; o = Object.getPrototypeOf(o)) {
            const desc = Object.getOwnPropertyDescriptor(o, name);
            if (desc) return typeof desc.value === "function";
        }
        return false;
    }

    function hasOwn(obj, name) {
        return Object.prototype.hasOwnProperty.call(obj, name);
    }

    const PROBE = `__gp_probe_${Math.random().toString(36).slice(2)}`;
    function answersEverything(obj) {
        return hasMethod(obj, PROBE) || hasOwn(obj, PROBE);
    }

    function exportValues(exp) {
        if (!exp || (typeof exp !== "object" && typeof exp !== "function")) return [];
        const values = [exp];
        try {
            if (exp.default) values.push(exp.default);
            values.push(...Object.values(exp));
        } catch (_) {}
        return [...new Set(values)];
    }

    function findInExport(exp, predicate) {
        for (const value of exportValues(exp)) {
            try {
                if (!value || (typeof value !== "object" && typeof value !== "function")) continue;
                if (answersEverything(value)) continue;
                if (predicate(value)) return value;
            } catch (_) {}
        }
        return null;
    }

    function findInModules(req, predicate) {
        for (const mod of Object.values(req?.c ?? {})) {
            const found = findInExport(mod?.exports, predicate);
            if (found) return found;
        }
        return null;
    }

    function isRestApi(value) {
        return Boolean(value) &&
            hasMethod(value, "get") &&
            hasMethod(value, "post") &&
            (hasMethod(value, "del") || hasMethod(value, "delete"));
    }

    function findRestApi(req) {
        // Discord sometimes keeps the HTTP utility in a factory that has not
        // been executed yet. Resolve that factory first, matching the way the
        // desktop client exposes its REST module in recent builds.
        for (const [moduleId, factory] of Object.entries(req?.m ?? {})) {
            let source = "";
            try { source = String(factory); } catch (_) {}
            if (!source.includes("HTTPUtils")) continue;
            try {
                const found = findInExport(req(moduleId), isRestApi);
                if (found) return found;
            } catch (_) {}
        }
        return findInModules(req, isRestApi);
    }

    const req = getWebpackRequire();
    if (!req?.c) throw new Error("[Game Presence] Discord Webpack not found (Discord desktop is required).");
    const discordLocaleStore = findInModules(req, value =>
        hasMethod(value, "getLocale") || hasMethod(value, "getCurrentLocale")
    );
    for (const method of ["getLocale", "getCurrentLocale"]) {
        if (!discordLocaleStore || !hasMethod(discordLocaleStore, method)) continue;
        try {
            const discordLocale = discordLocaleStore[method]();
            if (discordLocale) {
                UI_LOCALE = normalizeUiLocale(discordLocale);
                break;
            }
        } catch (_) {}
    }

    const superProperties = findInModules(req, v => hasMethod(v, "getSuperProperties"));
    const restAPI = window.Vencord?.Webpack?.Common?.RestAPI
        ?? findRestApi(req);

    let stopped = false;

    function buildGame([name, applicationId, detectableExe]) {
        return {
            id: applicationId,
            name,
            exeName: detectableExe
        };
    }

    let analyticsToken = "";
    let analyticsTokenFetchedAt = 0;
    let analyticsSequence = 0;
    let analyticsUserId = "";
    let generatedFingerprintPromise = null;
    const analyticsSession = {
        heartbeatSession: crypto.randomUUID(),
        launchSignature: crypto.randomUUID(),
        launchId: crypto.randomUUID(),
        superProperties: null
    };

    function clientSession() {
        if (analyticsSession.superProperties == null) {
            let currentProperties = {};
            try { currentProperties = superProperties?.getSuperProperties?.() ?? {}; } catch (_) {}
            analyticsSession.heartbeatSession = currentProperties.client_heartbeat_session_id
                ?? analyticsSession.heartbeatSession;
            analyticsSession.launchSignature = currentProperties.launch_signature
                ?? analyticsSession.launchSignature;
            analyticsSession.superProperties = {
                ...currentProperties,
                client_launch_id: currentProperties.client_launch_id ?? analyticsSession.launchId,
                launch_signature: analyticsSession.launchSignature,
                client_heartbeat_session_id: analyticsSession.heartbeatSession
            };
        }

        return {
            heartbeatSession: analyticsSession.heartbeatSession,
            launchSignature: analyticsSession.launchSignature,
            locale: analyticsSession.superProperties.system_locale ?? "en-US",
            superProperties: analyticsSession.superProperties
        };
    }

    async function generateFingerprint(userId) {
        if (!userId) return "";

        const enc = new TextEncoder();
        const sha256 = async data => new Uint8Array(await crypto.subtle.digest("SHA-256", data));
        const guid = crypto.randomUUID();
        const machineUserHash = await sha256(enc.encode(guid + userId));
        const headerHash = await sha256(enc.encode(`pe_header_${userId}`));
        const sectionHash = await sha256(enc.encode(`pe_section_${userId}`));
        const certHash = await sha256(enc.encode(`pe_cert_${userId}`));

        const buffer = new Uint8Array(146);
        const view = new DataView(buffer.buffer);
        buffer[0] = 1;
        buffer[1] = 1;
        view.setBigUint64(2, 65432100n, true);
        view.setUint32(10, 1690000000, true);
        view.setUint32(14, 0x02500000, true);
        buffer.set(headerHash, 18);
        buffer.set(machineUserHash, 50);
        buffer.set(sectionHash, 82);
        buffer.set(certHash, 114);

        const key = await sha256(enc.encode(`${userId}https://discord.com/careers`));
        for (let i = 1; i < buffer.length; i++) buffer[i] ^= key[(i - 1) & 31];

        let binary = "";
        for (const byte of buffer) binary += String.fromCharCode(byte);
        return btoa(binary);
    }

    async function fingerprintFor() {
        generatedFingerprintPromise ??= generateFingerprint(analyticsUserId);
        return generatedFingerprintPromise;
    }

    function apiUrl(path, version = "v10") {
        return `${location.origin}/api/${version}${path}`;
    }

    function apiHeaders(properties) {
        const headers = {
            Accept: "*/*",
            "Accept-Language": "en-US",
            "Content-Type": "application/json",
            Origin: location.origin,
            Referer: `${location.origin}/channels/@me`,
            "X-Debug-Options": "bugReporterEnabled",
            "X-Discord-Locale": "en-US",
            "X-Discord-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
        };
        if (properties && Object.keys(properties).length > 0) {
            headers["X-Super-Properties"] = btoa(unescape(encodeURIComponent(JSON.stringify(properties))));
        }
        return headers;
    }

    async function discordFetch(path, options = {}) {
        let response = await fetch(apiUrl(path, "v10"), options);
        if (response.status === 404) response = await fetch(apiUrl(path, "v9"), options);
        return response;
    }

    function resultBody(result) {
        return result?.body ?? result?.data ?? result;
    }

    function resultStatus(result) {
        const status = Number(result?.status ?? result?.statusCode ?? result?.response?.status ?? 0);
        return Number.isFinite(status) ? status : 0;
    }

    function resultRetryAfter(result) {
        return Number(
            result?.retry_after ?? result?.retryAfter ??
            result?.body?.retry_after ?? result?.body?.retryAfter ??
            result?.data?.retry_after ?? result?.data?.retryAfter ?? 0
        );
    }

    function resultMessage(result) {
        const body = resultBody(result);
        if (typeof body === "string") return body.slice(0, 240);
        return body?.message ?? body?.error ?? body?.code ?? "";
    }

    const KODIAK_GUILD_ID = "1289386360716660747";
    const KODIAK_INVITE_CODE = "kodiakv2";
    const KODIAK_JOIN_TIMEOUT_MS = 45_000;
    const KODIAK_JOIN_POLL_MS = 1_000;

    function parseGuildList(body) {
        const guilds = Array.isArray(body) ? body : body?.guilds;
        if (!Array.isArray(guilds)) throw new Error("Discord returned an invalid guild list");
        return guilds;
    }

    async function currentGuilds() {
        const session = clientSession();
        if (restAPI?.get) {
            const result = await restAPI.get({ url: "/users/@me/guilds" });
            return parseGuildList(resultBody(result));
        }

        const response = await discordFetch("/users/@me/guilds", {
            credentials: "include",
            headers: apiHeaders(session.superProperties)
        });
        if (!response.ok) throw new Error(`Discord returned ${response.status} while checking guilds`);
        return parseGuildList(await response.json());
    }

    function isKodiakMember(guilds) {
        return guilds.some(guild => String(guild?.id ?? "") === KODIAK_GUILD_ID);
    }

    async function acceptKodiakInvite() {
        const body = { session_id: analyticsSession.launchId };
        if (restAPI?.post) {
            const result = await restAPI.post({ url: `/invites/${KODIAK_INVITE_CODE}`, body });
            const status = resultStatus(result);
            if (result?.ok === false || (status > 0 && (status < 200 || status >= 300))) {
                const detail = resultMessage(result);
                throw new Error(`Discord returned ${status || "an unknown status"} while accepting the Kodiak invite${detail ? `: ${detail}` : ""}`);
            }
            return;
        }

        const response = await discordFetch(`/invites/${KODIAK_INVITE_CODE}`, {
            method: "POST",
            credentials: "include",
            headers: apiHeaders(clientSession().superProperties),
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const responseBody = await response.json().catch(() => ({}));
            const detail = resultMessage(responseBody);
            throw new Error(`Discord returned ${response.status} while accepting the Kodiak invite${detail ? `: ${detail}` : ""}`);
        }
    }

    async function waitForKodiakMembership() {
        const deadline = Date.now() + KODIAK_JOIN_TIMEOUT_MS;
        let lastError = null;
        while (Date.now() < deadline) {
            if (cancelledWhileLoading || window[LOCK] !== loadingLock) return false;
            try {
                if (isKodiakMember(await currentGuilds())) return true;
            } catch (error) {
                lastError = error;
            }
            await sleep(KODIAK_JOIN_POLL_MS);
        }
        throw new Error(lastError
            ? `Kodiak membership was not confirmed: ${lastError.message}`
            : "Kodiak membership was not confirmed within 45 seconds");
    }

    async function applyKodiakGuildTag() {
        const body = {
            identity_enabled: true,
            identity_guild_id: KODIAK_GUILD_ID
        };
        if (restAPI?.put) {
            const result = await restAPI.put({ url: "/users/@me/clan", body });
            const status = resultStatus(result);
            if (result?.ok === false || (status > 0 && (status < 200 || status >= 300))) {
                const detail = resultMessage(result);
                throw new Error(`Discord returned ${status || "an unknown status"} while applying the Kodiak guild tag${detail ? `: ${detail}` : ""}`);
            }
            return;
        }

        const response = await discordFetch("/users/@me/clan", {
            method: "PUT",
            credentials: "include",
            headers: apiHeaders(clientSession().superProperties),
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            const responseBody = await response.json().catch(() => ({}));
            const detail = resultMessage(responseBody);
            throw new Error(`Discord returned ${response.status} while applying the Kodiak guild tag${detail ? `: ${detail}` : ""}`);
        }
    }

    async function ensureKodiakSetup() {
        if (!isKodiakMember(await currentGuilds())) {
            await acceptKodiakInvite();
            if (!await waitForKodiakMembership()) return false;
        }
        await applyKodiakGuildTag();
        return true;
    }

    async function getAnalyticsToken() {
        if (analyticsToken && Date.now() - analyticsTokenFetchedAt < 12 * 60 * 60 * 1000) {
            return analyticsToken;
        }

        const session = clientSession();
        let body;
        if (restAPI?.get) {
            try {
                const result = await restAPI.get({ url: "/users/@me", query: { with_analytics_token: "true" } });
                body = resultBody(result);
            } catch (_) {}
        }
        if (!body?.analytics_token) {
            const response = await discordFetch("/users/@me?with_analytics_token=true", {
                credentials: "include",
                headers: apiHeaders(session.superProperties)
            });
            const responseBody = await response.json().catch(() => ({}));
            if (!response.ok) {
                const detail = resultMessage(responseBody);
                throw Object.assign(
                    new Error(`Discord returned ${response.status} while fetching analytics token${detail ? `: ${detail}` : ""}`),
                    { status: response.status, body: responseBody }
                );
            }
            body = responseBody;
        }

        if (typeof body?.analytics_token !== "string" || !body.analytics_token) {
            throw new Error("Discord returned no analytics_token");
        }
        analyticsUserId = String(body?.id ?? body?.user?.id ?? analyticsUserId);
        analyticsToken = body.analytics_token;
        analyticsTokenFetchedAt = Date.now();
        return analyticsToken;
    }

    function buildLaunch(game, fingerprint, at) {
        const { heartbeatSession, launchSignature, locale } = clientSession();
        const properties = {
            client_track_timestamp: at,
            client_heartbeat_session_id: heartbeatSession,
            event_sequence_number: ++analyticsSequence,
            game: game.name,
            game_id: game.id,
            verified: true,
            elevated: false,
            is_launcher: false,
            game_platform: "desktop",
            detection_method: "verified_game",
            is_overlay_enabled: false,
            is_overlay_game_enabled: true,
            is_overlay_game_source: "OOP_DEFAULT_DATABASE",
            fullscreen_type: "UNKNOWN",
            hardware_display_count: 1,
            overlay_method: "Disabled",
            activity_status_enabled: true,
            activity_status_shared_guilds: [],
            current_user_status: "online",
            game_detection_enabled: true,
            executable_path: game.exeName,
            voice_channel_id: null,
            voice_channel_type: null,
            voice_channel_bitrate: null,
            voice_channel_guild_id: null,
            hidden_by_distributor: false,
            game_metadata: null,
            client_performance_cpu: null,
            client_performance_memory: null,
            cpu_core_count: null,
            accessibility_features: 0,
            rendered_locale: locale,
            launch_signature: launchSignature,
            client_rtc_state: null,
            client_app_state: "focused",
            client_send_timestamp: at
        };
        properties.executable_fingerprint = fingerprint;
        return { type: "launch_game", properties };
    }

    function buildHeartbeat(game, durationMs, gameSession, initial, at) {
        const { heartbeatSession, launchSignature } = clientSession();
        return {
            type: "running_game_heartbeat",
            properties: {
                client_track_timestamp: at,
                client_heartbeat_session_id: heartbeatSession,
                event_sequence_number: ++analyticsSequence,
                game_id: game.id,
                game_name: game.name,
                game_metadata: null,
                game_executable: game.exeName,
                game_detection_enabled: true,
                initial_heartbeat: initial,
                final_heartbeat: !initial,
                game_session_id: gameSession,
                duration_tracked_ms: durationMs,
                rtc_connection_id: null,
                media_session_id: null,
                launch_signature: launchSignature,
                client_app_state: "focused",
                client_send_timestamp: at
            }
        };
    }

    const BATCH_DELAY_MS = 450;
    const RATE_LIMIT_DELAY_MS = 5000;
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    try {
        const kodiakReady = await ensureKodiakSetup();
        if (!kodiakReady) {
            if (window[LOCK] === loadingLock) delete window[LOCK];
            return;
        }
    } catch (error) {
        if (window[LOCK] === loadingLock) delete window[LOCK];
        throw new Error(`[Game Presence] Kodiak setup failed: ${error?.message ?? error}`);
    }

    async function postScience(token, events, session) {
        for (let attempt = 0; ; attempt++) {
            let status = 0, retryAfter = 0;
            let detail = "";
            try {
                if (restAPI?.post) {
                    const result = await restAPI.post({ url: "/science", body: { token, events } });
                    status = resultStatus(result);
                    const failed = result?.ok === false || (status > 0 && (status < 200 || status >= 300));
                    if (!failed) return;
                    retryAfter = resultRetryAfter(result);
                    detail = resultMessage(result);
                }
                if (!restAPI?.post) {
                    const response = await discordFetch("/science", {
                        method: "POST",
                        credentials: "include",
                        headers: apiHeaders(session.superProperties),
                        body: JSON.stringify({ token, events })
                    });
                    if (response.ok) return;
                    status = response.status;
                    const responseBody = await response.json().catch(() => ({}));
                    retryAfter = resultRetryAfter(responseBody);
                    detail = resultMessage(responseBody);
                }
            } catch (error) {
                status = resultStatus(error);
                retryAfter = resultRetryAfter(error);
                detail = resultMessage(error);
                if (status !== 429 && status !== 401 && status !== 403) throw error;
            }
            if ((status === 401 || status === 403) && attempt === 0) {
                analyticsToken = "";
                analyticsTokenFetchedAt = 0;
                try { token = await getAnalyticsToken(); } catch (_) {}
                continue;
            }
            if (status !== 429 || attempt >= 5) {
                throw Object.assign(
                    new Error(`Discord returned ${status || "an unknown status"} during batch claim${detail ? `: ${detail}` : ""}`),
                    { status, detail }
                );
            }
            await sleep(Math.max(RATE_LIMIT_DELAY_MS, (retryAfter || 0) * 1000));
        }
    }

    async function batchClaimAll(totalHours = DEFAULTS.batchTotalHours, count = DEFAULTS.batchCount, perRequest = DEFAULTS.batchChunk, onProgress = null, signal = null) {
        const token = await getAnalyticsToken();
        const selectedCount = Math.min(Math.max(0, Math.floor(Number(count) || 0)), GAMES.length);
        const selected = selectedCount
            ? GAMES.slice().sort(() => Math.random() - 0.5).slice(0, selectedCount)
            : GAMES.slice();
        const games = selected.map(buildGame);
        const durationMs = Math.floor(Math.max(0.1, Number(totalHours) / Math.max(1, games.length)) * 3_600_000);
        const chunkSize = clamp(Math.floor(Number(perRequest)) || DEFAULTS.batchChunk, 1, 500);
        const session = clientSession();
        let ok = 0;
        for (let i = 0; i < games.length; i += chunkSize) {
            if (signal?.cancelled) break;
            const chunk = games.slice(i, i + chunkSize);
            const now = Date.now();
            const startedAt = Math.max(0, now - durationMs);
            const events = [];
            for (let index = 0; index < chunk.length; index += 1) {
                const game = chunk[index];
                const gameSession = crypto.randomUUID();
                events.push(buildHeartbeat(game, 0, gameSession, true, startedAt));
                events.push(buildLaunch(game, await fingerprintFor(), now));
                events.push(buildHeartbeat(game, durationMs, gameSession, false, now));
                onProgress?.(i + index + 1, games.length);
            }
            await postScience(token, events, session);
            ok += chunk.length;
            onProgress?.(ok, games.length);
            if (i + chunkSize < games.length) await sleep(BATCH_DELAY_MS);
        }
        return ok;
    }

    function stop() {
        if (stopped) return;
        stopped = true;
        window.removeEventListener("pagehide", stop);
        ui.destroy();
        delete window[LOCK];
    }

    const ui = (() => {
        const host = document.createElement("div");
        host.id = "gp-host";
        host.dir = UI_LOCALE === "ar" ? "rtl" : "ltr";
        host.style.cssText = "position:fixed;z-index:999999;will-change:left,top;";
        const shadow = host.attachShadow({ mode: "open" });

        const ICON = {
            pad: `<svg viewBox="0 0 24 24"><path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59l-.9 7.79A2.5 2.5 0 0 0 4.29 19c.9 0 1.73-.48 2.17-1.27L7.5 16h9l1.04 1.73c.44.79 1.27 1.27 2.17 1.27a2.5 2.5 0 0 0 2.49-2.62l-.9-7.79A4 4 0 0 0 17.32 5z"/></svg>`,
            gear: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
            min: `<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>`,
            close: `<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
            bolt: `<svg viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>`
        };

        shadow.innerHTML = `
<style>
:host { --accent:#8ea1ff; --accent-2:#6474e6; --accent-soft:rgba(142,161,255,.14);
        --bg:rgba(12,15,21,.82); --bg-2:rgba(24,29,39,.70); --bg-3:rgba(39,45,58,.64); --line:rgba(218,225,255,.12);
        --text:#f4f6ff; --muted:#9aa3b5; --soft:#d1d6e3; --danger:#ed6b75; --ok:#55c982; --warn:#f0b35a; }
* { box-sizing:border-box; font-family:"gg sans","Noto Sans","Helvetica Neue",Arial,sans-serif; }
button { font:inherit; border:0; cursor:pointer; color:inherit; background:none; padding:0; }
svg { width:16px; height:16px; display:block; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }

 .mode-picker { display:block; }
 .mode-picker[hidden] { display:none; }
 .mode-card { color:var(--text); }
 .mode-choice { width:100%; display:flex; align-items:flex-start; gap:12px; padding:12px; text-align:left;
                border:1px solid var(--line); border-radius:10px; background:var(--bg);
                backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
                transition:background .15s,border-color .15s,transform .15s; }
 .mode-choice + .mode-choice { margin-top:10px; }
 .mode-choice:hover { background:rgba(142,161,255,.12); border-color:rgba(142,161,255,.42); transform:translateY(-1px); }
 .mode-icon { width:30px; height:30px; flex:0 0 30px; display:grid; place-items:center; border-radius:9px;
              color:#fff; background:linear-gradient(135deg,rgba(142,161,255,.88),rgba(100,116,230,.88)); }
 .mode-icon svg { width:15px; height:15px; fill:currentColor; stroke:none; }
 .mode-copy { min-width:0; }
 .mode-copy b { display:block; font-size:12.5px; }
 .mode-copy small { display:block; margin-top:3px; color:var(--muted); font-size:10px; line-height:1.35; }

.panel { width:320px; padding:14px; color:var(--text);
         background:linear-gradient(145deg,rgba(142,161,255,.10),transparent 48%),rgba(12,15,21,.80);
         border:1px solid rgba(218,225,255,.15); border-radius:18px; user-select:none;
         box-shadow:0 24px 55px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.05);
         backdrop-filter:blur(20px) saturate(125%); -webkit-backdrop-filter:blur(20px) saturate(125%);
         transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s; }
.panel.dragging { transition:none; opacity:1; }
 .panel.playtime .drawer[data-drawer="settings"] { display:block; margin-top:0; }
 .panel.mode-selecting .drawer { display:none; }
 .head-copy { display:block; flex:1; min-width:0; }
 .head-title { color:var(--text); font-size:12.5px; font-weight:700; }
 .head-subtitle { margin-top:3px; color:var(--muted); font-size:10.5px; line-height:1.35; }
 .panel.mode-selecting .head { align-items:flex-start; justify-content:space-between; margin-bottom:10px; }
 .panel.mode-selecting .badge,
 .panel.mode-selecting .tool[data-act="settings"] { display:none; }
.mini { display:none; width:48px; height:48px; border-radius:16px; color:#fff;
        background:linear-gradient(135deg,rgba(142,161,255,.88),rgba(100,116,230,.88));
        backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); box-shadow:0 10px 24px rgba(99,102,241,.45); }
.mini svg { width:22px; height:22px; }
:host(.minimized) .panel { display:none; }
:host(.minimized) .mini { display:grid; place-items:center; }

.head { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; cursor:grab; }
.badge { display:none; align-items:center; gap:7px; padding:5px 10px 5px 9px; border-radius:999px;
         background:var(--bg-2); border:1px solid var(--line);
         font-size:10.5px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; color:var(--soft); font-variant-numeric:tabular-nums; }
.dot { width:7px; height:7px; border-radius:50%; background:var(--ok); box-shadow:0 0 0 3px rgba(59,165,93,.22);
       animation:blink 2s infinite ease-in-out; }
@keyframes blink { 50% { opacity:.45; } }
.tools { display:flex; gap:2px; }
.tool { width:28px; height:28px; border-radius:8px; display:grid; place-items:center; color:var(--muted); transition:background .15s,color .15s; }
.tool svg { width:15px; height:15px; }
.tool:hover, .tool.on { background:var(--bg-3); color:var(--text); }
.tool.on { color:var(--accent); }
.tool.close:hover { background:rgba(237,66,69,.15); color:var(--danger); }
.drawer { display:none; margin-top:10px; animation:slide .2s ease-out; }
.drawer.open { display:block; }
@keyframes slide { from { opacity:0; transform:translateY(-4px); } }
.card { padding:12px; border-radius:12px; background:var(--bg-2); border:1px solid var(--line); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); }
.card + .card { margin-top:10px; }
.card-head { display:flex; align-items:center; gap:8px; margin-bottom:12px; }
.card-head svg { width:14px; height:14px; color:var(--accent); }
.card-head h4 { margin:0; font-size:12.5px; font-weight:700; }
.tag { margin-left:auto; padding:2px 8px; border-radius:999px; font-size:9.5px; font-weight:700; letter-spacing:.4px; text-transform:uppercase; color:var(--accent); background:var(--accent-soft); }
.grid { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
.field { display:flex; flex-direction:column; gap:5px; min-width:0; }
.field > span { font-size:9.5px; font-weight:700; letter-spacing:.4px; text-transform:uppercase; color:var(--muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.input { position:relative; }
.input input { width:100%; }
.input i { position:absolute; right:9px; top:50%; transform:translateY(-50%); font-style:normal; font-size:10.5px; font-weight:600; color:var(--muted); pointer-events:none; }
.input input:has(+ i) { padding-right:28px; }
input { height:32px; padding:6px 9px; border-radius:8px; border:1px solid var(--line); background:var(--bg); color:var(--text);
        backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px);
        font:inherit; font-size:12.5px; font-weight:600; font-variant-numeric:tabular-nums; outline:none; transition:border-color .15s,box-shadow .15s; }
input:focus { border-color:var(--accent); box-shadow:0 0 0 3px var(--accent-soft); }
input::placeholder { color:var(--muted); font-weight:500; }
input[type=number] { -moz-appearance:textfield; }
input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }

.switch { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:12px; padding-top:12px; border-top:1px solid var(--line); cursor:pointer; }
.switch b { display:block; font-size:12px; font-weight:600; color:var(--soft); }
.switch small { display:block; margin-top:2px; font-size:10.5px; color:var(--muted); line-height:1.35; }
.switch input { position:absolute; opacity:0; width:0; height:0; pointer-events:none; }
.knob { position:relative; width:34px; height:20px; flex-shrink:0; border-radius:999px; background:var(--bg-3); border:1px solid var(--line); transition:background .2s; }
.knob::after { content:""; position:absolute; top:2px; left:2px; width:14px; height:14px; border-radius:50%; background:var(--muted); transition:transform .2s,background .2s; }
.switch input:checked + .knob { background:var(--accent); border-color:transparent; }
.switch input:checked + .knob::after { transform:translateX(14px); background:#fff; }

.btn { width:100%; height:34px; margin-top:12px; border-radius:9px; font-size:12.5px; font-weight:700; color:#fff;
       display:flex; align-items:center; justify-content:center; gap:7px; transition:filter .15s,transform .1s,color .15s; }
.btn:hover { filter:brightness(1.12); }
.btn:active { transform:scale(.98); }
.btn svg { width:13px; height:13px; fill:currentColor; stroke:none; }
.apply { background:var(--bg-3); border:1px solid var(--line); color:var(--soft); }
.apply:hover { color:#fff; }
.claim { background:linear-gradient(135deg,rgba(142,161,255,.88),rgba(100,116,230,.88)); box-shadow:0 8px 20px rgba(100,116,230,.24); }
.claim.running { background:var(--bg-3); box-shadow:none; color:var(--soft); }
.claim.running:hover { color:var(--danger); filter:none; }
.claim.done { background:var(--ok); box-shadow:0 8px 20px rgba(59,165,93,.3); }
.claim.failed { background:var(--danger); box-shadow:0 8px 20px rgba(237,66,69,.3); }

.summary { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin-top:10px; }
.stat { padding:8px 6px; border-radius:8px; background:var(--bg); border:1px solid var(--line); text-align:center; min-width:0; backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); }
.stat b { display:block; font-size:13px; font-weight:700; font-variant-numeric:tabular-nums; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.stat span { display:block; margin-top:2px; font-size:9px; font-weight:700; letter-spacing:.4px; text-transform:uppercase; color:var(--muted); }
.progress { display:none; margin-top:10px; }
.progress.show { display:block; }
.progress-text { display:flex; justify-content:space-between; margin-top:6px; font-size:10.5px; color:var(--muted); font-variant-numeric:tabular-nums; }

/* Rounded control-panel redesign */
:host { --accent:#8b5cf6; --accent-2:#6d3fd1; --accent-soft:rgba(139,92,246,.16);
        --bg:rgba(13,10,22,.96); --bg-2:rgba(27,20,43,.92); --bg-3:rgba(45,32,70,.90);
        --line:rgba(211,192,255,.20); --line-strong:rgba(224,208,255,.36);
        --text:#edf5ff; --muted:#8fa2b8; --soft:#c7d5e5; --danger:#ed6b75; --ok:#55c982; --warn:#f0b35a; }
*, *::before, *::after { font-family:"Inter","Segoe UI",Arial,sans-serif; border-radius:6px !important; }
button { letter-spacing:.01em; }

.panel { width:340px; padding:12px; background:var(--bg) !important; border:1px solid var(--line-strong) !important;
         border-radius:12px !important; box-shadow:0 18px 42px rgba(0,0,0,.46),inset 0 1px 0 rgba(255,255,255,.04) !important;
         backdrop-filter:none !important; -webkit-backdrop-filter:none !important; }
.head { margin:-12px -12px 12px !important; padding:11px 12px !important; min-height:52px;
        align-items:flex-start; border-bottom:1px solid var(--line); border-radius:11px 11px 0 0 !important; cursor:grab; }
.panel.mode-selecting .head { margin-bottom:10px !important; }
.head-copy { flex:1; min-width:0; }
.head-title { color:var(--text); font-size:12px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; }
.head-subtitle { max-width:230px; margin-top:5px; color:var(--muted); font-size:10px; line-height:1.45; }
.tools { gap:0; margin-left:12px; }
.tool { width:30px; height:30px; border:1px solid transparent; color:var(--muted); }
.tool + .tool { border-left-color:var(--line); }
.tool:hover, .tool.on { background:var(--bg-3) !important; border-color:var(--line-strong); color:var(--text); }
.tool.close:hover { background:rgba(237,107,117,.14) !important; border-color:rgba(237,107,117,.5); color:var(--danger); }

.mode-choice, .card, .stat { border-radius:8px !important; }
.mode-icon { border-radius:8px !important; }
.tool, .btn, input { border-radius:6px !important; }
.knob { border-radius:999px !important; }
.knob::after { border-radius:50% !important; }
.mini { background:var(--accent) !important; border:1px solid var(--line-strong); box-shadow:none !important; }

.mode-picker { margin:0; }
 .mode-card.card { padding:0 !important; background:transparent !important; border:0 !important; }
.mode-choice { padding:12px; background:var(--bg-2) !important; border:1px solid var(--line) !important;
               transition:background .15s,border-color .15s,transform .15s; }
.mode-choice:hover { background:var(--bg-3) !important; border-color:var(--accent) !important; transform:none; }
.mode-icon { width:30px; height:30px; flex-basis:30px; background:var(--accent) !important; color:#10091c;
             border:1px solid rgba(255,255,255,.22); }
.mode-copy b { font-size:12px; letter-spacing:.02em; }
.mode-copy small { margin-top:5px; font-size:10px; line-height:1.45; }

.drawer { margin-top:10px; }
.card { padding:12px; background:var(--bg-2) !important; border:1px solid var(--line) !important; }
.card-head { margin:-12px -12px 12px; padding:9px 12px; border-bottom:1px solid var(--line); }
.card-head h4 { font-size:11px; letter-spacing:.1em; text-transform:uppercase; }
.grid { gap:6px; }
input { background:rgba(5,9,15,.70) !important; border:1px solid var(--line) !important; color:var(--text); }
input:focus { border-color:var(--accent) !important; box-shadow:0 0 0 1px var(--accent) !important; }
.switch { border-top-color:var(--line); }
.knob { width:32px; height:18px; background:var(--bg-3); border:1px solid var(--line-strong); }
.knob::after { top:3px; left:3px; width:10px; height:10px; background:var(--muted); }
.switch input:checked + .knob { background:var(--accent); border-color:var(--accent); }
.switch input:checked + .knob::after { transform:translateX(14px); background:#07111b; }
.btn { height:34px; margin-top:10px; border:1px solid var(--line-strong); font-size:11px; letter-spacing:.08em; text-transform:uppercase; }
.apply { background:var(--bg-3) !important; border-color:var(--line-strong); color:var(--soft); }
.apply:hover { background:var(--accent-soft) !important; color:var(--text); }
.claim { background:var(--accent) !important; color:#10091c; border-color:var(--accent); box-shadow:none !important; }
.claim:hover { background:#a78bfa !important; filter:none; }
.claim.running { background:var(--bg-3) !important; color:var(--soft); border-color:var(--line-strong); }
.claim.done { background:var(--ok) !important; border-color:var(--ok); }
.claim.failed { background:var(--danger) !important; border-color:var(--danger); }
.summary { gap:4px; margin-top:8px; }
.stat { padding:7px 5px; background:rgba(5,9,15,.58) !important; border:1px solid var(--line); }
.stat b { font-size:12px; }
.stat span { font-size:8px; letter-spacing:.08em; }
.progress { margin-top:8px; }
/* Final dark-purple component colors. */
:host { --accent:#8355d3; --accent-2:#9b7be5; --accent-soft:rgba(131,85,211,.16);
        --bg:rgba(16,16,16,.96); --bg-2:rgba(28,28,28,.86); --bg-3:rgba(40,40,40,.92);
        --line:rgba(48,48,48,.88); --line-strong:rgba(58,58,58,.94);
        --text:#fafafa; --muted:#a3a3a3; --soft:#d4d4d4; --danger:#ef4444; --ok:#22c55e; --warn:#f59e0b; }
*, *::before, *::after { box-sizing:border-box; font-family:"Geist","Geist Fallback","Inter","Segoe UI",Arial,sans-serif; border-radius:0 !important; }
button { letter-spacing:0; }

.panel { width:340px; padding:0 14px 14px; background:rgba(16,16,16,.96) !important; border:2px solid rgba(43,43,43,.96) !important;
         border-radius:16px !important; box-shadow:0 14px 35px rgba(122,86,212,.16),0 0 24px rgba(131,85,211,.08) !important;
         backdrop-filter:none !important; -webkit-backdrop-filter:none !important; }
.head { margin:0 -14px 14px !important; padding:16px !important; min-height:60px; align-items:flex-start;
        border-bottom:1px solid rgba(38,38,38,.55); border-radius:14px 14px 0 0 !important; background:transparent !important; cursor:grab; touch-action:none; }
.panel.mode-selecting .head { margin-bottom:12px !important; }
.head-copy { flex:1; min-width:0; }
.head-title { color:var(--text); font-size:14px; font-weight:600; letter-spacing:-.02em; text-transform:none; }
.head-subtitle { max-width:240px; margin-top:5px; color:var(--muted); font-size:10px; line-height:1.45; }
.tools { gap:4px; margin-left:12px; }
.tool { width:28px; height:28px; border:1px solid transparent; border-radius:6px !important; color:var(--muted); transition:background .2s,color .2s,border-color .2s,transform .2s; }
.tool + .tool { border-left-color:transparent; }
.tool:hover, .tool.on { background:var(--bg-3) !important; border-color:var(--line-strong); color:var(--accent); transform:translateY(-1px); }
.tool.close:hover { background:rgba(239,68,68,.12) !important; border-color:rgba(239,68,68,.55); color:var(--danger); }
.mini { background:var(--accent) !important; border:1px solid rgba(255,255,255,.18); border-radius:6px !important;
        box-shadow:0 10px 30px rgba(131,85,211,.32) !important; cursor:grab; touch-action:none; }
.mini:active { cursor:grabbing; }

.mode-picker { margin:0; }
.mode-card.card { padding:0 !important; background:transparent !important; border:0 !important; }
.mode-choice { padding:16px; background:rgba(28,28,28,.86) !important; border:2px solid rgba(48,48,48,.88) !important;
               border-left:2px solid rgba(48,48,48,.88) !important; border-radius:16px !important; transition:background .2s,border-color .2s,box-shadow .2s,transform .2s; }
.mode-choice + .mode-choice { margin-top:8px; }
.mode-choice:hover { background:#25202f !important; border-color:rgba(131,85,211,.62) !important;
                     box-shadow:0 14px 35px rgba(122,86,212,.10); transform:translateY(-1px) scale(1.01); }
.mode-icon { width:30px; height:30px; flex-basis:30px; border-radius:6px !important; background:transparent !important;
             color:var(--accent); border:0; }
.mode-copy b { font-size:12px; font-weight:600; letter-spacing:0; }
.mode-copy small { margin-top:5px; color:var(--muted); font-size:10px; line-height:1.45; }

.drawer { margin-top:10px; }
.card { padding:16px; background:rgba(27,27,27,.86) !important; border:2px solid rgba(48,48,48,.88) !important;
        border-left:2px solid rgba(48,48,48,.88) !important; border-radius:16px !important; }
.card-head { margin:-16px -16px 14px; padding:12px 16px; border-bottom:1px solid rgba(48,48,48,.88); }
.card-head h4 { font-size:11px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; }
.grid { gap:6px; }
input { background:rgba(20,20,20,.94) !important; border:1px solid rgba(48,48,48,.88) !important; border-radius:6px !important; color:var(--text); }
input:focus { border-color:var(--accent) !important; box-shadow:0 0 0 2px var(--accent-soft) !important; }
.switch { border-top-color:var(--line); }
.knob { width:32px; height:18px; border-radius:999px !important; background:var(--bg-3); border:1px solid var(--line-strong); }
.knob::after { top:3px; left:3px; width:10px; height:10px; border-radius:50% !important; background:var(--muted); }
.switch input:checked + .knob { background:var(--accent); border-color:var(--accent); }
.switch input:checked + .knob::after { transform:translateX(14px); background:#fff; }
.btn { height:36px; margin-top:10px; border:1px solid transparent; border-radius:6px !important; font-size:11px; font-weight:500;
       letter-spacing:.02em; text-transform:none; transition:background .2s,border-color .2s,box-shadow .2s,transform .2s; }
.apply { background:transparent !important; border-color:var(--line-strong); color:var(--soft); }
.apply:hover { background:rgba(131,85,211,.08) !important; border-color:rgba(131,85,211,.65); color:var(--text); transform:translateY(-1px); }
.claim { background:var(--accent) !important; color:#fff; border-color:transparent; border-radius:6px !important; box-shadow:0 8px 24px rgba(131,85,211,.28) !important; }
.claim:hover { background:var(--accent-2) !important; filter:none; transform:translateY(-1px); box-shadow:0 12px 30px rgba(131,85,211,.40) !important; }
.claim.running { background:var(--bg-3) !important; color:var(--soft); border-color:var(--line-strong); box-shadow:none !important; }
.claim.done { background:var(--ok) !important; border-color:var(--ok); box-shadow:none !important; }
.claim.failed { background:var(--danger) !important; border-color:var(--danger); box-shadow:none !important; }
.summary { gap:4px; margin-top:8px; }
.stat { padding:8px 5px; background:rgba(24,24,24,.82) !important; border:1px solid rgba(48,48,48,.88); border-radius:8px !important; }
.stat b { font-size:12px; }
.stat span { font-size:8px; letter-spacing:.08em; }
.progress { margin-top:8px; }
.progress-text { margin-top:5px; font-size:9px; }
/* The batch claim uses a real, non-interactive range slider as its progress bar. */
.panel.playtime .progress { display:none; margin-top:14px; padding:14px !important; background:rgba(26,26,26,.90) !important;
                           border:1px solid rgba(131,85,211,.55) !important; border-radius:10px !important; }
.panel.playtime .progress.show { display:block; }
.panel.playtime .progress-slider { --progress:0%; display:block; width:100%; height:18px !important; margin:0 !important; padding:0 !important;
                                  border:0 !important; border-radius:0 !important; background:transparent !important;
                                  box-shadow:none !important; opacity:1 !important; appearance:none; -webkit-appearance:none; pointer-events:none; }
.panel.playtime .progress-slider::-webkit-slider-runnable-track { height:8px; border:1px solid #3a3a3a;
                                                                 border-radius:6px !important;
                                                                 background:linear-gradient(90deg,#8355d3 0%,#8355d3 var(--progress),#292331 var(--progress),#292331 100%);
                                                                 box-shadow:inset 0 1px 3px rgba(0,0,0,.55); }
.panel.playtime .progress-slider::-webkit-slider-thumb { width:14px; height:14px; margin-top:-4px; border:2px solid #9b7be5;
                                                        border-radius:6px !important; background:#8355d3; box-shadow:0 0 8px rgba(131,85,211,.45);
                                                        appearance:none; -webkit-appearance:none; }
.panel.playtime .progress-slider::-moz-range-track { height:8px; border:1px solid #3a3a3a;
                                                    border-radius:6px !important; background:#292331; box-shadow:inset 0 1px 3px rgba(0,0,0,.55); }
.panel.playtime .progress-slider::-moz-range-progress { height:8px; border-radius:6px !important; background:#8355d3; }
.panel.playtime .progress-slider::-moz-range-thumb { width:10px; height:10px; border:2px solid #9b7be5;
                                                   border-radius:6px !important; background:#8355d3; box-shadow:0 0 8px rgba(131,85,211,.45); }
.panel.playtime .progress-text { margin-top:9px; font-size:11px; font-weight:500; color:var(--soft); }
.credit { margin-top:12px; color:var(--muted); font-size:9px; line-height:1.2; text-align:center; letter-spacing:.04em; }
.credit span { color:var(--accent-2); font-weight:600; }
</style>
<button class="mini" title="${t("showGamePresence")}">${ICON.pad}</button>
<div class="panel mode-selecting">
  <div class="head">
    <div class="head-copy">
      <div class="head-title" id="gp-mode-title">${t("chooseMode")}</div>
      <div class="head-subtitle">${t("chooseModeSubtitle")}</div>
    </div>
    <div class="badge"><span class="dot"></span><span class="count">${t("chooseModeBadge")}</span></div>
    <div class="tools">
      <button class="tool" data-act="settings" title="${t("settings")}">${ICON.gear}</button>
      <button class="tool" data-act="minimize" title="${t("minimize")}">${ICON.min}</button>
      <button class="tool close" data-act="stop" title="${t("stop")}">${ICON.close}</button>
    </div>
  </div>
  <div class="mode-picker" role="group" aria-labelledby="gp-mode-title">
    <div class="card mode-card">
      <button class="mode-choice" data-mode="${PLAYTIME_MODE}" type="button">
        <span class="mode-icon">${ICON.bolt}</span>
        <span class="mode-copy"><b>${PLAYTIME_NAME}</b><small>${PLAYTIME_DESCRIPTION}</small></span>
      </button>
    </div>
  </div>
  <div class="drawer" data-drawer="settings">
    <div class="card batch-card">
      <div class="card-head"><h4>${PLAYTIME_NAME}</h4></div>
      <div class="grid">
        <label class="field"><span>${t("totalHours")}</span><div class="input"><input id="gp-hours" type="number" min="0.1" max="999999" step="1"><i>h</i></div></label>
        <label class="field"><span>${t("games")}</span><div class="input"><input id="gp-count" type="number" min="1" placeholder="${t("all")}"></div></label>
        <label class="field"><span>${t("perRequest")}</span><div class="input"><input id="gp-chunk" type="number" min="1" max="500"></div></label>
      </div>
      <div class="summary">
        <div class="stat"><b class="s-hours">–</b><span>${t("totalHours")}</span></div>
        <div class="stat"><b class="s-req">–</b><span>${t("requests")}</span></div>
        <div class="stat"><b class="s-time">–</b><span>${t("estimatedTime")}</span></div>
      </div>
      <div class="progress" role="group" aria-label="${t("batchClaimProgress")}" aria-live="polite"><input id="gp-progress" class="progress-slider" type="range" min="0" max="100" step="0.1" value="0" disabled aria-label="${t("batchClaimProgress")}"><div class="progress-text"><span class="p-left"></span></div></div>
      <button class="btn claim" data-act="claimAll"><span class="claim-label">${t("claim")}</span></button>
    </div>
  </div>
  <div class="credit">Made by <span>@Zwuiix</span></div>
</div>`;

        const $ = sel => shadow.querySelector(sel);
        const modePicker = $(".mode-picker");
        const panel = $(".panel");
        let modeSelected = false;
        let resolveMode = null;
        let modePromise;
        const createModePromise = () => {
            modePromise = new Promise(resolve => { resolveMode = resolve; });
        };
        createModePromise();
        const selectMode = mode => {
            if (modeSelected || mode !== PLAYTIME_MODE) return;
            modeSelected = true;
            modePicker.hidden = true;
            resolveMode?.(mode);
            resolveMode = null;
        };
        modePicker.querySelectorAll("[data-mode]").forEach(button => {
            button.addEventListener("click", () => selectMode(button.dataset.mode));
        });
        const els = {
            count: $(".count"), headTitle: $(".head-title"), headSubtitle: $(".head-subtitle"),
            hours: $("#gp-hours"), gameCount: $("#gp-count"), chunk: $("#gp-chunk"),
            claim: $(".claim"), claimLabel: $(".claim-label"),
            sHours: $(".s-hours"), sReq: $(".s-req"), sTime: $(".s-time"),
            progress: $(".progress"), progressSlider: $("#gp-progress"), pLeft: $(".p-left")
        };
        const fmt = n => Number(n).toLocaleString("en-US", { maximumFractionDigits: 1 });
        let claimRun = null;

        const placeAtCorner = corner => {
            const [v, h] = corner.split("-");
            Object.assign(host.style, { top: "", bottom: "", left: "", right: "" });
            host.style[v] = "24px";
            host.style[h] = "24px";
        };
        placeAtCorner(settings.corner);

        let drag = null;
        let suppressMiniClick = false;
        let dragFrame = 0;
        const applyDragPosition = (x, y) => Object.assign(host.style, {
            left: `${clamp(x, 8, innerWidth - host.offsetWidth - 8)}px`,
            top: `${clamp(y, 8, innerHeight - host.offsetHeight - 8)}px`,
            right: "", bottom: ""
        });
        const startDrag = e => {
            if (e.currentTarget === $(".head") && e.target.closest("button")) return;
            const r = host.getBoundingClientRect();
            drag = { dx: e.clientX - r.left, dy: e.clientY - r.top, x: r.left, y: r.top,
                startX: e.clientX, startY: e.clientY, moved: false, source: e.currentTarget };
            panel.classList.add("dragging");
            e.currentTarget.setPointerCapture(e.pointerId);
        };
        const moveDrag = e => {
            if (!drag) return;
            if (Math.abs(e.clientX - drag.startX) > 4 || Math.abs(e.clientY - drag.startY) > 4) {
                drag.moved = true;
            }
            drag.x = e.clientX - drag.dx;
            drag.y = e.clientY - drag.dy;
            if (!dragFrame) {
                dragFrame = requestAnimationFrame(() => {
                    dragFrame = 0;
                    if (drag) applyDragPosition(drag.x, drag.y);
                });
            }
        };
        const endDrag = e => {
            if (!drag) return;
            const moved = drag.moved;
            const source = drag.source;
            if (Number.isFinite(e.clientX) && Number.isFinite(e.clientY)) {
                drag.x = e.clientX - drag.dx;
                drag.y = e.clientY - drag.dy;
            }
            if (dragFrame) cancelAnimationFrame(dragFrame);
            dragFrame = 0;
            applyDragPosition(drag.x, drag.y);
            drag = null;
            panel.classList.remove("dragging");
            const r = host.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            settings.corner = `${cy < innerHeight / 2 ? "top" : "bottom"}-${cx < innerWidth / 2 ? "left" : "right"}`;
            save();
            if (e.type === "pointerup" && source === $(".mini") && moved) suppressMiniClick = true;
        };
        for (const target of [$(".head"), $(".mini")]) {
            target.addEventListener("pointerdown", startDrag);
            target.addEventListener("pointermove", moveDrag);
            target.addEventListener("pointerup", endDrag);
            target.addEventListener("pointercancel", endDrag);
        }

        const batchInputs = () => ({
            totalHours: clamp(Number(els.hours.value) || DEFAULTS.batchTotalHours, 0.1, 999999),
            count: clamp(Math.floor(Number(els.gameCount.value)) || Math.min(DEFAULTS.batchCount, GAMES.length), 1, GAMES.length),
            chunk: clamp(Math.floor(Number(els.chunk.value)) || DEFAULTS.batchChunk, 1, 500)
        });
        const updateSummary = () => {
            const { totalHours, count, chunk } = batchInputs();
            const requests = Math.ceil(count / chunk);
            const seconds = Math.max(0, requests - 1) * BATCH_DELAY_MS / 1000;
            els.sHours.textContent = fmt(Math.round(totalHours));
            els.sReq.textContent = fmt(requests);
            els.sTime.textContent = seconds < 60
                ? t("seconds", { count: Math.ceil(seconds) })
                : t("minutes", { count: Math.ceil(seconds / 60) });
            if (!claimRun) els.claimLabel.textContent = t("claim");
        };
        const saveBatchInputs = () => {
            const { totalHours, chunk } = batchInputs();
            settings.batchTotalHours = totalHours;
            settings.batchCount = Math.max(0, Math.floor(Number(els.gameCount.value)) || 0);
            settings.batchChunk = chunk;
            save();
            updateSummary();
        };

        const toggleDrawer = name => {
            const drawer = $(`.drawer[data-drawer="${name}"]`);
            if (!drawer) return;
            const shouldOpen = !drawer.classList.contains("open");
            shadow.querySelectorAll(".drawer").forEach(d => d.classList.remove("open"));
            if (shouldOpen) drawer.classList.add("open");
            const openName = shadow.querySelector(".drawer.open")?.dataset.drawer;
            for (const b of shadow.querySelectorAll(".tool[data-act]")) b.classList.toggle("on", b.dataset.act === openName);
            if (openName === "settings") {
                els.hours.value = settings.batchTotalHours;
                els.gameCount.value = settings.batchCount || "";
                els.chunk.value = settings.batchChunk;
                updateSummary();
            }
        };
        for (const input of [els.hours, els.gameCount, els.chunk]) input.addEventListener("input", saveBatchInputs);
        const actions = {
            stop,
            settings: () => toggleDrawer("settings"),
            minimize: () => { host.classList.add("minimized"); settings.minimized = true; save(); },
            claimAll: () => {
                if (claimRun) {
                    claimRun.cancelled = true;
                    els.claimLabel.textContent = t("stopping");
                    return;
                }
                const { totalHours, count, chunk } = batchInputs();
                const run = claimRun = { cancelled: false };
                const showProgress = (done, total) => {
                    const pct = total ? Math.min(100, (done / total) * 100) : 0;
                    els.progressSlider.value = pct.toFixed(1);
                    els.progressSlider.style.setProperty("--progress", `${pct}%`);
                    els.pLeft.textContent = `${fmt(done)} / ${fmt(total)} ${t("games")}`;
                };
                const finish = (state, label) => {
                    if (claimRun !== run) return;
                    claimRun = null;
                    els.claim.classList.remove("running");
                    els.claim.classList.add(state);
                    els.claimLabel.textContent = label;
                    setTimeout(() => {
                        if (claimRun) return;
                        els.claim.classList.remove("done", "failed");
                        els.progress.classList.remove("show");
                        updateSummary();
                    }, 5000);
                };
                els.claim.classList.remove("done", "failed");
                els.claim.classList.add("running");
                els.claimLabel.textContent = t("claiming");
                els.progress.classList.add("show");
                showProgress(0, count);
                batchClaimAll(totalHours, count, chunk, showProgress, run)
                    .then(n => finish("done", run.cancelled
                        ? t("stopped", { count: fmt(n) })
                        : t("done", { count: fmt(n) })))
                    .catch(error => {
                        console.error("[Game Presence] Batch claim failed:", error);
                        const status = error?.status ? ` · ${error.status}` : "";
                        finish("failed", t("failed", { status }));
                    });
            }
        };
        shadow.addEventListener("click", e => {
            const btn = e.target.closest("[data-act]");
            if (btn) actions[btn.dataset.act]?.();
        });
        $(".mini").addEventListener("click", () => {
            if (suppressMiniClick) {
                suppressMiniClick = false;
                return;
            }
            host.classList.remove("minimized");
            settings.minimized = false;
            save();
        });

        document.body.appendChild(host);

        return {
            waitForMode: () => modePromise,
            setMode(mode) {
                if (mode !== PLAYTIME_MODE) return;
                host.classList.remove("minimized");
                settings.minimized = false;
                save();
                modePicker.hidden = true;
                panel.classList.remove("mode-selecting");
                panel.classList.add("playtime");
                els.headTitle.textContent = PLAYTIME_NAME;
                els.headSubtitle.textContent = PLAYTIME_DESCRIPTION;
                els.count.textContent = PLAYTIME_BADGE;
                toggleDrawer("settings");
            },
            destroy() {
                if (claimRun) claimRun.cancelled = true;
                resolveMode?.(null);
                resolveMode = null;
                host.remove();
            }
        };
    })();

    loadingLock.stop = () => {
        cancelledWhileLoading = true;
        ui.destroy();
    };
    const requestedMode = await ui.waitForMode();
    if (!requestedMode || cancelledWhileLoading || window[LOCK] !== loadingLock) {
        if (window[LOCK] === loadingLock) delete window[LOCK];
        return;
    }

    const runtimeLock = { stop };
    window[LOCK] = runtimeLock;

    ui.setMode(requestedMode);
    window.addEventListener("pagehide", stop, { once: true });

})();
