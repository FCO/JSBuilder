function ObjectLifeCicleManager(conf) {
   this.conf = conf;
   this.singleton_instances = {};
}

ObjectLifeCicleManager.prototype = {
   get_instance: function(name, prop) {
      if(this.singleton_instances[name] == null)
         this.singleton_instances[name] = this.instanciate(name);
      return this.singleton_instances[name]
   },
   instanciate: function(class_name, prop) {
      var pars = [];
      if(prop != null && prop.constructor != null){
	 if(typeof(prop.constructor) == "string") {
	       pars.push(prop.constructor);
	 } else {
            for(var i = 0; i < prop.constructor.length; i++) {
	       pars.push(prop.constructor[i]);
	    }
	 }
      }
      var new_obj = eval("new " + class_name + "(" + pars.join(", ") + ")");
      if(prop != null && prop.setter != null){
         for(var attr in prop.setter) {
	   eval("new_obj." + attr + "(" + prop.setter.attr + ")");
	 }
      }
      return new_obj;
   },
   get_obj: function(name) {
      if(this.conf[name] == null) throw "Class '" + name + "' not configured";
      var hash = this.conf[name];
      for(var key in hash) {
         if(key == "singleton") {
            return this.get_instance(hash["singleton"], hash);
         } else if(key == "new") {
            return this.instanciate(hash["new"], hash);
         } else if(key == "string") {
            return hash["string"];
         }
      }
   },
};
