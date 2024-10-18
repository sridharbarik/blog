import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  transform(timestamp: { seconds: number; nanoseconds: number }): Date {
    if (!timestamp || typeof timestamp.seconds !== 'number') {
       null; // Handle invalid input
    }

    // Convert seconds to milliseconds
    const secondsInMillis = timestamp.seconds * 1000;
    
    // Convert nanoseconds to milliseconds
    const nanosecondsInMillis = timestamp.nanoseconds / 1_000_000;

    // Total milliseconds
    const totalMillis = secondsInMillis + nanosecondsInMillis;

    // Create and return a Date object
    return new Date(totalMillis);
  }

}
