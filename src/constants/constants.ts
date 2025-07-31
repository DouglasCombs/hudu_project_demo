export const TermsUrl = 'https://info.heyhudu.com/terms-of-service/';
export const PrivacyUrl = 'https://info.heyhudu.com/privacy/';
export const supportUrl = 'https://support.heyhudu.com/';

export const ANDROID_PACKAGE_NAME = 'com.heyhudu.HUDU';
export const IOS_BUNDLE_ID = 'com.HeyHUDU1.HUDU';
export const IOS_APP_STORE_ID = '1659522492';

export const APP_STORE_LINK = `itms://itunes.apple.com/us/app/apple-store/${IOS_APP_STORE_ID}?mt=8`;
export const PLAY_STORE_LINK = `market://details?id=${ANDROID_PACKAGE_NAME}`;

export const defaultState = {
  id: 'IA',
  title: 'IOWA',
  shortName: 'IA',
  latitude: 41.657847,
  longitude: -91.534627,
  xLocation: {
    lat: 41.657847,
    lon: -91.534627,
    address: 'Iowa City, IA 52240, United States',
    city: 'Iowa City',
  },
};

export const monthNamesEn = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const monthNamesSp = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const dayNamesEn = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
export const dayNamesSp = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const spanishLocale = {
  name: 'sp',
  months: monthNamesSp,
  weekdays: dayNamesSp,
  weekStart: 1, // Monday as the first day of the week
  relativeTime: {
    future: 'en %s', // en %s
    past: 'hace %s', // hace %s
    s: 'Hace unos segundos', // Hace unos segundos
    m: 'Un minuto', // Un minuto
    mm: '%d minutos', // %d minutos
    h: 'Una hora', // Una hora
    hh: '%d horas', // %d horas
    d: 'Un día', // Un día
    dd: '%d días', // %d días
    M: 'Un mes', // Un mes
    MM: '%d meses', // %d meses
    y: 'Un año', // Un año
    yy: '%d años', // %d años
  },
};

export const englishLocale = {
  name: 'en',
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'A few seconds',
    m: 'A minute',
    mm: '%d minutes',
    h: 'An hour',
    hh: '%d hours',
    d: 'A day',
    dd: '%d days',
    M: 'A month',
    MM: '%d months',
    y: 'A year',
    yy: '%d years',
  },
  months: monthNamesEn,
  weekdays: dayNamesEn,
  weekStart: 1, // Monday as the first day of the week
};

export const cities = {
  Iowa: {
    'Des Moines': {
      latitude: 41.586835,
      longitude: -93.624959,
    },
    'Cedar Rapids': {
      latitude: 41.97788,
      longitude: -91.665623,
    },
    Davenport: {
      latitude: 41.523643,
      longitude: -90.577636,
    },
    'Sioux City': {
      latitude: 42.496681,
      longitude: -96.405878,
    },
    'Iowa City': {
      latitude: 41.657847,
      longitude: -91.534627,
    },
    Waterloo: {
      latitude: 42.492786,
      longitude: -92.342577,
    },
    Ames: {
      latitude: 42.030781,
      longitude: -93.631913,
    },
    'West Des Moines': {
      latitude: 41.577211,
      longitude: -93.711332,
    },
    Ankeny: {
      latitude: 41.731788,
      longitude: -93.600128,
    },
    'Council Bluffs': {
      latitude: 41.26279,
      longitude: -95.86124,
    },
    Dubuque: {
      latitude: 42.500558,
      longitude: -90.664572,
    },
    Urbandale: {
      latitude: 41.627631,
      longitude: -93.712947,
    },
    'Cedar Falls': {
      latitude: 42.527762,
      longitude: -92.445315,
    },
    Marion: {
      latitude: 42.034722,
      longitude: -91.596303,
    },
    Bettendorf: {
      latitude: 41.56085,
      longitude: -90.48379,
    },
    'Mason City': {
      latitude: 43.153573,
      longitude: -93.201037,
    },
    Marshalltown: {
      latitude: 42.034722,
      longitude: -92.914096,
    },
    Clinton: {
      latitude: 41.844473,
      longitude: -90.188737,
    },
    Burlington: {
      latitude: 40.807539,
      longitude: -91.11289,
    },
    Ottumwa: {
      latitude: 41.016029,
      longitude: -92.408302,
    },
    'Fort Dodge': {
      latitude: 42.497469,
      longitude: -94.168015,
    },
    Muscatine: {
      latitude: 41.424473,
      longitude: -91.043205,
    },
    Johnston: {
      latitude: 41.672688,
      longitude: -93.699811,
    },
    Coralville: {
      latitude: 41.676696,
      longitude: -91.583122,
    },
    Waukee: {
      latitude: 41.611067,
      longitude: -93.885689,
    },
    'North Liberty': {
      latitude: 41.749581,
      longitude: -91.605845,
    },
    Altoona: {
      latitude: 41.647561,
      longitude: -93.462038,
    },
    Clive: {
      latitude: 41.60199,
      longitude: -93.770063,
    },
    Indianola: {
      latitude: 41.358048,
      longitude: -93.557464,
    },
    Newton: {
      latitude: 41.699109,
      longitude: -93.035861,
    },
    Grimes: {
      latitude: 41.692827,
      longitude: -93.796503,
    },
    Boone: {
      latitude: 42.063448,
      longitude: -93.875491,
    },
    Oskaloosa: {
      latitude: 41.308002,
      longitude: -92.647135,
    },
    Spencer: {
      latitude: 43.142841,
      longitude: -95.144895,
    },
    'Storm Lake': {
      latitude: 42.641145,
      longitude: -95.20915,
    },
    'Fort Madison': {
      latitude: 40.629763,
      longitude: -91.315309,
    },
    Keokuk: {
      latitude: 40.397067,
      longitude: -91.384276,
    },
    Pella: {
      latitude: 41.408032,
      longitude: -92.916792,
    },
    Carroll: {
      latitude: 42.065376,
      longitude: -94.86787,
    },
    Waverly: {
      latitude: 42.727357,
      longitude: -92.468279,
    },
    'Le Mars': {
      latitude: 42.787712,
      longitude: -96.165545,
    },
    Fairfield: {
      latitude: 41.007611,
      longitude: -91.963631,
    },
    Grinnell: {
      latitude: 41.743665,
      longitude: -92.725293,
    },
    Norwalk: {
      latitude: 41.473857,
      longitude: -93.691744,
    },
    'Mount Pleasant': {
      latitude: 40.966137,
      longitude: -91.548456,
    },
    'Clear Lake': {
      latitude: 43.133978,
      longitude: -93.377225,
    },
    Perry: {
      latitude: 41.838288,
      longitude: -94.108152,
    },
    'Charles City': {
      latitude: 43.066464,
      longitude: -92.677667,
    },
    Denison: {
      latitude: 42.026019,
      longitude: -95.358271,
    },
    'Webster City': {
      latitude: 42.46706,
      longitude: -93.820028,
    },
    Creston: {
      latitude: 41.058988,
      longitude: -94.361344,
    },
    Decorah: {
      latitude: 43.303318,
      longitude: -91.785562,
    },
    Knoxville: {
      latitude: 41.318165,
      longitude: -93.104034,
    },
    Nevada: {
      latitude: 42.022534,
      longitude: -93.454123,
    },
    Atlantic: {
      latitude: 41.403983,
      longitude: -95.013694,
    },
    Maquoketa: {
      latitude: 42.068147,
      longitude: -90.6639,
    },
    Estherville: {
      latitude: 43.407786,
      longitude: -94.82939,
    },
    'Orange City': {
      latitude: 42.992195,
      longitude: -96.058265,
    },
    Clarinda: {
      latitude: 40.741124,
      longitude: -95.033812,
    },
    Vinton: {
      latitude: 42.164337,
      longitude: -92.024431,
    },
    Winterset: {
      latitude: 41.335649,
      longitude: -94.013269,
    },
    Humboldt: {
      latitude: 42.725193,
      longitude: -94.218048,
    },
    Osceola: {
      latitude: 41.031805,
      longitude: -93.773754,
    },
    Manchester: {
      latitude: 42.484357,
      longitude: -91.455762,
    },
    Harlan: {
      latitude: 41.653383,
      longitude: -95.337131,
    },
    Shenandoah: {
      latitude: 40.757967,
      longitude: -95.369424,
    },
    Independence: {
      latitude: 42.46848,
      longitude: -91.893726,
    },
    'De Witt': {
      latitude: 41.818547,
      longitude: -90.538412,
    },
    Glenwood: {
      latitude: 41.042194,
      longitude: -95.742087,
    },
    Oelwein: {
      latitude: 42.682789,
      longitude: -91.915582,
    },
    Centerville: {
      latitude: 40.730417,
      longitude: -92.869748,
    },
    Adel: {
      latitude: 41.614649,
      longitude: -94.015793,
    },
    'Red Oak': {
      latitude: 41.017758,
      longitude: -95.22568,
    },
    Algona: {
      latitude: 43.070603,
      longitude: -94.233237,
    },
    Anamosa: {
      latitude: 42.108435,
      longitude: -91.285135,
    },
    Cherokee: {
      latitude: 42.733483,
      longitude: -95.559711,
    },
    'Forest City': {
      latitude: 43.263892,
      longitude: -93.638939,
    },
    Clarion: {
      latitude: 42.727105,
      longitude: -93.733975,
    },
    Dyersville: {
      latitude: 42.48305,
      longitude: -91.119682,
    },
    Osage: {
      latitude: 43.284706,
      longitude: -92.810608,
    },
    Chariton: {
      latitude: 41.016667,
      longitude: -93.3125,
    },
    'Missouri Valley': {
      latitude: 41.558361,
      longitude: -95.892414,
    },
    Waukon: {
      latitude: 43.268006,
      longitude: -91.475845,
    },
    'Rock Valley': {
      latitude: 43.203703,
      longitude: -96.295736,
    },
    Emmetsburg: {
      latitude: 43.10838,
      longitude: -94.682205,
    },
    Sibley: {
      latitude: 43.402118,
      longitude: -95.741544,
    },
    Albia: {
      latitude: 41.026517,
      longitude: -92.805011,
    },
    Jefferson: {
      latitude: 42.014345,
      longitude: -94.376881,
    },
    'Story City': {
      latitude: 42.1875,
      longitude: -93.5975,
    },
    'Mount Ayr': {
      latitude: 40.716111,
      longitude: -94.240833,
    },
    Toledo: {
      latitude: 41.99586,
      longitude: -92.580742,
    },
    Garner: {
      latitude: 43.098084,
      longitude: -93.618897,
    },
    Sigourney: {
      latitude: 41.329815,
      longitude: -92.20714,
    },
    'Lake Mills': {
      latitude: 43.417458,
      longitude: -93.537302,
    },
    'Sac City': {
      latitude: 42.422658,
      longitude: -94.982183,
    },
    Onawa: {
      latitude: 42.027995,
      longitude: -96.1077,
    },
  },
  Texas: {
    Mesquite: {latitude: 32.7668, longitude: -96.5992},
    Lancaster: {latitude: 32.5921, longitude: -96.7561},
    Duncanville: {latitude: 32.6518, longitude: -96.9083},
    'Balch Springs': {latitude: 32.7287, longitude: -96.6226},
    Garland: {latitude: 32.9126, longitude: -96.6389},
    Hutchins: {latitude: 32.6445, longitude: -96.7146},
    Desoto: {latitude: 32.5899, longitude: -96.8571},
    Irving: {latitude: 32.814, longitude: -96.9489},
    Addison: {latitude: 32.9605, longitude: -96.8292},
    Richardson: {latitude: 32.9483, longitude: -96.7299},
    Sunnyvale: {latitude: 32.7985, longitude: -96.5561},
    Wilmer: {latitude: 32.5895, longitude: -96.6853},
    Rowlett: {latitude: 32.9029, longitude: -96.5639},
    'Cedar Hill': {latitude: 32.5885, longitude: -96.9561},
    'Red Oak': {latitude: 32.5232, longitude: -96.7969},
    Coppell: {latitude: 32.9546, longitude: -96.9932},
    Plano: {latitude: 33.0198, longitude: -96.6989},
    Sachse: {latitude: 32.9762, longitude: -96.5954},
    Euless: {latitude: 32.8371, longitude: -97.0819},
    Dallas: {latitude: 32.7767, longitude: -96.797},
    Carrollton: {latitude: 32.9756, longitude: -96.889},
    Seagoville: {latitude: 32.6397, longitude: -96.5456},
    'Grand Prairie': {latitude: 32.7459, longitude: -96.9978},
    Grapevine: {latitude: 32.9346, longitude: -97.0781},
    Ferris: {latitude: 32.5355, longitude: -96.6714},
    Bedford: {latitude: 32.844, longitude: -97.1431},
    Forney: {latitude: 32.7483, longitude: -96.4713},
    'The Colony': {latitude: 33.0806, longitude: -96.891},
    Colleyville: {latitude: 32.8801, longitude: -97.155},
    Wylie: {latitude: 33.0151, longitude: -96.5389},
    Hurst: {latitude: 32.8235, longitude: -97.1706},
    Rockwall: {latitude: 32.9312, longitude: -96.4597},
    Arlington: {latitude: 32.7357, longitude: -97.1081},
    Southlake: {latitude: 32.9412, longitude: -97.1342},
    Allen: {latitude: 33.1032, longitude: -96.6706},
    Mansfield: {latitude: 32.5632, longitude: -97.1417},
    Crandall: {latitude: 32.6089, longitude: -96.4517},
    Palmer: {latitude: 32.4276, longitude: -96.6771},
    Frisco: {latitude: 33.1507, longitude: -96.8236},
    Midlothian: {latitude: 32.4824, longitude: -96.9947},
    'North Richland Hills': {latitude: 32.8343, longitude: -97.2289},
    'Flower Mound': {latitude: 33.0146, longitude: -97.0969},
    Kennedale: {latitude: 32.6411, longitude: -97.2293},
    'Lake Dallas': {latitude: 33.1162, longitude: -97.0251},
    Lavon: {latitude: 33.0246, longitude: -96.4227},
    Lewisville: {latitude: 33.0462, longitude: -96.9942},
    Fate: {latitude: 32.9304, longitude: -96.3638},
    'Haltom City': {latitude: 32.7996, longitude: -97.2692},
    Keller: {latitude: 32.9342, longitude: -97.229},
    Waxahachie: {latitude: 32.3866, longitude: -96.8483},
    'Little Elm': {latitude: 33.1626, longitude: -96.9375},
    Lillian: {latitude: 32.4743, longitude: -97.1805},
    Venus: {latitude: 32.4359, longitude: -97.1053},
    Mckinney: {latitude: 33.1976, longitude: -96.6155},
    Roanoke: {latitude: 33.0051, longitude: -97.225},
    Terrell: {latitude: 32.7357, longitude: -96.2753},
    Rosser: {latitude: 32.4922, longitude: -96.4436},
    Nevada: {latitude: 33.0646, longitude: -96.388},
    'Royse City': {latitude: 32.9756, longitude: -96.3311},
    Copeville: {latitude: 33.0406, longitude: -96.3949},
    Princeton: {latitude: 33.18, longitude: -96.4989},
    Argyle: {latitude: 33.1212, longitude: -97.1845},
    Scurry: {latitude: 32.5154, longitude: -96.4014},
    Ennis: {latitude: 32.3293, longitude: -96.6253},
    Alvarado: {latitude: 32.4076, longitude: -97.2136},
    Prosper: {latitude: 33.235, longitude: -96.8011},
    Josephine: {latitude: 33.0906, longitude: -96.3669},
    Kaufman: {latitude: 32.5897, longitude: -96.3088},
    Burleson: {latitude: 32.5421, longitude: -97.3208},
    Maypearl: {latitude: 32.3909, longitude: -97.2046},
    Bardwell: {latitude: 32.2892, longitude: -96.7112},
    Aubrey: {latitude: 33.2984, longitude: -96.9874},
    'Naval Air Station Jrb': {latitude: 32.7719, longitude: -97.4411},
    Justin: {latitude: 33.0849, longitude: -97.3134},
    Elmo: {latitude: 32.5795, longitude: -96.3122},
    Haslet: {latitude: 32.9785, longitude: -97.3497},
    Forreston: {latitude: 32.3135, longitude: -96.8671},
    Denton: {latitude: 33.2148, longitude: -97.1331},
    Melissa: {latitude: 33.2874, longitude: -96.576},
    Farmersville: {latitude: 33.1688, longitude: -96.3591},
    Crowley: {latitude: 32.5784, longitude: -97.3634},
    Celina: {latitude: 33.3242, longitude: -96.7833},
    Avalon: {latitude: 32.4325, longitude: -96.8367},
    'Caddo Mills': {latitude: 33.0461, longitude: -96.2249},
    Weston: {latitude: 33.3571, longitude: -96.6624},
    Grandview: {latitude: 32.2513, longitude: -97.182},
    Keene: {latitude: 32.3948, longitude: -97.3284},
    Ponder: {latitude: 33.1828, longitude: -97.3025},
    Italy: {latitude: 32.1817, longitude: -96.8772},
    Joshua: {latitude: 32.4688, longitude: -97.383},
    Anna: {latitude: 33.3484, longitude: -96.5514},
    'Pilot Point': {latitude: 33.3927, longitude: -96.958},
    Quinlan: {latitude: 32.9153, longitude: -96.1467},
    Merit: {latitude: 33.3369, longitude: -96.3877},
    Newark: {latitude: 33.0017, longitude: -97.4867},
    Milford: {latitude: 32.1954, longitude: -96.9404},
    Chatfield: {latitude: 32.0878, longitude: -96.3267},
    'Blue Ridge': {latitude: 33.3786, longitude: -96.4006},
    'Fort Worth': {latitude: 32.7555, longitude: -97.3308},
    Rice: {latitude: 32.2397, longitude: -96.5989},
    Westminster: {latitude: 33.3404, longitude: -96.6873},
    Krum: {latitude: 33.2616, longitude: -97.231},
    Rhome: {latitude: 33.0585, longitude: -97.4755},
    Mabank: {latitude: 32.3668, longitude: -96.1057},
    Azle: {latitude: 32.8955, longitude: -97.543},
    'Wills Point': {latitude: 32.7096, longitude: -95.9566},
    'Van Alstyne': {latitude: 33.4216, longitude: -96.5771},
    Sanger: {latitude: 33.3636, longitude: -97.1734},
    Gunter: {latitude: 33.4112, longitude: -96.779},
    Itasca: {latitude: 32.1445, longitude: -97.1632},
    Greenville: {latitude: 33.1384, longitude: -96.1108},
    Tioga: {latitude: 33.3814, longitude: -96.9209},
    'Blooming Grove': {latitude: 32.0861, longitude: -96.718},
    Barry: {latitude: 32.127, longitude: -96.6121},
    Godley: {latitude: 32.4516, longitude: -97.5245},
    Celeste: {latitude: 33.3283, longitude: -96.3206},
    Aledo: {latitude: 32.6979, longitude: -97.6044},
    Covington: {latitude: 32.2358, longitude: -97.3153},
    Boyd: {latitude: 33.1255, longitude: -97.5626},
    Corsicana: {latitude: 32.0954, longitude: -96.4708},
    Brandon: {latitude: 32.1643, longitude: -97.1239},
    Trenton: {latitude: 33.418, longitude: -96.3341},
    Frost: {latitude: 32.098, longitude: -96.7206},
    Cresson: {latitude: 32.5318, longitude: -97.6477},
    Powell: {latitude: 32.3453, longitude: -96.4626},
    'Rio Vista': {latitude: 32.2371, longitude: -97.3947},
    'Lone Oak': {latitude: 32.9947, longitude: -95.9511},
    Collinsville: {latitude: 33.5232, longitude: -97.3063},
    Mertens: {latitude: 32.1598, longitude: -96.9486},
    'Valley View': {latitude: 33.4804, longitude: -97.1563},
    Slidell: {latitude: 33.3627, longitude: -97.3511},
    Point: {latitude: 32.9023, longitude: -95.9998},
    Howe: {latitude: 33.5626, longitude: -96.6255},
    Whitewright: {latitude: 33.5124, longitude: -96.3955},
    Edgewood: {latitude: 32.7032, longitude: -95.8877},
    Decatur: {latitude: 33.234, longitude: -97.5861},
    Irene: {latitude: 32.1682, longitude: -97.0759},
    Hillsboro: {latitude: 32.0069, longitude: -97.122},
    'Tom Bean': {latitude: 33.4859, longitude: -96.3627},
    Leonard: {latitude: 33.3946, longitude: -96.2482},
    Springtown: {latitude: 32.9787, longitude: -97.6825},
    Bynum: {latitude: 32.0766, longitude: -96.8411},
    Cleburne: {latitude: 32.3471, longitude: -97.3866},
    Canton: {latitude: 32.5549, longitude: -95.8638},
    Campbell: {latitude: 32.4519, longitude: -95.9933},
    'Wolfe City': {latitude: 33.3784, longitude: -96.0708},
    Era: {latitude: 33.4178, longitude: -97.3709},
    Blum: {latitude: 32.1753, longitude: -97.5012},
    Eustace: {latitude: 32.3197, longitude: -96.0034},
    Southmayd: {latitude: 33.6483, longitude: -96.7401},
    Bailey: {latitude: 33.4424, longitude: -96.3987},
    Randolph: {latitude: 32.6164, longitude: -97.6463},
    Kerens: {latitude: 32.2425, longitude: -96.2306},
    Greenwood: {latitude: 33.3927, longitude: -97.7678},
    Paradise: {latitude: 33.1654, longitude: -97.6622},
    Malone: {latitude: 31.9749, longitude: -96.9527},
    Sherman: {latitude: 33.6357, longitude: -96.6089},
    Trinidad: {latitude: 32.1429, longitude: -96.096},
    Purdon: {latitude: 31.9613, longitude: -96.6014},
    Fruitvale: {latitude: 32.6964, longitude: -95.8653},
    Emory: {latitude: 32.8694, longitude: -95.7614},
    Commerce: {latitude: 33.2634, longitude: -95.896},
    Nemo: {latitude: 32.3894, longitude: -97.8622},
    Rosston: {latitude: 33.4932, longitude: -97.5465},
    Bells: {latitude: 33.6336, longitude: -96.3775},
    Dawson: {latitude: 31.9006, longitude: -96.7096},
    Peaster: {latitude: 32.9543, longitude: -97.8455},
    Rainbow: {latitude: 32.3338, longitude: -97.9881},
    Gober: {latitude: 33.7117, longitude: -95.8831},
    Savoy: {latitude: 33.5142, longitude: -96.3295},
    Granbury: {latitude: 32.4421, longitude: -97.7941},
    Bridgeport: {latitude: 33.2101, longitude: -97.7546},
    Ector: {latitude: 33.5309, longitude: -96.2931},
    Abbott: {latitude: 31.8807, longitude: -97.2042},
    Bonham: {latitude: 33.5761, longitude: -96.1781},
    Weatherford: {latitude: 32.7593, longitude: -97.7978},
    Malakoff: {latitude: 32.1727, longitude: -96.0056},
    Alvord: {latitude: 33.3873, longitude: -97.6931},
    'Grand Saline': {latitude: 32.6763, longitude: -95.709},
    Penelope: {latitude: 31.9532, longitude: -96.8925},
    Hubbard: {latitude: 31.8431, longitude: -96.8063},
    Poolville: {latitude: 32.9948, longitude: -97.8557},
    Lindsay: {latitude: 33.2894, longitude: -97.2751},
    Cumby: {latitude: 33.1781, longitude: -95.8515},
    Richland: {latitude: 31.9363, longitude: -96.1543},
    Kopperl: {latitude: 32.3464, longitude: -97.7709},
    Ladonia: {latitude: 33.4081, longitude: -95.9911},
    Whitney: {latitude: 31.9454, longitude: -97.3153},
    Myra: {latitude: 33.5373, longitude: -97.6124},
    Brashear: {latitude: 33.1613, longitude: -95.9041},
    Dennis: {latitude: 32.5308, longitude: -96.7033},
    Sadler: {latitude: 33.7155, longitude: -96.8272},
    Van: {latitude: 32.5263, longitude: -95.6336},
    Gainesville: {latitude: 33.6259, longitude: -97.1333},
    Morgan: {latitude: 32.2015, longitude: -97.7892},
    Whitesboro: {latitude: 33.6531, longitude: -96.9071},
    Athens: {latitude: 32.2049, longitude: -95.8556},
    Klondike: {latitude: 33.4128, longitude: -95.8906},
    Alba: {latitude: 32.7894, longitude: -95.6341},
    Aquilla: {latitude: 32.0456, longitude: -97.2816},
    'Dodd City': {latitude: 33.7232, longitude: -95.9971},
    'Glen Rose': {latitude: 32.231, longitude: -97.7434},
    Chico: {latitude: 33.3449, longitude: -97.6896},
    Streetman: {latitude: 31.8565, longitude: -96.3414},
    Tolar: {latitude: 32.2742, longitude: -97.9299},
    Millsap: {latitude: 32.7349, longitude: -98.0041},
    'Mount Calm': {latitude: 31.8676, longitude: -96.8834},
    Murchison: {latitude: 32.2735, longitude: -95.9137},
    Denison: {latitude: 33.7547, longitude: -96.5367},
    Forestburg: {latitude: 33.4675, longitude: -97.4819},
    'Ben Wheeler': {latitude: 32.506, longitude: -95.7698},
    West: {latitude: 31.8035, longitude: -97.0917},
    Muenster: {latitude: 33.6593, longitude: -97.376},
    Wortham: {latitude: 31.8081, longitude: -96.5521},
    Kirvin: {latitude: 31.8987, longitude: -96.4483},
    Windom: {latitude: 33.4995, longitude: -95.784},
    Golden: {latitude: 32.6659, longitude: -95.6829},
    Tehuacana: {latitude: 31.8346, longitude: -96.5208},
    Coolidge: {latitude: 31.7969, longitude: -96.6824},
    Ivanhoe: {latitude: 33.5408, longitude: -95.6169},
    Pottsboro: {latitude: 33.7742, longitude: -96.6789},
    Whitt: {latitude: 32.9223, longitude: -97.8822},
    'Pecan Gap': {latitude: 33.5646, longitude: -95.7722},
    Lipan: {latitude: 32.5469, longitude: -98.0063},
    Leroy: {latitude: 31.9025, longitude: -96.8623},
    Sunset: {latitude: 33.3637, longitude: -97.5498},
    Gordonville: {latitude: 33.8235, longitude: -96.9033},
    Kemp: {latitude: 32.4318, longitude: -96.2248},
    Paluxy: {latitude: 32.3334, longitude: -97.7384},
    'Sulphur Springs': {latitude: 33.1385, longitude: -95.6011},
    Ravenna: {latitude: 33.624, longitude: -96.6566},
    Thackerville: {latitude: 33.7951, longitude: -97.1283},
    Yantis: {latitude: 32.8793, longitude: -95.5874},
    Cayuga: {latitude: 31.9547, longitude: -95.9922},
  },
};
