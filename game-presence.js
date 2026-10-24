void (async () => {
    "use strict";

    const LOCK = "__gamePresence";
    const STORAGE_KEY = "game-presence-v2";

    if (window[LOCK]?.stop) {
        console.warn("[Game Presence] An older instance was found. Stopping it before reload.");
        window[LOCK].stop();
    }

    let cancelledWhileLoading = false;
    const loadingLock = { loading: true, stop: () => { cancelledWhileLoading = true; } };
    window[LOCK] = loadingLock;

    let CATALOG = [
        ["SpeedRunners","259392830932254721"],
        ["Move or Die","343232907390746625"],
        ["Holodrive","346729383693778944"],
        ["GRIP","348146938681622538"],
        ["Hellion","349114016968474626"],
        ["Divinity Original Sin 2","349134787773988865"],
        ["Foxhole","349947310375043074"],
        ["Unturned","351821143981817856"],
        ["Battlerite","352378924317147156"],
        ["League of Legends","356869127241072640"],
        ["PLAYERUNKNOWN'S BATTLEGROUNDS","356873622985506820"],
        ["Counter-Strike: Global Offensive","356875057940791296"],
        ["Overwatch","356875221078245376"],
        ["Minecraft","356875570916753438"],
        ["World of Warcraft","356875762940379136"],
        ["Hearthstone","356875890958925834"],
        ["Dota 2","356875988589740042"],
        ["Grand Theft Auto V","356876176465199104"],
        ["Grand Theft Auto VI","1445160676522856458"],
        ["Tom Clancy's Rainbow Six Siege","356876590342340608"],
        ["Rocket League","356877880938070016"],
        ["Heroes of the Storm","356878860190613504"],
        ["Garry's Mod","356879032584896512"],
        ["H1Z1: King of the Kill","356881342321000448"],
        ["ARK: Survival Evolved","356887282982191114"],
        ["Path of Exile","356888453796986880"],
        ["Team Fortress 2","356888577310851072"],
        ["Rust","356888738724446208"],
        ["World of Tanks","356888961353908224"],
        ["FINAL FANTASY XIV","356889262362329098"],
        ["Geometry Dash","356942674672091136"],
        ["Dolphin","356943187589201930"],
        ["Terraria","356943499456937984"],
        ["Brawlhalla","356944273133928458"],
        ["The Walking Dead","356953358952562688"],
        ["Sonic Mania","356953520278339584"],
        ["Golf With Your Friends","356954034701205504"],
        ["Cities: Skylines","356954111901433856"],
        ["Arma 3","356954176338788352"],
        ["Left 4 Dead 2","356954277803065354"],
        ["Project 64","357606193918771210"],
        ["RuneScape","357606832899883008"],
        ["Dead by Daylight","357607133254254632"],
        ["War Thunder","357607478105604096"],
        ["World of Warships","357607617046249482"],
        ["Duelyst","357706468843061258"],
        ["Battlefield 1","358417041981571082"],
        ["The Binding of Isaac: Rebirth","358420454764969994"],
        ["Black Desert Online","358420844491440148"],
        ["Black Squad","358421399670358026"],
        ["HIVESWAP: ACT 1","358421573071536128"],
        ["Hearts of Iron IV","358421669603311616"],
        ["Monaco","358421725139959808"],
        ["Blade & Soul","358421781398421514"],
        ["Sid Meier's Civilization V","358421904601776138"],
        ["SMITE","358422012990849024"],
        ["Factorio","358422126602223616"],
        ["Diablo III","358425751197974528"],
        ["StarCraft II","358425800766128128"],
        ["The Elder Scrolls V: Skyrim","359507724196773888"],
        ["Tom Clancy's The Division","359507798930751488"],
        ["Don't Starve Together","359508004078616586"],
        ["ShellShock Live","359508342571401216"],
        ["Space Engineers","359508404034600990"],
        ["Euro Truck Simulator 2","359508713658253318"],
        ["Portal 2","359508941782122496"],
        ["The Sims 4","359509007423242240"],
        ["Call of Duty: Black Ops III","359509332490059776"],
        ["Stardew Valley","359509387670192128"],
        ["DARK SOULS III","359509500199436288"],
        ["Counter-Strike: Source","359509666876751872"],
        ["Fallout 4","359509759642042378"],
        ["Fallout: New Vegas","359509858728542208"],
        ["MapleStory","359510095811444736"],
        ["The Witcher 3: Wild Hunt","359510249486417920"],
        ["Half-Life 2","359510373361254400"],
        ["Battlefield 4","359510680459673610"],
        ["XCOM 2","359510740878491658"],
        ["Guild Wars 2","359511228445491200"],
        ["The Elder Scrolls V: Skyrim Special Edition","359801269008859136"],
        ["Tooth and Tail","360541292578471937"],
        ["Outlast","363408634568376320"],
        ["Depth","363408709495291934"],
        ["Tabletop Simulator","363408834095742976"],
        ["Stellaris","363408909962182683"],
        ["Trove","363409000399634432"],
        ["Gang Beasts","363409129643180032"],
        ["The Forest","363409179668512788"],
        ["Insurgency","363409205740175360"],
        ["Europa Universalis IV","363409417632481280"],
        ["Town of Salem","363409453699170304"],
        ["Robocraft","363409532480913408"],
        ["Golf It!","363409575321403402"],
        ["Shadowverse","363409615620407316"],
        ["7 Days to Die","363409643973771264"],
        ["Killing Floor 2","363409749175173120"],
        ["StarCraft","363409793119158272"],
        ["Undertale","363409849859571722"],
        ["Duck Game","363410951518552064"],
        ["Dirty Bomb","363411048713420800"],
        ["Business Tour - Online Multiplayer Board Game","363411278527594516"],
        ["Fallout Shelter","363411364552638464"],
        ["Slime Rancher","363411395854991400"],
        ["Last Man Standing","363411421553360896"],
        ["Titanfall 2","363411468441354240"],
        ["STAR WARS™ Battlefront™","363412167934083072"],
        ["Mount & Blade: Warband","363412302998929418"],
        ["STAR WARS: The Old Republic","363412489599188992"],
        ["PlanetSide 2","363412528308682752"],
        ["Clicker Heroes","363412660680785940"],
        ["Psychonauts","363412675650125825"],
        ["American Truck Simulator","363412692083671040"],
        ["Call of Duty: World at War","363412728888557568"],
        ["Crossout","363412799117852672"],
        ["Dofus","363412841862266880"],
        ["Comedy Night","363413176605212682"],
        ["Enter the Gungeon","363413202090065920"],
        ["Elite Dangerous","363413225578037248"],
        ["Wizard101","363413310474813450"],
        ["AdVenture Capitalist","363413365667921930"],
        ["Age of Empires II: HD Edition","363413389021675530"],
        ["EVE Online","363413402300710912"],
        ["Heat Signature","363413452976553984"],
        ["RimWorld","363413465584500737"],
        ["WarThunder","363413661567680522"],
        ["Rivals of Aether","363413717267906560"],
        ["BeamNG.drive","363413743335374859"],
        ["Subnautica","363413811518242816"],
        ["Sid Meier's Civilization VI","363413834301571072"],
        ["The Elder Scrolls Online","363413894602948608"],
        ["DOOM","363413961967927306"],
        ["FTL: Faster Than Light","363414030188150801"],
        ["Realm of the Mad God","363414084542005258"],
        ["Just Cause 3","363414140502671360"],
        ["Portal","363414173457186826"],
        ["Dead Cells","363414360422612992"],
        ["FIFA 17","363414398129274890"],
        ["DRAGON BALL XENOVERSE 2","363414443129831444"],
        ["Friday the 13th: The Game","363414482615271434"],
        ["Prison Architect","363414635812093962"],
        ["TEKKEN 7","363414667797725184"],
        ["The Escapists 2","363414712186306560"],
        ["Crusader Kings II","363414742661988352"],
        ["Microtransaction Simulator","363414852410015744"],
        ["Middle-earth: Shadow of Mordor","363424997080956928"],
        ["METAL GEAR SOLID V: THE PHANTOM PAIN","363425113879609344"],
        ["Idle Champions of the Forgotten Realms","363425133274333214"],
        ["HuniePop","363425169051615262"],
        ["Ultimate Chicken Horse","363425213905371146"],
        ["NieR:Automata","363425276300099584"],
        ["DARK SOULS II: Scholar of the First Sin","363426741269692416"],
        ["Total War: WARHAMMER II","363426802640617482"],
        ["Skullgirls","363426862363574272"],
        ["Farming Simulator 17","363426921612181504"],
        ["100% Orange Juice","363427044333191169"],
        ["Crypt of the NecroDancer","363427101346627584"],
        ["Call of Duty: Black Ops II","363427270024626176"],
        ["Sonic Adventure 2","363427419249442816"],
        ["Bloons TD Battles","363427491995713536"],
        ["Dishonored","363427574707257354"],
        ["Sven Co-op","363427674309263360"],
        ["Tower Unite","363427800088313856"],
        ["Dying Light","363427839137153024"],
        ["Chivalry: Medieval Warfare","363427969324023808"],
        ["Squad","363428011980357632"],
        ["ASTRONEER","363428060604792832"],
        ["Creativerse","363428103919239168"],
        ["Oddworld: Abe's Oddysee","363428220617621504"],
        ["Tom Clancy's Ghost Recon Wildlands","363428336749379604"],
        ["Warhammer: End Times - Vermintide","363429268577058816"],
        ["BattleBlock Theater","363429294778744832"],
        ["Killing Floor","363429388156403712"],
        ["Kerbal Space Program","363429406376722442"],
        ["Rise of the Tomb Raider","363429423728427008"],
        ["Castle Crashers","363429462076817408"],
        ["Infestation: The New Z","363429491034554368"],
        ["Mirage: Arcane Warfare","363429532377677824"],
        ["Fistful of Frags","363429654540845056"],
        ["STAR WARS™ Battlefront™ II","363429717698936852"],
        ["Cuphead","363430002181668864"],
        ["NARUTO SHIPPUDEN: Ultimate Ninja STORM 4","363430045970071552"],
        ["TERA","363430088521547786"],
        ["Saints Row IV","363430103306338304"],
        ["Absolver","363430239134547978"],
        ["Total War: WARHAMMER","363430260810973194"],
        ["Scrap Mechanic","363430304746176512"],
        ["Oxygen Not Included","363430471322828800"],
        ["Half-Life","363430548028522496"],
        ["Nuclear Throne","363430560942653440"],
        ["No More Room in Hell","363430673694064640"],
        ["The Sims 3","363430739456425994"],
        ["Divinity: Original Sin Enhanced Edition","363430797257998356"],
        ["Ravenfield","363430881811234816"],
        ["Life is Strange","363430904867192832"],
        ["Hollow Knight","363431029484027904"],
        ["Saints Row: The Third","363431107527704576"],
        ["Planet Coaster","363431197960962049"],
        ["Dishonored 2","363431216000532480"],
        ["Clustertruck","363431307629559808"],
        ["Crush Crush","363431341599096842"],
        ["Battlefield 3","363431403469144064"],
        ["World War II Online","363431447119527956"],
        ["Company of Heroes 2","363431541336047616"],
        ["Realm Grinder","363431556301193216"],
        ["Project CARS","363431703504748544"],
        ["Half-Life: C.A.G.E.D.","363431787214536704"],
        ["Guitar Hero III: Legends of Rock","363431817312731136"],
        ["ROBLOX","363445589247131668"],
        ["Grand Theft Auto San Andreas","363447565905166336"],
        ["PAYDAY 2","364785249202208768"],
        ["Ballistic Overkill","365200071941292033"],
        ["Call of Duty®: WWII","365569601993572352"],
        ["osu!","367827983903490050"],
        ["Destiny 2","372438022647578634"],
        ["Hob","372440317493903380"],
        ["Fallout","372825995084038144"],
        ["Middle-earth: Shadow of War","372826898465685519"],
        ["Descenders","375540160571637760"],
        ["Wolfenstein: The New Order","376171871873400832"],
        ["Day of Infamy","376180187806695462"],
        ["Deceit","376180386801123358"],
        ["Darkest Dungeon","376180518749995028"],
        ["Bendy and the Ink Machine","376180724291731472"],
        ["A Hat in Time","376180889010307072"],
        ["Besiege","376181155868966912"],
        ["Life is Strange: Before the Storm","376181248596508672"],
        ["GUNS UP!","376181312890863616"],
        ["AT SUNDOWN: SitD","379732021385232385"],
        ["Warframe Dev","383379166323539969"],
        ["H1Z1","385537545276096522"],
        ["Yu-Gi-Oh! Duel Links","385537699366305792"],
        ["FIFA 18","385537854320934922"],
        ["Sanctum 2","385537957806866432"],
        ["Human: Fall Flat","385538103831429120"],
        ["Watch Dogs","385538279090683924"],
        ["Assassin's Creed Origins","385538388419280896"],
        ["CS2D","385538625221165056"],
        ["Wolfenstein II: The New Colossus","385538682184269834"],
        ["DayZ","385538724592746496"],
        ["Brutal Legend","385538840162467860"],
        ["Zombidle","387375748262002710"],
        ["Shadowrun: Hong Kong","387376045269057564"],
        ["Rising Storm 2: Vietnam","387402304158040074"],
        ["The Bureau: XCOM Declassified","387402716965634066"],
        ["Elsword","387402920238383122"],
        ["Total War: Rome 2","387403734080159763"],
        ["Freddy Fazbear's Pizzeria Simulator","389964632527339534"],
        ["Getting Over It with Bennett Foddy","389968138688659466"],
        ["Guns of Icarus Online","390293569832878098"],
        ["Guns of Icarus Alliance","390293932199772160"],
        ["Zombidle: REMONSTERED","393178973129015328"],
        ["Guns N' Boxes","393511930838515742"],
        ["VRChat","398632010442211348"],
        ["Red Crucible: Firestorm","403373728290963478"],
        ["Assassin's Creed IV Black Flag","406637677199360030"],
        ["Escape from Tarkov","406637848297472017"],
        ["SCP: Secret Laboratory","406637935417622558"],
        ["They Are Billions","406638043894775819"],
        ["The Long Dark","406638150857785344"],
        ["Pokémon Trading Card Game Online","406638244835622912"],
        ["Kingdom: Classic","406638362196312074"],
        ["Don't Starve","406643893007024149"],
        ["GWENT: The Witcher Card Game ","406643974183452681"],
        ["Long Live Santa!","406644036963663890"],
        ["Slay the Spire","406644123832156160"],
        ["Kingdoms and Castles","406645058599780368"],
        ["Northgard","406645134445248530"],
        ["Broforce","406645260987662366"],
        ["CrossFire BR","406645350506561547"],
        ["Neverwinter","406645401437863936"],
        ["Tibia","406645450863804416"],
        ["Papers, Please","406645580375392256"],
        ["Closers","406645631864537088"],
        ["Spore","406645798680657920"],
        ["Plague Inc: Evolved","406645878980476928"],
        ["Borderlands: The Pre-Sequel","406645950782636041"],
        ["Hotline Miami","406646037571436544"],
        ["Homefront","406646102297804826"],
        ["theHunter™: Call of the Wild","406646161563189258"],
        ["Tomb Raider","406646264093212682"],
        ["The Binding of Isaac","406646308309434378"],
        ["We Were Here","406646387875250186"],
        ["This War of Mine","406646471098892298"],
        ["Hotline Miami 2: Wrong Number","406646550731816960"],
        ["Wulverblade","410909667334684672"],
        ["Hand Simulator","418232964783144980"],
        ["Kingdom Come: Deliverance","419267878014025728"],
        ["DRAGON BALL FighterZ","419268865667629056"],
        ["BATTALION 1944","419271532087607296"],
        ["World of Tanks Blitz","419272031960432651"],
        ["던전앤파이터","421150671836938240"],
        ["DARK SOULS™: Prepare To Die Edition","421150676710588416"],
        ["Total War Arena","421150683329462272"],
        ["Doki Doki Literature Club","421150694683312138"],
        ["Borderlands 2","421150698168909834"],
        ["Forsaken Remastered","421798336694059018"],
        ["SoulWorker","421858437039783936"],
        ["Hunt: Showdown","422169383972896768"],
        ["Warframe","422772752647323649"],
        ["Warcraft III","424719708785344525"],
        ["Bastion","425404251292958736"],
        ["Assassin's Creed Chronicles China","425433703041335346"],
        ["Assassin's Creed","425434240784662551"],
        ["Assassin's Creed II","425434695908458519"],
        ["Assassin's Creed III","425434783695503360"],
        ["Assassin's Creed Rogue","425434983080001556"],
        ["Assassin's Creed Unity","425435152634609664"],
        ["Assassin's Creed Brotherhood","425435232788021258"],
        ["Assassin's Creed Revelations","425436928041680931"],
        ["Batman: Arkham Knight","425437076188561408"],
        ["Batman: Arkham Origins","425437243822571550"],
        ["Batman: Arkham VR","425437344758366216"],
        ["Beyond Good and Evil","425437404854222858"],
        ["F.E.A.R.","425437484735004682"],
        ["F.E.A.R. 2: Project Origin","425437598836719616"],
        ["F.E.A.R. 3","425437856169721856"],
        ["Far Cry","425437906363219968"],
        ["Far Cry 2","425437961669181477"],
        ["Far Cry 4","425438134709518336"],
        ["Far Cry Primal","425438207631556608"],
        ["For Honor","425438403819995145"],
        ["Injustice: Gods Among Us Ultimate Edition","425438526491066388"],
        ["Just Dance 2017","425438596883939328"],
        ["LEGO® The Hobbit™","425439134551900190"],
        ["LEGO® Worlds","425439198733008896"],
        ["Mad Max","425439256001904650"],
        ["Mortal Kombat Komplete Edition","425439413972238366"],
        ["Mortal Kombat X","425439470075117573"],
        ["Rayman Legends","425439545983500288"],
        ["Rayman Origins","425439593882714133"],
        ["Rocksmith 2014","425439633917214720"],
        ["Scribblenauts Unlimited","425439683938353162"],
        ["Steep","425439790746566666"],
        ["The Crew","425439876939382804"],
        ["The LEGO® Movie - Videogame","425439950553481216"],
        ["Tom Clancy's Ghost Recon Future Soldier","425440004983226378"],
        ["Tom Clancy's Splinter Cell","425440094263050250"],
        ["Tom Clancy's Splinter Cell Blacklist","425440144829448192"],
        ["Trackmania Turbo","425440195966664704"],
        ["Trials Fusion","425440259539599390"],
        ["Watch_Dogs","425440319509626881"],
        ["Watch_Dogs 2","425440363688493066"],
        ["Darksiders Warmastered Edition","425440430772060160"],
        ["ELEX","425440477882351626"],
        ["Fade to Silence","425440525286637577"],
        ["Impossible Creatures","425440563337232394"],
        ["Ori and the Blind Forest: Definitive Edition","425440642173239296"],
        ["Red Faction","425440700335915028"],
        ["SpellForce 2 - Anniversary Edition","425440739166650368"],
        ["The Guild 3","425440832238387200"],
        ["Firewatch","425440941793345536"],
        ["The Witness","425441014292152320"],
        ["The Talos Principle","425441094482919464"],
        ["The Surge","425441321512075264"],
        ["Rebel Galaxy","425441408242155530"],
        ["Fractured Space","425441448410873866"],
        ["Planetary Annihilation: TITANS","425441516354273280"],
        ["Hyper Light Drifter","425441571656433664"],
        ["Stonehearth","425441650878316564"],
        ["Obduction","425441688152965142"],
        ["Shovel Knight","425441726736629760"],
        ["Battle Chasers: Nightwar","425441774450901002"],
        ["Wolcen: Lords of Mayhem","425441823754813455"],
        ["Planet Nomads","425441961877700618"],
        ["Agents of Mayhem","425442005766766592"],
        ["Dead Island Definitive Edition","425442043616034816"],
        ["Dead Island Riptide Definitive Edition","425442091666243594"],
        ["DiRT 4","425442140731080704"],
        ["F1 2016","425442173559767040"],
        ["F1 2017","425442216639725578"],
        ["Homefront: The Revolution","425442258020597760"],
        ["Metro 2033 Redux","425442324495990784"],
        ["Metro: Last Light Redux","425442388270645248"],
        ["Micro Machines World Series","425442430922391552"],
        ["Mighty No. 9","425442465244250132"],
        ["Risen","425442503198769152"],
        ["Ryse: Son of Rome","425442538288185344"],
        ["Saints Row 2","425442587508211712"],
        ["Bridge Constructor","425442642680348692"],
        ["Bridge Constructor Portal","425442712095948800"],
        ["Dead Age","425442752562462720"],
        ["SEUM: Speedrunners from Hell","425442824134328320"],
        ["BioShock 2","425442925967573002"],
        ["BioShock™ 2 Remastered","425442965255880704"],
        ["BioShock Infinite","425442995681230858"],
        ["BioShock™ Remastered","425443045417156618"],
        ["Borderlands","425443081916252160"],
        ["Mafia","425443205195104277"],
        ["Mafia II","425443244285886494"],
        ["Mafia III","425443292831023113"],
        ["Sid Meier's Civilization: Beyond Earth","425443404277743616"],
        ["WWE 2K18","425443442181537792"],
        ["Deponia","425443478525444106"],
        ["Shadow Tactics: Blades of the Shogun","425443548079456285"],
        ["Silence","425443601154048020"],
        ["Kingdom: New Lands","425443637892218890"],
        ["GoNNER","425443673698861066"],
        ["Guild of Dungeoneering","425443709958488064"],
        ["Antihero","425443745866186752"],
        ["Let Them Come","425443777621131264"],
        ["LEGO® STAR WARS™: The Force Awakens","425443938271363095"],
        ["LEGO® MARVEL's Avengers","425449323346657290"],
        ["LEGO® Jurassic World","425450411391057950"],
        ["From Dust","425450802316967956"],
        ["Rocksmith","425450896877420565"],
        ["Tom Clancy's Ghost Recon","425451104117981184"],
        ["ArcaniA","425451163807383552"],
        ["MX vs. ATV Unleashed","425451199756632084"],
        ["The Dwarves","425451237387796490"],
        ["Sunless Skies","425451303985217536"],
        ["Deadlight: Director's Cut","425451345865211904"],
        ["Sacred 3","425451387724234752"],
        ["Trainz: A New Era","425451439318630424"],
        ["The Inner World","425451474122833930"],
        ["Assassin's Creed Freedom Cry","425453860392402964"],
        ["Assassin's Creed Syndicate","425453938582487068"],
        ["Bloody Good Time","425453978114064424"],
        ["Far Cry 3 Blood Dragon","425454019205529600"],
        ["I Am Alive","425454053795823626"],
        ["Prince of Persia","425454114999369728"],
        ["Black Mirror","425454162705252372"],
        ["Darksiders II: Deathinitive Edition","425454199371726858"],
        ["Delta Force: Land Warrior","425454276719017994"],
        ["Full Spectrum Warrior","425454306737520650"],
        ["Full Spectrum Warrior: Ten Hammers","425454342888488960"],
        ["Men of Valor","425454383820570664"],
        ["Nexus: The Jupiter Incident","425454420289912832"],
        ["Sine Mora EX","425454457434931200"],
        ["Sphinx and the Cursed Mummy","425454500883595264"],
        ["The Book of Unwritten Tales 2","425454534907658240"],
        ["The Guild Gold Edition","425454572778291210"],
        ["Homesick","425454613827813376"],
        ["Shroud of the Avatar","425454648623628288"],
        ["Descent: Underground","425454679854678036"],
        ["Escape Dead Island","425454719817875456"],
        ["Bridge Constructor Medieval","425454757130272768"],
        ["Bridge Constructor Playground","425454789405704202"],
        ["Bridge Constructor Stunts","425454826042818590"],
        ["Deadly 30","425454866014404618"],
        ["Dub Dash","425454898759598080"],
        ["Looterkings","425454939452604436"],
        ["Pixel Heroes: Byte & Magic","425454980489543680"],
        ["Rockfest","425455011221471232"],
        ["Slime-san","425455040082345984"],
        ["A New Beginning - Final Cut","425455073661812766"],
        ["AER Memories of Old","425455104632815636"],
        ["Anna's Quest","425455138459746304"],
        ["Blackguards","425455172714496015"],
        ["Blackguards 2","425455204218175498"],
        ["Crazy Machines 3","425455241597681664"],
        ["Edna & Harvey: Harvey's New Eyes","425455277337214976"],
        ["Edna & Harvey: The Breakout","425455323646787584"],
        ["Journey of a Roach","425455356181872640"],
        ["Ken Follett's The Pillars of the Earth","425455393401995264"],
        ["Memoria","425455438050623498"],
        ["Munin","425455471172911104"],
        ["Shooting Stars!","425455505331191808"],
        ["The Dark Eye: Chains of Satinav","425455537803755530"],
        ["The Long Journey Home","425455571869761536"],
        ["The Night of the Rabbit","425455612508241920"],
        ["The Whispered World Special Edition","425455671052599296"],
        ["Kathy Rain","425455715205906432"],
        ["Uurnog Uurnlimited","425455750031081472"],
        ["Dandara","425455780360355850"],
        ["Armikrog","425455814497665034"],
        ["Toren","425455851243831296"],
        ["Call of Juarez - Gunslinger","425456506431995914"],
        ["Trials of the Blood Dragon","425456603765145656"],
        ["Delta Force: Task Force Dagger","425456638154113044"],
        ["Lock's Quest","425456670362042368"],
        ["Rad Rodgers","425456700640985108"],
        ["Tachyon: The Fringe","425456735050924032"],
        ["The Book of Unwritten Tales: The Critter Chronicles","425456762569621514"],
        ["Inside","425456795683913750"],
        ["The Universim","425456822258892810"],
        ["Lost Horizon","425456853070118922"],
        ["Grotesque Tactics: Evil Heroes","425456981332197386"],
        ["In Between","425457045098070026"],
        ["Meridian: New World","425457072818094080"],
        ["Safety First!","425457108167950346"],
        ["Townsmen","425457401769099297"],
        ["Viking Rage","425457433565986838"],
        ["Windscape","425457461731000320"],
        ["Assassin's Creed Liberation HD","425457838731690003"],
        ["Justice League VR: The Complete Experience","425457887339348005"],
        ["South Park The Stick of Truth","425457961574596608"],
        ["Battle Worlds: Kronos","425458030537211904"],
        ["Overclocked: A History of Violence","425458153262546944"],
        ["SuperPower 2","425458179539730462"],
        ["This is the Police","425458210175188992"],
        ["Superhot","425458238595661854"],
        ["Lost Horizon 2","425458269360750592"],
        ["Metro Redux","425458328278401044"],
        ["Secret Files 3","425458354756911104"],
        ["Clouds & Sheep 2","425458381835206656"],
        ["Future Wars","425458408037285888"],
        ["Game Royale 2 - The Secret of Jannis Island","425458432569638912"],
        ["Greed: Black Border","425458464714653696"],
        ["Holy Avatar vs. Maidens of the Dead","425458490878984192"],
        ["Meridian: Squad 22","425458524865298432"],
        ["Race.a.bit","425458558620925982"],
        ["Shiny The Firefly","425458574731509760"],
        ["Skilltree Saga","425458587985379328"],
        ["SoulCraft","425458618108739614"],
        ["Stellar Impact","425458648006000640"],
        ["Subsiege","425458682566934538"],
        ["Super Treasure Arena","425458718537154560"],
        ["Trapped Dead: Lockdown","425458758504939540"],
        ["TRISTOY","425458781451845632"],
        ["Trulon: The Shadow Engine","425458804868513802"],
        ["Twin Sector","425458819636920320"],
        ["Gotham City Impostors Free to Play","425459839494389780"],
        ["Heroes of Might and Magic III HD","425459913200762889"],
        ["Might and Magic - Heroes V","425460002761998347"],
        ["LEGO® Batman 2 DC Super Heroes™","425460322619490304"],
        ["LEGO Batman","425460379624144925"],
        ["LEGO Harry Potter: Years 1-4","425460457558769674"],
        ["Scribblenauts Unmasked: A DC Comics Adventure","425460538110246912"],
        ["Silent Hunter 3","425460595718881280"],
        ["South Park Fractured But Whole","425460666930036736"],
        ["Lord of the Rings: War in the North","425460776195719168"],
        ["Tom Clancy's Rainbow Six 3","425460908345524224"],
        ["Tom Clancy's Rainbow Six Vegas","425460989602037770"],
        ["Tom Clancy's Rainbow Six Vegas II","425470018130673664"],
        ["Tom Clancy's Splinter Cell Chaos Theory","425470107368554504"],
        ["The Guild 2 Renaissance","425470196439056391"],
        ["Soma","425470408322449418"],
        ["Hellblade","425470569698557962"],
        ["DiRT Rally","425471119068364819"],
        ["Killer Is Dead - Nightmare Edition","425471324073230336"],
        ["Saints Row: Gat out of Hell","425471448782733331"],
        ["The Banner Saga","425471698284970020"],
        ["Trackmania United Forever","425709280725958689"],
        ["Trials Evolution","425709676965920788"],
        ["Neighbours From Hell Compilation","425709808705077272"],
        ["The Guild II","425710142252777508"],
        ["The Flame in the Flood","425713116903505930"],
        ["Dreamfall Chapters: The Longest Journey","425713647222784010"],
        ["Risen 3 - Titan Lords","425714129152770048"],
        ["Sacred 2 Gold","425714299877589002"],
        ["Deponia: The Complete Journey","425714472997355560"],
        ["Chaos on Deponia","425714655726665788"],
        ["The Banner Saga 2","425722711180967946"],
        ["Tormentor❌Punisher","425723123187449856"],
        ["Assassin’s Creed® Chronicles: India","425725558626844702"],
        ["Batman: Arkham Asylum GOTY Edition","425727574539370529"],
        ["Brothers in Arms: Road to Hill 30","425727812490493972"],
        ["Call of Juarez: Bound in Blood","425728267123949578"],
        ["Child of Light","425728327505018921"],
        ["Prince of Persia: The Sands of Time","425728421788909568"],
        ["Prince of Persia: Warrior Within","425728459600429056"],
        ["Silent Hunter 5: Battle of the Atlantic","425728548586913812"],
        ["Silent Hunter: Wolves of the Pacific","425728586192912384"],
        ["The Lord of the Rings: War in the North","425728616450490368"],
        ["Delta Force: Black Hawk Down","425731190570483757"],
        ["Painkiller: Black Edition","425731299936960512"],
        ["SpellForce: Platinum Edition","425731382820470824"],
        ["The Guild II - Pirates of the European Seas","425731435929010195"],
        ["Codename CURE","425748063416483870"],
        ["Dungeon Defenders II","425748090889175050"],
        ["Cry of Fear","425748259408183306"],
        ["Blackwake","425748296854667264"],
        ["Age of Empires® III: Complete Collection","425748312143167498"],
        ["Far Cry® 3","425748544134053888"],
        ["Football Manager 2018","425748782978826254"],
        ["Total War: ATTILA","425748853132754945"],
        ["FINAL FANTASY XV WINDOWS EDITION","425748942676819968"],
        ["Evolve Stage 2","425748985517703188"],
        ["Total War: SHOGUN 2","425749196403114024"],
        ["Into the Breach","425749372332933120"],
        ["Alien Swarm: Reactive Drop","425749425168580608"],
        ["TrackMania Nations Forever","425749438573707264"],
        ["Left 4 Dead","425749516583698432"],
        ["Amnesia: The Dark Descent","425749626671595520"],
        ["Game Dev Tycoon","425749842451496961"],
        ["Banished","425750064963780628"],
        ["Of Guards And Thieves","425750237534224394"],
        ["Who's Your Daddy","425751000477990922"],
        ["FINAL FANTASY XV WINDOWS EDITION PLAYABLE DEMO","425751261095264276"],
        ["Call of Duty: Modern Warfare 2","425777093628919828"],
        ["Torchlight II","425777164361793547"],
        ["Super Meat Boy","425777385103949834"],
        ["Men of War: Assault Squad 2","425777482860331018"],
        ["Darwin Project","425777491068715018"],
        ["Hyper Universe","425777540263837706"],
        ["Grim Dawn","425777682135908352"],
        ["Rising Storm/Red Orchestra 2 Multiplayer","425777721159974922"],
        ["Fishing Planet","425777941499215872"],
        ["Assetto Corsa","425778010222886912"],
        ["Aim Hero","425778246941016064"],
        ["Source Filmmaker","425778288661757952"],
        ["Poly Bridge","425778516320059392"],
        ["DiRT 3 Complete Edition","425778620187803658"],
        ["Goat Simulator","425778678723510302"],
        ["Risk of Rain","425779272842608670"],
        ["BombTag","425779854332657694"],
        ["Miscreated","425779909835751424"],
        ["theHunter Classic","425781960317861888"],
        ["Cortex Command","425787524737269770"],
        ["METAL GEAR SURVIVE BETA","425800674568044575"],
        ["Block N Load","426524547177512960"],
        ["Lethal League","426524717919240202"],
        ["Sniper Elite 4","426524936060928011"],
        ["Endless Space 2","426524963583950868"],
        ["Dead Maze","426524991379603458"],
        ["World of Warcraft Public Test","426525131276550144"],
        ["Sniper Elite 3","426525148892495882"],
        ["Magicka","426525158627606568"],
        ["Street Fighter V","426525250549973022"],
        ["Dead Space™","426525408666583050"],
        ["Superflight","426525741702709258"],
        ["The Witcher 2: Assassins of Kings Enhanced Edition","426525754092814346"],
        ["Spintires","426525833281404928"],
        ["Blood and Bacon","426526253294551046"],
        ["Car Mechanic Simulator 2018","426526355564265479"],
        ["Dragon's Dogma: Dark Arisen","426526490042302464"],
        ["Project Zomboid","426526722322726912"],
        ["Hero Siege","426526773694431233"],
        ["POSTAL 2","426527481122521098"],
        ["SNOW","426527534268809226"],
        ["Real Pool 3D - Poolians","426528563919978496"],
        ["Bloons TD5","426528712348139520"],
        ["Deus Ex: Mankind Divided™","426529450910547968"],
        ["Keep Talking and Nobody Explodes","426531471520563211"],
        ["Age of Mythology: Extended Edition","427033332065370132"],
        ["F1 2015","427304691903365120"],
        ["Overcooked","428052640740540416"],
        ["The Witcher: Enhanced Edition","428052689641930752"],
        ["PickCrafter","428052738140798976"],
        ["Need for Speed™ Most Wanted","428052828242706433"],
        ["Just Survive","428053249120010241"],
        ["One Finger Death Punch","428053322000367616"],
        ["The Elder Scrolls: Legends","428053383178354688"],
        ["Pit People","428053560304074752"],
        ["Magic Duels","428053651932577792"],
        ["STAR WARS™ Knights of the Old Republic™ II: The Sith Lords™","428053722300416010"],
        ["Tree of Savior (English Ver.)","428053768630960128"],
        ["Toribash","428054001502650368"],
        ["STAR WARS™ Jedi Knight: Jedi Academy™","428054061502300160"],
        ["Deep Rock Galactic","428054228511227914"],
        ["Stranded Deep","428054462892867614"],
        ["Hunt: Showdown (Test Server)","428054629146951691"],
        ["Eco","428055174905331712"],
        ["Hide and Shriek","428055329004191744"],
        ["APB Reloaded","428055627030331402"],
        ["Call of Duty: Black Ops","428055652162732032"],
        ["Prey","428055981650608128"],
        ["Metro Conflict: The Origin","428056164698423296"],
        ["Spelunky","428056413806395392"],
        ["Medieval II: Total War","428057046701572106"],
        ["Magicka 2","428057934983987200"],
        ["UNO","428058887334264832"],
        ["Nioh: Complete Edition","428059098882506752"],
        ["Warhammer 40,000: Dawn of War III","428060042248454144"],
        ["Fortnite","432980957394370572"],
        ["Unleash","437391104804126720"],
        ["Estranged: The Departure","443136903814971445"],
        ["Archeage","443155983670312969"],
        ["WAKFU","443155990414622730"],
        ["Microsoft Flight Simulator X: Steam Edition","443156007544160276"],
        ["Darwin Project","443156037130780692"],
        ["Mitos.is: The Game","443156048992403456"],
        ["Genital Jousting","443156066562473993"],
        ["Universe Sandbox","443156067434889236"],
        ["Aura Kingdom","443156075399872522"],
        ["Far Cry 5","443156340454457344"],
        ["The Darkness II","443156342115663882"],
        ["STAR WARS™ Empire at War: Gold Pack","443156343227023370"],
        ["BLOCKADE 3D","443156392874868767"],
        ["MINDNIGHT","443156444351561738"],
        ["Zombie Panic! Source","443156570847838218"],
        ["Just Cause™ 3: Multiplayer Mod","443156876931235840"],
        ["SimCity™","443157047157194772"],
        ["Frostpunk","443157248710148117"],
        ["Hurtworld","443157375260688395"],
        ["Modern Combat Versus","443157946357252116"],
        ["Quantum Break","443158005798928384"],
        ["The Jackbox Party Pack 3","443158085247303690"],
        ["Tropico 5","443158178083897375"],
        ["Radical Heights","443158281624617000"],
        ["My Summer Car","443158342026788884"],
        ["Spec Ops: The Line","443158504719646739"],
        ["Friday the 13th: Killer Puzzle","443158817983692820"],
        ["Verdun","443159293538205697"],
        ["World of Guns: Gun Disassembly","443159499512086539"],
        ["No Man's Sky","443159611479031808"],
        ["Ylands","443159628185075722"],
        ["RESIDENT EVIL 7 biohazard / BIOHAZARD 7 resident evil","443160369192632330"],
        ["BATTLETECH","443160562088673285"],
        ["Super Hexagon","443161212969156608"],
        ["PixARK","443165450424156160"],
        ["Spiral Knights","443168429990477844"],
        ["Satellite Reign","443198577687134218"],
        ["Pillars of Eternity","443198850119892992"],
        ["Conan Exiles","443524051999260672"],
        ["TrackMania² Stadium","444200321179451412"],
        ["Need for Speed™","444540143890726940"],
        ["Day of Defeat: Source","444720426934075393"],
        ["Dungeon of the Endless","444853958977126400"],
        ["Endless Legend","445329750819602433"],
        ["DEEP SPACE WAIFU","445783564257067008"],
        ["Surviving Mars","445996079352250368"],
        ["Dragon Age™: Inquisition","446061700496621578"],
        ["Mass Effect™: Andromeda","446061836807307301"],
        ["CrossFire","446061929283321856"],
        ["Toontown Rewritten","446062074842447909"],
        ["Survarium","446062275925770270"],
        ["Plants vs Zombies GW2","446063035057045534"],
        ["Project64","446063198198693898"],
        ["Armored Warfare","446063355594145823"],
        ["The Expendabros","446069736250277888"],
        ["Mount Your Friends","446105070057029663"],
        ["Project CARS 2","446380370733039616"],
        ["Shakes and Fidget","447038538383622145"],
        ["SAS: Zombie Assault 4","447184346252836864"],
        ["Awesomenauts","447488337519968257"],
        ["Yume Nikki","447509870510473216"],
        ["Holdfast: Nations At War","447728433037049876"],
        ["Learn to Fly 3","447743861549432833"],
        ["Stories: The Path of Destinies","448044587580260363"],
        ["Layers of Fear","448120144775086080"],
        ["Star Trek Online","448384255131779073"],
        ["Minion Masters","448417850466762753"],
        ["Warhammer 40,000: Dawn of War - Soulstorm","448448339386695690"],
        ["Ultimate Epic Battle Simulator","448537306345898014"],
        ["TerraTech","448560544778289152"],
        ["AirMech Strike","448622851386376202"],
        ["Spintires: MudRunner","448910307969204236"],
        ["Alien Swarm","449531408730423296"],
        ["Hacknet","449639683740270612"],
        ["Quake Champions","449682899596214283"],
        ["Iron Snout","449684687011708928"],
        ["DARK SOULS™: REMASTERED","449738622619353088"],
        ["Raft","449806905901056012"],
        ["Dungreed","449885746799575040"],
        ["Grand Theft Auto IV","450005834672373760"],
        ["Synergy","450021409700446208"],
        ["Wizard of Legend","450024058348634112"],
        ["Kritika Online","450129940051001354"],
        ["Mirror's Edge","450145899063017492"],
        ["Car Mechanic Simulator 2015","450273108859813888"],
        ["Double Action: Boogaloo","450292948911915008"],
        ["STAR WARS™: Knights of the Old Republic™","450293931301666826"],
        ["The Stanley Parable","450401603669721089"],
        ["Tyranny","450668558465368074"],
        ["Empyrion - Galactic Survival","450804667748843520"],
        ["Bless Online","451132630390538270"],
        ["60 Seconds!","451336909831012383"],
        ["The Escapists","451429730416197669"],
        ["Dauntless","451468933057347603"],
        ["Dragon Age: Origins - Ultimate Edition","451538960305618952"],
        ["Total War Saga: Thrones of Britannia","451539017381576704"],
        ["OKAMI HD / 大神 絶景版","451539083966283776"],
        ["AdVenture Communist","451539129973604352"],
        ["Governor of Poker 3","451539151678865409"],
        ["Worms Revolution","451539172763762688"],
        ["L.A. Noire","451539180682739732"],
        ["The Elder Scrolls III: Morrowind","451539197044719616"],
        ["Armello","451539293173841949"],
        ["NBA 2K18","451539322965852185"],
        ["MechWarrior Online","451539349142634496"],
        ["Resident Evil 5 / Biohazard 5","451539402896703490"],
        ["House Flipper","451539472610492426"],
        ["Sleeping Dogs: Definitive Edition","451539490574434315"],
        ["FINAL FANTASY VII","451539606207463424"],
        ["Heroes of Hammerwatch","451539639811964928"],
        ["Youtubers Life","451539649656127488"],
        ["resident evil 4 / biohazard 4","451539772037398560"],
        ["State of Decay: Year-One","451539805860528128"],
        ["Argo","451539926417408000"],
        ["ESEA","451539971283877888"],
        ["Zombie Army Trilogy","451539976908439552"],
        ["Call of Duty: Modern Warfare 3","451539986144296969"],
        ["Horizon Source","451540115437912064"],
        ["Yet Another Zombie Defense","451540166037995532"],
        ["CPUCores :: Maximize Your FPS","451540177131798541"],
        ["Wargame: Red Dragon","451540284006858772"],
        ["Resident Evil 6 / Biohazard 6","451540292458512394"],
        ["CastleMiner Z","451540363941904385"],
        ["The Lord of the Rings Online™","451540469470593024"],
        ["For The King","451540626270584833"],
        ["Just Cause 2","451540656494477312"],
        ["Gigantic","451540746592321536"],
        ["Dawn of War II - Retribution","451540774530711572"],
        ["Paint the Town Red","451540782785101834"],
        ["Black Mesa","451540911172747284"],
        ["Vindictus","451541058497675294"],
        ["Batman: Arkham City GOTY","451541064545861632"],
        ["Night in the Woods","451541089912881162"],
        ["Door Kickers","451541104643538944"],
        ["WARMODE","451541174877159430"],
        ["Sniper Ghost Warrior 2","451541277935140874"],
        ["Battlefield: Bad Company 2","451541573742755850"],
        ["LIMBO","451541581778911262"],
        ["HELLDIVERS™","451541695771967508"],
        ["Teeworlds","451541853418815498"],
        ["Moonbase Alpha","451541936872882186"],
        ["McOsu","451541958268157952"],
        ["Loading Screen Simulator","451542208257064961"],
        ["STAR WARS™ Republic Commando","451542291635503124"],
        ["The Lab","451542394857455638"],
        ["Citra","451542523219935272"],
        ["Sword Art Online: Fatal Bullet","451542793513598996"],
        ["Bit Heroes","451542845703061524"],
        ["Orcs Must Die! 2","451543160057888778"],
        ["DC Universe Online","451543277385023488"],
        ["GUILTY GEAR Xrd -REVELATOR-","451543838847139850"],
        ["Battle Royale Trainer","451543838989746186"],
        ["Rise of Nations: Extended Edition","451543839665160232"],
        ["The Jackbox Party Pack 2","451543877111775247"],
        ["Aion","451543892358201393"],
        ["Alien: Isolation","451543893050261504"],
        ["Sins of a Solar Empire: Rebellion","451543958611427328"],
        ["DRAGON BALL XENOVERSE","451543960167514112"],
        ["Supreme Commander: Forged Alliance","451543961207701534"],
        ["Spellsworn","451544008737423360"],
        ["Mass Effect™ 3","451544148617592832"],
        ["SUPERHOT VR","451544150756556810"],
        ["Black Desert Online SA","451544197632229376"],
        ["Grand Theft Auto: Vice City","451544294432702474"],
        ["Digimon Masters Online","451544305509859328"],
        ["Mirror's Edge™ Catalyst","451544331287789568"],
        ["ANNO 2070","451544339416481828"],
        ["Life is Feudal: MMO","451544345699549194"],
        ["Faeria","451544379908423680"],
        ["Everlasting Summer","451544422711033856"],
        ["Dark and Light","451544430025900062"],
        ["Steel Division: Normandy 44","451544463941304350"],
        ["Amnesia: A Machine for Pigs","451544639674253322"],
        ["RWBY: Grimm Eclipse","451544645852332032"],
        ["DmC Devil May Cry","451544650009018368"],
        ["Supreme Commander 2","451544676458037258"],
        ["Deus Ex: Human Revolution - Director's Cut","451544688713793536"],
        ["FreeStyle 2: Street Basketball","451544694267183104"],
        ["Furi","451544694598533120"],
        ["Ultra Street Fighter IV","451544694917169162"],
        ["RIFT","451544729763446784"],
        ["OneShot","451544770876145664"],
        ["High Octane Drift","451544776895103006"],
        ["RUINER","451544819555237888"],
        ["PHANTASY STAR ONLINE 2","451544889331679242"],
        ["Sword With Sauce: Alpha","451544945984012288"],
        ["Mass Effect™","451544965542182942"],
        ["Turmoil","451545009938759710"],
        ["Worms Armageddon","451545039139766272"],
        ["Pillars of Eternity II: Deadfire","451545069326041099"],
        ["PC Building Simulator","451545070739652608"],
        ["Streets of Rogue","451545147361067008"],
        ["Hitman: Absolution","451545240264769547"],
        ["Football Manager 2017","451545279154487306"],
        ["Atlas Reactor","451545283784998934"],
        ["Max Payne 3","451545305201246208"],
        ["S.T.A.L.K.E.R.: Shadow of Chernobyl","451545336218124289"],
        ["Rec Room","451545342987468800"],
        ["My Time At Portia","451545373740367881"],
        ["Lost Castle","451545409253408768"],
        ["Soda Dungeon","451545721036996619"],
        ["Fallout 3","451545729253638144"],
        ["RUNNING WITH RIFLES","451545786946289664"],
        ["Emily is Away","451545806806319104"],
        ["Tactical Monsters Rumble Arena","451545859830710272"],
        ["PAYDAY: The Heist","451546040382914567"],
        ["Brick Rigs","451546081243824131"],
        ["Star Conflict","451546138999390208"],
        ["AdventureQuest 3D","451546156024201217"],
        ["Bayonetta","451546169685049344"],
        ["Boring Man - Online Tactical Stickman Combat","451546227696205844"],
        ["Mass Effect™ 2","451546229252554752"],
        ["Shadow Warrior 2","451546331639709706"],
        ["DARK SOULS™ II","451546403764830218"],
        ["Empire: Total War","451546468763959326"],
        ["Burnout Paradise: The Ultimate Box","451546473801187348"],
        ["Supraball","451546491866316800"],
        ["Desolate","451546514775474195"],
        ["Arma 2: Operation Arrowhead","451546514943377438"],
        ["MU Legend","451546558706614292"],
        ["House Party","451546699177918464"],
        ["Relic Hunters Zero","451546725606359050"],
        ["EverQuest","451546783668109322"],
        ["WildStar","451546896167731220"],
        ["Spooky's Jump Scare Mansion","451546955513069594"],
        ["S.T.A.L.K.E.R.: Call of Pripyat","451547035104051200"],
        ["Forts","451547094121971712"],
        ["Heroes of Newerth","451547098916192284"],
        ["Osiris: New Dawn","451547204340023296"],
        ["Shadow Warrior","451547262418419712"],
        ["America's Army: Proving Grounds","451547323596537866"],
        ["AION Free-to-Play","451547384975982602"],
        ["Stronghold Crusader 2","451547401594077184"],
        ["Owlboy","451547470967865345"],
        ["Reigns","451547889982898176"],
        ["Zula Online","451547924531249152"],
        ["Tales of Berseria","451548231223214080"],
        ["Shooty Skies","451548290740387850"],
        ["HunieCam Studio","451548751010725888"],
        ["Bomber Crew","451548752046587915"],
        ["Line of Sight","451548957361831946"],
        ["S.K.I.L.L. - Special Force 2","451549001511075860"],
        ["Mini Metro","451549165361823769"],
        ["ORION: Prelude","451549177885753345"],
        ["Tricky Towers","451549293946470400"],
        ["Surgeon Simulator","451549334320971776"],
        ["The Jackbox Party Pack 4","451549336996806676"],
        ["Contagion","451549440734658560"],
        ["SimplePlanes","451549534993252362"],
        ["RPG Maker MV","451549964422873088"],
        ["FEZ","451550717673472030"],
        ["Five Nights at Freddy's","451550771193053194"],
        ["Injustice™ 2","451551201604141056"],
        ["Eternal Card Game","451551225968853012"],
        ["CarX Drift Racing Online","451551359393595412"],
        ["The Evil Within 2","451551873581711360"],
        ["Death Road to Canada","451551950937260032"],
        ["Totally Accurate Battle Zombielator","451551980108906496"],
        ["Mount & Blade: With Fire and Sword","451552014883880980"],
        ["Secret World Legends","451552107825201152"],
        ["Victoria II","451552374423552000"],
        ["Call to Arms","451552458083270676"],
        ["Mirror","451552550446170113"],
        ["LEGO® Star Wars™: The Complete Saga","451552771045457920"],
        ["Just Fishing","451553376803487744"],
        ["Domina","451553701404999700"],
        ["Quake Live","451553710275821568"],
        ["Orcs Must Die!","451554260262322176"],
        ["Loadout","451555691836997643"],
        ["Farming Simulator 15","451556128992657418"],
        ["Rome: Total War","451557091279372298"],
        ["Fallout 4 VR","451557388504530945"],
        ["Magicite","451559209893363712"],
        ["Bully: Scholarship Edition","451560105008431124"],
        ["Nidhogg","451561653570502656"],
        ["Black Survival","451561708461359124"],
        ["FORTIFY","451563408794320906"],
        ["Avorion","451563448015519744"],
        ["Serious Sam 3: BFE","451564621422395392"],
        ["Gold Rush: The Game","451564928868941824"],
        ["The Red Solstice","451565617162747904"],
        ["Ni no Kuni™ II: Revenant Kingdom","451572281584648202"],
        ["Rock of Ages 2","451584845898842112"],
        ["Skyforge","451598719498846218"],
        ["Meteor 60 Seconds!","451604801248034836"],
        ["Yu-Gi-Oh! Legacy of the Duelist","451686854597672970"],
        ["Beat Saber","451991967149195264"],
        ["SpellForce 3","452001740431163402"],
        ["Titan Quest Anniversary Edition","452029545843785730"],
        ["SEGA Mega Drive & Genesis Classics","452099265230274571"],
        ["PUBG: Test Server","452140668265955339"],
        ["Overgrowth","452205639347994656"],
        ["Dream Daddy: A Dad Dating Simulator","452206598283198504"],
        ["Kingdoms of Amalur: Reckoning™","452276290385346589"],
        ["Star Citizen","452295596917784577"],
        ["Need for Speed: Hot Pursuit","452295877978095646"],
        ["Battlefield™ Hardline","452296074762256393"],
        ["World of Warplanes","452296290940878848"],
        ["Train Simulator","452313101539475456"],
        ["Tiger Knight","452944801952694282"],
        ["Ball 3D: Soccer Online","453374517864169477"],
        ["Passpartout: The Starving Artist","453677781511831572"],
        ["Monster Prom","453680460304875531"],
        ["Totally Accurate Battlegrounds","453818237508124692"],
        ["Vampyr","454123972343365652"],
        ["Outlast 2","454411001492668417"],
        ["Portal Knights","454600052904820736"],
        ["Fortified","454713992322220032"],
        ["TOXIKK","454731115027103759"],
        ["Battle Carnival","454759028187463700"],
        ["iRacing","454810317705314334"],
        ["FarCry 4","454811906230845440"],
        ["Celeste","454814894596816907"],
        ["Audiosurf","455442346558095370"],
        ["Baldur's Gate: Enhanced Edition","455494486089269258"],
        ["Sid Meier's Civilization III: Complete","455584343792943104"],
        ["Warhammer 40,000: Inquisitor - Martyr","455692385268269056"],
        ["MONMUSU","455713051794997249"],
        ["Little Nightmares","455788266860445696"],
        ["RollerCoaster Tycoon: Deluxe","455864514185920523"],
        ["Halo Wars: Definitive Edition","456022848214138884"],
        ["Jurassic World Evolution","456144990930862086"],
        ["Defiance","456294192616964096"],
        ["Thief","456834047730122752"],
        ["From The Depths","456965807780397076"],
        ["A Story About My Uncle","457095132119040020"],
        ["Moonlighter","457269337137348613"],
        ["Pirate101","457283942475759662"],
        ["Dreadnought","457284340330659864"],
        ["Napoleon: Total War","457284624977100800"],
        ["Alliance of Valiant Arms","457284796658352128"],
        ["Arpiel Online","457299794772230154"],
        ["ManiaPlanet","457300140470960128"],
        ["마비노기 영웅전","457300488199733265"],
        ["Lineage II","457300834393391104"],
        ["MapleStory 2","457301027453009947"],
        ["PPSSPP","457301373592141836"],
        ["Command & Conquer™: Generals and Zero Hour","457301510515195924"],
        ["NoxPlayer","457301824110723113"],
        ["Tribes: Ascend","457549567538495489"],
        ["Medieval Engineers","457619737535447060"],
        ["Cuisine Royale","457888043668340737"],
        ["Witch It","458081878394667009"],
        ["GRID 2","458309189974884363"],
        ["Mark of the Ninja","458503484153528322"],
        ["Nomad","458780333601587200"],
        ["GORN","459465853600268289"],
        ["Unreal Gold","459581070438825994"],
        ["Shadowrun Returns","459713656339562503"],
        ["Space Hulk: Deathwing - Enhanced Edition","459764260935958538"],
        ["Colony Survival","459774120226455562"],
        ["Murder Miners","459807786151182346"],
        ["GOD EATER 2 Rage Burst","459968630935781376"],
        ["Aimtastic","460092747580309504"],
        ["Tom Clancy's The Division Trial","460199128522293258"],
        ["Call of Duty: Infinite Warfare","460217112250810368"],
        ["Transistor","460299285049901056"],
        ["LEGO® MARVEL Super Heroes","460450424940396544"],
        ["Salt and Sanctuary","460472377566822400"],
        ["Transport Fever","460542812124086272"],
        ["EARTH DEFENSE FORCE 4.1  The Shadow of New Despair","460598317173309452"],
        ["The Crew 2","460639482547273749"],
        ["Titan Souls","460691329752629248"],
        ["METAL GEAR RISING: REVENGEANCE","460788999880179722"],
        ["Next Day: Survival","460831278799912960"],
        ["Robot Roller-Derby Disco Dodgeball","460909130140614656"],
        ["King of the Hat","460940655984771072"],
        ["Life is Feudal: Your Own","460951106357297172"],
        ["Blood Bowl 2","460987469756629005"],
        ["Poker Night 2","461039002796032000"],
        ["Five Nights at Freddy's 2","461050695198572554"],
        ["The Awesome Adventures of Captain Spirit","461256067003973633"],
        ["Freeman: Guerrilla Warfare","461302775284891648"],
        ["Hammerwatch","461404096751206420"],
        ["RollerCoaster Tycoon 3: Platinum!","461439083894407178"],
        ["Jalopy","461561181598121984"],
        ["Ultimate Custom Night","461673633798946816"],
        ["Fable Anniversary","461711977727918080"],
        ["Pavlov VR","461758710088466432"],
        ["Styx: Shards of Darkness","462296460512198656"],
        ["Audiosurf 2","462407650941075456"],
        ["Slap City","462788623675162634"],
        ["Natural Selection 2","462817604202004480"],
        ["To the Moon","462829880615370762"],
        ["Devil May Cry® 4 Special Edition","463227448167890944"],
        ["The Evil Within","463274972958425098"],
        ["Lords Of The Fallen","463425384893906944"],
        ["Five Nights at Freddy's: Sister Location","463603236880908297"],
        ["fin-dev","463761561685721088"],
        ["The Jackbox Party Pack","463963734507782144"],
        ["NEKOPARA Vol. 1","464273275904589834"],
        ["Grand Theft Auto III","464434670646460427"],
        ["Worlds Adrift","464507152111763457"],
        ["We Were Here Too","464823241098395674"],
        ["Farm Together","464830344558805002"],
        ["Vampire: The Masquerade - Bloodlines","464956888656773150"],
        ["Stoneshard: Prologue","465087252574371850"],
        ["Cook, Serve, Delicious! 2!!","465247704155553792"],
        ["Warhammer 40,000: Dawn of War - Dark Crusade","465536900560584714"],
        ["FINAL FANTASY X/X-2 HD Remaster","465985864095367178"],
        ["Longshot [Dev]","466240509682384896"],
        ["Heavy Metal Machines","466296927944835082"],
        ["SOS","466334957183303710"],
        ["Wreckfest","466457842401148948"],
        ["Card Hunter","466640524670009354"],
        ["Gear Up","466685661806592000"],
        ["Amorous","466691613138354196"],
        ["Pixel Worlds","466733503720062996"],
        ["Starbound","467102538278109224"],
        ["Montaro","467286012104671232"],
        ["LawBreakers","467724362674470912"],
        ["Hot Dogs, Horseshoes & Hand Grenades","467788345565511690"],
        ["RollerCoaster Tycoon 2: Triple Thrill Pack","467979045179752448"],
        ["Crash Bandicoot™ N. Sane Trilogy","468099355962900480"],
        ["Islands of Nyne: Battle Royale","468254179987685406"],
        ["Rules Of Survival","468577647392456714"],
        ["Age of Wonders III","468606521433915404"],
        ["SINNER","468611186330566677"],
        ["S.T.A.L.K.E.R.: Clear Sky","469153997027016714"],
        ["Russian Fishing 4","469213224215248896"],
        ["Omensight","469278650936721428"],
        ["Sundered","469280323109257228"],
        ["Project Highrise","469288321814757402"],
        ["Crookz - The Big Heist","469288750019641365"],
        ["System Shock: Enhanced Edition","469292352893222942"],
        ["The Metronomicon: Slay The Dance Floor","469292858701119508"],
        ["Dungeons 2","469293209214910504"],
        ["Tropico 4","469293612207833089"],
        ["Red Faction Guerrilla Re-Mars-tered","469429746007015426"],
        ["Hellbound: Survival Mode","469564278853206025"],
        ["MAD MACHINES","469807750084296716"],
        ["METAL GEAR SOLID V: GROUND ZEROES","469944923928657939"],
        ["Bloody Trapland","469959314183028736"],
        ["Worm.is: The Game","469989584277602304"],
        ["Cossacks 3","470220034237530112"],
        ["Guild Wars","470282452674412564"],
        ["The Sims 2: Ultimate Collection","470283475660963850"],
        ["Dragon Age: Origins","470283661414105131"],
        ["Project Rhombus","470399665154686986"],
        ["Climb","470810047547572244"],
        ["Command and Conquer: Red Alert 3","470958640031989761"],
        ["Clone Drone in the Danger Zone","471192232985231370"],
        ["This Is the Police 2","471357631697780774"],
        ["Darksiders III","471358881348452352"],
        ["Dead Rising 3","471760010016194570"],
        ["Dino D-Day","472197780836974604"],
        ["Banner Saga 3","472228397020479488"],
        ["War Robots","472823716062167050"],
        ["MOBIUS FINAL FANTASY","472837297063067658"],
        ["Democracy 3","473064732807528458"],
        ["Poker Night at the Inventory","473440891110162440"],
        ["Momodora: Reverie Under the Moonlight","473594880673972224"],
        ["Arizona Sunshine","473969782085910558"],
        ["de Blob","474014437863587870"],
        ["de Blob 2","474015113964290048"],
        ["Kenshi","474081029490081792"],
        ["140","474298936228708372"],
        ["RaceRoom Racing Experience","474431535291039754"],
        ["Stronghold Crusader HD","474975575409295380"],
        ["Sniper Ghost Warrior 3","475006595814785024"],
        ["Motorsport Manager","475034058066493441"],
        ["Beholder","475039384358617098"],
        ["BlazBlue Cross Tag Battle","475495343182577675"],
        ["Warhammer 40,000: Dawn of War - Game of the Year Edition","475821838782693387"],
        ["Feed and Grow: Fish","475913332478443530"],
        ["Punch Club","476271278836285440"],
        ["Half dead","476349443474718730"],
        ["Worms W.M.D","476482983675559946"],
        ["Pyre","476907979069849620"],
        ["MONSTER HUNTER: WORLD","477152881196269569"],
        ["Among Us","477175586805252107"],
        ["Viridi","477520549833211915"],
        ["Offworld Trading Company","477657966095630346"],
        ["West of Loathing","478014121065840650"],
        ["The Ultimate DOOM","478613204323270666"],
        ["Last Year: The Nightmare","478637764565401630"],
        ["Rampage Knights","478646014841061416"],
        ["Yakuza 0","478764846951825418"],
        ["Rend","478866361544605698"],
        ["Overcooked! 2","479169486583496704"],
        ["Fallout 2","479334869462417409"],
        ["DEATHGARDEN","479694330441891840"],
        ["RAGE","479735703140433940"],
        ["Orwell","479821376975405066"],
        ["Time Clickers","479894252726517760"],
        ["Prominence Poker","480167738334248980"],
        ["Wrecked","480316289307639808"],
        ["Paintball War","480363777574043658"],
        ["Post Scriptum","480560735521341440"],
        ["Crawl","480573996509954078"],
        ["Danganronpa: Trigger Happy Havoc","480963716934795264"],
        ["911 Operator","481103865559908372"],
        ["How to Survive 2","481505570747318292"],
        ["Dead Rising 2","481570202988052490"],
        ["Graveyard Keeper","481816401183506432"],
        ["Shower With Your Dad Simulator 2015: Do You Still Shower With Your Dad","481999402630774794"],
        ["Valkyria Chronicles™","482176854938353674"],
        ["Hot Lava","482730443037212673"],
        ["SimCity 4 Deluxe","482776230895288320"],
        ["BROKE PROTOCOL: Online City RPG","483247042689368084"],
        ["We Need to Go Deeper","483361121269710858"],
        ["Roguelands","483421234391154698"],
        ["UNO Demo","484310169145180160"],
        ["SCUM","484425151631589378"],
        ["The Witcher Enhanced Edition Director's Cut","484451241825533962"],
        ["STAR WARS Rebellion","484475041711521830"],
        ["Call of War","484486787952148485"],
        ["Battle for Wesnoth","484526083686006810"],
        ["LISA","484572816977428490"],
        ["Warhammer 40,000: Space Marine","484789228761514004"],
        ["Insurgency: Sandstorm","484892481452769290"],
        ["Onward","484938446268268564"],
        ["Two Point Hospital","485224436187004928"],
        ["Talisman: Digital Edition","485857105278926848"],
        ["Gunpoint","486705198576828416"],
        ["Call of Duty 4: Modern Warfare","486763816944795658"],
        ["Dead Frontier 2","487074862565818378"],
        ["Stronghold Crusader Extreme HD","487328146438356992"],
        ["Throne of Lies","487330866830376960"],
        ["Bad North","487564993236172802"],
        ["Hunger Dungeon","487652330989158410"],
        ["The Dig®","487683851519393822"],
        ["Deus Ex: Game of the Year Edition","488014835389300736"],
        ["Galactic Civilizations II: Ultimate Edition","488380884337295360"],
        ["Stick Fight: The Game","488693576314650634"],
        ["Sid Meier's Civilization® IV Complete","488844250251788339"],
        ["XCOM Enemy Unknown","488856269382483979"],
        ["Dungeon Defenders","488858705836900355"],
        ["NBA 2K17","489276682566369290"],
        ["Hyperdimension Neptunia Re;Birth1","489332841910632458"],
        ["sZone-Online","489441787778301992"],
        ["Resident Evil Revelations 2 / Biohazard Revelations 2","489648352892289054"],
        ["Trine Enchanted Edition","489705172453425173"],
        ["Trine 3: The Artifacts of Power","489715273683697674"],
        ["Trine 2: Complete Story","489715841789853697"],
        ["Job Simulator","489832887936483338"],
        ["FIFA 16","489854965787918376"],
        ["Construction-Simulator 2015","489879126925115392"],
        ["Seasons After Fall","489916817146511371"],
        ["Wasteland 2: Director's Cut","489917055282315274"],
        ["Shadows: Heretic Kingdoms","489917480274362368"],
        ["System Shock 2","489917602412494878"],
        ["Shadow of the Tomb Raider","490260586899177491"],
        ["ONRAID","490611188988772367"],
        ["Call of Duty Black Ops 4","490913233667096576"],
        ["Simply Chess","491048607072387072"],
        ["Chaos Reborn","491200852149796865"],
        ["Broken Age","491424584168505354"],
        ["Dangerous Waters","491425013468102657"],
        ["Disciples II: Gallean's Return","491425405681664037"],
        ["Disciples Sacred Lands Gold","491425800059486208"],
        ["FlatOut 2","491426078137647104"],
        ["FlatOut: Ultimate Carnage","491426256789831690"],
        ["Fleet Command","491426408384561160"],
        ["Space Empires IV Deluxe","491426627394338846"],
        ["Sub Command","491426844604760120"],
        ["Masters of Anima","491427069734027273"],
        ["Pony Island","491427187442974749"],
        ["VVVVVV","491427544134975498"],
        ["Guacamelee! Super Turbo Championship Edition","491427940135993364"],
        ["The End Is Nigh","491739802870349883"],
        ["TowerFall Ascension","491740193116782595"],
        ["DRAGON QUEST® XI: Echoes of an Elusive Age™","491806530576842762"],
        ["Regular Human Basketball","491853507507388427"],
        ["F1 2018","491909189086740480"],
        ["Never Split the Party","492054902772727808"],
        ["The Wolf Among Us","492110850342125591"],
        ["Brothers - A Tale of Two Sons","492112259770875921"],
        ["ABZU","492113873508368403"],
        ["Last Day of June","492114663211925536"],
        ["Cities in Motion","492115461824184320"],
        ["Darkest Hour: A Hearts of Iron Game","492116330909138974"],
        ["Europa Universalis III","492117546728816640"],
        ["Hearts of Iron III","492118503508279316"],
        ["Majesty Gold HD","492120134937346049"],
        ["Shadowrun: Dragonfall - Director's Cut","492120767111233566"],
        ["Torchlight","492121941155643402"],
        ["STAR WARS™ Republic Commando™","492129256772599837"],
        ["Oddworld: Stranger's Wrath","492129658536591400"],
        ["Vegas: Make It Big","492130126012743710"],
        ["STAR WARS™ Galactic Battlegrounds Saga","492131222135373834"],
        ["The Walking Dead: The Final Season","492133608493023232"],
        ["STAR WARS™ Jedi Knight: Dark Forces II","492134139647098881"],
        ["Yooka-Laylee","492134695711014912"],
        ["The Secret of Monkey Island™ Special Edition","492134756914429975"],
        ["STAR WARS™ Jedi Knight II: Jedi Outcast™","492135944179286068"],
        ["STAR WARS™ Knights of the Old Republic","492136872714305566"],
        ["Star Wars: Dark Forces","492137508633706517"],
        ["Ascension: Deckbuilding Game","492140628717731846"],
        ["Ashes of the Singularity: Escalation","492141568816447488"],
        ["Ticket to Ride","492142885077123082"],
        ["Killer Queen Black","492144146040094722"],
        ["Oddworld: New 'n' Tasty","492146632511586313"],
        ["Out of the Park Baseball 18","492147626872012800"],
        ["Tropico 3","492154985627385886"],
        ["Hearts of Iron II","492158597673910281"],
        ["Europa Universalis II","492159419837186053"],
        ["Ring of Elysium","492159553966702592"],
        ["Victoria I","492161312730775553"],
        ["Indiana Jones® and the Fate of Atlantis™","492162663976140810"],
        ["Monkey Island™ 2 Special Edition: LeChuck's Revenge™","492164341840347156"],
        ["Euro Truck Simulator","492695172967301120"],
        ["Galactic Civilizations III","492772865175715850"],
        ["The Culling","493430961313415188"],
        ["RPG Maker VX Ace","493490198580035604"],
        ["The Wild Eight","493827668991803402"],
        ["Warframe Test","494178385807933445"],
        ["Planetbase","494228479898812416"],
        ["Aliens vs. Predator","494240845378355220"],
        ["BlazBlue Centralfiction","494341815940415488"],
        ["Blacklight: Retribution","495079795252527104"],
        ["20XX","495310509382565890"],
        ["Warhammer 40,000: Dawn of War II - Retribution","495651148242616330"],
        ["Legion TD 2","495691276159549460"],
        ["Coloring Pixels","495871643432910848"],
        ["Art of War: Red Tides","495889089703444481"],
        ["Battlerite Royale","495912170190667776"],
        ["Rogue Legacy","495979053371752481"],
        ["Mist Survival","496035345981243395"],
        ["A Kiss For The Petals - Remembering How We Met","496521775161671734"],
        ["A Sky Full of Stars","496523213778583553"],
        ["A Study in Steampunk: Choice by Gaslight","496524367962832918"],
        ["Action Henk","496524555360403476"],
        ["Aeon Rivals","496524827050508316"],
        ["Age of Conan","496525141467987991"],
        ["AI War: Fleet Command","496525786468319232"],
        ["Alan Wake's American Nightmare","496526142673649724"],
        ["Albion Online","496526645671231488"],
        ["Alien Breed 2: Assault","496527138141503538"],
        ["Altitude","496529186064826368"],
        ["Anarchy Online","496529322039836681"],
        ["ANNO 1404","496530041895911429"],
        ["Anno 2205","496530253905264659"],
        ["Antichamber","496532716099993623"],
        ["Ascent - The Space Game","496533328833544227"],
        ["Assault Android Cactus","496533560228970514"],
        ["Astebreed","496533728932134922"],
        ["Axiom Verge","496534151642742804"],
        ["Bad Rats","496534375740080128"],
        ["Bare Metal","496534611250118656"],
        ["Battle Squares","496534796424708124"],
        ["Battlefield 2","496534962200248373"],
        ["Battlefield 2142","496535501465976835"],
        ["Beat Hazard","496535788427935764"],
        ["Bejeweled 3","496536236769542154"],
        ["Bejeweled Blitz","496537107708248064"],
        ["Blake Stone: Planet Strike","496538565451317259"],
        ["Block Sport","496538914673262596"],
        ["Blockland","496539095888035861"],
        ["Bloodline Champions","496539230026334208"],
        ["Boid","496539411308216320"],
        ["Braid","496540068442537984"],
        ["Bulletstorm","496540681913892864"],
        ["C9","496543199209193488"],
        ["CABAL Online","496544716997918750"],
        ["Call of Duty 2","496546499346432010"],
        ["Call of Juarez","496547399599390730"],
        ["Cargo Commander","496547754680647690"],
        ["Chronicon","496548575061213184"],
        ["CLANNAD","496550410685906954"],
        ["CLANNAD Side Stories","496550790572277770"],
        ["Clive Barker's Undying","496552265977692181"],
        ["Clonk Rage","496552591111618565"],
        ["Cloudbuilt","496552729141837824"],
        ["Combat Arms","496553014220554270"],
        ["Command and Conquer 3: Kane's Wrath","496557233979654154"],
        ["Company of Heroes","496557687560077322"],
        ["Cook, Serve, Delicious!","496558661041127444"],
        ["Creation Kit","496560355615703060"],
        ["Creeper World 3: Arc Eternal","496560583521468426"],
        ["Crimsonland","496561007888433152"],
        ["Crowfall","496561718668034078"],
        ["CRYPTARK","496562135447502882"],
        ["Crysis","496562734889041930"],
        ["Crysis 2","496564403345424431"],
        ["Crysis 3","496565168528949249"],
        ["Cyphers","496565866721443840"],
        ["DarkStar One","496566320213655552"],
        ["DCS World","496568071713062928"],
        ["Dead Space 2","496568659276201984"],
        ["DeadCore","496569001405841439"],
        ["Deathsmiles","496569185237860359"],
        ["Debugger 3.16: Hack'n'Run","496569333665759232"],
        ["Defense Grid 2","496569474670133258"],
        ["Depression Quest","496569655679385603"],
        ["Devil Daggers","496571420579463168"],
        ["Devilian","496571728089317437"],
        ["Diablo","496571953147150354"],
        ["Diablo II","496572658255790080"],
        ["Diadra Empty","496573404002910227"],
        ["DiRT 3","496574120436432915"],
        ["Distance","496575580070871040"],
        ["Dominions 4","496575805413916683"],
        ["DOOM 3","496575943431946250"],
        ["Double Dragon Neon","496576235934187539"],
        ["Downwell","496576457082929152"],
        ["Dragon Age II","496576882540806154"],
        ["Dragon Fin Soup","496577154683895827"],
        ["Dragon Nest","496577285466357760"],
        ["Dragon's Dogma Online","496578773647622187"],
        ["Dropzone","496578915263971358"],
        ["Duke Nukem Forever","496579092418658363"],
        ["Dungeon Fighter Online","496579303631486976"],
        ["Dungeonland","496579621693816832"],
        ["Dungeons & Dragons Online®","496579889063919616"],
        ["Dust: An Elysian Tail","496580906916511764"],
        ["Dustforce","496581169639587850"],
        ["Entropia Universe","496581460438941716"],
        ["EverQuest II","496582384863412249"],
        ["Evoland 2","496583339986387004"],
        ["Evolve","496739105481293869"],
        ["Fairy Fencer F","496739512446091284"],
        ["FIFA 15","496740139633213490"],
        ["Final Fantasy III","496740365072728064"],
        ["FINAL FANTASY V","496740745085059112"],
        ["FINAL FANTASY VI","496742764344639488"],
        ["FINAL FANTASY VIII","496757203596869652"],
        ["FINAL FANTASY XIII","496757542479724554"],
        ["FINAL FANTASY XIII-2","496757852069822504"],
        ["Firefall","496758262797172736"],
        ["Flamebreak","496758379583242291"],
        ["Flyff","496758691064709120"],
        ["Football Manager 2014","496758937039929370"],
        ["Football Manager 2016","496760317875978256"],
        ["Forza Horizon 3","496760939052269583"],
        ["Forza Motorsport 7","496761344603979796"],
        ["Fran Bow","496761451738955804"],
        ["Free to Play","496761815548559360"],
        ["Freedom Planet","496761999708127232"],
        ["Frontier","496762504291155998"],
        ["Furcadia","496763066889797674"],
        ["Gears of War 4","496763396558159892"],
        ["Granado Espada","496771607386259456"],
        ["GRAV","496771913280913424"],
        ["Grey Goo","496772084379418637"],
        ["scram","496772185864667146"],
        ["Groove Coaster","496772271088730112"],
        ["Grow Home","496772402219319316"],
        ["Guardians of Ember","496772734744002580"],
        ["GUILTY GEAR XX ACCENT CORE PLUS R","496773998517026816"],
        ["Guitar Hero World Tour","496774309042192384"],
        ["Halo Custom Edition","496775885249314885"],
        ["Halo: Combat Evolved","496776262136758277"],
        ["Hand of Fate","496776430110113843"],
        ["Hard West","496776675351330846"],
        ["Hate Plus","496776818855116811"],
        ["Hatoful Boyfriend","496777244090302490"],
        ["HAWKEN","496778224433627156"],
        ["HEX: Shards of Fate","496778870104653824"],
        ["Hitman: Blood Money","496779049524265010"],
        ["Hoshizora no Memoria -Wish upon a Shooting Star-","496779855950774272"],
        ["ibb & obb","496838264506941473"],
        ["In Death","496838571735384122"],
        ["Intruder","496838818813706270"],
        ["Jade Empire: Special Edition","496839367621476352"],
        ["Jurassic Park: The Game","496839741812113408"],
        ["Kindred Spirits on the Roof","496845813461418005"],
        ["King Arthur's Gold","496845988154048541"],
        ["Krosmaster Arena","496846515382517770"],
        ["Landmark","496846777023070218"],
        ["Lara Croft and the Guardian of Light","496846884787191834"],
        ["Legend of Dungeon","496847055793422336"],
        ["LIGHTNING RETURNS: FINAL FANTASY XIII","496847425680572455"],
        ["Limit Ragnarok Online","496847615456051220"],
        ["Lineage","496848201773482004"],
        ["Chris Sawyer's Locomotion","496848465301733376"],
        ["Long Live The Queen","496848705027178496"],
        ["Lovely Planet","496851684396630035"],
        ["Lovers in a Dangerous Spacetime","496851934339268622"],
        ["Lumini","496852060256337920"],
        ["LYNE","496852270080851977"],
        ["Magic Realm: Online","496852479615565834"],
        ["Marvel Heroes 2015","496852775406141450"],
        ["Marvel Heroes 2016","496853043103662080"],
        ["Massive","496853196346621982"],
        ["Master Reboot","496853347505012746"],
        ["Nekojishi","497121061339529226"],
        ["How to Survive","497169068466634792"],
        ["Pathfinder: Kingmaker","497389403832844298"],
        ["NEKOPARA Vol. 0","497660949260664832"],
        ["Necropolis","497830439298400256"],
        ["Assassin's Creed Odyssey","497898978466070528"],
        ["Craft The World","498216676744101891"],
        ["Midair","498457066738810890"],
        ["CrossCode","498640615744077864"],
        ["Jotun","498640773999362050"],
        ["Monster Slayers","498641288250392600"],
        ["We Happy Few","498728807881113620"],
        ["Lost Saga North America","498938615934615552"],
        ["Men of War: Assault Squad","498941421814939648"],
        ["Might & Magic Heroes VI","498942150042451978"],
        ["Might & Magic Heroes VII","498942455903944704"],
        ["MOTHERGUNSHIP","498942846032805908"],
        ["Mountain","498943265475657728"],
        ["Mudlet","498943730817171476"],
        ["Mugen Souls","498943830582755368"],
        ["NARUTO SHIPPUDEN: Ultimate Ninja STORM 3 Full Burst","498948228146921472"],
        ["NARUTO SHIPPUDEN: Ultimate Ninja STORM Revolution","498971059291291648"],
        ["Need for Speed: Carbon","498971474841960450"],
        ["NEO Scavenger","498971609764200478"],
        ["Neocron Evolution","498971892968062976"],
        ["Next Car Game: Wreckfest","498971974945603587"],
        ["Nicole (otome version)","498972346078461982"],
        ["Nosgoth","498972985403899960"],
        ["ONE PIECE PIRATE WARRIORS 3","498973375595675688"],
        ["ONI","498979842277113857"],
        ["Peggle Deluxe","498980232938651648"],
        ["Peggle Extreme","498980339470041123"],
        ["Pinball Arcade","498980583096057905"],
        ["Pixel Dungeon","498981118410752020"],
        ["PixelJunk Shooter Ultimate","498981476050927653"],
        ["PixelJunk™ Shooter Ultimate","498981634339635253"],
        ["MechWarrior: Living Legends","498984088418516992"],
        ["Plants vs. Zombies: Game of the Year","498985095378632704"],
        ["Poi","498985543586021376"],
        ["PokeMMO","498985820221603840"],
        ["PokerStars","498986175512576058"],
        ["Prepar3D","498986525757800468"],
        ["Primal Carnage","498986661104058378"],
        ["Prime World","498986815227822080"],
        ["ProjectRIK","498987268048945162"],
        ["Proteus","498987388891299859"],
        ["Pyrite Heart","498987613416456220"],
        ["Quake II","498987709629464586"],
        ["Quiplash","498988229798920242"],
        ["Race The Sun","498988774169116711"],
        ["Ragnarok Online","498990766643740692"],
        ["Rappelz","498991137214955531"],
        ["Rayman 2 - The Great Escape","498991556724916225"],
        ["Re-Volt","498994022048727050"],
        ["Reassembly","498997425965367313"],
        ["ReCore","498999413172207653"],
        ["Resident Evil Revelations / Biohazard Revelations","499004687719202816"],
        ["Hidden Folks","499303420512174080"],
        ["Tales of Escape","499330427455012874"],
        ["BLOCKPOST","499743985045078036"],
        ["Moon Hunters","500645675642388480"],
        ["Serious Sam 2","500769428753874947"],
        ["Resident Evil / biohazard HD REMASTER","500804924007907348"],
        ["The Walking Dead: Season Two","500830174590271509"],
        ["pla_toon","501063306065346580"],
        ["Darkwood","501209864333164546"],
        ["NBA 2K19","501373821886922752"],
        ["I am Bread","501542797430489098"],
        ["CreativeDestruction","501792352898121743"],
        ["Bigscreen Beta","501925376747110440"],
        ["Fuse","502281428168343573"],
        ["Sonic Generations","502406586895958026"],
        ["Zeus' Battlegrounds","502879677782818820"],
        ["The Misfits","502910350413266954"],
        ["World War 3","503228350761009162"],
        ["SOULCALIBUR VI","503340646946308096"],
        ["Oh...Sir! The Insult Simulator","503362822957432832"],
        ["Danganronpa 2: Goodbye Despair","503578473227354112"],
        ["OVERKILL's The Walking Dead - BETA","503632655137374219"],
        ["Call of Cthulhu","503982482664849408"],
        ["Asheron's Call","504021888805240914"],
        ["Reflex Arena","504024478100095016"],
        ["Retro City Rampage™ DX","504026620068233235"],
        ["Reus","504027911213285423"],
        ["Revelation Online","504028382317772859"],
        ["rFactor","504028685322551296"],
        ["rFactor 2","504029217650901040"],
        ["Rogue System","504029616151986198"],
        ["Sakura Angels","504029936697344048"],
        ["Sakura Clicker","504030053017845805"],
        ["Sakura Spirit","504030205481058304"],
        ["Screencheat","504030375606091776"],
        ["Scrivener","504030662911590425"],
        ["Secret Ponchos","504030792184496148"],
        ["Secrets of Grindea","504030959654535198"],
        ["Shadowgrounds","504031323443167273"],
        ["Shadowgrounds: Survivor","504031813619154974"],
        ["Shadowrun","504032333532364840"],
        ["Shantae and the Pirate's Curse","504032449173389372"],
        ["Shattered Skies","504033280149159986"],
        ["Sid Meier's Railroads!","504033484919144452"],
        ["SinaRun","504033675940200448"],
        ["Slime CCG","504037755018412033"],
        ["Snes9x","504041310605410315"],
        ["Songbringer","504042287345434624"],
        ["Sonic Adventure DX","504042667714543626"],
        ["Sonic Lost World","504044826954694780"],
        ["Soul Axiom","504046230028943380"],
        ["Space Pirates and Zombies","504046366302142494"],
        ["SpaceChem","504046850584739850"],
        ["Spider-Man 3","504047615139119143"],
        ["Sprint Vector","504050983400374292"],
        ["Startup Company","504052120543166505"],
        ["Steel Ocean","504052334960050176"],
        ["STEINS;GATE","504052730042646579"],
        ["Steredenn","504053684494401540"],
        ["STRAFE","504054126280310794"],
        ["Strife","504055085177765907"],
        ["Strife: Veteran Edition","504055223543922708"],
        ["Styx: Master of Shadows","504055375880912946"],
        ["Suguri","504055570483904522"],
        ["Super Monday Night Combat","504055809962147840"],
        ["Superbrothers: Sword & Sworcery EP","504056145854464000"],
        ["SURV1V3","504056431176056852"],
        ["SWAT 4","504056709015404544"],
        ["Sword Coast Legends","504056938439507968"],
        ["Sword of Asumi","504057095109214247"],
        ["SYNTHETIK","504057233756389376"],
        ["Take On Mars","504057417194143754"],
        ["Tales from the Borderlands","504057675286315028"],
        ["Tales of Maj'Eyal","504065891043115008"],
        ["Tales of Monkey Island","504067053481754634"],
        ["Tales of Zestiria","504070466948956160"],
        ["Tales Runner","504071115799265280"],
        ["Task Force","504071248888987676"],
        ["Tetris® Ultimate","504071743963529226"],
        ["Tetris","504071879993196544"],
        ["The Beginner's Guide","504073562785579018"],
        ["The Elder Scrolls IV: Oblivion","504074409628401690"],
        ["The Forgettable Dungeon","504075021677887541"],
        ["THE KING OF FIGHTERS 2002 UNLIMITED MATCH","504075299877683230"],
        ["The Marvellous Miss Take","504076592218112047"],
        ["The Park","504076991759384596"],
        ["The Sacred Tears TRUE","504077161246883850"],
        ["The Secret World","504077629175889923"],
        ["The Settlers 7: Paths to a Kingdom","504078051358015516"],
        ["The Settlers: Rise of an Empire","504078174875942939"],
        ["The Vanishing of Ethan Carter","504078553445302330"],
        ["The Vanishing of Ethan Carter Redux","504078762292543506"],
        ["There Was a Caveman","504079332512235573"],
        ["Thomas Was Alone","504079439726903336"],
        ["TIS-100","504079649702412295"],
        ["Tomb Raider II","504079864681332739"],
        ["Tomb Raider III: Adventures of Lara Croft","504080259151298560"],
        ["Tomb Raider: Anniversary","504080427569643550"],
        ["Tomb Raider: Chronicles","504080609598111771"],
        ["Tomb Raider: Legend","504080831396970511"],
        ["Tomb Raider: The Last Revelation","504081066848681984"],
        ["Tomb Raider: Underworld","504081253314723874"],
        ["Tony Hawk's Underground","504081569405730826"],
        ["Tony Hawk's Underground 2","504081807340470291"],
        ["Trackday Manager","504082602848813087"],
        ["TransforBest","504082814350655518"],
        ["Triple Town","504083025211162677"],
        ["Unravel","504084141319520299"],
        ["Unreal Tournament","504084447797313537"],
        ["Unreal Tournament 3","504084581989744679"],
        ["Uplink","504085139983433774"],
        ["War for the Overworld","504085687155425286"],
        ["Warsow","504086535079985181"],
        ["WaveLand","504086615132733450"],
        ["Wings of Vi","504086961498226688"],
        ["Wolfenstein: The Old Blood","504087375618506772"],
        ["Wonder Wickets","504087681635188766"],
        ["X-Plane 11","504087790032650290"],
        ["Xenonauts","504088140139462686"],
        ["Zandronum","504088311594483722"],
        ["ZOMBI","504088792223842314"],
        ["Zombies Monsters Robots","504089133900103714"],
        ["9Dragons","504399459426369587"],
        ["Age of Wushu","504422264599609344"],
        ["Alan Wake","504423339104796672"],
        ["Argentum Online","504424067877699614"],
        ["Azure Striker Gunvolt","504426985305538600"],
        ["Microsoft Allegiance","504444177413701632"],
        ["Super House of Dead Ninjas","504468643384524800"],
        ["Aseprite","504605035162763294"],
        ["Full Metal Furies","504743823281487882"],
        ["蒼の彼方のフォーリズム","504764773167136768"],
        ["Avalon Lords: Dawn Rises","504765148481716224"],
        ["BlackShot: Mercenary Warfare FPS","504767731825115176"],
        ["BlazBlue: Continuum Shift Extend","504768003469082655"],
        ["Blobby Volley 2","504768329651585035"],
        ["Boundless","504768467724140544"],
        ["Cabal 2","504769131615223838"],
        ["Cataclysm: Dark Days Ahead","504785474901114920"],
        ["CHAOS CODE -NEW SIGN OF CATASTROPHE-","504788636525395998"],
        ["Chronicle: RuneScape Legends","504790398984781834"],
        ["Combat Mission Black Sea","504801397825470464"],
        ["Combat Mission Shock Force","504801527219617808"],
        ["Command & Conquer™ Red Alert 2 and Yuri’s Revenge","504801959954612274"],
        ["Command: Modern Air / Naval Operations WOTY","504802253413154846"],
        ["Cosmic Dust & Rust","504802641763762176"],
        ["CosmicBreak","504802978784346122"],
        ["CosmicBreak2","504803174880903188"],
        ["CosmicLeague_US","504803374613528600"],
        ["Creeper World 2","504803589898633216"],
        ["Carrier Command: Gaea Mission","504824168861270033"],
        ["Demul version 0.5.6.3","505116958086266920"],
        ["Homeworld: Deserts of Kharak","505117107097174062"],
        ["Disgaea PC","505123261546496000"],
        ["Disney Infinity 3.0: Gold Edition","505123562756112405"],
        ["Disney Infinity 2.0: Gold Edition","505123882232053810"],
        ["ドラゴンクエストＸ　いにしえの竜の伝承　オンライン","505125120960888877"],
        ["E.Y.E: Divine Cybermancy","505129908562034716"],
        ["nQuake","505131009583480844"],
        ["Fable - The Lost Chapters","505133560391401472"],
        ["TouHou Makuka Sai ~ Fantastic Danmaku Festival","505133803258249253"],
        ["FCEUX 2.2.3","505134014034870283"],
        ["FINAL FANTASY XI","505134378138075144"],
        ["Gahkthun of the Golden Lightning Steam Edition","505134723543203851"],
        ["Garfield Kart","505134938354352128"],
        ["SkyDrift","505135507907543070"],
        ["Grandia II Anniversary Edition","505135738719961143"],
        ["GRID Autosport","505135989694398512"],
        ["The Fruit of Grisaia","505136406109356032"],
        ["Grisaia Phantom Trigger Vol.2","505136671138906132"],
        ["Microsoft Halo Trial","505137576256995328"],
        ["Heavy Weapon Deluxe","505137992642592815"],
        ["Hyperdimension Neptunia Re;Birth2 Sisters Generation","505138235937259549"],
        ["Hyperdimension Neptunia Re;Birth3 V Generation","505138532700913671"],
        ["Illarion","505138979264528414"],
        ["OpenITG","505139561995829278"],
        ["Invisible, Inc.","505139793940709376"],
        ["IvAc","505139956017266688"],
        ["Just Cause","505140295931920404"],
        ["神採りアルケミーマイスター","505140655501213696"],
        ["Kara no Shojo 2","505140834644000812"],
        ["Knights of Pen and Paper 2","505141441388085298"],
        ["MTGArena","505142532297064468"],
        ["マジカルバトルアリーナNEXT・幻想郷空閃姫","505142782654939150"],
        ["Native Instruments Maschine 2","505143168287899676"],
        ["MELTY BLOOD Actress Again Current Code","505143546244890691"],
        ["Metal Gear Solid 2 Substance","505146559835406352"],
        ["Modlands 0.512a version 0.512a","505147819255136297"],
        ["NEO AQUARIUM - The King of Crustaceans -","505150034698960952"],
        ["Offspring Fling!","505150420377665566"],
        ["OlliOlli2: Welcome to Olliwood","505150905696649216"],
        ["Organ Trail: Director's Cut","505151146722197504"],
        ["PangYa (NtreevSoft)","505151476427915283"],
        ["Perpetuum","505151662151958530"],
        ["Phantasy Star Online Blue Burst","505152925115482112"],
        ["Phantom Breaker: Battle Grounds","505153286840516649"],
        ["Project Hedra","505153723941781523"],
        ["Icons: Combat Arena","505187200011337738"],
        ["LET IT DIE","505256510453186560"],
        ["DiRT 2","505486620468838447"],
        ["Mabinogi","505489300545208340"],
        ["Metal Gear Solid","505489991175110676"],
        ["MapleRoyals","505490321174560783"],
        ["Houdini Indie","505490535629324318"],
        ["Infantry","505490756782391338"],
        ["Helbreath Apocalypse","505490939008122940"],
        ["Flash Flash Revolution","505491268755914772"],
        ["Dwarf Fortress","505491707253620739"],
        ["Quake III","505493023031951411"],
        ["King of Fighters XIII","505493399688839170"],
        ["Nitronic Rush","505494175702188032"],
        ["PCSX2","505494914872770583"],
        ["Phase Shift","505495076974231588"],
        ["Planescape: Torment","505495215856025620"],
        ["Q.U.B.E: Director's Cut","505496236548292648"],
        ["Rebound Arena","505496835721396254"],
        ["REGEN","505496955095482387"],
        ["RetroArch","505497615748694018"],
        ["Return To Castle Wolfenstein","505497930292133908"],
        ["Rise of Agon","505498499043819520"],
        ["Rosenkreuzstilette","505498725297422351"],
        ["S4 League","505498926443528202"],
        ["SC2VN - The eSports Visual Novel","505499045079416833"],
        ["Shadow Complex Remastered","505500036214292545"],
        ["Sonic & All Stars Racing Transformed","505500365404373004"],
        ["ePSXe","505500770683322399"],
        ["SoulWorker","505501322947199006"],
        ["SpyParty","505502210117861387"],
        ["Super Smash Flash EXE Version 1.0","505502693113200640"],
        ["Super Smash Flash 2 Beta","505502904640208902"],
        ["The Floor is Lava","505503697799872532"],
        ["The Last Remnant","505503999403884544"],
        ["The Simpsons Hit & Run(TM)","505504523012276234"],
        ["Thrillville: Off the Rails","505504809437364244"],
        ["Titanfall™","505505165705609246"],
        ["TMNT 2 - Battle Nexus","505505520417767425"],
        ["Tomb Raider (VI): The Angel of Darkness","505505686705405962"],
        ["Tomoyo After ~It's a Wonderful Life~ English Edition","505505972899414046"],
        ["Touhou 10: Mountain of Faith","505506583304732695"],
        ["Touhou 10.5: Scarlet Weather Rhapsody","505506928596877352"],
        ["Touhou 11: Subterranean Animism","505507257224658987"],
        ["Touhou 12: Undefined Fantastic Object","505512749149716480"],
        ["Touhou 12.3: Hisoutensoku","505513116302573578"],
        ["Touhou 12.5: Double Spoiler","505513477645926430"],
        ["Touhou 12.8: Great Fairy Wars","505513776607395868"],
        ["Touhou 13: Ten Desires","505514028341395495"],
        ["Touhou 13.5 Hopeless Mascarade","505514368520290305"],
        ["Touhou 14: Double Dealing Character","505514719885393960"],
        ["Touhou 14.3: Impossible Spell Card","505515309726433328"],
        ["Touhou 14.5: Urban Legend in Limbo","505515610667614232"],
        ["Touhou 15: Legacy of Lunatic Kingdom","505515966289936393"],
        ["Touhou 15.5: Antinomy of Common Flowers","505516276115046415"],
        ["Touhou 7: Perfect Cherry Blossom","505516832590004244"],
        ["Touhou 7.5: Immaterial and Missing Power","505517064601993254"],
        ["Touhou 8: Imperishable Night","505517586327535646"],
        ["Touhou 9: Phantasmagoria Of Flower View","505517882873085952"],
        ["Touhou 9.5: Shoot the Bullet","505518102545432605"],
        ["Touhou Puppet Dance Performance","505518371333472276"],
        ["Touhou Sky Arena","505518699395022867"],
        ["The Legend of Heroes: Trails in the Sky","505519194146603009"],
        ["The Legend of Heroes: Trails in the Sky SC","505519505091592222"],
        ["VA-11 HALL-A","505520072870199335"],
        ["VisualBoyAdvance","505520145997889546"],
        ["Warzone 2100","505520727521361941"],
        ["Xonotic","505520839303757848"],
        ["YGOPro","505520955649556490"],
        ["ZSNESw","505521162042736657"],
        ["Zwift","505523904517898240"],
        ["Allods Online","505531160990973952"],
        ["Murderous Pursuits","505801835613913098"],
        ["Sword Art Online: Hollow Realization Deluxe Edition","506057315485483008"],
        ["METAL GEAR SURVIVE","506873722745913355"],
        ["Aim Lab","506950362461110273"],
        ["Galactic Civilizations III","507674068498120714"],
        ["Parkasaurus","508008071411400724"],
        ["Visage","508057374875975682"],
        ["Kynseed","510199020782747732"],
        ["Thronebreaker","511619499053678668"],
        ["Paladins Strike","512498684211232768"],
        ["Fallout 76","512501896896970762"],
        ["Battlefield™ V","512699108809637890"],
        ["Battle Chef Brigade","512789120234422301"],
        ["Kingsway","512789343157485602"],
        ["Zenzizenzic","512789427462995988"],
        ["Borderlands 3","514228311661084682"],
        ["Realm Royale","518088627234930688"],
        ["Turok","519644267212177418"],
        ["Turok 2: Seeds of Evil","519644368735567873"],
        ["Ashen","520453007578628124"],
        ["Hades","520462578061803588"],
        ["Nitro","521842831262875670"],
        ["Far Cry New Dawn","523154344187789312"],
        ["ATLAS","526489929631531009"],
        ["Paladins","528145079819436043"],
        ["Metro Exodus","530454325214969866"],
        ["Sea of Thieves","535371564850479134"],
        ["LEGO Harry Potter: Years 5-7","535384357536399404"],
        ["Subnautica: Below Zero","535869836748783616"],
        ["Ghost Recon Breakpoint","540120593576493057"],
        ["Apex Legends","542075586886107149"],
        ["Farming Simulator 19","542474758835535872"],
        ["Warhammer: Vermintide 2","542475118396309528"],
        ["Anthem™","546175179542364160"],
        ["Spellbreak","549512435585908756"],
        ["Heroes & Generals WWII","550277544025522176"],
        ["Dawn of Man","553697181249437716"],
        ["Warface","554573307161214977"],
        ["Tom Clancy's The Division 2","554921822626381879"],
        ["Temtem","558547388583772201"],
        ["Mutant Year Zero: Road to Eden","560781100197216267"],
        ["Bloodstained: Ritual of the Night","565341641427124244"],
        ["Sekiro™: Shadows Die Twice","569008830701240340"],
        ["Risk of Rain 2","569253958967885828"],
        ["Satisfactory","572456126872944651"],
        ["MORDHAU","575412499399180288"],
        ["Baba Is You","576482762446602270"],
        ["Staxel","584069374462394368"],
        ["Supreme Ruler Ultimate","588739017718366208"],
        ["Dota Underlords","592976500802846750"],
        ["PUBG LITE","597588168178663434"],
        ["Swords of Gurrah","597860020935327787"],
        ["Lethal League Blaze","606163888052109312"],
        ["Bloons TD 6","614380482620293151"],
        ["Bloons Adventure Time TD","614448244260339712"],
        ["World of Warcraft Classic","615752773690064908"],
        ["Tower Keepers","618575278339260467"],
        ["Gears 5","620685135066693642"],
        ["Control","620758922940383242"],
        ["Call of Duty®: Modern Warfare®","631914894446297148"],
        ["Legends of Runeterra","633832498614370323"],
        ["The Outer Worlds","637382434089861160"],
        ["Red Dead Redemption 2","643897785271189524"],
        ["STAR WARS Jedi: Fallen Order™","649511727641133066"],
        ["Pirates of the Burning Sea","651923442286985217"],
        ["Halo: The Master Chief Collection","653432003798106122"],
        ["Forza Horizon 4","656353816370741248"],
        ["DOOM Eternal","693016355007496202"],
        ["Return of the Obra Dinn","696065774061879446"],
        ["VALORANT","700136079562375258"],
        ["Age of Empires: Definitive Edition","700150526729519165"],
        ["Age of Empires II: Definitive Edition","700150779050459157"],
        ["Wurm Online","714975833495830608"],
        ["Age of Empires: Definitive Edition","720771267149561936"],
        ["Age of Empires II: Definitive Edition","720771660768084008"],
        ["The Surge 2","733854133471150151"],
        ["DEATH STRANDING","734286565114904586"],
        ["Rogue Company","737391147659558963"],
        ["Grounded","738856512868450314"],
        ["Fall Guys","742897755160313986"],
        ["Microsoft Flight Simulator","750925046729670796"],
        ["Genshin Impact","762434991303950386"],
        ["Assassin's Creed Valhalla","775754545778786314"],
        ["IL-2 Sturmovik: Battle of Stalingrad","777681581917601792"],
        ["Call of Duty®: Black Ops Cold War","783440677958189096"],
        ["Cyberpunk 2077","787443973538971748"],
        ["STAR WARS™ Battlefront™ (classic)","788507043358834698"],
        ["Star Wars: Battlefront 2 (Classic, 2005)","788511984575316028"]
    ];

    const DEFAULTS = {
        minMinutes: 20,
        maxMinutes: 20,
        restMinutes: 2,
        timingVersion: 2,
        paused: false,
        minimized: false,
        corner: "bottom-right",
        creditPlaytime: false,
        batchHours: 1,
        batchCount: 0,
        batchChunk: 16
    };
    const CORNERS = ["top-left", "top-right", "bottom-left", "bottom-right"];
    const settings = (() => {
        let saved = {};
        try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch (_) {}
        const s = { ...DEFAULTS, ...saved };
        if (saved.timingVersion !== DEFAULTS.timingVersion) {
            s.minMinutes = DEFAULTS.minMinutes;
            s.maxMinutes = DEFAULTS.maxMinutes;
            s.restMinutes = DEFAULTS.restMinutes;
        }
        s.minMinutes = clamp(Number(s.minMinutes) || DEFAULTS.minMinutes, 1, 1440);
        s.maxMinutes = clamp(Number(s.maxMinutes) || DEFAULTS.maxMinutes, s.minMinutes, 1440);
        s.restMinutes = clamp(Number(s.restMinutes) || DEFAULTS.restMinutes, 1, 10);
        s.timingVersion = DEFAULTS.timingVersion;
        s.paused = Boolean(s.paused);
        s.minimized = Boolean(s.minimized);
        s.creditPlaytime = Boolean(s.creditPlaytime);
        s.batchHours = clamp(Number(s.batchHours) || DEFAULTS.batchHours, 0.1, 9999);
        s.batchCount = Math.max(0, Math.floor(Number(s.batchCount) || 0));
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

    async function fetchDetectableCatalogue() {
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
            if (!Array.isArray(rawGames)) throw new Error("Discord CDN returned an invalid catalogue");

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
        const remoteCatalogue = await fetchDetectableCatalogue();
        const remoteIds = new Set(remoteCatalogue.map(([, id]) => id));
        const embeddedOnly = CATALOG.filter(([, id]) => !remoteIds.has(id));
        CATALOG = [...remoteCatalogue, ...embeddedOnly];
        console.info(`[Game Presence] Loaded ${remoteCatalogue.length} detectable games from Discord (+${embeddedOnly.length} embedded).`);
    } catch (error) {
        console.warn("[Game Presence] Could not load Discord's catalogue; using embedded fallback.", error);
    }

    if (cancelledWhileLoading || window[LOCK] !== loadingLock) {
        if (window[LOCK] === loadingLock) delete window[LOCK];
        console.warn("[Game Presence] Startup cancelled.");
        return;
    }

    function normalize(s) {
        return String(s).toLowerCase().normalize("NFD").replace(/\p{M}/gu, "")
            .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
    }
    function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

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

    function findInModules(req, predicate) {
        for (const mod of Object.values(req.c)) {
            try {
                const exp = mod?.exports;
                if (!exp || (typeof exp !== "object" && typeof exp !== "function")) continue;
                if (answersEverything(exp)) continue;
                for (const value of [exp, ...Object.values(exp)]) {
                    try {
                        if (!value || typeof value !== "object" || answersEverything(value)) continue;
                        if (predicate(value)) return value;
                    } catch (_) {}
                }
            } catch (_) {}
        }
        return null;
    }

    function storeName(store) {
        if (hasMethod(store, "getName")) return store.getName();
        return store.constructor?.displayName;
    }

    const req = getWebpackRequire();
    if (!req?.c) throw new Error("[Game Presence] Discord Webpack not found (Discord desktop is required).");

    const nativeShim = {
        hadDiscordNative: Boolean(window.DiscordNative),
        hadNativeModules: Boolean(window.DiscordNative?.nativeModules),
        originalNativeModules: window.DiscordNative?.nativeModules,
        utilsModule: null,
        originalGetDiscordUtils: null
    };

    function installNativeShim() {
        if (nativeShim.hadNativeModules) return;

        if (!window.DiscordNative) window.DiscordNative = {};
        window.DiscordNative.nativeModules = {
            requireModule: () => ({
                GetWindowFullscreenTypeByPid: () => 0,
                init: () => {},
                setOverlayCallback: () => {}
            }),
            ensureModule: () => Promise.resolve()
        };

        const utilsModule = findInModules(req, v => hasMethod(v, "getDiscordUtils"));
        if (utilsModule) {
            nativeShim.utilsModule = utilsModule;
            nativeShim.originalGetDiscordUtils = utilsModule.getDiscordUtils;
            utilsModule.getDiscordUtils = () => ({ GetWindowFullscreenTypeByPid: () => 0 });
        }
    }

    function restoreNativeShim() {
        if (nativeShim.utilsModule && nativeShim.originalGetDiscordUtils) {
            nativeShim.utilsModule.getDiscordUtils = nativeShim.originalGetDiscordUtils;
        }
        if (!nativeShim.hadDiscordNative) {
            delete window.DiscordNative;
        } else if (!nativeShim.hadNativeModules) {
            delete window.DiscordNative.nativeModules;
        } else {
            window.DiscordNative.nativeModules = nativeShim.originalNativeModules;
        }
    }

    const runStore = findInModules(req, v =>
        hasMethod(v, "getRunningGames") && hasMethod(v, "getGameForPID") &&
        storeName(v) === "RunningGameStore" &&
        Array.isArray(v.getRunningGames()));
    const dispatcher = findInModules(req, v =>
        hasMethod(v, "dispatch") && hasMethod(v, "subscribe") &&
        hasOwn(v, "_subscriptions") && typeof v._subscriptions === "object");
    if (!runStore || !dispatcher) {
        const missing = [!runStore && "RunningGameStore", !dispatcher && "Dispatcher"].filter(Boolean).join(" and ");
        throw new Error(`[Game Presence] ${missing} not found (${Object.keys(req.c).length} modules scanned).`);
    }

    const PATCHED = [
        "getRunningGames", "getGameForPID", "getVisibleGame", "getVisibleRunningGames", "getCandidateGames",
        "getRunningDiscordApplicationIds", "getRunningVerifiedApplicationIds", "getCurrentGameForAnalytics",
        "getGamesSeen", "isGameSeen", "isDetectionEnabled", "getGameForName", "getSeenGameByName"
    ];
    const original = {};
    for (const key of PATCHED) if (typeof runStore[key] === "function") original[key] = runStore[key];
    if (!original.getRunningGames || !original.getGameForPID) {
        throw new Error("[Game Presence] RunningGameStore methods not found.");
    }

    const superProperties = findInModules(req, v => hasMethod(v, "getSuperProperties"));
    const restAPI = window.Vencord?.Webpack?.Common?.RestAPI
        ?? findInModules(req, v => hasMethod(v, "get") && hasMethod(v, "post") && hasMethod(v, "del"));

    const isLinux = /Linux/i.test(navigator.userAgent);
    const OS = isLinux ? "linux" : "win32";
    const pid = 45000 + Math.floor(Math.random() * 10000);
    const order = shuffle(CATALOG.map((_, i) => i));
    let cursor = 0;
    const NAMES = CATALOG.map(([name]) => normalize(name));
    const SEARCH_ALIASES = new Map([
        [normalize("GTA 6"), normalize("Grand Theft Auto VI")],
        [normalize("GTA  VI"), normalize("Grand Theft Auto VI")],
        [normalize("Grand Theft Auto 6"), normalize("Grand Theft Auto VI")]
    ]);
    let current = null;
    let stopped = false;
    let switchTimer = null;
    let breakTimer = null;
    let tickTimer = null;
    let activityHeartbeatTimer = null;
    let nextSwitchAt = 0;
    let switchDuration = 0;
    let breakEndsAt = 0;
    let isResting = false;

    const entry = () => CATALOG[order[cursor]];
    const iconCache = new Map();
    const iconUrl = applicationId => {
        if (!iconCache.has(applicationId)) {
            iconCache.set(applicationId, fetch(`${location.origin}/api/v9/applications/${applicationId}/rpc`)
                .then(r => r.ok ? r.json() : null)
                .then(app => app?.icon ? `https://cdn.discordapp.com/app-icons/${applicationId}/${app.icon}.png?size=64` : null)
                .catch(() => null));
        }
        return iconCache.get(applicationId);
    };
    const searchGames = q => {
        const query = SEARCH_ALIASES.get(q) ?? q;
        return NAMES
            .map((n, i) => ({ i, n, pos: n.indexOf(query) }))
            .filter(hit => hit.pos !== -1)
            .sort((a, b) => (b.n === query) - (a.n === query) || a.pos - b.pos || a.n.length - b.n.length)
            .map(hit => hit.i);
    };
    const slug = name => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "game";

    function buildGame([name, applicationId, detectableExe]) {
        const exeName = detectableExe || (isLinux ? slug(name) : `${slug(name)}.exe`);
        const exePath = isLinux
            ? `/home/user/.local/share/games/${slug(name)}/${exeName}`
            : `c:/program files/${slug(name)}/${exeName}`;
        const startedAt = Date.now();
        return {
            id: applicationId,
            name,
            application_id: applicationId,
            pid,
            pidPath: [pid],
            processName: name,
            start: startedAt,
            lastFocused: Math.floor(startedAt / 1000),
            lastLaunched: startedAt,
            exeName,
            exePath,
            cmdLine: exePath,
            executables: [{ os: OS, name: exeName, is_launcher: false }],
            distributor: "steam",
            nativeProcessObserverId: -1,
            windowHandle: 0,
            fullscreenType: 0,
            overlay: false,
            elevated: false,
            sandboxed: false,
            hidden: false,
            isLauncher: false
        };
    }

    const withoutOurs = list => Array.isArray(list) ? list.filter(g => g?.pid !== pid) : [];
    const realGames = () => withoutOurs(original.getRunningGames.call(runStore));

    let analyticsToken = "";
    let analyticsTokenFetchedAt = 0;
    let analyticsSequence = 0;
    const fingerprints = new Map();
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

    function fingerprintFor(gameId) {
        const known = fingerprints.get(gameId);
        if (known !== undefined) return known;

        let detected = [];
        try {
            detected = [
                ...(typeof runStore.getRunningGames === "function" ? runStore.getRunningGames() : []),
                ...(typeof runStore.getGamesSeen === "function" ? runStore.getGamesSeen(true) : [])
            ];
        } catch (_) {}

        const fingerprint = detected.find(game =>
            (game?.id === gameId || game?.application_id === gameId) && game?.executableFingerprint
        )?.executableFingerprint ?? "";
        fingerprints.set(gameId, fingerprint);
        return fingerprint;
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

    async function getAnalyticsToken() {
        if (analyticsToken && Date.now() - analyticsTokenFetchedAt < 12 * 60 * 60 * 1000) {
            return analyticsToken;
        }

        const session = clientSession();
        let body;
        if (restAPI?.get) {
            const result = await restAPI.get({ url: "/users/@me", query: { with_analytics_token: true } });
            body = result?.body ?? result;
        } else {
            const response = await discordFetch("/users/@me?with_analytics_token=true", {
                credentials: "include",
                headers: apiHeaders(session.superProperties)
            });
            if (!response.ok) throw new Error(`Discord returned ${response.status} while fetching analytics token`);
            body = await response.json();
        }

        if (typeof body?.analytics_token !== "string") throw new Error("Discord returned no analytics_token");
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
        if (fingerprint) properties.executable_fingerprint = fingerprint;
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

    async function creditPlaytime(game, durationMs) {
        if (!settings.creditPlaytime || durationMs < 60_000 || !game?.id) return;

        const session = clientSession();
        const token = await getAnalyticsToken();
        const gameSession = crypto.randomUUID();
        const now = Date.now();
        const startedAt = Math.max(0, now - Math.floor(durationMs));
        const events = [
            buildHeartbeat(game, 0, gameSession, true, startedAt),
            buildLaunch(game, fingerprintFor(game.id), startedAt),
            buildHeartbeat(game, Math.floor(durationMs), gameSession, false, now)
        ];

        if (restAPI?.post) {
            await restAPI.post({ url: "/science", body: { token, events } });
        } else {
            const response = await discordFetch("/science", {
                method: "POST",
                credentials: "include",
                headers: apiHeaders(session.superProperties),
                body: JSON.stringify({ token, events })
            });
            if (!response.ok) throw new Error(`Discord returned ${response.status} while crediting playtime`);
        }
        console.info(`[Game Presence] Credited ${Math.round(durationMs / 60_000)}m of ${game.name}`);
    }

    function creditCurrentSession(game, durationMs) {
        if (!settings.creditPlaytime) return;
        creditPlaytime(game, durationMs).catch(error =>
            console.warn(`[Game Presence] Could not credit ${game?.name ?? "game"} playtime:`, error)
        );
    }

    const BATCH_DELAY_MS = 1000;
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function postScience(token, events, session) {
        for (let attempt = 0; ; attempt++) {
            let status = 0, retryAfter = 0;
            try {
                if (restAPI?.post) {
                    await restAPI.post({ url: "/science", body: { token, events } });
                    return;
                }
                const response = await discordFetch("/science", {
                    method: "POST",
                    credentials: "include",
                    headers: apiHeaders(session.superProperties),
                    body: JSON.stringify({ token, events })
                });
                if (response.ok) return;
                status = response.status;
                retryAfter = Number((await response.json().catch(() => ({}))).retry_after);
            } catch (error) {
                status = error?.status ?? error?.statusCode ?? 0;
                retryAfter = Number(error?.body?.retry_after);
                if (status !== 429) throw error;
            }
            if (status !== 429 || attempt >= 5) {
                throw Object.assign(new Error(`Discord returned ${status} during batch claim`), { status });
            }
            await sleep((retryAfter || 2) * 1000 + 250);
        }
    }

    async function batchClaimAll(hours = 1, count = null, perRequest = 16, onProgress = null, signal = null) {
        const token = await getAnalyticsToken();
        const durationMs = Math.floor(Math.max(0.1, hours) * 3_600_000);
        const games = (count ? CATALOG.slice(0, count) : CATALOG).map(buildGame);
        const chunkSize = clamp(Math.floor(perRequest) || 16, 1, 500);
        const session = clientSession();
        let ok = 0;
        for (let i = 0; i < games.length; i += chunkSize) {
            if (signal?.cancelled) break;
            const chunk = games.slice(i, i + chunkSize);
            const now = Date.now();
            const startedAt = Math.max(0, now - durationMs);
            const events = [];
            for (const game of chunk) {
                const gameSession = crypto.randomUUID();
                events.push(buildHeartbeat(game, 0, gameSession, true, startedAt));
                events.push(buildLaunch(game, fingerprintFor(game.id), startedAt));
                events.push(buildHeartbeat(game, durationMs, gameSession, false, now));
            }
            await postScience(token, events, session);
            ok += chunk.length;
            onProgress?.(ok, games.length);
            console.info(`[Game Presence] Batch claim ${ok}/${games.length}`);
            if (i + chunkSize < games.length) await sleep(BATCH_DELAY_MS);
        }
        console.info(`[Game Presence] Batch claim ${signal?.cancelled ? "stopped" : "done"}: ${ok} games × ${hours}h.`);
        return ok;
    }

    function setDebugGame(game) {
        dispatcher.dispatch({ type: "RUNNING_GAME_SET_DEBUG_GAME", game });
    }

    function patchStore() {
        runStore.getRunningGames = () => current ? [...realGames(), current] : realGames();
        runStore.getGameForPID = p => (p === pid && current) ? current : original.getGameForPID.call(runStore, p);
        if (original.getVisibleGame) {
            runStore.getVisibleGame = () => current ?? original.getVisibleGame.call(runStore);
        }
        for (const key of ["getVisibleRunningGames", "getCandidateGames"]) {
            if (!original[key]) continue;
            runStore[key] = () => {
                const list = withoutOurs(original[key].call(runStore));
                return current ? [...list, current] : list;
            };
        }
        if (original.getRunningDiscordApplicationIds) {
            runStore.getRunningDiscordApplicationIds = () => {
                const ids = original.getRunningDiscordApplicationIds.call(runStore) ?? [];
                return current?.id ? Array.from(new Set([...ids, current.id])) : ids;
            };
        }
        if (original.getRunningVerifiedApplicationIds) {
            runStore.getRunningVerifiedApplicationIds = () => {
                const ids = original.getRunningVerifiedApplicationIds.call(runStore) ?? [];
                return current?.id ? Array.from(new Set([...ids, current.id])) : ids;
            };
        }
        if (original.getCurrentGameForAnalytics) {
            runStore.getCurrentGameForAnalytics = () =>
                current ?? original.getCurrentGameForAnalytics.call(runStore);
        }
        if (original.getGamesSeen) {
            runStore.getGamesSeen = includeHidden => {
                const list = withoutOurs(original.getGamesSeen.call(runStore, includeHidden));
                return current ? [...list, current] : list;
            };
        }
        if (original.isGameSeen) {
            runStore.isGameSeen = id => current?.id === id || original.isGameSeen.call(runStore, id);
        }
        if (original.isDetectionEnabled) {
            runStore.isDetectionEnabled = game =>
                current != null && (game?.pid === pid || game?.id === current.id)
                    ? true
                    : original.isDetectionEnabled.call(runStore, game);
        }
        if (original.getGameForName) {
            runStore.getGameForName = name =>
                current?.name?.toLowerCase() === String(name).toLowerCase()
                    ? current
                    : original.getGameForName.call(runStore, name);
        }
        if (original.getSeenGameByName) {
            runStore.getSeenGameByName = name =>
                current?.name?.toLowerCase() === String(name).toLowerCase()
                    ? current
                    : original.getSeenGameByName.call(runStore, name);
        }
    }

    const ownBefore = new Set(PATCHED.filter(key => hasOwn(runStore, key)));
    function restoreStore() {
        for (const [key, fn] of Object.entries(original)) {
            if (ownBefore.has(key)) runStore[key] = fn;
            else delete runStore[key];
        }
    }

    function announceActivity() {
        if (!current) return;
        dispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", added: [current], removed: [], games: runStore.getRunningGames() });
        dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            socketId: "GamePresence",
            pid,
            activity: {
                name: current.name,
                application_id: current.application_id,
                type: 0,
                details: null,
                state: null,
                timestamps: { start: current.start },
                assets: null,
                flags: 1
            }
        });
    }

    function clearActivity() {
        if (!current) return;
        const old = current;
        current = null;
        creditCurrentSession(old, Date.now() - old.start);
        setDebugGame(null);
        dispatcher.dispatch({ type: "RUNNING_GAMES_CHANGE", added: [], removed: [old], games: realGames() });
        dispatcher.dispatch({ type: "LOCAL_ACTIVITY_UPDATE", socketId: "GamePresence", pid, activity: null });
    }

    function activate() {
        clearActivity();
        current = buildGame(entry());
        setDebugGame(current);
        announceActivity();
        if (!activityHeartbeatTimer) activityHeartbeatTimer = setInterval(announceActivity, 30_000);
        ui.showGame(entry(), cursor, order.length);
        console.log(`[Game Presence] Playing (${cursor + 1}/${order.length}): ${current.name}`);
    }

    function schedule() {
        clearTimeout(switchTimer);
        switchTimer = null;
        clearTimeout(breakTimer);
        breakTimer = null;
        breakEndsAt = 0;
        isResting = false;
        if (settings.paused) {
            nextSwitchAt = 0;
        } else {
            const min = settings.minMinutes * 60_000;
            const max = settings.maxMinutes * 60_000;
            switchDuration = min + Math.floor(Math.random() * (max - min + 1));
            nextSwitchAt = Date.now() + switchDuration;
            switchTimer = setTimeout(enterBreak, switchDuration);
        }
        ui.tick();
        ui.setPaused(settings.paused);
    }

    function enterBreak() {
        switchTimer = null;
        nextSwitchAt = 0;
        isResting = true;
        clearActivity();
        breakEndsAt = Date.now() + settings.restMinutes * 60_000;
        breakTimer = setTimeout(() => {
            breakTimer = null;
            if (stopped || settings.paused) return;
            isResting = false;
            breakEndsAt = 0;
            go(1);
        }, settings.restMinutes * 60_000);
        ui.tick();
        console.log(`[Game Presence] Resting for ${settings.restMinutes}m before the next game.`);
    }

    function clearBreak() {
        clearTimeout(breakTimer);
        breakTimer = null;
        breakEndsAt = 0;
        isResting = false;
    }

    function playAt(position) {
        clearBreak();
        cursor = (position + order.length) % order.length;
        activate();
        schedule();
    }

    function go(step) {
        playAt(cursor + step);
    }

    function playIndex(catalogIndex) {
        const pos = order.indexOf(catalogIndex);
        if (pos >= 0) playAt(pos);
    }

    function togglePause() {
        settings.paused = !settings.paused;
        save();
        if (settings.paused) {
            clearTimeout(switchTimer);
            switchTimer = null;
            nextSwitchAt = 0;
            clearBreak();
            ui.tick();
            ui.setPaused(true);
            return;
        }
        if (current) schedule();
        else enterBreak();
    }

    function setIntervals(min, max, rest = settings.restMinutes) {
        settings.minMinutes = clamp(Math.round(min) || 1, 1, 1440);
        settings.maxMinutes = clamp(Math.round(max) || settings.minMinutes, settings.minMinutes, 1440);
        settings.restMinutes = clamp(Math.round(rest) || DEFAULTS.restMinutes, 1, 10);
        save();
        if (current || settings.paused) schedule();
    }

    function stop() {
        if (stopped) return;
        stopped = true;
        clearTimeout(switchTimer);
        clearTimeout(breakTimer);
        breakTimer = null;
        breakEndsAt = 0;
        isResting = false;
        clearInterval(tickTimer);
        clearInterval(activityHeartbeatTimer);
        activityHeartbeatTimer = null;
        restoreStore();
        try { clearActivity(); } catch (_) {}
        restoreNativeShim();
        window.removeEventListener("pagehide", stop);
        ui.destroy();
        delete window[LOCK];
        console.log("[Game Presence] Stopped and RunningGameStore restored.");
    }

    const ui = (() => {
        const host = document.createElement("div");
        host.id = "gp-host";
        host.style.cssText = "position:fixed;z-index:999999;";
        const shadow = host.attachShadow({ mode: "open" });

        const ICON = {
            pad: `<svg viewBox="0 0 24 24"><path d="M6 11h4M8 9v4M15 12h.01M18 10h.01"/><path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.59l-.9 7.79A2.5 2.5 0 0 0 4.29 19c.9 0 1.73-.48 2.17-1.27L7.5 16h9l1.04 1.73c.44.79 1.27 1.27 2.17 1.27a2.5 2.5 0 0 0 2.49-2.62l-.9-7.79A4 4 0 0 0 17.32 5z"/></svg>`,
            search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>`,
            gear: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
            min: `<svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg>`,
            close: `<svg viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>`,
            prev: `<svg viewBox="0 0 24 24"><path d="M6 5h2v14H6zM20 5v14L9 12z"/></svg>`,
            next: `<svg viewBox="0 0 24 24"><path d="M16 5h2v14h-2zM4 5v14l11-7z"/></svg>`,
            play: `<svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>`,
            pause: `<svg viewBox="0 0 24 24"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>`,
            shuffle: `<svg viewBox="0 0 24 24"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>`,
            bolt: `<svg viewBox="0 0 24 24"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>`
        };

        shadow.innerHTML = `
<style>
:host { --accent:#8b5cf6; --accent-2:#6366f1; --accent-soft:rgba(139,92,246,.16);
        --bg:#111214; --bg-2:#18191c; --bg-3:#232428; --line:rgba(255,255,255,.07);
        --text:#f2f3f5; --muted:#8e9297; --soft:#c4c7cc; --danger:#ed4245; --ok:#3ba55d; --warn:#faa61a; }
* { box-sizing:border-box; font-family:"gg sans","Noto Sans","Helvetica Neue",Arial,sans-serif; }
button { font:inherit; border:0; cursor:pointer; color:inherit; background:none; padding:0; }
svg { width:16px; height:16px; display:block; fill:none; stroke:currentColor; stroke-width:2; stroke-linecap:round; stroke-linejoin:round; }

.panel { width:320px; padding:14px; color:var(--text);
         background:linear-gradient(180deg,rgba(139,92,246,.10),transparent 140px),var(--bg);
         border:1px solid var(--line); border-radius:16px; user-select:none;
         box-shadow:0 20px 50px rgba(0,0,0,.55),inset 0 0 0 1px rgba(139,92,246,.16);
         transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s; }
.panel.pulse { transform:translateY(-2px); box-shadow:0 20px 50px rgba(0,0,0,.55),0 0 26px rgba(139,92,246,.32),inset 0 0 0 1px rgba(139,92,246,.35); }
.panel.dragging { transition:none; opacity:.9; }
.mini { display:none; width:48px; height:48px; border-radius:16px; color:#fff;
        background:linear-gradient(135deg,var(--accent),var(--accent-2)); box-shadow:0 10px 24px rgba(99,102,241,.45); }
.mini svg { width:22px; height:22px; }
:host(.minimized) .panel { display:none; }
:host(.minimized) .mini { display:grid; place-items:center; }

.head { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; cursor:grab; }
.badge { display:flex; align-items:center; gap:7px; padding:5px 10px 5px 9px; border-radius:999px;
         background:var(--bg-2); border:1px solid var(--line);
         font-size:10.5px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; color:var(--soft); font-variant-numeric:tabular-nums; }
.dot { width:7px; height:7px; border-radius:50%; background:var(--ok); box-shadow:0 0 0 3px rgba(59,165,93,.22);
       animation:blink 2s infinite ease-in-out; }
.paused .dot { background:var(--warn); box-shadow:0 0 0 3px rgba(250,166,26,.22); animation:none; }
@keyframes blink { 50% { opacity:.45; } }
.tools { display:flex; gap:2px; }
.tool { width:28px; height:28px; border-radius:8px; display:grid; place-items:center; color:var(--muted); transition:background .15s,color .15s; }
.tool svg { width:15px; height:15px; }
.tool:hover, .tool.on { background:var(--bg-3); color:var(--text); }
.tool.on { color:var(--accent); }
.tool.close:hover { background:rgba(237,66,69,.15); color:var(--danger); }

.game { display:flex; align-items:center; gap:12px; padding:10px; margin-bottom:12px; border-radius:12px; background:var(--bg-2); border:1px solid var(--line); }
.icon { width:48px; height:48px; flex-shrink:0; border-radius:12px; overflow:hidden; display:grid; place-items:center; color:#fff;
        background:linear-gradient(135deg,var(--accent),var(--accent-2)); box-shadow:0 6px 16px rgba(99,102,241,.35); }
.icon svg { width:22px; height:22px; }
.icon img { width:100%; height:100%; object-fit:cover; }
.info { min-width:0; flex:1; }
.label { margin-bottom:3px; font-size:10px; font-weight:700; letter-spacing:.5px; text-transform:uppercase; color:var(--accent); }
.title { font-size:15px; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; transition:opacity .15s; }
.sub { margin-top:3px; font-size:11.5px; color:var(--muted); font-variant-numeric:tabular-nums; }

.track { height:4px; border-radius:999px; overflow:hidden; background:var(--bg-3); }
.bar, .pbar { height:100%; width:0; border-radius:inherit; background:linear-gradient(90deg,var(--accent),var(--accent-2)); }
.bar { transition:width 1s linear; }
.pbar { transition:width .3s ease; }

.player { display:flex; justify-content:center; align-items:center; gap:14px; margin-top:12px; }
.pbtn { width:32px; height:32px; border-radius:50%; color:var(--soft); display:grid; place-items:center; transition:background .15s,color .15s,transform .15s; }
.pbtn:hover { color:#fff; background:var(--bg-3); }
.pbtn svg { width:15px; height:15px; fill:currentColor; stroke:none; }
.pbtn.play { width:42px; height:42px; color:#fff; background:linear-gradient(135deg,var(--accent),var(--accent-2)); box-shadow:0 8px 20px rgba(99,102,241,.4); }
.pbtn.play:hover { transform:scale(1.06); background:linear-gradient(135deg,var(--accent),var(--accent-2)); }
.pbtn.play svg { width:17px; height:17px; }

.drawer { display:none; margin-top:14px; animation:slide .2s ease-out; }
.drawer.open { display:block; }
@keyframes slide { from { opacity:0; transform:translateY(-4px); } }
.card { padding:12px; border-radius:12px; background:var(--bg-2); border:1px solid var(--line); }
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
.claim { background:linear-gradient(135deg,var(--accent),var(--accent-2)); box-shadow:0 8px 20px rgba(99,102,241,.3); }
.claim.running { background:var(--bg-3); box-shadow:none; color:var(--soft); }
.claim.running:hover { color:var(--danger); filter:none; }
.claim.done { background:var(--ok); box-shadow:0 8px 20px rgba(59,165,93,.3); }
.claim.failed { background:var(--danger); box-shadow:0 8px 20px rgba(237,66,69,.3); }

.summary { display:grid; grid-template-columns:repeat(3,1fr); gap:6px; margin-top:10px; }
.stat { padding:8px 6px; border-radius:8px; background:var(--bg); border:1px solid var(--line); text-align:center; min-width:0; }
.stat b { display:block; font-size:13px; font-weight:700; font-variant-numeric:tabular-nums; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.stat span { display:block; margin-top:2px; font-size:9px; font-weight:700; letter-spacing:.4px; text-transform:uppercase; color:var(--muted); }
.progress { display:none; margin-top:10px; }
.progress.show { display:block; }
.progress .track { height:6px; }
.progress-text { display:flex; justify-content:space-between; margin-top:6px; font-size:10.5px; color:var(--muted); font-variant-numeric:tabular-nums; }

.search-wrap { position:relative; }
.search-wrap svg { position:absolute; left:10px; top:50%; transform:translateY(-50%); width:14px; height:14px; color:var(--muted); }
.search { width:100%; padding-left:32px; }
.results { margin-top:8px; max-height:200px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:var(--bg-3) transparent; }
.result { display:block; width:100%; padding:7px 10px; border-radius:7px; color:var(--soft);
          font-size:12.5px; text-align:left; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.result:hover { background:var(--accent-soft); color:#fff; }
.empty { padding:8px 10px; font-size:11.5px; color:var(--muted); }
</style>
<button class="mini" title="Show Game Presence">${ICON.pad}</button>
<div class="panel">
  <div class="head">
    <div class="badge"><span class="dot"></span><span class="count"></span></div>
    <div class="tools">
      <button class="tool" data-act="search" title="Choose a game">${ICON.search}</button>
      <button class="tool" data-act="settings" title="Settings">${ICON.gear}</button>
      <button class="tool" data-act="minimize" title="Minimize">${ICON.min}</button>
      <button class="tool close" data-act="stop" title="Stop">${ICON.close}</button>
    </div>
  </div>
  <div class="game">
    <div class="icon">${ICON.pad}</div>
    <div class="info"><div class="label">Now playing</div><div class="title">…</div><div class="sub"></div></div>
  </div>
  <div class="track"><div class="bar"></div></div>
  <div class="player">
    <button class="pbtn" data-act="prev" title="Previous game">${ICON.prev}</button>
    <button class="pbtn play" data-act="toggle" title="Pause">${ICON.pause}</button>
    <button class="pbtn" data-act="next" title="Next game">${ICON.next}</button>
  </div>
  <div class="drawer" data-drawer="search">
    <div class="search-wrap">${ICON.search}<input class="search" type="text" placeholder="Search ${CATALOG.length.toLocaleString("en-US")} games…" spellcheck="false"></div>
    <div class="results"></div>
  </div>
  <div class="drawer" data-drawer="settings">
    <div class="card">
      <div class="card-head">${ICON.shuffle}<h4>Rotation</h4></div>
      <div class="grid">
        <label class="field"><span>Min</span><div class="input"><input id="gp-min" type="number" min="1" max="1440"><i>min</i></div></label>
        <label class="field"><span>Max</span><div class="input"><input id="gp-max" type="number" min="1" max="1440"><i>min</i></div></label>
        <label class="field"><span>Break</span><div class="input"><input id="gp-rest" type="number" min="1" max="10"><i>min</i></div></label>
      </div>
      <label class="switch">
        <div><b>Credit playtime</b><small>Send each finished rotation session to Discord.</small></div>
        <input id="gp-credit" type="checkbox"><span class="knob"></span>
      </label>
      <button class="btn apply" data-act="apply">Apply</button>
    </div>
    <div class="card">
      <div class="card-head">${ICON.bolt}<h4>Batch claim</h4><span class="tag">Instant</span></div>
      <div class="grid">
        <label class="field"><span>Hours / game</span><div class="input"><input id="gp-hours" type="number" min="0.1" max="9999" step="0.5"><i>h</i></div></label>
        <label class="field"><span>Games</span><div class="input"><input id="gp-count" type="number" min="1" placeholder="All"></div></label>
        <label class="field"><span>Per request</span><div class="input"><input id="gp-chunk" type="number" min="1" max="500"></div></label>
      </div>
      <div class="summary">
        <div class="stat"><b class="s-hours">–</b><span>Total hours</span></div>
        <div class="stat"><b class="s-req">–</b><span>Requests</span></div>
        <div class="stat"><b class="s-time">–</b><span>Est. time</span></div>
      </div>
      <div class="progress"><div class="track"><div class="pbar"></div></div><div class="progress-text"><span class="p-left"></span><span class="p-right"></span></div></div>
      <button class="btn claim" data-act="claimAll">${ICON.bolt}<span class="claim-label">Claim all games</span></button>
    </div>
  </div>
</div>`;

        const $ = sel => shadow.querySelector(sel);
        const panel = $(".panel");
        const els = {
            count: $(".count"), icon: $(".icon"), title: $(".title"), sub: $(".sub"), bar: $(".bar"),
            play: $(".play"), min: $("#gp-min"), max: $("#gp-max"), rest: $("#gp-rest"), credit: $("#gp-credit"),
            search: $(".search"), results: $(".results"),
            hours: $("#gp-hours"), gameCount: $("#gp-count"), chunk: $("#gp-chunk"),
            claim: $(".claim"), claimLabel: $(".claim-label"),
            sHours: $(".s-hours"), sReq: $(".s-req"), sTime: $(".s-time"),
            progress: $(".progress"), pbar: $(".pbar"), pLeft: $(".p-left"), pRight: $(".p-right")
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
        if (settings.minimized) host.classList.add("minimized");

        let drag = null;
        $(".head").addEventListener("pointerdown", e => {
            if (e.target.closest("button")) return;
            const r = host.getBoundingClientRect();
            drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
            panel.classList.add("dragging");
            e.currentTarget.setPointerCapture(e.pointerId);
        });
        $(".head").addEventListener("pointermove", e => {
            if (!drag) return;
            Object.assign(host.style, {
                left: `${clamp(e.clientX - drag.dx, 8, innerWidth - host.offsetWidth - 8)}px`,
                top: `${clamp(e.clientY - drag.dy, 8, innerHeight - host.offsetHeight - 8)}px`,
                right: "", bottom: ""
            });
        });
        const endDrag = e => {
            if (!drag) return;
            drag = null;
            panel.classList.remove("dragging");
            const r = host.getBoundingClientRect();
            const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
            settings.corner = `${cy < innerHeight / 2 ? "top" : "bottom"}-${cx < innerWidth / 2 ? "left" : "right"}`;
            save();
            placeAtCorner(settings.corner);
        };
        $(".head").addEventListener("pointerup", endDrag);
        $(".head").addEventListener("pointercancel", endDrag);

        const batchInputs = () => ({
            hours: clamp(Number(els.hours.value) || DEFAULTS.batchHours, 0.1, 9999),
            count: clamp(Math.floor(Number(els.gameCount.value)) || CATALOG.length, 1, CATALOG.length),
            chunk: clamp(Math.floor(Number(els.chunk.value)) || DEFAULTS.batchChunk, 1, 500)
        });
        const updateSummary = () => {
            const { hours, count, chunk } = batchInputs();
            const requests = Math.ceil(count / chunk);
            const seconds = requests * (BATCH_DELAY_MS / 1000 + 0.4);
            els.sHours.textContent = fmt(Math.round(hours * count));
            els.sReq.textContent = fmt(requests);
            els.sTime.textContent = seconds < 60 ? `${Math.ceil(seconds)}s` : `${Math.ceil(seconds / 60)} min`;
            if (!claimRun) els.claimLabel.textContent = count >= CATALOG.length ? "Claim all games" : `Claim ${fmt(count)} games`;
        };
        const saveBatchInputs = () => {
            const { hours, chunk } = batchInputs();
            settings.batchHours = hours;
            settings.batchCount = Math.max(0, Math.floor(Number(els.gameCount.value)) || 0);
            settings.batchChunk = chunk;
            save();
            updateSummary();
        };

        const toggleDrawer = name => {
            for (const d of shadow.querySelectorAll(".drawer")) {
                d.classList.toggle("open", d.dataset.drawer === name && !d.classList.contains("open"));
            }
            const openName = shadow.querySelector(".drawer.open")?.dataset.drawer;
            for (const b of shadow.querySelectorAll(".tool[data-act]")) b.classList.toggle("on", b.dataset.act === openName);
            if ($(`.drawer[data-drawer="search"]`).classList.contains("open")) {
                els.search.value = "";
                renderResults("");
                els.search.focus();
            }
            if ($(`.drawer[data-drawer="settings"]`).classList.contains("open")) {
                els.min.value = settings.minMinutes;
                els.max.value = settings.maxMinutes;
                els.rest.value = settings.restMinutes;
                els.credit.checked = settings.creditPlaytime;
                els.hours.value = settings.batchHours;
                els.gameCount.value = settings.batchCount || "";
                els.chunk.value = settings.batchChunk;
                updateSummary();
            }
        };
        const closeDrawers = () => {
            shadow.querySelectorAll(".drawer").forEach(d => d.classList.remove("open"));
            shadow.querySelectorAll(".tool.on").forEach(b => b.classList.remove("on"));
        };

        const renderResults = query => {
            const q = normalize(query);
            const hits = q ? searchGames(q).slice(0, 30) : [];
            els.results.replaceChildren(...(hits.length ? hits.map(i => {
                const b = document.createElement("button");
                b.className = "result";
                b.textContent = CATALOG[i][0];
                b.onclick = () => { closeDrawers(); playIndex(i); };
                return b;
            }) : [Object.assign(document.createElement("div"), {
                className: "empty", textContent: q ? "No games found." : "Type a game name."
            })]));
        };
        els.search.addEventListener("input", () => renderResults(els.search.value));
        els.credit.addEventListener("change", () => {
            settings.creditPlaytime = els.credit.checked;
            save();
        });
        for (const input of [els.hours, els.gameCount, els.chunk]) input.addEventListener("input", saveBatchInputs);
        for (const input of [els.search, els.min, els.max, els.rest, els.hours, els.gameCount, els.chunk]) {
            for (const type of ["keydown", "keyup", "keypress"]) {
                input.addEventListener(type, e => e.stopPropagation());
            }
        }
        els.search.addEventListener("keydown", e => {
            if (e.key === "Enter") els.results.querySelector(".result")?.click();
            if (e.key === "Escape") closeDrawers();
        });
        for (const input of [els.min, els.max, els.rest]) {
            input.addEventListener("keydown", e => {
                if (e.key === "Enter") actions.apply();
            });
        }

        const actions = {
            prev: () => go(-1),
            next: () => go(1),
            toggle: togglePause,
            stop,
            search: () => toggleDrawer("search"),
            settings: () => toggleDrawer("settings"),
            minimize: () => { host.classList.add("minimized"); settings.minimized = true; save(); },
            apply: () => {
                setIntervals(Number(els.min.value), Number(els.max.value), Number(els.rest.value));
                closeDrawers();
            },
            claimAll: () => {
                if (claimRun) {
                    claimRun.cancelled = true;
                    els.claimLabel.textContent = "Stopping…";
                    return;
                }
                const { hours, count, chunk } = batchInputs();
                const run = claimRun = { cancelled: false };
                const showProgress = (done, total) => {
                    const pct = total ? Math.floor((done / total) * 100) : 0;
                    els.pbar.style.width = `${pct}%`;
                    els.pLeft.textContent = `${fmt(done)} / ${fmt(total)} games`;
                    els.pRight.textContent = `${pct}%`;
                };
                const finish = (state, label) => {
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
                els.claimLabel.textContent = "Claiming… click to stop";
                els.progress.classList.add("show");
                showProgress(0, count);
                batchClaimAll(hours, count, chunk, showProgress, run)
                    .then(n => finish("done", run.cancelled ? `Stopped · ${fmt(n)} games` : `Done · ${fmt(n)} games`))
                    .catch(error => {
                        console.error("[Game Presence] Batch claim failed:", error);
                        finish("failed", `Failed${error?.status ? ` · ${error.status}` : ""} · see console`);
                    });
            }
        };
        shadow.addEventListener("click", e => {
            const btn = e.target.closest("[data-act]");
            if (btn) actions[btn.dataset.act]?.();
        });
        $(".mini").addEventListener("click", () => { host.classList.remove("minimized"); settings.minimized = false; save(); });

        document.body.appendChild(host);

        let renderToken = 0;
        return {
            showGame([name, applicationId], idx, total) {
                const token = ++renderToken;
                els.count.textContent = `Playing · ${idx + 1}/${total}`;
                els.title.style.opacity = "0";
                panel.classList.add("pulse");
                setTimeout(() => {
                    if (token !== renderToken) return;
                    els.title.textContent = name;
                    els.title.title = name;
                    els.title.style.opacity = "1";
                    els.icon.innerHTML = ICON.pad;
                    iconUrl(applicationId).then(url => {
                        if (!url || token !== renderToken) return;
                        const img = new Image();
                        img.alt = "";
                        img.onload = () => { if (token === renderToken) els.icon.replaceChildren(img); };
                        img.src = url;
                    });
                }, 150);
                setTimeout(() => { if (token === renderToken) panel.classList.remove("pulse"); }, 900);
            },
            tick() {
                if (isResting) {
                    const left = Math.max(0, breakEndsAt - Date.now());
                    const s = Math.floor(left / 1000);
                    const m = Math.floor(s / 60), sec = s % 60;
                    els.count.textContent = "Resting";
                    els.sub.textContent = `Next game in ${m}m ${String(sec).padStart(2, "0")}s`;
                    els.bar.style.width = `${(((settings.restMinutes * 60_000 - left) / (settings.restMinutes * 60_000)) * 100).toFixed(1)}%`;
                    return;
                }
                if (!nextSwitchAt) {
                    if (!current) els.count.textContent = "Paused";
                    els.sub.textContent = "Rotation paused";
                    els.bar.style.width = "0%";
                    return;
                }
                const left = Math.max(0, nextSwitchAt - Date.now());
                const s = Math.floor(left / 1000);
                const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
                els.sub.textContent = `Next game in ${h ? `${h}h ` : ""}${m}m ${String(sec).padStart(2, "0")}s`;
                els.bar.style.width = `${(((switchDuration - left) / switchDuration) * 100).toFixed(1)}%`;
            },
            setPaused(paused) {
                panel.classList.toggle("paused", paused);
                els.play.innerHTML = paused ? ICON.play : ICON.pause;
                els.play.title = paused ? "Resume rotation" : "Pause rotation";
            },
            destroy() {
                if (claimRun) claimRun.cancelled = true;
                host.remove();
            }
        };
    })();

    window[LOCK] = {
        stop,
        next: () => go(1),
        previous: () => go(-1),
        togglePause,
        play: name => {
            const q = normalize(name ?? "");
            const i = q ? searchGames(q)[0] : undefined;
            if (i === undefined) return console.warn(`[Game Presence] Game not found: ${name}`);
            playIndex(i);
        },
        setIntervals,
        batchClaim: (hours = settings.batchHours, count = null, perRequest = settings.batchChunk) =>
            batchClaimAll(hours, count, perRequest),
        get current() { return current?.name ?? null; },
        get games() { return CATALOG.map(([n]) => n); }
    };

    window.addEventListener("pagehide", stop, { once: true });
    try {
        installNativeShim();
        patchStore();
        activate();
        schedule();
        tickTimer = setInterval(() => ui.tick(), 1000);
    } catch (error) {
        stop();
        throw error;
    }

    console.log(`[Game Presence] ${CATALOG.length} games loaded. Commands: window.__gamePresence.next() / .play("Minecraft") / .batchClaim(hours, count, perRequest) / .stop()`);
})();
