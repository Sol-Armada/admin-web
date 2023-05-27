export const RankNameToId = {
  "admiral": 1,
  "commander": 2,
  "lieutenant": 3,
  "specialist": 4,
  "technician": 5,
  "member": 6,
  "recruit": 7,
  "guest": 8,
  "ally": 99,
  "anyone": 99,
}

export const RankIdToName = {
  1: "admiral",
  2: "commander",
  3: "lieutenant",
  4: "specialist",
  5: "technician",
  6: "member",
  7: "recruit",
  8: "guest",
  99: "ally",
  99: "anyone",
}

export const Ranks = ["admiral", "commander", "lieutenant", "specialist", "technician", "member", "recruit", "guest", "ally"]

export function GetRank(idOrName) {
  if (typeof idOrName == 'number') {
    return RankIdToName[idOrName]
  }

  if (typeof idOrName == 'string') {
    return RankNameToId[idOrName]
  }
  console.log(idOrName)
}

export function GetRankName(rank) {
    switch (rank) {
        case 1:
          return "Admiral";
        case 2:
          return "Commander";
        case 3:
          return "Lieutenant";
        case 4:
          return "Specialist";
        case 5:
          return "Technician";
        case 6:
          return "Member";
        case 7:
          return "Recruit";
        case 8:
          return "Guest";
        case 9:
          return "Ally";
        default:
          return "Unknown";
      }
}

export const EventStatus = ["created", "announced", "notified_day", "notified_hour", "live", "finished", "cancelled"]

export function GetEventStatusName(status) {
  switch (status) {
    case 1:
      return "Created"
    case 2:
      return "Announced"
    case 3:
      return "Notified - Day"
    case 4:
      return "Notified - Hour"
    case 5:
      return "Live"
    case 6:
      return "Finished"
    case 7:
      return "Cancelled"
    default:
      return "Unknown"
  }
}

export function Capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export function NumberToWord(number) {
  const words = new Map([
    [0, "zero"],
    [1, "one"],
    [2, "two"],
    [3, "three"],
    [4, "four"],
    [5, "five"],
    [6, "six"],
    [7, "seven"],
    [8, "eight"],
    [9, "nine"],
    [10, "ten"],
  ])
  return words.get(number)
}

export function ToDatetimeWindow(start, end) {
  const startUTCDatetime = new Date(start)
  const endUTCDatetime = new Date(end)

  const startDatetime = new Date(startUTCDatetime.toLocaleString())
  const endDatetime = new Date(endUTCDatetime.toLocaleString())

  const startDateString = `${addZero(startDatetime.getDate())}/${addZero(startDatetime.getMonth()+1)}/${startDatetime.getFullYear()}`
  const startTimeString = `${addZero(startDatetime.getHours())}:${addZero(startDatetime.getMinutes())}`

  const endDateString = `${addZero(endDatetime.getDate())}/${addZero(endDatetime.getMonth()+1)}/${endDatetime.getFullYear()}`
  const endTimeString = `${addZero(endDatetime.getHours())}:${addZero(endDatetime.getMinutes())}`

  let returnString = `${startDateString} ${startTimeString}`

  if (startDateString == endDateString) {
    returnString += ` - ${endTimeString}`
  } else {
    returnString += ` - ${endDateString} ${endTimeString}`
  }

  return returnString
}

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
