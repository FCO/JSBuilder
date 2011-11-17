function Greetings() {
   this.who = new Every();
}

Greetings.prototype = {
   greet: "Hello",
   get complete() {
      return this.greet + " " + this.who
   }
};
