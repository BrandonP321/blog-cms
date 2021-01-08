const index = 1
const move = -1

const arr = ['hi', 'tommy', 'there', 'boy', 'my', 'friend']

// arr.splice(2, 1)

// arr.splice(1, 0, 'there')

const test = arr.splice(index, 1)[0]

arr.splice(index + move, 0, test)

console.log(arr)