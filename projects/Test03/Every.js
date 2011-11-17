function Every() { }

Every.prototype = {
   toString: function() {
      return $IOC.get_obj("who");
   }
};
