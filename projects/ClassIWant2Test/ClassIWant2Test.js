function ClassIWant2Test(){
}

ClassIWant2Test.prototype = {
   execute: function() {
      console.log("Going to execute...");
      console.log("I am ", this.usinganotherthing.iam());
      console.log("Executed...");
   },
};
