function MeuObj(str) {
   this.str = str;
}
MeuObj.prototype = {
   toString: function(){
      return this.str.split(" ").join(this.separator) + this.pontuation;
   },
   set_pontuation: function(value){
      this.pontuation = value;
   },
};
