let arr = [
  [1606782387201, 513.5980929811554],
  [1606785794250, 505.24449526763226],
  [1606788507202, 510.9539113809827],
  [1606792093115, 509.82430317650386],
  [1606795914412, 506.4657061213226],
  [1606799791380, 504.45382879663566],
  [1606803720765, 510.62149002075734],
  [1606806814569, 507.30018341813053],
  [1606810299771, 510.0817602441913],
  [1606814166090, 508.23813218853326],
  [1606817653100, 514.2491733591862],
  [1606821211671, 525.902369137562],
  [1606825931619, 499.05720342645293],
  [1606828914387, 477.6327767558029],
  [1606831450057, 492.1823716664834],
  [1606835226420, 505.6432300796648],
  [1606839533663, 498.5831135328364],
  [1606842786618, 491.06485738874966],
  [1606847475846, 491.48940529388443],
  [1606849965374, 491.5029489750783],
  [1606853597260, 496.85015450344946],
  [1606856809003, 493.08465186424877],
  [1606860281228, 494.2279173625429],
  [1606865511857, 486.83936587585066],
  [1606869173218, 487.20578577548457],
  [1606872425424, 490.147531168635],
  [1606876411957, 490.9739372718334],
  [1606878179419, 487.99435118139826],
  [1606881799836, 484.98638068392734],
  [1606886081190, 481.6996778699145],
  [1606889482371, 484.93107301842076],
  [1606893904674, 490.7602582934861],
  [1606897721737, 495.56225384891616],
  [1606900502733, 494.37393435647687],
  [1606903774118, 495.6087687688774],
  [1606907172988, 496.49305514650274],
  [1606911683260, 492.10635939451464],
  [1606914411278, 491.83862428543443],
  [1606918726886, 493.0067162256088],
  [1606922016145, 488.3151634821337],
  [1606926697839, 488.3937241185146],
  [1606930311861, 485.58287166527896],
  [1606933879107, 490.72698303279185],
  [1606935966368, 492.6327883762519],
  [1606939892413, 493.29054586217336],
  [1606943435473, 493.9460929520722],
  [1606946559539, 493.53662980877766],
  [1606950285719, 493.88640110508095],
];

const purchaseObj = {
  1606828914387: 500,
  1606893904674: 1200,
  1606935966368: -600,
};

const arrMut = arr.map((el, index) => {
  return arr[index][0] > 1606849965374
    ? [...arr, (arr[index][1] = el[1] + 1200)]
    : [...arr, (arr[index][1] = el[1])];
});

// const arrMut = arr.map((el, index) => {
//   arr[index][0] > 1606849965374
//     ? [...arr, (arr[index][1] = el[1] + 1200)]
//     : [...arr, (arr[index][1] = el[1])];
// });

console.log(arrMut);
