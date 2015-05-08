(function(Script) {
  var _ = require('underscore')._;
  var _run = Script.prototype.run;
  Script.prototype.run = function(ctx, domain, fn) {
    var me = ctx.session && ctx.session.user;

    if (typeof domain === 'object') {
      domain.process = function() { // access process via process()
        return process;
      };
      domain.require = function(module) { // expose require function
        return require(module);
      };
      domain.context = function() { // access Context via context()
        return ctx;
      };
      domain._ = function() {
        return _;
      };
      domain.isRole = function(r) {
        if (me.hasOwnProperty('roles') && typeof me.roles === Array) {
          return false;
        }
        return _.contains(me.roles, r);
      };
    }
    _run.call(this, ctx, domain, fn);
  }
})(require('deployd/lib/script'));
