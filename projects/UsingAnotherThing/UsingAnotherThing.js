function UsingAnotherThing() {
   console.log("Instanciating 'UsingAnotherThing'");
   this.iam = function(){return "UsingAnotherThing"};
   //this.iam = "UsingAnotherThing";
}

UsingAnotherThing.prototype = {
   exec: function() {
      console.log("Using Another Thing!");
   },
};
