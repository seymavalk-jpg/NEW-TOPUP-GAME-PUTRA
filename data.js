// data.js - daftar lengkap game & paket top-up

const gameData = [
  {
    game: "Mobile Legends",
    code: "ML",
    packages: [
      { name: "Diamond 5", price: 5000, code: "ML5" },
      { name: "Diamond 12", price: 12000, code: "ML12" },
      { name: "Diamond 30", price: 30000, code: "ML30" },
      { name: "Diamond 50", price: 50000, code: "ML50" },
      { name: "Diamond 100", price: 100000, code: "ML100" },
    ]
  },
  {
    game: "Free Fire",
    code: "FF",
    packages: [
      { name: "Diamond 5", price: 5000, code: "FF5" },
      { name: "Diamond 12", price: 12000, code: "FF12" },
      { name: "Diamond 30", price: 30000, code: "FF30" },
      { name: "Diamond 50", price: 50000, code: "FF50" },
      { name: "Diamond 100", price: 100000, code: "FF100" },
    ]
  },
  {
    game: "PUBG Mobile",
    code: "PUBGM",
    packages: [
      { name: "UC 60", price: 12000, code: "PUBGM60" },
      { name: "UC 300", price: 60000, code: "PUBGM300" },
      { name: "UC 600", price: 120000, code: "PUBGM600" },
      { name: "UC 1250", price: 250000, code: "PUBGM1250" },
    ]
  },
  {
    game: "Genshin Impact",
    code: "GI",
    packages: [
      { name: "Primogems 60", price: 10000, code: "GI60" },
      { name: "Primogems 300", price: 50000, code: "GI300" },
      { name: "Primogems 680", price: 100000, code: "GI680" },
      { name: "Primogems 1350", price: 200000, code: "GI1350" },
    ]
  },
  {
    game: "Honkai Star Rail",
    code: "HSR",
    packages: [
      { name: "Crystals 68", price: 10000, code: "HSR68" },
      { name: "Crystals 328", price: 50000, code: "HSR328" },
      { name: "Crystals 648", price: 100000, code: "HSR648" },
      { name: "Crystals 1288", price: 200000, code: "HSR1288" },
    ]
  },
  {
    game: "Valorant",
    code: "VALORANT",
    packages: [
      { name: "VP 100", price: 10000, code: "VP100" },
      { name: "VP 500", price: 50000, code: "VP500" },
      { name: "VP 1000", price: 100000, code: "VP1000" },
    ]
  },
  {
    game: "Minecraft",
    code: "MC",
    packages: [
      { name: "Minecoins 320", price: 50000, code: "MC320" },
      { name: "Minecoins 640", price: 100000, code: "MC640" },
      { name: "Minecoins 1280", price: 200000, code: "MC1280" },
    ]
  },
  {
    game: "Call of Duty Mobile",
    code: "CODM",
    packages: [
      { name: "CP 60", price: 12000, code: "CODM60" },
      { name: "CP 300", price: 60000, code: "CODM300" },
      { name: "CP 600", price: 120000, code: "CODM600" },
      { name: "CP 1250", price: 250000, code: "CODM1250" },
    ]
  },
  {
    game: "League of Legends",
    code: "LOL",
    packages: [
      { name: "RP 500", price: 50000, code: "LOL500" },
      { name: "RP 1000", price: 100000, code: "LOL1000" },
      { name: "RP 2000", price: 200000, code: "LOL2000" },
    ]
  },
  {
    game: "FIFA Mobile",
    code: "FIFA",
    packages: [
      { name: "FIFA Coins 100", price: 10000, code: "FIFA100" },
      { name: "FIFA Coins 500", price: 50000, code: "FIFA500" },
      { name: "FIFA Coins 1000", price: 100000, code: "FIFA1000" },
    ]
  },
  {
    game: "Arena of Valor",
    code: "AOV",
    packages: [
      { name: "Vouchers 50", price: 5000, code: "AOV50" },
      { name: "Vouchers 150", price: 15000, code: "AOV150" },
      { name: "Vouchers 300", price: 30000, code: "AOV300" },
    ]
  },
  {
    game: "Clash of Clans",
    code: "COC",
    packages: [
      { name: "Gems 100", price: 10000, code: "COC100" },
      { name: "Gems 500", price: 50000, code: "COC500" },
      { name: "Gems 1200", price: 120000, code: "COC1200" },
    ]
  },
  {
    game: "Clash Royale",
    code: "CR",
    packages: [
      { name: "Gems 100", price: 10000, code: "CR100" },
      { name: "Gems 500", price: 50000, code: "CR500" },
      { name: "Gems 1200", price: 120000, code: "CR1200" },
    ]
  },
  {
    game: "Among Us",
    code: "AMONGUS",
    packages: [
      { name: "Coins 100", price: 10000, code: "AM100" },
      { name: "Coins 500", price: 50000, code: "AM500" },
      { name: "Coins 1000", price: 100000, code: "AM1000" },
    ]
  },
  {
    game: "Roblox",
    code: "ROBLOX",
    packages: [
      { name: "Robux 400", price: 50000, code: "ROB400" },
      { name: "Robux 800", price: 100000, code: "ROB800" },
      { name: "Robux 1700", price: 200000, code: "ROB1700" },
    ]
  },
  {
    game: "The Sims Mobile",
    code: "SIMS",
    packages: [
      { name: "SimCash 100", price: 10000, code: "SIM100" },
      { name: "SimCash 500", price: 50000, code: "SIM500" },
      { name: "SimCash 1000", price: 100000, code: "SIM1000" },
    ]
  },
  {
    game: "Roblox Adopt Me",
    code: "ADOPTME",
    packages: [
      { name: "Robux 200", price: 25000, code: "ADOPT200" },
      { name: "Robux 400", price: 50000, code: "ADOPT400" },
      { name: "Robux 800", price: 100000, code: "ADOPT800" },
    ]
  },
  {
    game: "GTA V Online",
    code: "GTA5",
    packages: [
      { name: "Shark Card 100k", price: 100000, code: "GTA100K" },
      { name: "Shark Card 200k", price: 200000, code: "GTA200K" },
      { name: "Shark Card 500k", price: 500000, code: "GTA500K" },
    ]
  },
  {
    game: "Minecraft Dungeons",
    code: "MCD",
    packages: [
      { name: "Gold 100", price: 10000, code: "MCD100" },
      { name: "Gold 500", price: 50000, code: "MCD500" },
      { name: "Gold 1000", price: 100000, code: "MCD1000" },
    ]
  },
  {
    game: "Runescape",
    code: "RS",
    packages: [
      { name: "Gold 100k", price: 100000, code: "RS100K" },
      { name: "Gold 500k", price: 500000, code: "RS500K" },
      { name: "Gold 1M", price: 1000000, code: "RS1M" },
    ]
  }
];

// Export untuk frontend
export default gameData;
