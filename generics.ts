module Generics {
  class Collection<T> {
    private items: T[];
    
    add(item: T) {
      this.items = [...this.items, item];
    }
    get(): T[] {
      return [...this.items];
    }
  }
  const numbersCollection = new Collection<number>();
  numbersCollection.add(1);
  //returns [1]
  numbersCollection.get();
  // Argument of type '"1"' is not assignable to parameter of type 'number'.
  numbersCollection.add('1')

  type Shift = {
    id: number;
  }
  type Absence = {
    employmentId: number;
  }
  
  interface EventPart<T> {
    event: T;
    // some general property for all EventPart objects
    id: number;
  }

  class ShiftPart implements EventPart<Shift> {
    id: number;
    event: Shift;
  }

  class AbsencePart implements EventPart<Absence> {
    id: number;
    event: Absence;
  }

  class TimeGridEvent<T extends EventPart<any>> {
    private eventPart: T;
    get event(): T['event'] {
      return this.eventPart.event;
    }
  }

  const shift = new TimeGridEvent<ShiftPart>();
  const absence = new TimeGridEvent<AbsencePart>();
  // typehints
  shift.event.id
  absence.event.employmentId
}
