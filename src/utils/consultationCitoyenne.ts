const QUESTIONS = {
   'Vaut-il mieux libérer un coupable ou condamner un innocent ?': [],
   'Une langue influence-t-elle notre façon de penser ?': [],
   'Un enfant a-t-il besoin de deux parents pour bien grandir ?': [],
   'Une intelligence artificielle pourrait-elle gouverner un pays ?': [],
   'Pourquoi l’être humain a-t-il besoin de rituels ?': [],
   "Des scientifiques te proposent de sauver l'humanité d'un astéroïde MAIS pour ça, ils doivent étudier les effets de la sodomie extrême. Tu dois choisir : Te faire enculer à sec par un gorille mutant en rut pendant 24h non-stop OU laisser l'humanité crever mais tu peux garder ton cul intact (et vierge, avoue-le) ?":
      [
         "Vaseline? Ah non merde. Pour l'humanité!", // Shortened
         'Que la planète brûle, mon cul est une zone interdite', // Shortened
         'Négocie: gorille ou Plus Belle la Vie? (Prends gorille)', // Shortened
         "Va t'faire enculer par le gorille, sale chien", // Shortened
         'Je demande si le gorille est bien membré avant', // Shortened
      ],
   'Peut-on être heureux sans faire le bien ?': [],
   'L’Histoire nous apprend-elle vraiment des leçons ?': [],
   'Peut-on rire de tout ?': [],
   'Le transhumanisme est-il une évolution naturelle de l’humanité ?': [],
   'La musique influence-t-elle notre humeur ?': [],
   'La décroissance est-elle une solution viable ?': [],
   'Peut-on comprendre une culture sans parler sa langue ?': [],
   'Un couple doit-il tout se dire ?': [],
   'Sommes-nous plus libres aujourd’hui qu’il y a 100 ans ?': [],
   'Peut-on convaincre quelqu’un de changer d’avis ?': [],
   'La science peut-elle tout expliquer ?': [],
   'La méritocratie existe-t-elle vraiment ?': [],
   'A-t-on besoin des autres pour être heureux ?': [],
   'Le travail d’équipe est-il toujours efficace ?': [],
   'Pourquoi est-il parfois difficile de demander pardon ?': [],
   'Les avancées médicales doivent-elles être accessibles à tous, quel que soit le coût ?': [],
   'Le temps est-il une illusion ?': [],
   'Les petits gestes individuels ont-ils un réel impact sur l’environnement ?': [],
   "Tu préfères ne plus JAMAIS avoir accès à internet (ni porno, ni jeux, ni JVC, ni RIEN, retour à l'âge de pierre numérique) OU devoir lécher l'anus d'un cadavre en décomposition une fois par semaine pendant un an, devant ta famille ?":
      [
         'Adieu Internet, bonjour le trou de balle froid', // OK
         'Je lèche le cul du mort, famille ou pas OSEF', // Shortened
         'Je le fais discretos, ptet que personne verra', // Shortened
         'Va crever, toi et ton sondage de merde', // OK
         'Pirate wifi voisin + enculer cadavre en douce', // Shortened
      ],
   'La vengeance est-elle légitime dans certains cas ?': [],
   'Doit-on toujours dire la vérité ?': [],
   'Faut-il interdire la publicité pour des raisons éthiques ?': [],
   'La science peut-elle réellement tout expliquer ?': [],
   'Aider les autres est-il un devoir moral ?': [],
   'Les actions individuelles suffisent-elles à changer le monde ?': [],
   "Si chaque fois qu'une féministe wesh-wesh sur TikTok ouvre sa gueule pour se plaindre d'un truc bidon, un de tes poils de cul tombait, préférerais-tu qu'elles continuent à chialer jusqu'à ce que t'aies le cul lisse comme un bébé phoque OU qu'elles la ferment mais que ta bite rétrécisse d'1cm par jour jusqu'à disparition ?":
      [
         "Vive le cul glabre, qu'elles gueulent ces truies !", // OK
         'Fermez-la, salopes, je tiens à mes 3cm !', // OK
         "Osef, j'ai déjà une micro-bite ET le cul épilé", // OK
         "Ta question pue comme les aisselles d'une écolo", // Shortened
         'Deviens féministe pour contrôler le game des poils', // Shortened
      ],
   "Combat à mort : Toi, à poil et armé d'une seule chaussette sale pleine de sperme séché, contre 50 chihuahuas enragés et séropositifs OU contre une armée de 1000 étrons de clochard qui ont pris vie et qui veulent te bouffer le cul ?":
      [
         'Je meurs sous les morsures de clébard sidaiques', // OK
         'Je me fais dévorer par la merde puante', // OK
         'Je fuis en chialant et glissant sur ma propre pisse', // Shortened
         'Enculé de modo avec tes questions de fdp', // OK
         "J'utilise chaussette comme gourdin ET masque à gaz", // Shortened
      ],
   'La compétition nous rend-elle meilleurs ?': [],
   'Peut-on être soi-même sans être influencé par les autres ?': [],
   'L’existence a-t-elle un sens ?': [],
   'Les films sont-ils meilleurs que les livres ?': [],
   'Faut-il enseigner plus d’une langue dès la maternelle ?': [],
   'Les jeux de société sont-ils plus enrichissants que les jeux vidéo ?': [],
   'Doit-on toujours respecter les lois, même injustes ?': [],
   'Les commémorations sont-elles essentielles ou inutiles ?': [],
   'L’athéisme est-il aussi une croyance ?': [],
   "Tu apprends que ton gosse de 5 ans n'est pas de toi mais du facteur nain et bossu du quartier. Que fais-tu ? Tu l'élèves comme ton fils en lui apprenant à détester les facteurs OU tu l'abandonnes sur une aire d'autoroute avec un mot \"Retour à l'envoyeur\" ?":
      [
         'Mon fils, et ensemble on crève les pneus du facteur !', // Shortened
         "Bye bye le nabot, direction l'A7 !", // OK
         'Je le garde MAIS il portera une fausse bosse (vengé)', // Shortened
         'Ta mère la naine bossue, connard', // OK
         'Je vais voir le facteur pour une pension alimentaire', // Shortened
      ],
   'Faut-il craindre la surveillance généralisée ?': [],
   'Devrait-on interdire certaines technologies avant même qu’elles existent ?': [],
   "Qu'est-ce qui a le moins de valeur intrinsèque et devrait être éradiqué en premier pour le bien de l'univers : Les mouches à merde qui se posent sur ton kebab OU les influenceurs qui font des placements de produit pour des gaines amincissantes de merde ?":
      [
         'Mort aux mouches, mon kebab est sacré !', // OK
         'Exterminez les influenceurs, ces sous-merdes !', // OK
         'Les deux, et on donne les influenceurs aux mouches', // Shortened
         'Ta question a moins de valeur que mon dernier étron', // OK
         'Deviens influenceur anti-mouches (le beurre & argent)', // Shortened
      ],
   "Tu es coincé sur une île déserte avec seulement deux options pour survivre : Manger les crottes de nez séchées de ton pire ennemi (qui est aussi sur l'île et qui en produit des tonnes) OU boire l'eau croupie dans laquelle baignent les pieds lépreux d'un vieux pêcheur échoué ?":
      [
         'Donnez ces crottes de nez, connu pire à la cantine', // Shortened
         'Je sirote le jus de pied lépreux, YOLO !', // OK
         'Je crève de faim et de soif, putain de merde', // OK
         "L'auteur, t'es le 1er truc que je bouffe sur l'île", // Shortened
         'Je tente un filtre avec les poils de cul du pêcheur', // Shortened
      ],
   'Faut-il toujours faire des compromis en amour ?': [],
   'Les fake news sont-elles une menace pour la démocratie ?': [],
   "Tu dois choisir une nouvelle \"fonctionnalité\" pour ton corps : Soit tu peux éjaculer de l'acide sulfurique (pratique pour dissoudre les emmerdeurs, mais adieu le sexe), SOIT tes pets deviennent des gaz neurotoxiques mortels mais totalement silencieux et inodores (discret mais risque d'auto-génocide si t'as la chiasse).":
      [
         'Acide dans les couilles, la paix avant tout !', // OK
         "Pet ninja mortel, j'ai une liste de gens à endormir", // Shortened
         'Je garde mon corps de merde actuel, merci bien', // OK
         "T'as pas sniffé l'acide toi-même avant de pondre ça ?", // Shortened
         'Je prends les pets, mais avec une couche en kevlar', // Shortened
      ],
   'Le destin existe-t-il ?': [],
   'Vieillir, est-ce forcément décliner ?': [],
   'Un jour, vivrons-nous sur Mars ?': [],
   'L’Histoire se répète-t-elle inévitablement ?': [],
   'Devrait-on limiter le nombre d’enfants pour préserver la planète ?': [],
   'Faut-il limiter la recherche sur l’ADN humain ?': [],
   'La compétition à l’école est-elle bénéfique ou nuisible ?': [],
   'Faut-il interdire la diffusion de fausses informations ?': [],
   'Faut-il taxer davantage les grandes fortunes ?': [],
   'Peut-on être libre dans une société ?': [],
   'Faut-il apprendre plusieurs langues dès l’enfance ?': [],
   'L’apprentissage par l’expérience est-il plus efficace que la théorie ?': [],
   'L’éducation doit-elle être totalement gratuite ?': [],
   'Les enfants doivent-ils apprendre à gérer l’échec dès le plus jeune âge ?': [],
   'Peut-on concilier progrès économique et écologie ?': [],
   'Pourquoi certaines personnes croient-elles aux théories du complot ?': [],
   'Peut-on prouver que la Terre est ronde à quelqu’un qui refuse d’y croire ?': [],
   'L’écologie est-elle un luxe de pays riches ?': [],
   'L’ennui est-il une perte de temps ou un moment nécessaire ?': [],
   'La démocratie est-elle le meilleur système politique ?': [],
   'Les influenceurs ont-ils trop d’impact sur la société ?': [],
   'Si on trouvait une autre planète habitable, faudrait-il y aller ?': [],
   'Si demain, la "merde d\'artiste" de Manzoni devient la seule monnaie mondiale, préférerais-tu passer ta vie à chier dans des boîtes pour devenir riche OU rester pauvre mais pouvoir continuer à torcher ton cul avec du PQ triple épaisseur parfumé à la lavande ?':
      [
         "À moi la fortune ! Je chie des lingots d'or (brun)", // Shortened
         'Je garde mon PQ soyeux, la dignité avant tout (lol)', // OK
         'Vendre merde des autres pour être riche (mains propres)', // Shortened
         'Va chier dans une boîte, toi et tes idées de merde', // OK
         "J'investis dans laxatifs de luxe pour optimiser prod", // Shortened
      ],
   'L’intelligence artificielle aura-t-elle un jour une conscience ?': [],
   'Les deepfakes sont-ils un danger pour la vérité ?': [],
   'La peine de mort est-elle justifiable dans certains cas ?': [],
   'Éduquer un enfant est-il plus difficile aujourd’hui qu’avant ?': [],
   'L’ennui est-il nécessaire pour la créativité ?': [],
   'L’égoïsme est-il toujours négatif ?': [],
   'Nos souvenirs sont-ils une version fidèle du passé ?': [],
   'Effacer un personnage historique controversé de l’Histoire est-il justifiable ?': [],
   'Apprendre une langue change-t-il notre personnalité ?': [],
   'Les jeux vidéo sont-ils une forme d’art ?': [],
   "T'es obligé de boire un litre de ta propre chiasse liquéfiée et chaude OU de mettre une énorme patate dans la gueule de ta grand-mère grabataire juste après qu'elle t'ait dit \"je t'aime\". Tu fais quoi, sale déchet ?":
      [
         "Avale la merde, Mamie d'abord", // OK
         'Je défonce Mamie, OSEF du gâteau', // OK
         "Les deux, j'ai la dalle ET la haine", // OK
         'Ta mère la pute avec tes questions', // OK
         'Je me suicide avant, plus simple', // OK
      ],
   "Tu découvres que t'es le fruit d'un viol incestueux entre ton père et ta sœur handicapée mentale trisomique. Pour laver l'honneur familial (lol), tu dois : Égorger toute ta famille restante avec une cuillère rouillée OU te faire greffer une tête de chien sur le corps et aboyer pour le reste de ta vie quand tu veux parler ?":
      [
         'Sortez la cuillère, le sang va couler !', // OK
         'Wouf Wouf ! (Passe le collier à clous)', // OK
         'Je fuis au Mexique et change nom en "Juan Con Pito"', // Shortened
         "L'auteur, 1er que j'égorge avec cuillère, fdp", // Shortened
         'Osef, ça explique pourquoi je suis sur ce Discord', // OK
      ],
   'La première impression est-elle toujours la bonne ?': [],
   'La technologie facilite-t-elle ou complique-t-elle l’éducation des enfants ?': [],
   'La conquête spatiale est-elle essentielle ?': [],
   'La vérité est-elle toujours préférable au mensonge ?': [],
   'L’échec est-il une étape obligatoire vers le succès ?': [],
   'Faut-il enseigner la philosophie dès le plus jeune âge ?': [],
   'Les miracles existent-ils vraiment ?': [],
   'Dans un futur dystopique où les ressources manquent, on décide de recycler les cadavres. Tu préfères que ton corps après ta mort soit transformé en : Croquettes pour chiens bas de gamme (destinées aux clébards de SDF), OU en lubrifiant sexuel pour maisons closes spécialisées dans le géronto-fétichisme ?':
      [
         'Croquettes chien, au moins je sers à nourrir', // Shortened
         'Lubrifiant pour vieux dégueu, ça me ressemble plus', // OK
         'Incinération et dispersion dans les chiottes publiques', // Shortened
         "Tes idées si noires, la lumière n'ose plus approcher", // Shortened
         "Naturalisé pour finir dans un musée d'horreurs", // Shortened
      ],
   'La passion peut-elle devenir une obsession ?': [],
   'Les algorithmes dirigent-ils nos vies ?': [],
   'La paix mondiale est-elle un objectif atteignable ?': [],
   'Tu dois choisir : soit tu te brosses les dents tous les matins pour le restant de tes jours avec la brosse à chiottes familiale (la vieille, celle qui a des traces marrons), SOIT tu dois appeler ta mère "grosse pute" à chaque fois que tu lui parles au téléphone.':
      [
         "Passe la brosse à chiottes, j'ai l'estomac solide", // OK
         'Allo Maman Grosse Pute ? Pas le choix désolé', // OK
         "Brosse plus jamais dents ET j'appelle plus ma mère", // Shortened
         "Ta race l'auteur, t'es possédé", // OK
         "Je deviens muet et j'utilise que du bain de bouche", // OK
      ],
   'Faut-il protéger la liberté d’expression à tout prix ?': [],
   'Vieillir est-il une maladie à combattre ?': [],
   'Faut-il bannir complètement le plastique ?': [],
   'Qu\'est-ce qui a le plus de potentiel pour "contribuer positivement" à la société : Un enfant trisomique qui sourit tout le temps mais ne fera jamais rien de "productif", OU un trader de Wall Street cocaïné qui ruine des vies mais fait "tourner l\'économie" (et sniffe sur les putes) ?':
      [
         'Le triso, au moins il nuit pas (vs FDP de trader)', // Shortened
         "Le trader, l'argent c'est la vie, nique les sentiments", // Shortened
         'Les deux aussi inutiles (raisons différentes)', // Shortened
         "Question si puante qu'elle tuerait le trader (cf Q14)", // Shortened
         'Kidnappe trader et donne son fric au gosse triso', // Shortened
      ],
   'Peut-on vraiment changer de personnalité ?': [],
   'La communication non verbale est-elle plus puissante que les mots ?': [],
   'Peut-on devenir accro au travail comme à un loisir ?': [],
   'L’énergie nucléaire est-elle une solution écologique ?': [],
   'Est-il plus important d’être respecté ou aimé ?': [],
   'L’IA peut-elle remplacer les artistes ?': [],
   'Pourquoi avons-nous besoin de reconnaissance ?': [],
   'Le libre arbitre existe-t-il vraiment ?': [],
   'Faut-il apprendre à pardonner tout ?': [],
   'Travailler moins rend-il plus heureux ?': [],
   'Peut-on vraiment éviter de reproduire l’éducation que l’on a reçue ?': [],
   'Faut-il instaurer un revenu universel ?': [],
   'La chirurgie esthétique est-elle une bonne ou une mauvaise chose ?': [],
   'Les élèves devraient-ils avoir plus de liberté dans leur apprentissage ?': [],
   'Pourquoi avons-nous peur du regard des autres ?': [],
   'Faut-il préserver les langues en voie de disparition ?': [],
   'Faut-il revoir entièrement le système éducatif ?': [],
   'Le mariage est-il encore une institution utile ?': [],
   'La diversité culturelle est-elle en danger ?': [],
   'Faut-il légaliser toutes les drogues ?': [],
   'Faut-il craindre une guerre homme-machine ?': [],
   "Pour l'éternité en Enfer, tu préfères être condamné à trier des montagnes de cotons-tiges usagés et pleins de cérumen avec tes dents OU à devoir renifler bruyamment et en faisant semblant d'aimer ça, les pets de tous les gros beaufs qui sortent des chiottes publics après une gastro ?":
      [
         "Team Coton-tige dégueu, au moins y'a pas l'odeur", // OK
         "Team Renifleur de Fions publics, on s'habitue ptet?", // Shortened
         "Enfer classique avec Satan, c'est moins pire putain", // Shortened
         'Fils de pute intergalactique', // OK
         'Négocie avec Dieu pour récurer les chiottes du Paradis', // Shortened
      ],
   'Peut-on être libre dans une société où tout est réglementé ?': [],
   'Un couple peut-il durer sans désir physique ?': [],
   "Combat dans la boue : Une horde de militants vegans extrémistes armés de tofu moisi VS une bande de chasseurs beaufs bourrés armés de saucissons secs périmés. Qui mérite le plus de gagner cette bataille de l'inutilité crasse ?":
      [
         'Les vegans, marre des beaufs qui puent la vinasse', // OK
         'Les chasseurs, faut bien réguler ces nuisibles vegans', // Shortened
         "Qu'ils s'entretuent tous, on sera tranquilles", // OK
         'Ta question pue: tofu moisi ET saucisson périmé', // Shortened
         'Je parie sur la boue, elle va tous les engloutir', // OK
      ],
   'Faut-il sacrifier une partie de sa liberté pour plus de sécurité ?': [],
   'L’humanité doit-elle chercher à vivre éternellement ?': [],
   'La surveillance gouvernementale peut-elle être justifiée ?': [],
   'Nos souvenirs sont-ils fiables ?': [],
   'Les compétences pratiques sont-elles sous-estimées dans l’éducation ?': [],
   'La censure est-elle parfois nécessaire ?': [],
   'La famille est-elle plus importante que les amis ?': [],
   'Quel est ton artiste préféré ?': [],
   'Pourquoi avons-nous l’impression que le temps passe plus vite en vieillissant ?': [],
   'Faut-il faire un travail qui a du sens ou qui rapporte de l’argent ?': [],
   'La décroissance est-elle viable sur le long terme ?': [],
   'L’écologie doit-elle primer sur le progrès technologique ?': [],
   'Le cinéma est-il un art majeur ?': [],
   'Les musées doivent-ils restituer les œuvres volées ?': [],
   'Le progrès scientifique doit-il être limité par l’éthique ?': [],
   'Quel tableau célèbre aimerais-tu voir en vrai ?': [],
   'La nature a-t-elle des droits ?': [],
   'L’anglais doit-il devenir la langue universelle ?': [],
   'L’anonymat en ligne est-il une bonne ou une mauvaise chose ?': [],
   'La religion divise-t-elle plus qu’elle ne rassemble ?': [],
   'Pourquoi aimons-nous les mystères et l’inexpliqué ?': [],
   'Pourquoi avons-nous besoin de nous comparer aux autres ?': [],
   'La liberté a-t-elle des limites ?': [],
   'Peut-on concilier urbanisation et respect de l’environnement ?': [],
   'Le bonheur est-il une quête ou un état d’esprit ?': [],
   'Les loisirs sont-ils une perte de temps ou une nécessité ?': [],
   'L’éducation à la maison est-elle une meilleure alternative ?': [],
   'La loi doit-elle évoluer en fonction des mœurs ou rester immuable ?': [],
   'La légitime défense est-elle un argument valable en justice ?': [],
   'Faut-il séparer l’œuvre de l’artiste ?': [],
   'Les parents doivent-ils imposer des valeurs à leurs enfants ?': [],
   'Faut-il interdire la viande pour sauver la planète ?': [],
   'Les robots remplaceront-ils les humains dans tous les métiers ?': [],
   'La surinformation nous empêche-t-elle de réfléchir ?': [],
   'La routine est-elle ennemie du bonheur ?': [],
   'Doit-on encore honorer les héros du passé ?': [],
   'Faut-il toujours essayer de sauver un couple en crise ?': [],
   'L’alcool devrait-il être interdit comme d’autres drogues ?': [],
   'Les introvertis sont-ils désavantagés dans la société ?': [],
   'Les avancées technologiques sont-elles toujours bénéfiques ?': [],
   'Faut-il toujours répondre aux provocations ?': [],
   'Les criminels ont-ils droit à une seconde chance ?': [],
   'Les réseaux sociaux nuisent-ils aux relations humaines ?': [],
   'Faire une bonne action par intérêt, est-ce toujours moral ?': [],
   'L’éducation traditionnelle est-elle dépassée ?': [],
   'Les religions ont-elles encore leur place dans la société moderne ?': [],
   'Le système scolaire actuel est-il obsolète ?': [],
   'Pour prouver ta foi absolue en Dieu (ou en Cthulhu, osef), tu dois : Manger un sandwich dont le pain est fait de croûtes de pieds de diabétiques et la garniture est un mélange de placenta humain et de pus d\'abcès, OU te laisser crucifier la tête en bas en chantant "Petit Papa Noël" pendant que des hyènes te lèchent les parties génitales ?':
      [
         'Passe sandwich dégueu, estomac blindé (pas mal)', // Shortened
         'Crucifixion + hyènes, pour spectacle et blasphème !', // Shortened
         'Je deviens athée / Je change de secte immédiatement', // OK
         'Même les hyènes te lécheraient pas (immonde)', // Shortened
         'Peut-on remplacer le placenta par du Nutella?', // Shortened
      ],
   'L’argent corrompt-il forcément ?': [],
   'Le bien-être mental est-il plus important que la santé physique ?': [],
   'Le contrôle des masses est-il inévitable ?': [],
   'Faut-il protéger les enfants de toutes formes de frustration ?': [],
   'Faut-il avoir peur du transhumanisme ?': [],
   'La conquête spatiale justifie-t-elle son coût ?': [],
   'La technologie rapproche-t-elle ou isole-t-elle les gens ?': [],
   'L’Homme est-il fondamentalement égoïste ?': [],
   'Le passé influence-t-il trop notre présent ?': [],
   'Peut-on être heureux sans jamais ressentir de tristesse ?': [],
   'L’école doit-elle apprendre à penser ou à obéir ?': [],
   'La neutralité est-elle possible en politique ?': [],
   'Les enfants doivent-ils avoir des limites strictes ou être libres d’explorer ?': [],
   'T\'es obligé de passer une soirée "jeux de société" : soit tu joues à un "Qui est-ce ?" géant mais uniquement avec les photos des victimes de l\'Holocauste (faut deviner "Est-ce qu\'il a des rayures ?"), SOIT tu joues à un Pictionary où tu dois faire deviner des méthodes de torture médiévales en les dessinant avec ton propre sang sur le dos d\'un lépreux ?':
      [
         'Le "Qui est-ce?" morbide, toujours bon en déduction', // Shortened
         "Pictionary sanglant, âme d'artiste... tortionnaire", // Shortened
         'Je propose une partie de Uno à la place, nique la torture', // Shortened
         "T'es si immonde que même Satan te refoulerait", // Shortened
         'Je simule un AVC pour esquiver cette soirée de merde', // OK
      ],
   'Le stress est-il toujours négatif ?': [],
   'Quel livre t’a le plus marqué ?': [],
   'Les clones humains devraient-ils avoir des droits ?': [],
   'Faut-il limiter le temps passé sur les écrans pour sa santé mentale ?': [],
   'L’identité d’une personne change-t-elle au fil du temps ?': [],
};

interface DailyQuestion {
   question: keyof typeof QUESTIONS;
   surveyAnswers: string[];
}

export const getDailyQuestion = (): DailyQuestion => {
   const now = new Date();

   const start = new Date(now.getFullYear(), 0, 0);
   const diff = now.getTime() - start.getTime();
   const oneDay = 1000 * 60 * 60 * 24;
   const dayOfYear = Math.floor(diff / oneDay);

   const questionIdx = (dayOfYear - 1) % Object.keys(QUESTIONS).length;

   const question = Object.keys(QUESTIONS)[questionIdx] as keyof typeof QUESTIONS;
   const surveyAnswers = QUESTIONS[question] as string[];

   return { question, surveyAnswers };
};
