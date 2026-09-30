# -*- coding: utf-8 -*-
# Shot list data: (start, end, type, id, narration, payload)
STYLE = ("Stylized cinematic 3D render, documentary reconstruction. All people are faceless "
 "mannequin-like figures: smooth matte light-grey heads with no facial features (no eyes, no nose, "
 "no mouth, no hair detail, no beard), realistic fabric clothing, natural poses. Moody cinematic "
 "lighting, muted desaturated palette, teal shadows and warm practical highlights, subtle film grain, "
 "shallow depth of field, clean simplified geometry, Unreal Engine 5 / Octane render look. 16:9, no text.")
NEG = "faces, eyes, nose, mouth, beard, hair strands, realistic human skin, text, letters, logos, emblems, watermark, blood, gore"
VIDRULES = ("Subtle motion only. Figures stay mostly still, nobody turns toward the camera. Slow, steady camera. "
 "Keep every figure faceless and every object stable: no morphing, no new people appearing, no text.")

L = lambda t, u: (t, u)

SHOTS = [
 (0.00, 6.00, 'MG', 'mg01', "תל אביב, 11 בדצמבר 2003. יום חמישי, צהריים. רחוב יהודה הלוי…", {}),
 (6.00, 8.25, 'AI', 'AI-01', "…מלא באנשים כמו בכל יום. ואז –", {
   'img': "A busy Tel Aviv city street at midday in December 2003: narrow asphalt street lined with worn white Bauhaus-style 3-4 storey apartment buildings, small balconies, air-conditioner units, faded shop signs with no readable text, a small currency-exchange storefront with a half-open metal roller shutter, parked early-2000s compact cars, a bus stop. Faceless pedestrians in early-2000s winter clothes (jackets, jeans, shopping bags) walking and standing naturally. Soft low winter sunlight, light haze. Eye-level 35mm, wide shot.",
   'vid': "Slow cinematic dolly-in along the street at eye level, gentle 10% push over 6 seconds. Pedestrians walk slowly. One car passes softly in the background from left to right. Light haze drifts, a tree's leaves sway slightly. Calm, ordinary midday atmosphere from start to end. No explosion.",
   'note': "השוט צריך להרגיש שגרתי לגמרי. מספיקות 2.2 שניות ממנו."}),
 (8.25, 9.22, 'AI', 'AI-02', "פיצוץ", {
   'img': "The same Tel Aviv street in December 2003 seen from across the road, the small currency-exchange storefront in the middle ground, parked cars in front, no people close to the camera. Midday light. Wide static shot.",
   'vid': "Static camera. After half a second a sudden bright white-orange flash bursts from the roof of the small shop, a shockwave ripples outward, dust and paper debris blow into the air, the camera shakes hard and the frame washes to white. No people are shown being hurt.",
   'note': "שנייה אחת בלבד. אפשר לקצר לפלאש לבן וסאונד בעריכה."}),
 (9.22, 11.90, 'MG', 'rl01', "מטען נפץ מתפוצץ בלב העיר. עשרות אנשים נפצעים,", {
   'links': [L("וואלה, 11.12.2003: 3 הרוגים וכ־30 פצועים בניסיון חיסול של זאב רוזנשטיין", "https://news.walla.co.il/item/477467"),
             L("הארץ, 2003: 3 הרוגים בניסיון התנקשות ברוזנשטיין", "https://www.haaretz.co.il/misc/2003-12-10/ty-article/0000017f-f2cb-d223-a97f-ffdfed120000"),
             L("TheMarker, 11.12.2003: 3 הרוגים ולפחות 30 פצועים בפיצוץ בתל אביב", "https://www.themarker.com/misc/2003-12-11/ty-article/0000017f-e369-d9aa-afff-fb7958fc0000"),
             L("חדשות 13: 6 ניסיונות חיסול אכזריים בעולם הפשע (כולל ארכיון)", "https://13tv.co.il/item/shows/patrick/season-01/articles/jfxcs-904340735/")],
   'note': "מרונדר עם התמונות ששלחת מהזירה. חתכתי את התמונה מלמעלה כך שלא רואים את מה שמתחת לסדין."}),
 (11.90, 20.30, 'MG', 'mg02', "ושלושה נהרגים: נפתלי מגד, רחמים צרויה ומשה מזרחי. שלושה אזרחים חפים מפשע…", {}),
 (20.30, 28.30, 'MG', 'mg03', "הם לא היו המטרה. המטרה הייתה זאב רוזנשטיין… הוא אמנם נפצע, אך שרד.", {
   'links': [L("תמונות של רוזנשטיין לכרטיס (חדשות 13, דף תגית)", "https://13tv.co.il/tags/zeev-rozenstein/"),
             L("ynet, 2020: רוזנשטיין משתחרר אחרי 17 שנה (תמונות)", "https://www.ynet.co.il/news/article/ByMsjWyMd")],
   'note': "אפשר להחליף את הצללית בכרטיס בתמונה אמיתית של רוזנשטיין."}),
 (28.40, 33.45, 'MG', 'mg04', "עברו כמעט עשרים שנה עד שבית המשפט קבע מי אחראי…", {}),
 (33.45, 37.50, 'AI', 'AI-03', "ותאמינו או לא, הקביעה הזו הובילה…", {
   'img': "Interior of a modern Israeli district courtroom: light wood paneling, an elevated bench for three judges, faceless judges in black robes seated, empty wall above the bench with no emblem, lawyers' desks with thick binders in the foreground, dim cool light with soft beams from high windows. Low wide angle.",
   'vid': "Slow push-in toward the judges' bench. The judges stay still, one turns a page. Dust drifts in the light beams.",
   'note': ""}),
 (37.50, 42.18, 'AI', 'AI-04', "…לאדם שבעבר ישב מול מצלמות הטלוויזיה והבטיח בפה מלא – שלא יחזור עוד לעולם הפשע.", {
   'img': "A 1994 Israeli television talk-show studio built in the round: a circular stage with two armchairs facing each other, studio audience seated on tiers all around, large broadcast TV cameras on pedestals, warm tungsten spotlights and haze. A young faceless man in a plain light shirt sits in one armchair as the guest; a faceless host in a suit with note cards sits opposite. Early-1990s look.",
   'vid': "Slow 15-degree orbit around the stage. A camera's red tally light turns on. The audience shifts very slightly. Spotlight haze drifts. The two seated figures stay still.",
   'note': "בגלל ״המעגל״: הבמה עגולה והקהל מסביב."}),
 (42.18, 53.80, 'MG', 'mg05', "באולפן ״המעגל״ של דן שילון יושב אסיר צעיר… לימודים, פילוסופיה, התפכחות… לא יחזור לפשע.", {
   'links': [L("ynet: ״אין סיכוי שאחזור לפשע״, הריאיון מ־1994 (עם וידאו)", "https://www.ynet.co.il/articles/0,7340,L-5432416,00.html"),
             L("N12, 2021: דן שילון חוזר לריאיון עם אברג׳יל", "https://www.mako.co.il/news-law/2021_q4/Article-4026eef71792d71027.htm")],
   'note': "בטלוויזיה יש מסך ירוק נקי: מקי (Chroma Key) ומניחים מתחת את קטע הריאיון האמיתי."}),
 (34.60, 42.18, 'MG', 'rl04', "(חלופה לשוטי AI-03 ו־AI-04) תמונות מהריאיון ב״המעגל״", {'note': "תמונות הריאיון שסיפקת, ב־Polaroid עם כיתוב. אפשר להשתמש בהן במקום שוטי ה־AI או בנוסף להם."}),
 (54.00, 57.70, 'AI', 'AI-05', "שנים אחר כך, על דוכן העדים, הוא נותן לראיון הסבר נוסף:", {
   'img': "Witness stand in an Israeli district courtroom around 2019: a faceless man in a dark suit and open-collar shirt seated in the wooden witness box with a microphone, a glass partition beside him, lawyers' desks with binders and laptops in the soft-focus foreground, cold fluorescent light.",
   'vid': "Slow lateral dolly from left to right past the lawyers' desks. The man at the witness stand makes a small hand gesture as if explaining. Everything else stays still.",
   'note': ""}),
 (57.70, 62.80, 'MG', 'mg06', "אחת הסיבות לטענתו – לנסות לפייס בין אשתו, שהייתה אז בהיריון, לבין הוריה.", {}),
 (62.83, 74.40, 'MG', 'mg07', "השופטים כתבו שלא ברור עד כמה באמת רצה להשתנות… הערצה, כסף, כבוד ופרסום.", {}),
 (74.50, 81.15, 'MG', 'mg08', "יצחק אברג׳יל גדל בשכונת רסקו בלוד, הצעיר מבין עשרה ילדים במשפחה שעלתה ממרוקו.", {}),
 (81.18, 86.05, 'AI', 'AI-06', "בעדותו תיאר ילדות של מצוקה כלכלית. הוא הסתבך עם החוק כבר בגיל צעיר.", {
   'img': "A working-class neighborhood in Lod, Israel, around 1980: rows of worn four-storey concrete public-housing blocks with laundry lines on the balconies, a dusty courtyard with a broken fence, a faceless boy about ten years old sitting alone on the front steps of a building in worn sneakers. Late-afternoon warm light, long shadows.",
   'vid': "Slow push-in toward the boy on the steps. Laundry sways in the wind. A stray cat walks across the courtyard. Dust floats in the light. The boy stays still.",
   'note': ""}),
 (86.10, 95.20, 'MG', 'mg09', "משפחת אברג׳יל היא משפחה גדולה… מאיר, הבכור, ויעקב.", {
   'links': [L("ויקיפדיה: משפחת אברג׳יל (תמונות אפשריות לכרטיסים)", "https://he.wikipedia.org/wiki/%D7%9E%D7%A9%D7%A4%D7%97%D7%AA_%D7%90%D7%91%D7%A8%D7%92'%D7%99%D7%9C")]}),
 (95.23, 99.80, 'AI', 'AI-07', "ביוני 2002 יעקב אברג׳יל נורה למוות ליד ביתו ברחובות, מול בני משפחתו,", {
   'img': "A quiet residential street in Rehovot, Israel, in June 2002 at about 11 pm: a modest private house with a small front yard and a low metal gate, warm light in the windows, one streetlight, parked early-2000s cars. The yard is empty. Ominous calm. Wide shot from across the street.",
   'vid': "Very slow push-in toward the lit house. A curtain moves slightly. Moths circle the streetlight. In the last two seconds blue flashing police light begins to reflect on the house wall.",
   'note': "לפי הדיווחים הרצח היה בסביבות 23:00. לא להראות את הירי עצמו."}),
 (99.80, 103.30, 'REAL', 'REAL-02', "…ימים ספורים לפני בר המצווה של בנו.", {
   'links': [L("ynet, 2002: האב נורה למוות כשבידיו בנו הפעוט", "https://www.ynet.co.il/articles/0,7340,L-1959214,00.html"),
             L("הארץ, 23.6.2002: תושב רחובות נרצח ביריות ליד ביתו", "https://www.haaretz.co.il/misc/2002-06-23/ty-article/0000017f-e2df-d75c-a7ff-fedfe6a00000"),
             L("mako, 2022: 20 שנה לרצח יעקב אברג׳יל", "https://www.mako.co.il/men-men_news/Article-d320e408cd8f281026.htm")],
   'note': "צילום מסך של הכותרת מ־2002."}),
 (103.30, 105.95, 'MG', 'mg10', "הרצח לא פוענח עד היום.", {}),
 (105.95, 112.30, 'AI', 'AI-08', "ובתחילת שנות האלפיים עולם הפשע בישראל נאבק על כסף גדול, ובמיוחד על שוק ההימורים.", {
   'img': "A hidden illegal casino in the back room of an Israeli building in the early 2000s: green felt poker and roulette tables under low hanging lamps, cigarette smoke haze, stacks of chips and banknotes, faceless men in leather jackets and button-down shirts seated around the table, a faceless dealer in a vest. Dark, warm, claustrophobic.",
   'vid': "Slow dolly along the table. The dealer's hands slide chips and deal cards. Smoke swirls under the lamps. The seated men stay mostly still.",
   'note': ""}),
 (112.48, 116.40, 'REAL', 'REAL-03', "המשטרה העריכה שהמאבק הזה הזין את גל האלימות של אותן שנים.", {
   'links': [L("הארץ, 2003: נעצרו 4 חשודים בניסיונות לרצח רוזנשטיין", "http://www.haaretz.co.il/misc/1.970936"),
             L("ynet: פרופיל יצחק אברג׳יל ומאבקי ההימורים", "https://www.ynet.co.il/news/article/s14zbxwuy"),
             L("ynet: עלייתו ונפילתו של הגנגסטר הישראלי מס׳ 1", "https://www.ynet.co.il/articles/0,7340,L-5867204,00.html")],
   'note': "מונטאז׳ כותרות מתקופת גל האלימות."}),
 (116.48, 122.80, 'MG', 'mg11', "אחד מעדי המדינה העיד שאברג׳יל דיבר איתו על רצון להרוג את רוזנשטיין ולהשתלט על בתי הקזינו שלו.", {}),
 (122.85, 129.25, 'REAL', 'REAL-04', "ובכן, הפיצוץ ביהודה הלוי לא היה הניסיון הראשון לפגוע ברוזנשטיין, אבל הוא היה הקטלני ביותר.", {
   'links': [L("ynet: הפיגוע הפלילי: מי חיפש את ׳הזאב׳ והרג שלושה?", "https://www.ynet.co.il/articles/0,7340,L-4162626,00.html"),
             L("חדשות 13: ההקלטות מניסיון חיסול רוזנשטיין", "https://13tv.co.il/item/general/ntr-1212278/"),
             L("ynet: עד המדינה על הפיגוע הפלילי", "https://www.ynet.co.il/articles/0,7340,L-4990891,00.html")],
   'note': ""}),
 (129.28, 137.50, 'MG', 'mg12', "התקשורת כינתה אותו ״הפיגוע הפלילי״: לא טרור אידיאולוגי, אלא חיסול בעולם התחתון…", {}),
 (137.62, 146.50, 'MG', 'mg13', "בזמן שבישראל התיק עמד במקום, ברשויות בארצות הברית… ב־2008 הוגש שם כתב אישום פדרלי.", {}),
 (146.60, 157.10, 'MG', 'mg14', "לפי כתב האישום… אקסטזי, הלבנת הון, סחיטה ואלימות… רצח של אדם בשם סמי אטיאס.", {
   'links': [L("כתב האישום הפדרלי (PDF)", "https://www.makorrishon.co.il/nrg/images/news1/is_abrgl_certified2ndSSIndt.pdf"),
             L("Los Angeles Times, 2008: כתב האישום ורשת ההפצה", "https://www.latimes.com/archives/la-xpm-2008-aug-26-me-drugs26-story.html")],
   'note': "אפשר להחליף את המסמך המאויר בצילום מסך של העמוד הראשון של כתב האישום האמיתי."}),
 (157.25, 160.80, 'AI', 'AI-09', "באותו קיץ נעצר אברג׳יל בישראל לפי בקשת ארצות הברית.", {
   'img': "Night on a residential street in Israel, 2008: a faceless man in a dark jacket escorted by two faceless police officers in dark-blue uniforms without any lettering toward an unmarked car, blue and red emergency lights reflecting on wet asphalt, press photographers' flashes in the distance.",
   'vid': "Slow tracking shot. The officers walk the man slowly toward the car. Camera flashes pop in the background. Emergency lights pulse. No sudden movements.",
   'note': ""}),
 (160.80, 168.00, 'MG', 'mg15', "החקירה שקדמה למעצר נמשכה שנים… רשויות מיותר מעשר מדינות.", {}),
 (168.05, 169.60, 'AI', 'AI-10', "(חלופת AI לצילום הארכיון) ב־2011 הוא הוסגר.", {
   'img': "An airport tarmac at night in January 2011: a small white government jet with its airstair open, floodlights, a faceless man in handcuffs flanked by faceless federal agents in plain dark windbreakers (no lettering) walking toward the stairs.",
   'vid': "Wide static shot. The group walks slowly toward the stairs. Heat haze shimmers behind the engines. The floodlights flare softly.",
   'note': "חלופה: צילום אמיתי מההסגרה (קישורים בשורה הבאה)."}),
 (168.05, 169.60, 'MG', 'rl02', "ב־2011 הוא הוסגר.", {
   'links': [L("הארץ, 12.1.2011: האחים אברג׳יל המריאו לקראת הסגרתם", "https://www.haaretz.co.il/news/law/2011-01-12/ty-article/0000017f-e874-df5f-a17f-fbfe78b30000"),
             L("ynet: ההסגרה הגדולה: האברג׳ילים המריאו", "https://www.ynet.co.il/articles/0,7340,L-4012598,00.html")],
   'note': "מרונדר עם צילום ההסגרה שסיפקת. שם הקובץ אצלך מציין שזה מאיר אברג׳יל, ולכן הכיתוב כך."}),
 (169.62, 175.60, 'AI', 'AI-11', "במאי 2012 עמד יצחק אברג׳יל בבית משפט פדרלי בלוס אנג׳לס והודה…", {
   'img': "A US federal courtroom in Los Angeles in 2012: wood-paneled walls, an American flag beside the judge's bench, a faceless judge in a black robe, a faceless defendant in a tan prison jumpsuit standing at the lectern next to his faceless lawyer in a grey suit. Seen from behind the defendant.",
   'vid': "Slow push-in from behind the defendant toward the judge. The defendant nods slightly once. The judge stays still.",
   'note': ""}),
 (175.60, 182.00, 'REAL', 'REAL-06', "…לסחיטה ולרצח. הוא הודה גם בכך שסמי אטיאס נהרג אחרי שהפריע לעסקת סמים.", {
   'links': [L("FBI, 7.5.2012: הודעת ההודאה הרשמית", "https://archives.fbi.gov/archives/losangeles/press-releases/2012/israeli-organized-crime-figure-pleads-guilty-in-u.s.-to-narcotics-and-racketeering-offenses-including-murder"),
             L("Times of Israel: Israeli crime boss pleads guilty in Los Angeles", "https://www.timesofisrael.com/israeli-crime-boss-pleads-guilty-in-los-angles/"),
             L("Patch: Israeli Crime Boss Pleads Guilty to 2003 Sherman Oaks Murder", "https://patch.com/california/northhollywood/leader-of-israeli-crime-family-pleads-guity-to-2003-s4507330f1a")],
   'note': "צילום מסך של כותרת ה־FBI עם הדגשה על המילה murder."}),
 (182.23, 188.30, 'MG', 'mg16', "האסיר שהבטיח בטלוויזיה שלא יחזור לפשע הודה עכשיו מול שופט אמריקאי בחלקו ברצח.", {
   'note': "גם כאן יש מסך ירוק בטלוויזיה, לקטע קצר מהריאיון מ־1994."}),
 (188.53, 195.08, 'MG', 'mg17', "ב־2014 הוחזר אברג׳יל לישראל… שנה אחר כך יצאה לדרך פרשה 512:", {
   'links': [L("הארץ, 30.1.2014: אברג׳יל שב לישראל לריצוי יתרת עונשו", "https://www.haaretz.co.il/news/law/2014-01-30/ty-article/0000017f-e98c-da9b-a1ff-edefe9280000"),
             L("N12, 2015: 45 ב־512, מי הם כל עצורי הפרשה", "https://www.mako.co.il/news-law/crime-q2_2015/Article-7cda9ad86d07d41004.htm")]}),
 (195.08, 205.30, 'MG', 'mg18', "כתב אישום נגד 18 נאשמים… תפקידים, חלוקת עבודה וקופה משותפת.", {
   'links': [L("הארץ, 13.7.2015: כתב האישום בפרשה 512", "https://www.haaretz.co.il/news/law/2015-07-13/ty-article/0000017f-e8f8-da9b-a1ff-ecff58ec0000")]}),
 (205.43, 214.30, 'MG', 'mg19', "ההיקף היה חסר תקדים… המשפט נמשך שש שנים.", {
   'links': [L("וואלה: עדות ראשונה במשפט 512", "https://news.walla.co.il/item/3037787")]}),
 (214.40, 217.35, 'MG', 'mg20', "ובאמצע המשפט הזה, אחד הנאשמים פשוט נעלם.", {}),
 (217.50, 224.25, 'MG', 'mg21', "גולן אביטן, מהנאשמים המרכזיים בפרשה, שהה במעצר בית עם איזוק אלקטרוני.", {}),
 (224.30, 229.70, 'AI', 'AI-12', "באוקטובר 2018, לקראת סוף פרשת התביעה, הוא ניצל חלון יציאה שאושר לו,", {
   'img': "Close-up at ankle height: a man's foot in a dark sneaker wearing a black electronic monitoring bracelet with a small green LED, standing in the open doorway of an apartment, daylight outside, October 2018.",
   'vid': "Static low camera. The foot steps slowly out through the doorway into the daylight. The LED blinks. The door swings shut behind.",
   'note': ""}),
 (229.70, 242.10, 'MG', 'mg22', "לפי הדיווחים לטיפול שיניים, ויצא מהארץ. ב־2019 נעצר במרוקו… 2022 גורש לישראל ונעצר ברגע שנחת.", {
   'links': [L("ynet: 4 שנים אחרי שנסע לרופא שיניים וברח למרוקו, נעצר בנתב״ג", "https://www.ynet.co.il/news/article/hjkdyxxjo"),
             L("ynet: אישום בגין הבריחה (״חלון התאווררות״)", "https://www.ynet.co.il/news/article/s1motgqgj"),
             L("ערוץ 14: אביטן גורש ממרוקו ונעצר בנתב״ג", "https://www.c14.co.il/article/684022")],
   'note': "אפשר להכניס מעל 3:59–4:02 תיעוד אמיתי של המעצר בנתב״ג."}),
 (242.23, 246.45, 'REAL', 'REAL-07', "נובמבר 2021, בית המשפט המחוזי בתל אביב.", {
   'links': [L("חדשות 13: פרשה 512 הגיעה להכרעה (וידאו מהאולם)", "https://13tv.co.il/item/news/domestic/crime-and-justice/case-512-1416873-902718382/"),
             L("וואלה: יצחק אברג׳יל הורשע ברצח 3 אזרחים", "https://news.walla.co.il/item/3471400"),
             L("הארץ, 16.11.2021: תיק 512 מגיע להכרעה", "https://www.haaretz.co.il/news/law/2021-11-16/ty-article/0000017f-e736-d97e-a37f-f77748aa0000")]}),
 (246.45, 254.75, 'MG', 'mg23', "אחרי שש שנות משפט ופסק דין של יותר מ־800 עמודים… מורשע…", {
   'links': [L("הכרעת הדין המלאה (PDF, gov.il)", "https://www.gov.il/BlobFolder/dynamiccollectorresultitem/decision24984-07-15/he/24984-07-15.pdf")]}),
 (254.83, 267.05, 'MG', 'mg24', "והוא מורשע ברצח… הוא לא הפעיל את המטען… ולכן הוא אחראי למותם.", {}),
 (267.15, 286.25, 'MG', 'mg25', "ביוני 2022 נגזרו עליו שלושה מאסרי עולם… בנובמבר 2024… ההרשעה ברצח נשארה בתוקף.", {
   'links': [L("Times of Israel: שלושה מאסרי עולם", "https://www.timesofisrael.com/mob-kingpin-given-3-life-sentences-for-murdering-bystanders-in-failed-hit/"),
             L("ynet, 2024: העליון דחה את רוב ערעוריו של אברג׳יל", "https://www.ynet.co.il/news/article/s1rbtc6wyx"),
             L("פסק הדין בערעור, בית המשפט העליון (PDF)", "https://supremedecisions.court.gov.il/Home/Download?path=NetVerdicts/2024/11/10/2022-0-5136-48-2&fileName=f7c750a35a4d4ab4a798b2aabe1259d6&type=2")]}),
 (286.40, 297.25, 'MG', 'mg26', "מאיר, האח הבכור, הלך בדרך אחרת… שמונה וחצי שנות מאסר.", {
   'links': [L("כאן: מאיר אברג׳יל נידון ל־8.5 שנות מאסר", "https://www.kan.org.il/content/kan-news/law/241865/")]}),
 (297.32, 302.70, 'MG', 'rl03', "ב־2021 השתחרר, וסיפר שניתק את הקשר עם בני המשפחה שמעורבים בפשע.", {
   'links': [L("הארץ, 17.6.2021: מאיר אברג׳יל שוחרר מהכלא", "https://www.haaretz.co.il/news/law/2021-06-17/ty-article/0000017f-e2eb-d38f-a57f-e6fb07940000"),
             L("ynet: העבריין מאיר אברג׳יל שוחרר מהכלא", "https://www.ynet.co.il/news/article/BJY1M000i00"),
             L("כאן: מאיר אברג׳יל שוחרר (״רוצה לנוח״)", "https://www.kan.org.il/content/kan-news/local/275643/"),
             L("ynet: ״הכלא זה כבר לא בשבילו״, הנתק מהמשפחה", "https://www.ynet.co.il/news/article/5956025")]}),
 (302.85, 308.35, 'MG', 'mg05b', "ב־1994 ישב אסיר צעיר מול מצלמה ואמר: אני לא חוזר לפשע.", {
   'note': "אותו מסך ירוק: קטע מהריאיון מ־1994."}),
 (308.45, 318.85, 'MG', 'mg27', "יותר משלושים שנה אחר כך… מה שנשאר הם שלושה שמות.", {}),
 (318.88, 337.27, 'MG', 'mg28', "אחרי סיום הפרשה… אולי המדינה לא הביסה את הפשע המאורגן, אלא רק שינתה את הצורה שלו.", {
   'links': [L("N12, 2022: התיק ששינה את מפת הפשיעה", "https://www.mako.co.il/news-law/2022_q2/Article-a139c7d4a99a181027.htm"),
             L("הארץ, 2022: הוואקום שהשאירה פרשת 512 שינה את מפת הפשיעה", "https://www.haaretz.co.il/news/law/2022-06-29/ty-article/.premium/00000181-abcf-d6e4-a9fb-afdf7c110000")]}),
]
