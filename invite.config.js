/*
  ============================================================
  यही एक फ़ाइल बदलिए  /  EDIT ONLY THIS FILE
  ============================================================
  Everything on the page comes from here: names, dates, places,
  wording and pictures. Leave a list empty ([]) or a value empty ("")
  and that part of the page simply does not appear.

  To make a bride-side card, copy the folder, set side: "bride" and
  swap the host / family details. The design stays the same.

  Details below are taken from the printed groom-side card.
*/
window.INVITE = {
  side: "groom",              // "groom" | "bride"
  pageTitle: "शुभ विवाह · सुमन्त संग निकिता",

  /* ---------- couple ---------- */
  groom: { prefix: "चि.",    name: "सुमन्त" },
  bride: { prefix: "सौ.कां.", name: "निकिता",
           parents: ["श्रीमती मुक्ता – डॉ. राजकुमार मिश्रा"] },   // सुपुत्री. Empty list [] = hidden

  /* ---------- the inviting family (groom side) ---------- */
  host: {
    familyName: "पाठक परिवार",
    place: "वाड्रफनगर, जिला-बलरामपुर (छ.ग.)",
    grandparents: ["स्व. श्रीमती राजकुमारी देवी – स्व. श्री सूर्यदेव पाठक"],   // सुपौत्र
    parents:      ["श्रीमती नीलम – श्री भीष्म नारायण पाठक"]                  // सुपुत्र
  },

  /* ---------- main day: the मुख्य प्रीतिभोज (reception) on 6 Dec drives the hero date and countdown.
     9 Dec is only the baraat and the wedding; the venue calendar below keeps the 9 Dec wedding. ---------- */
  mainDate: "2026-12-06",
  countdownTo: "2026-12-06T19:00:00+05:30",     // reception starts 7.00 pm
  calendar: { start: "2026-12-09T11:00:00+05:30", end: "2026-12-09T23:30:00+05:30" },

  /* ---------- events, in order. image = file in assets/img ---------- */
  events: [
    { key: "tilak",  name: "तिलकोत्सव एवं प्रीतिभोज", date: "2026-12-06",
      badge: "मुख्य प्रीतिभोज · 06 दिसम्बर",   // highlighted: the main pratibhoj
      time: "सायं 7.00 बजे से आपके आगमन तक", place: "बी.एन. कॉन्वेंट स्कूल, वाड्रफनगर",
      note: "तिलकोत्सव की पावन रीति के संग शुभ कार्यक्रम का आरम्भ, उपरान्त प्रीतिभोज। आपकी उपस्थिति से ही यह संध्या पूर्ण होगी।",
      image: "haldi.webp",   tone: "reception", map: "reception", main: true },
    { key: "mandap", name: "मण्डपाच्छादन", date: "2026-12-08",
      time: "", place: "",
      note: "मंगल गीतों के संग मण्डपाच्छादन की शुभ रस्म। परिवार के उल्लास में सम्मिलित होइए।",
      image: "sangeet.webp", tone: "marigold" },
    { key: "baraat", name: "बारात प्रस्थान", date: "2026-12-09",
      time: "दोपहर 11.00 बजे", place: "निवास स्थान, वाड्रफनगर से गोल्डन पैलेस, रतहरा नहर के पास, रतहरा, रीवा (म.प्र.) के लिए प्रस्थान",
      note: "ढोल-नगाड़ों की गूँज के संग बारात का प्रस्थान।",
      image: "baraat.webp",  tone: "sindoor" },
    { key: "vivah",  name: "शुभ विवाह", date: "2026-12-09",
      time: "रात्रि शुभ लग्न में", place: "गोल्डन पैलेस, रतहरा-रीवा (म.प्र.)",
      note: "शुभ लग्न में पाणिग्रहण संस्कार। आपकी उपस्थिति ही हमारा सौभाग्य है।",
      image: "jaimala.webp", tone: "maroon" }
  ],

  /* ---------- reception (tilak + preetibhoj) ----------
     mapQuery is searched on Google Maps. For an exact pin, add lat/lng instead. */
  reception: {
    label: "स्वागत समारोह",
    event: "तिलकोत्सव एवं प्रीतिभोज",
    name: "बी.एन. कॉन्वेंट स्कूल",
    address: "वाड्रफनगर, जिला-बलरामपुर (छ.ग.)",
    date: "2026-12-06", time: "सायं 7.00 बजे से",
    mapQuery: "B.N. Convent School, Wadrafnagar, Balrampur, Chhattisgarh",
    lat: null, lng: null,
    calendar: { start: "2026-12-06T19:00:00+05:30", end: "2026-12-06T23:30:00+05:30" }
  },

  /* ---------- venue of the main function ---------- */
  venue: {
    name: "गोल्डन पैलेस",
    address: "रतहरा नहर के पास, रतहरा-रीवा (म.प्र.)",
    lat: 24.5456678, lng: 81.3456846,
    shortLink: "https://maps.app.goo.gl/SL1wtoMLqwsd2ABR7",
    label: "शुभ विवाह", date: "2026-12-09", time: "रात्रि शुभ लग्न में",
    route: { label: "बारात प्रस्थान · दोपहर 11.00 बजे" }
  },

  /* ---------- groom-side relatives (empty = that block is hidden) ---------- */
  family: {
    vineet:  ["श्रीमती आरती – श्री ध्रुव नारायण पाठक", "श्रीमती नीलम – श्री भीष्म नारायण पाठक"],
    darshan: ["अदिति पाठक", "आकांक्षा पाठक", "ऊर्जा पाठक"],
    swagat:  ["श्रीमती रम्भा – श्री विनोद तिवारी", "श्रीमती शशि – श्री सुचित त्रिपाठी",
              "श्रीमती सीमा – श्री पंकज तिवारी", "श्रीमती सुप्रिया – श्री हर्षवर्धन पाठक"]
  },
  balManuhar: {
    line: "मेरे बाबा / मामा की शादी में ज़रूर से ज़रूर आइयेगा।",
    names: ["ऊर्जा", "सिद्धांत", "धृति", "सिद्धि", "अथर्व", "ऋत्वी"]
  },

  /* ---------- who to call. {label, phone}. empty = section hidden ---------- */
  contacts: [],
  rsvpPhone: "",   // e.g. "919876543210". Empty: guest picks the WhatsApp contact.

  /* ---------- pictures and sound ---------- */
  images: { couple: "couple.webp", groom: "groom.webp", bride: "bride.webp" },
  song: "assets/audio/bhajan.mp3",

  /* ---------- wording (taken from the printed card, in classical family-card Hindi) ---------- */
  copy: {
    mantra:  "॥ श्री गणेशाय नमः ॥",
    shloka:  "मंगलम् भगवान विष्णु, मंगलम् गरुड़ध्वजः।\nमंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः॥",
    kicker:  "मंगल परिणयोत्सव",
    sang:    "संग",
    gateBtn: "निमंत्रण खोलें",
    gateLines: [{ d: "06 दिसम्बर", t: "मुख्य प्रीतिभोज · वाड्रफनगर", main: true }],
    mqWeds: "weds", mqTail: "9 December Wedding",      // running line: सुमन्त weds निकिता · 9 December Wedding
    shareOpen: "निमंत्रण पत्रिका:",
    ctaRsvp: "आगमन बताएँ",
    doha:    "विघ्न हरण मंगल करण, गौरी पुत्र गणेश।\nप्रथम निमंत्रण आपको, ब्रह्मा, विष्णु, महेश॥",
    navEvents: "कार्यक्रम", navVenue: "स्थल", navFamily: "परिजन", navRsvp: "आगमन",
    coupleTitle: "वर एवं वधू", groomLabel: "वर", brideLabel: "वधू",
    quickTitle: "शीघ्र लिंक",
    countdownTitle: "मुख्य प्रीतिभोज में शेष",
    countdownDone:  "स्वागत की शुभ घड़ी आ पहुँची। पधारिए, आपका हार्दिक स्वागत है।",
    petalBtn: "आशीर्वाद के फूल बरसाएँ",
    letterTitle: "आमंत्रण पत्र",
    salute: "स्नेही स्वजन, सादर प्रणाम।",
    intro:  "जगत जननी माँ महामाया जी एवं कुलदेवी माँ कामाख्या जी की असीम अनुकम्पा से हमारे यहाँ……",
    and: "एवं",
    ke: "के मंगल परिणयोत्सव की पावन बेला में आपको सादर आमंत्रित करते हैं।",
    final:  "इस शुभ अवसर पर सपरिवार पधारकर नव दम्पति को अपना स्नेहिल आशीर्वाद प्रदान कर हमें अनुगृहित करें।",
    eventsTitle: "वैवाहिक कार्यक्रम",
    venueTitle:  "वैवाहिक स्थल",
    mapBtn: "नक्शे में रास्ता देखें",
    calBtn: "कैलेंडर में जोड़ें",
    familyTitle: "परिजन",
    vineetLabel: "विनीत", darshanLabel: "दर्शनाभिलाषी", swagatLabel: "स्वागतोत्सुक",
    balTitle: "बाल मनुहार",
    contactTitle: "निवेदक",
    rsvpTitle: "आगमन की सूचना",
    rsvpName: "आपका नाम",
    rsvpGuests: "कितने लोग पधारेंगे",
    rsvpBtn: "आने की सूचना भेजें",
    shareBtn: "निमंत्रण व्हाट्सऐप पर भेजें",
    soundOn: "भजन चालू", soundOff: "भजन बंद"
  }
};
