import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-hello',
  imports: [],
  templateUrl: './hello.html',
  styleUrl: './hello.css',
})
export class Hello {
  protected title = 'Welcome do Modern Angular';
  protected isDisabled = false;

  protected onClick() {
    console.log('Button clicked');
    this.isDisabled = !this.isDisabled;
  };

  protected count = signal(0); // Writable signals
  protected doubleCount = computed(() => { // Computed signals
    // console.log('doubleCount computed signal called (no change detection'); Um computed signal não deve ter
    // um efeito colateral, deve somente atualizar seu valor. Para efeitos colaterais, utilizar os effects signals
    return this.count() * 2;
  });
  private readonly countLog = effect(() => { // Effect signals
    console.log('Count changed: ' + this.count());
  });

  protected increaseCounter() {
    // count = count + 1
    this.count.update(value => value + 1);
  };

  protected decreaseCounter() {
    this.count.update(value => value - 1);
  };

  protected resetCounter() {
    this.count.set(0);
  };

  // protected getDoubleCount() {
  //   console.log('getDoubleCount called (change detection');
  //   return this.count() * 2;
  // };
}
