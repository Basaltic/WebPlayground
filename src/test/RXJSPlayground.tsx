import React, { useEffect } from 'react';
import { Observable, Observer } from 'rxjs';

export default () => {
  useEffect(() => {
    const observable = new Observable((observer: Observer<any>) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    });
    console.log('just before subscribe');
    observable.subscribe({
      next: (x: any) => console.log('got value ' + x),
      error: (err: any) => console.error('something wrong occurred: ' + err),
      complete: () => console.log('done'),
    });
    console.log('just after subscribe');

    observable.subscribe((x) => {
      console.log(x)
    })
  }, []);

  return <div>RXJS</div>;
};
