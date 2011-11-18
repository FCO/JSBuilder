function ObjectLifeCicleManager(conf) {
   this.conf = conf;
   this.singleton_instances = {};
}

ObjectLifeCicleManager.prototype = {
   get_instance: function(name, prop) {
      if(this.singleton_instances[name] == null)
         this.singleton_instances[name] = this.instanciate(name, prop);
      return this.singleton_instances[name]
   },
   instanciate: function(class_name, prop) {
      var pars = [];
      if(prop != null && prop.constructor != null){
         if(typeof(prop.constructor) == "string") {
               pars.push(JSON.stringify(this.treat_eval(this.construct_obj(prop.constructor))));
         } else if(prop.constructor.length == null) {
               pars.push(JSON.stringify(this.treat_eval(this.construct_obj(prop.constructor))));
         } else {
            for(var i = 0; i < prop.constructor.length; i++) {
               pars.push(JSON.stringify(this.treat_eval(this.construct_obj(prop.constructor[i]))));
            }
         }
      }

      var after_treat = this.treat_eval(class_name);

      var new_obj;
      if(class_name == after_treat)
         new_obj = eval("new " + class_name + "(" + pars.join(", ") + ")");
      else
         new_obj = eval("new " + class_name + "(" + pars.join(", ") + ")");

      if(prop != null && prop.setter_function != null){
         var setters;
         if(typeof(prop.setter_function) == "string" || prop.setter_function.length == null)
	    setters = [prop.setter_function];
	 else
	    setters = prop.setter_function;

         for(var i = 0; i < setters.length; i++){
            for(var attr in setters[i]) {
	      if(new_obj[attr] == null){
	        throw "'" + attr + "' is not a function, please review your IOC configuration";
	      }
	      eval("new_obj." + attr + "("+ JSON.stringify(this.treat_eval(this.construct_obj(setters[i][attr]))) + ")");
	    }
	 }
      }
      if(prop != null && prop.setter != null){
         var setters;
         if(typeof(prop.setter) == "string" || prop.setter.length == null)
	    setters = [prop.setter];
	 else
	    setters = prop.setter;

         for(var i = 0; i < setters.length; i++){
            for(var attr in setters[i]) {
	      if(new_obj[attr] == null){
	      }
	      eval("new_obj." + attr + " = "+ JSON.stringify(this.treat_eval(this.construct_obj(setters[i][attr]))));
	    }
	 }
      }
      return new_obj;
   },
   get_obj: function(name) {
      if(this.conf[name] == null) throw "Class '" + name + "' not configured";
      var hash = this.conf[name];
      return this.construct_obj(hash);
   },
   construct_obj: function(hash) {
      if(typeof(hash) == "string"){
         return this.get_obj(hash);
      }
      for(var key in hash) {
         if(key == "singleton") {
            return this.get_instance(hash["singleton"], hash);
         } else if(key == "new") {
            return this.instanciate(hash["new"], hash);
         } else if(key == "string") {
            return this.treat_eval(hash["string"]);
         } else if(key == "bool") {
            return this.treat_eval(hash["bool"]) == "true";
         }
      }
   },
   treat_eval: function(str){
     if(typeof(str) == "string" && str.match(/^\s*\{.*\}\s*$/)) {
        return eval(str);
     }
     return str;
   },
};
