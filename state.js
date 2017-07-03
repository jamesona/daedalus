var Tile = function() {
  this.background = null
  this.contents = []
}
var View = function() {
  this.tiles = new Array(5).fill(null).map( column => new Array(5).fill(new Tile()))
  return this
}
localStorage.setItem('gameState', JSON.stringify({
  player: {    // object defining the player
    stats: {   // base stats
      str: 15, // base strength
      int: 10, // base intelligence
      dex: 10, // base dexterity
      per: 5,  // base perception
      sta: 30, // base stamina
      att: 5,  // base attack
      hp: 40   // current hitpoints
    },
    inventory: [ // an array of items
      {
        name: "Hemp Tunic", // item name
        equip: "chest",     // equip slot
        rarity: 0,          // rarity tier
        val: 1,             // item value
        wt: 0.5             // item weight
      },
      {
        name: "Longsword",
        equip: "one-hand",
        rarity: 0,
        att: 12,           // weapon attack bonus
        acc: 0.8,          // weapon base accuracy
        val: 50,
        wt: 8
      },
      {
        name: "Swift Leather Boots",
        equip: "feet",
        rarity: 1,
        def: 8,            // defense bonus
        eff: {
          dex: 1           // enchantment; +1 dex
        },
        val: 10,
        wt: 3
      },
      {
        name: "Chain Helm of Vision",
        equip: "head",
        rarity: 1,
        def: 15,
        eff: {
          per: 3        // enchangment; +3 perception
        },
        val: 80,
        wt: 5
      },
      {
        name: "Amulet of Warding",
        equip: "neck",
        rarity: 2,
        eff: {
          def: 10
        },
        val: 100,
        wt: 0.1,
        identified: false // this item is unidentified, and can't be used
      }
    ],
    equipped: {
      head: 3,      // references the index of an item in the inventory
      neck: null,   // necklaces go here
      chest: 0,     // chest armor here
      hands: null,  // gloves/gauntlets go here
      lHand: null,  // null is unequipped
      rHand: 1,
      legs: null,   // pants/greaves here
      feet: 2
    },
    map: {
      displayPosition: [3, 10], // currently loaded map frame
      // currently generated world
      world: new Array(3).fill('').map( column => new Array(10).fill( new View() ) )
      // Each index of the two dimensional array will contain an object that
      // defines what is crrently in each of the 25 currently visible tiles:
      // wall, door, enemy, item, chest, player, etc.
    }
  }
}))
