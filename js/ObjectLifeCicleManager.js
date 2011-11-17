function ObjectLifeCicleManager(conf) {
   this.conf = conf;
   this.singleton_instances = {};
}

ObjectLifeCicleManager.prototype = {
   get_instance: function(name) {
      if(this.singleton_instances[name] == null)
         this.singleton_instances[name] = this.instanciate(name);
      return this.singleton_instances[name]
   },
   instanciate: function(class_name) {
      return eval("new " + class_name + "()");
   },
   get_obj: function(name) {
      if(this.conf[name] == null) throw "Class '" + name + "' not configured";
      var hash = this.conf[name];
      for(var key in hash) {
         if(key == "singleton") {
            return this.get_instance(hash["singleton"]);
         } else if(key == "new") {
            return this.instanciate(hash["new"]);
         } else if(key == "string") {
            return hash["string"];
         }
      }
   },
};
