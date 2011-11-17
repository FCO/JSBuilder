function Greetings() {
   this.who = $IOC.get_obj("who should listen");
}

Greetings.prototype = {
   greet: "Hello",
   get complete() {
      return this.greet + " " + this.who
   }
};
