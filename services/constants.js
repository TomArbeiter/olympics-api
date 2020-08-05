// Constant arrays storing the list of valid years and valid team names. Checking that input years/teams are valid improves performance by preventing bad queries from hitting the database
// These constants are used in the "validateQueryParameters" function in the file util.js
const validYears = [1896, 1900, 1904, 1906, 1908, 1912, 1920, 1924, 1928, 1932, 1936, 1948, 1952, 1956, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016];

const validTeams = ["Sri Lanka", "Greece", "Bahrain", "Finland", "Denmark", "United States", "Canada", "Bahamas", "Papua New Guinea", "Nigeria", "Trinidad and Tobago", "Spain", "Ethiopia", "Iran", 
                    "Brazil", "Palestine", "Qatar", "Sudan", "Morocco", "Egypt", "Algeria", "France", "Tunisia", "Somalia", "Netherlands", "Djibouti", "Turkey", "Italy", "Senegal", "Niger", "Mali",
                    "Saudi Arabia", "Pakistan", "Kuwait", "Ghana", "Afghanistan", "Great Britain", "Maldives", "Mozambique", "North Yemen", "Syria", "Sierra Leone", "Malaya", "Gambia", "Libya", "Oman",
                    "United Arab Emirates", "Kenya", "Zimbabwe", "South Africa", "Uganda", "Vanuatu", "Burundi", "Puerto Rico", "Soviet Union", "Eritrea", "Dominican Republic", "Argentina", "Latvia",
                    "Benin", "Australia", "Poland", "Czech Republic", "Guyana", "Congo (Brazzaville)", "West Germany", "Romania", "India", "Thailand", "Togo", "Jamaica", "Austria", "Switzerland", "Czechoslovakia",
                    "Germany", "Lithuania", "Mexico", "Chile", "Central African Republic", "Belgium", "Racing Club de France", "New Zealand", "United States Virgin Islands", "Ireland", "Albania", "Cuba",
                    "Hungary", "Indonesia", "Antigua and Barbuda", "Angola", "Tanzania", "Cameroon", "Israel", "Botswana", "Sweden", "Malawi", "Grenada", "Namibia", "Cyprus", "Philippines", "Individual Olympic Athletes",
                    "Comoros", "Lebanon", "Chad", "Cote d'Ivoire", "Venezuela", "Mauritania", "Azerbaijan", "Tonga", "Guinea", "Mauritius", "Brunei", "Barbados", "Japan", "Congo (Kinshasa)", "Estonia",
                    "Madagascar", "Saint Kitts and Nevis", "Fiji", "Australasia", "Seychelles", "Uruguay", "Portugal", "Ecuador", "Guatemala", "Russia", "El Salvador", "Yugoslavia", "Serbia and Montenegro", "Belarus",
                    "Slovenia", "Kazakhstan", "Uzbekistan", "Macedonia", "Kyrgyzstan", "Costa Rica", "Cook Islands", "Samoa", "East Germany", "Luxembourg", "Burkina Faso", "Moldova", "Rwanda", "Colombia", "Panama",
                    "Amateur Athletic Association", "Malta", "Peru", "Slovakia", "Liberia", "Unified Team", "Ukraine", "Liechtenstein", "Zambia", "Belize", "Norway", "Armenia", "Turkmenistan", "Guinea Bissau",
                    "Bosnia and Herzegovina", "Serbia", "Nepal", "Jordan", "Guam", "South Korea", "Croatia", "Gabon", "Haiti", "Saint Vincent and the Grenadines", "Bulgaria", "Paraguay", "Refugee Olympic Athletes", "Malaysia",
                    "Iceland", "Bermuda", "American Samoa", "Cape Verde", "Saar", "Andorra", "Yemen", "Sao Tome and Principe", "Nicaragua", "Bohemia", "Bolivia", "Tuvalu", "British Virgin Islands", "Timor Leste",
                    "Mongolia", "Georgia", "China", "Equatorial Guinea", "Bangladesh", "Lesotho", "Laos", "Monaco", "Netherlands Antilles", "Honduras", "Dominica", "Hong Kong", "Cambodia", "Chinese Taipei", "North Korea",
                    "Solomon Islands", "Singapore", "Myanmar", "Palau", "Swaziland", "West Indies Federation", "Aruba", "Suriname", "Cayman Islands", "Rhodesia", "Montenegro", "Saint Lucia", "Tajikistan",
                    "Vietnam", "San Marino", "South Yemen", "Federated States of Micronesia", "Crete", "North Borneo", "New York Athletic Club", "Marshall Islands", "South Vietnam", "Kiribati", "Chicago Athletic Association",
                    "United Arab Republic", "South Sudan", "Kosovo", "Newfoundland" ];

module.exports = {
    validYears,
    validTeams
}