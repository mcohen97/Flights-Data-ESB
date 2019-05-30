const AirlinesIATACodes = {
UA:'United Air Lines Inc.',
AA:'American Airlines Inc.',
US: 'US Airways Inc.',
F9:'Frontier Airlines Inc.',
B6:'JetBlue Airways',
OO:'Skywest Airlines Inc.',
AS:'Alaska Airlines Inc.',
NK:'Spirit Air Lines',
WN:'Southwest Airlines Co.',
DL:'Delta Air Lines Inc.',
EV:'Atlantic Southeast Airlines',
HA:'Hawaiian Airlines Inc.',
MQ:'American Eagle Airlines Inc.',
VX:'Virgin America'
};
module.exports.Dictionary = Object.freeze(AirlinesIATACodes);
module.exports.Codes = Object.keys(AirlinesIATACodes);