function Every(log) {
   this.log = log == "log";
   if(this.log) {
      console.log("Instanciating new Every object");
   }
}

Every.prototype = {
   toString: function() {
      if(this.log)
         console.log("I should be logging!");
      return $IOC.get_obj("who");
   },
   do_log: function(msg) {
     this.log = msg;
   },
};
