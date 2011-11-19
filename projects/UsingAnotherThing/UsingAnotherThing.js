function UsingAnotherThing() {
   console.log("Instanciating 'UsingAnotherThing'");
   //this.iam = function(){alert("lalala")};
   this.iam = "UsingAnotherThing";
}

UsingAnotherThing.prototype = {
   exec: function() {
      console.log("Using Another Thing!");
   },
};
