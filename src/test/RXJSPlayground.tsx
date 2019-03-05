import React, { useEffect } from 'react';
import { Observable, Observer, Subject, interval, Subscription, BehaviorSubject } from 'rxjs';
import { multicast, refCount } from 'rxjs/operators'

export default () => {
  useEffect(() => {
    // const observable = new Observable((observer: Observer<any>) => {
    //   observer.next(1);
    //   observer.next(2);
    //   observer.next(3);
    //   setTimeout(() => {
    //     observer.next(4);
    //     observer.complete();
    //   }, 1000);
    // });

    // const subject = new Subject<number>();

    // subject.subscribe({
    //   next: (x: any) => console.log('got value ' + x),
    //   error: (err: any) => console.error('something wrong occurred: ' + err),
    //   complete: () => console.log('done'),
    // });

    // subject.subscribe((x) => {
    //   console.log(x)
    // })

    // observable.subscribe(subject)

    // const source = interval(500);
    // const subject = new Subject();
    // const refCounted = source.pipe(
    //   multicast(subject),
    //   refCount(),
    // );
    // let subscription1: Subscription, subscription2: Subscription;

    // // This calls `connect()`, because
    // // it is the first subscriber to `refCounted`
    // console.log('observerA subscribed');
    // subscription1 = refCounted.subscribe({
    //   next: v => console.log(`observerA: ${v}`),
    // });

    // setTimeout(() => {
    //   console.log('observerB subscribed');
    //   subscription2 = refCounted.subscribe({
    //     next: v => console.log(`observerB: ${v}`),
    //   });
    // }, 600);

    // setTimeout(() => {
    //   console.log('observerA unsubscribed');
    //   subscription1.unsubscribe();
    // }, 1200);

    // // This is when the shared Observable execution will stop, because
    // // `refCounted` would have no more subscribers after this
    // setTimeout(() => {
    //   console.log('observerB unsubscribed');
    //   subscription2.unsubscribe();
    // }, 2000);

    const subject = new BehaviorSubject(0); // 0 is the initial value
    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`)
    });
     
    subject.next(1);
    subject.next(2);
     
    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`)
    });
     
    subject.next(3);
  }, []);

  return <div>RXJS</div>;
};
