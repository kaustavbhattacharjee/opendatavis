const events = [
  {
    name: 'First Event',
    metadata: {
      type: 'public'
    }
  }, {
    name: 'Event 2',
    metadata: {
      type: 'private'
    }
  }, {
    name: 'Third Event',
    metadata: {
      type: 'closed'
    }
  }
];

const mappedEvents = events.map(e => {
  if (e.name === 'Event 2') {
    return "Hello"
  }
  return e;
});

console.log(events)
console.log(mappedEvents)