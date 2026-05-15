// object.type returns the number of isotopes
// object.isotopes returns array of length object.type containing the isotopes
// object.abundances returns array of length object.type containing the abundances
// e.g. mass_Mg.types, mass_Mg.isotopes[0], mass_Mg.abundances[0]

// For organic compounds, look at https://www2.chemistry.msu.edu/faculty/reusch/VirtTxtJml/Spectrpy/MassSpec/masspec1.htm

var mass_B = {
    name        : "Boron",
    types       : 2,
    isotopes    : [10.012937 , 11.009305],
    abundances  : [19.9 , 80.1]
};

var mass_Ne = {
    name        : "Neon",
    types       : 3,
    isotopes    : [19.992440 , 20.993847 , 21.991386],
    abundances  : [90.48 , 0.27 , 9.25]
};

var mass_Mg = {
    name        : "Magnesium",
    types       : 3,
    isotopes    : [23.985042 , 24.985837 , 25.982593],
    abundances  : [78.99 , 10.00 , 11.01]
};

var mass_Si = {
    name        : "Silicon",
    types       : 3,
    isotopes    : [27.976927 , 28.976495 , 29.973770],
    abundances  : [92.2297 , 4.6832 , 3.0872]
};

var mass_Cl = {
    name        : "Chlorine",
    types       : 2,
    isotopes    : [34.968853 , 36.965903],
    abundances  : [75.78 , 24.22]
};

var mass_K = {
    name        : "Potassium",
    types       : 2,
    isotopes    : [38.963707 , 39.963999 , 40.961826],
    abundances  : [93.2581 , 0.0117 , 6.7302]
};

var mass_Ti = {
    name        : "Titanium",
    types       : 5,
    isotopes    : [45.952629 , 46.951764 , 47.947947 , 48.947871 , 49.944792],
    abundances  : [8.25 , 7.44 , 73.72 , 5.41 , 5.18]
};

var mass_Cr = {
    name        : "Chromium",
    types       : 4,
    isotopes    : [49.946050 , 51.940512 , 52.940654 , 53.938885],
    abundances  : [4.345 , 83.789 , 9.501 , 2.365]
};

var mass_Fe = {
    name        : "Iron",
    types       : 4,
    isotopes    : [53.939615 , 55.934942 , 56.935399 , 57.933280],
    abundances  : [5.845 , 91.754 , 2.119 , 0.282]
};

var mass_Ni = {
    name        : "Nickel",
    types       : 5,
    isotopes    : [57.935348, 59.930791, 60.931060, 61.928349, 63.927970 ],
    abundances  : [68.0769, 26.2231, 1.1399, 3.6345, 0.9256]
};

var mass_Cu = {
    name        : "Copper",
    types       : 2,
    isotopes    : [62.929601 , 64.927794],
    abundances  : [69.17 , 30.83]
};

var mass_Zn = {
    name        : "Zinc",
    types       : 5,
    isotopes    : [63.929147, 65.926037, 66.927131, 67.924848, 69.925325],
    abundances  : [48.63, 27.90, 4.10, 18.75, 0.62]
};

var mass_Ga = {
    name        : "Gallium",
    types       : 2,
    isotopes    : [68.925581, 70.924705],
    abundances  : [60.108, 39.892]
};

var mass_Ge = {
    name        : "Germanium",
    types       : 5,
    isotopes    : [69.924250, 71.922076, 72.923459 , 73.921178, 75.921403],
    abundances  : [20.84, 27.54, 7.73, 36.28, 7.61]
};

var mass_Se = {
    name        : "Selenium",
    types       : 6,
    isotopes    : [73.922477, 75.919214, 76.919915, 77.917310, 79.916522, 81.916700],
    abundances  : [0.89, 9.37, 7.63, 23.77, 49.61, 8.73]
};

var mass_Br = {
    name        : "Bromine",
    types       : 2,
    isotopes    : [78.918338, 80.916291],
    abundances  : [50.69, 49.31]
};

var mass_Kr = {
    name        : "Krypton",
    types       : 6,
    isotopes    : [77.920386, 79.916378, 81.913485, 82.914136, 83.911507, 85.910610],
    abundances  : [0.35, 2.28, 11.58, 11.49, 57.00, 17.30]
};

var mass_Rb = {
    name        : "Rubidium",
    types       : 2,
    isotopes    : [84.911789 , 86.909183],
    abundances  : [72.17, 27.83]
};

var mass_Sr = {
    name        : "Strontium",
    types       : 4,
    isotopes    : [83.913425, 85.909262, 86.908879, 87.905614],
    abundances  : [0.56, 9.86, 7.00, 82.58]
};

var mass_Zr = {
    name        : "Zirconium",
    types       : 5,
    isotopes    : [89.904704, 90.905645, 91.905040, 93.906316, 95.908276],
    abundances  : [51.45, 11.22, 17.15, 17.38, 2.80]
};

var mass_Mo = {
    name        : "Molybdenum",
    types       : 7,
    isotopes    : [91.906810, 93.905088, 94.905841, 95.904679, 96.906021, 97.905408, 99.907477],
    abundances  : [14.84, 9.25, 15.92, 16.68, 9.55, 24.13, 9.63]
};

var mass_Ru = {
    name        : "Ruthenium",
    types       : 7,
    isotopes    : [95.907598, 97.905287, 98.905939, 99.904220, 100.905582, 101.904350, 103.905430],
    abundances  : [5.54, 1.87, 12.76, 12.60, 17.06, 31.55, 18.62]
};

var mass_Pd = {
    name        : "Palladium",
    types       : 6,
    isotopes    : [101.905608, 103.904035, 104.905084, 105.903483, 107.903894, 109.905152],
    abundances  : [1.02, 11.14, 22.33, 27.33, 26.46, 11.72]
};

var mass_Ag = {
    name        : "Silver",
    types       : 2,
    isotopes    : [106.905093, 108.904756],
    abundances  : [51.839, 48.161]
};

var mass_Cd = {
    name        : "Cadmium",
    types       : 8,
    isotopes    : [105.906458, 107.904183, 109.903006, 110.904182, 111.902757, 112.904401, 113.903358, 115.904755],
    abundances  : [1.25, 0.89, 12.49, 12.80, 24.13, 12.22, 28.73, 7.49]
};

var mass_In = {
    name        : "Indium",
    types       : 2,
    isotopes    : [112.904061, 114.903878],
    abundances  : [4.29, 95.71]
};

var mass_Sn = {
    name        : "Tin",
    types       : 10,
    isotopes    : [111.904821, 113.902782, 114.903346, 115.901744, 116.902954, 117.901606, 118.903309, 119.902197, 121.903440, 123.905275],
    abundances  : [0.97, 0.66, 0.34, 14.54, 7.68, 24.22, 8.59, 32.58, 4.63, 5.79]
};

var mass_Sb = {
    name        : "Antimony",
    types       : 2,
    isotopes    : [120.903818, 122.904216],
    abundances  : [57.21, 42.79]
};

var mass_Te = {
    name        : "Tellurium",
    types       : 8,
    isotopes    : [119.904020, 121.903047, 122.904273, 123.902819, 124.904425, 125.903306, 127.904461, 129.906223],
    abundances  : [0.09, 2.55, 0.89, 4.74, 7.07, 18.84, 31.74, 34.08]
};

var mass_Xe = {
    name        : "Xenon",
    types       : 9,
    isotopes    : [123.905896, 125.904269, 127.903530, 128.904779, 129.903508, 130.905082, 131.904154, 133.905395, 135.907220],
    abundances  : [0.09, 0.09, 1.92, 26.44, 4.08, 21.18, 26.89, 10.44, 8.87]
};

var mass_Ba = {
    name        : "Barium",
    types       : 5,
    isotopes    : [129.906310, 131.905056, 133.904503, 134.905683, 135.904570, 136.905821, 137.905241],
    abundances  : [0.106, 0.101, 2.417, 6.592, 7.854, 11.232, 71.698]
};

var mass_La = {
    name        : "Lanthanum",
    types       : 2,
    isotopes    : [137.907107, 138.906348],
    abundances  : [0.090, 99.910]
};

var mass_Ce = {
    name        : "Cerium",
    types       : 4,
    isotopes    : [135.907144, 137.905986, 139.905434, 141.909240],
    abundances  : [0.185, 0.251, 88.450, 11.114]
};

var mass_Nd = {
    name        : "Neodymium",
    types       : 7,
    isotopes    : [141.907719, 142.909810, 143.910083, 144.912569, 145.913112, 147.916889, 149.920887],
    abundances  : [27.2, 27.2, 23.8, 8.3, 17.2, 5.7, 5.6]
};

var mass_Sm = {
    name        : "Samarium",
    types       : 7,
    isotopes    : [143.911995, 146.914893, 147.914818, 148.917180, 149.917271, 151.919728, 153.922205],
    abundances  : [3.07, 14.99, 11.24, 13.82, 7.38, 26.75, 22.75]
};

var mass_Eu = {
    name        : "Europium",
    types       : 2,
    isotopes    : [150.919846, 152.921226],
    abundances  : [47.81, 52.19]
};

var mass_Gd = {
    name        : "Gadolinium",
    types       : 7,
    isotopes    : [151.919788, 153.920862, 154.922619, 155.922120, 156.923957, 157.924101, 159.927051],
    abundances  : [0.20, 2.18, 14.80, 20.47, 15.65, 24.84, 21.86]
};

var mass_Dy = {
    name        : "Dysprosium",
    types       : 7,
    isotopes    : [155.924278, 157.924405, 159.925194, 160.926930, 161.926795, 162.928728,163.929171],
    abundances  : [0.06, 0.10, 2.34, 18.91, 25.51, 24.90, 28.18]
};

var mass_Er = {
    name        : "Erbium",
    types       : 6,
    isotopes    : [161.928775, 163.929197, 165.930290, 166.932045, 167.932368, 169.935460],
    abundances  : [0.14, 1.61, 33.61, 22.93, 26.78, 14.93]
};

var mass_Yb = {
    name        : "Ytterbium",
    types       : 7,
    isotopes    : [167.933894, 169.934759, 170.936322, 171.936378, 172.938207, 173.938858, 175.942568],
    abundances  : [0.13, 3.04, 14.28, 21.83, 16.13, 31.83, 12.76]
};

var mass_Lu = {
    name        : "Lutetium",
    types       : 2,
    isotopes    : [174.940768, 175.942682],
    abundances  : [97.41, 2.59]
};

var mass_Hf = {
    name        : "Hafnium",
    types       : 6,
    isotopes    : [173.940040, 175.941402, 176.943220, 177.943698, 178.945815, 179.946549],
    abundances  : [0.16, 5.26, 18.60, 27.28, 13.62, 35.08]
};

var mass_Ta = {
    name        : "Tantalum",
    types       : 2,
    isotopes    : [179.947466, 180.947996],
    abundances  : [0.012, 99.988]
};

var mass_W = {
    name        : "Tungsten",
    types       : 5,
    isotopes    : [179.946706, 181.948206, 182.950224, 183.950933, 185.954362],
    abundances  : [0.12, 26.50, 14.31, 30.64, 28.43]
};

var mass_Re = {
    name        : "Rhenium",
    types       : 2,
    isotopes    : [184.952956, 186.955751],
    abundances  : [37.40, 62.60]
};

var mass_Os = {
    name        : "Osmium",
    types       : 7,
    isotopes    : [183.952491, 185.953838, 186.955748, 187.955836, 188.958145, 189.958445, 191.961479],
    abundances  : [0.02, 1.59, 1.96, 13.24, 16.15, 26.26, 40.78]
};

var mass_Ir = {
    name        : "Iridium",
    types       : 2,
    isotopes    : [190.960591, 192.962924],
    abundances  : [37.3, 62.7]
};

var mass_Pt = {
    name        : "Platinum",
    types       : 6,
    isotopes    : [189.959930, 191.961035, 193.962664, 194.964774, 195.964935, 197.967876],
    abundances  : [0.014, 0.782, 32.967, 33.832, 25.242, 7.163]
};

var mass_Hg = {
    name        : "Mercury",
    types       : 7,
    isotopes    : [195.965815, 197.966752, 198.968262, 199.968309, 200.970285, 201.970626, 203.973476],
    abundances  : [0.15, 9.97, 16.87, 23.10, 13.18, 29.86, 6.87]
};

var mass_Tl = {
    name        : "Thallium",
    types       : 2,
    isotopes    : [202.972329, 204.974412],
    abundances  : [29.524, 70.476]
};

var mass_Pb = {
    name        : "Lead",
    types       : 4,
    isotopes    : [203.973029, 205.974449, 206.975881, 207.976636],
    abundances  : [1.4, 24.1, 22.1, 52.4]
};

var mass_U = {
    name        : "Uranium",
    types       : 3,
    isotopes    : [234.040946, 235.043923, 238.050783],
    abundances  : [0.0055, 0.7200, 99.2745]
};