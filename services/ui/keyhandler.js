/***
 *     ____  __.             ___ ___                    .___.__                _________                  .__              
 *    |    |/ _|____ ___.__./   |   \_____    ____    __| _/|  |   ___________/   _____/ ______________  _|__| ____  ____  
 *    |      <_/ __ <   |  /    ~    \__  \  /    \  / __ | |  | _/ __ \_  __ \_____  \_/ __ \_  __ \  \/ /  |/ ___\/ __ \ 
 *    |    |  \  ___/\___  \    Y    // __ \|   |  \/ /_/ | |  |_\  ___/|  | \/        \  ___/|  | \/\   /|  \  \__\  ___/ 
 *    |____|__ \___  > ____|\___|_  /(____  /___|  /\____ | |____/\___  >__| /_______  /\___  >__|    \_/ |__|\___  >___  >
 *            \/   \/\/           \/      \/     \/      \/           \/             \/     \/                    \/    \/ 
 *      
 *     Special standing ovation for Thomas Fuchs
 *     https://github.com/madrobby/
 */
(function(scope) {

    if (null == scope)
        scope = window;

    // if the global better namespace already exists, turn back now
    if (scope.KeyHandlerService)
    {
        return;
    }
    
    if ( !scope.better )
    {
        return alert( 'KeyHandlerService needs the better lib!' );
    }
    
    /***
     *     ____  __.             ___ ___                    .___.__                
     *    |    |/ _|____ ___.__./   |   \_____    ____    __| _/|  |   ___________ 
     *    |      <_/ __ <   |  /    ~    \__  \  /    \  / __ | |  | _/ __ \_  __ \
     *    |    |  \  ___/\___  \    Y    // __ \|   |  \/ /_/ | |  |_\  ___/|  | \/
     *    |____|__ \___  > ____|\___|_  /(____  /___|  /\____ | |____/\___  >__|   
     *            \/   \/\/           \/      \/     \/      \/           \/       
     *
     *  Special standing ovation for Thomas Fuchs
     *  https://github.com/madrobby/
     */

    function KeyHandler() {
        for (k = 1; k < 20; k++)
            this._MAP['f' + k] = 111 + k;
        
        for(k in this.MODIFIERS) this.assignKey[k] = false;
        
        // set the handlers globally on document
        this.addEvent(document, 'keydown', 'dispatch' );
        this.addEvent(document, 'keyup', 'clearModifier');

        // reset modifiers to false whenever the window is (re)focused.
        this.addEvent(window, 'focus', 'resetModifiers');
    }
    
    KeyHandler.prototype.addEvent = function(object, event, method)
    {
       object.addEventListener(
            event,
            this.handleEvent.bind(null, this, method),
            false
       );
    };
    
    KeyHandler.prototype.handleEvent = function(self, method, evt)
    {
        self[ method ]( evt );
    };
    
    KeyHandler.prototype.registerKeyHandler = function(labelOrName, key, note, scope )
    {
        scope = scope || 'all';
        this._handlerStack[ labelOrName ] =  {
            note: note,
            key: key,
            scope: scope
        };
        this.assignKey(key, scope, (function(self, label ) {
            return function() {
                self.handleKey( label );
            }
        })(this, labelOrName));
    };
    
    KeyHandler.prototype.removeKeyHandler = function(labelOrName)
    {
        if (!this._handlerStack[ labelOrName ])
            return;

        var obj = this._handlerStack[ labelOrName ];
        this.unbindKey(obj.key, obj.scope);
        delete this._handlerStack[ labelOrName ];
    };
    
    KeyHandler.prototype.handleKey = function( labelOrName )
    {
        if (!this._handlerStack[ labelOrName ])
            return;
        var obj = this._handlerStack[ labelOrName ];
        this.facade.goTo(obj.note.name, obj.note.body, obj.note.type);
    };
    
    KeyHandler.prototype._handlerStack = {};
    KeyHandler.prototype.facade = null;
    KeyHandler.prototype._handlers = {};
    KeyHandler.prototype._downKeys = [];
    KeyHandler.prototype._mods = {16: false, 18: false, 17: false, 91: false};
    KeyHandler.prototype.modifierMap = {
        16: 'shiftKey',
        18: 'altKey',
        17: 'ctrlKey',
        91: 'metaKey'
    };
    KeyHandler.prototype._MODIFIERS = {
        '⇧': 16, shift: 16,
        '⌥': 18, alt: 18, option: 18,
        '⌃': 17, ctrl: 17, control: 17,
        '⌘': 91, command: 91
    };
    KeyHandler.prototype._scope = 'all';
    KeyHandler.prototype._MAP = {
        backspace: 8, tab: 9, clear: 12,
        enter: 13, 'return': 13,
        esc: 27, escape: 27, space: 32,
        left: 37, up: 38,
        right: 39, down: 40,
        del: 46, 'delete': 46,
        home: 36, end: 35,
        pageup: 33, pagedown: 34,
        ',': 188, '.': 190, '/': 191,
        '`': 192, '-': 189, '=': 187,
        ';': 186, '\'': 222,
        '[': 219, ']': 221, '\\': 220
    };
    
    KeyHandler.prototype.code = function(x)
    {
        return this._MAP[x] || x.toUpperCase().charCodeAt(0);
    };

    KeyHandler.prototype.index = function(array, item)
    {
        var i = array.length;
        while (i--)
            if (array[i] === item)
                return i;
        return -1;
    };

    KeyHandler.prototype.compareArray = function(a1, a2)
    {
        if (a1.length != a2.length)
            return false;
        for (var i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i])
                return false;
        }
        return true;
    };

    KeyHandler.prototype.updateModifierKey = function(event)
    {
        for (k in this._mods)
            this._mods[k] = event[this.modifierMap[k]];
    };

    // handle keydown event
    KeyHandler.prototype.dispatch = function(event)
    {
        var key, handler, k, i, modifiersMatch, scope;
        key = event.keyCode;

        if (this.index(this._downKeys, key) == -1) {
            this._downKeys.push(key);
        }

        // if a modifier key, set the key.<modifierkeyname> property to true and return
        if (key == 93 || key == 224)
            key = 91; // right command on webkit, command on Gecko
        if (key in this._mods) {
            this._mods[key] = true;
            // 'assignKey' from inside this closure is exported to window.key
            for (k in this._MODIFIERS)
                if (this._MODIFIERS[k] == key)
                    this.assignKey[k] = true;
            return;
        }
        this.updateModifierKey(event);

        // see if we need to ignore the keypress (filter() can can be overridden)
        // by default ignore key presses if a select, textarea, or input is focused
        if (!this.filter.call(this, event))
            return;

        // abort if no potentially matching shortcuts found
        if (!(key in this._handlers))
            return;

        scope = this.getScope();

        // for each potential shortcut
        for (i = 0; i < this._handlers[key].length; i++) {
            handler = this._handlers[key][i];

            // see if it's in the current scope
            if (handler.scope == scope || handler.scope == 'all') {
                // check if modifiers match if any
                modifiersMatch = handler.mods.length > 0;
                for (k in this._mods)
                    if ((!this._mods[k] && this.index(handler.mods, +k) > -1) || (this._mods[k] && this.index(handler.mods, +k) == -1))
                        modifiersMatch = false;
                 
                    
                // call the handler and stop the event if neccessary
                if ((handler.mods.length == 0 && !this._mods[16] && !this._mods[18] && !this._mods[17] && !this._mods[91]) || modifiersMatch) {
                    if (handler.method(event, handler) === false) {
                        if (event.preventDefault)
                            event.preventDefault();
                        else
                            event.returnValue = false;
                        if (event.stopPropagation)
                            event.stopPropagation();
                        if (event.cancelBubble)
                            event.cancelBubble = true;
                    }
                }
            }
        }
    };
    
    KeyHandler.prototype.clearModifier = function(event)
    {
        var key = event.keyCode, k,
            i = this.index(this._downKeys, key);

        // remove key from _downKeys
        if (i >= 0) {
            this._downKeys.splice(i, 1);
        }

        if(key == 93 || key == 224) key = 91;
        if(key in this._mods) {
          this._mods[key] = false;
          for(k in this._MODIFIERS) if(this._MODIFIERS[k] == key) this.assignKey[k] = false;
        }
    };
    
    KeyHandler.prototype.resetModifiers = function()
    {
        for(k in this._mods) this._mods[k] = false;
        for(k in this._MODIFIERS) this.assignKey[k] = false;
    };
    
    KeyHandler.prototype.assignKey = function(key, scope, method)
    {
        var keys, mods;
        keys = this.getKeys(key);
        if (method === undefined) {
          method = scope;
          scope = 'all';
        }

        // for each shortcut
        for (var i = 0; i < keys.length; i++) {
          // set modifier keys if any
          mods = [];
          key = keys[i].split('+');
          if (key.length > 1){
            mods = this.getMods(key);
            key = [key[key.length-1]];
          }
          // convert to keycode and...
          key = key[0]
          key = this.code(key);
          // ...store handler
          if (!(key in this._handlers)) this._handlers[key] = [];
          this._handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
        }
    };
    
    KeyHandler.prototype.unbindKey = function(key, scope)
    {
        var multipleKeys, keys,
          mods = [],
          i, j, obj;

        multipleKeys = this.getKeys(key);

        for (j = 0; j < multipleKeys.length; j++) {
          keys = multipleKeys[j].split('+');

          if (keys.length > 1) {
            mods = getMods(keys);
            key = keys[keys.length - 1];
          }

          key = code(key);

          if (scope === undefined) {
            scope = this.getScope();
          }
          if (!this._handlers[key]) {
            return;
          }
          for (i in this._handlers[key]) {
            obj = this._handlers[key][i];
            // only clear handlers if correct scope and mods match
            if (obj.scope === scope && this.compareArray(obj.mods, mods)) {
              this._handlers[key][i] = {};
            }
          }
        }
    };
    
    KeyHandler.prototype.isPressed = function(keyCode)
    {
        if (typeof(keyCode)=='string') {
          keyCode = code(keyCode);
        }
        return this.index(this._downKeys, keyCode) != -1;
    };
    
    KeyHandler.prototype.getPressedKeyCodes = function()
    {
        return _downKeys.slice(0);
    };
    
    KeyHandler.prototype.filter = function(event)
    {
        var tagName = (event.target || event.srcElement).tagName;
        // ignore keypressed in any elements that support keyboard data input
        return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
    };
    
    KeyHandler.prototype.setScope = function(scope)
    {
        this._scope = scope || 'all'
    };
    
    KeyHandler.prototype.getScope = function()
    {
        return this._scope || 'all'
    };
    
    KeyHandler.prototype.deleteScope = function(scope)
    {
        var key, handlers, i;

        for (key in this._handlers) {
          handlers = this._handlers[key];
          for (i = 0; i < handlers.length; ) {
            if (handlers[i].scope === scope) handlers.splice(i, 1);
            else i++;
          }
        }
    };
    
    KeyHandler.prototype.getKeys = function(key)
    {
        var keys;
        key = key.replace(/\s/g, '');
        keys = key.split(',');
        if ((keys[keys.length - 1]) == '') {
            keys[keys.length - 2] += ',';
        }
        return keys;
    };
    
    KeyHandler.prototype.getMods = function(key)
    {
        var mods = key.slice(0, key.length - 1);
        for (var mi = 0; mi < mods.length; mi++)
        mods[mi] = _MODIFIERS[mods[mi]];
        return mods;
    };

    /***
    *      _________                  .__              
    *     /   _____/ ______________  _|__| ____  ____  
    *     \_____  \_/ __ \_  __ \  \/ /  |/ ___\/ __ \ 
    *     /        \  ___/|  | \/\   /|  \  \__\  ___/ 
    *    /_______  /\___  >__|    \_/ |__|\___  >___  >
    *            \/     \/                    \/    \/ 
    */
    function Service(facade, name, configObject)
    {
        this.facade = facade;
        this.name = name;
        this.initializeService(configObject);
    }

    for (n in better.AbstractService.prototype) {
        Service.prototype[n] = better.AbstractService.prototype[n];
    }
    Service.prototype.constructor = Service;
    Service.prototype.keyHandler = null;
    
    Service.prototype.runInstall = function(configObject) {
        
        // create keyhandler
        this.facade.keyHandler = new KeyHandler();
        this.facade.keyHandler.facade = this.facade;
        
        // add skills to facade
        this.facade.registerKeyHandler = function(labelOrName, key, note, scope )
        {
            this.keyHandler.registerKeyHandler(labelOrName, key, note, scope );
        };

        this.facade.removeKeyHandler = function(labelOrName)
        {
            this.keyHandler.removeKeyHandler(labelOrName);
        };

        this.facade.setKeyScope = function(scope)
        {
           this.keyHandler.setScope(scope);
        };

        this.facade.getKeyScope = function()
        {
            return this.keyHandler.getScope();
        };
        
    };
    
    Service.prototype.runUninstall = function(configObject) {
        
        // remove facade's key handler related skills
        delete this.facade.registerKeyHandler;
        delete this.facade.removeKeyHandler;
        delete this.facade.setKeyScope;
        delete this.facade.getKeyScope;
        
        // delete keyhandler
        delete this.facade.keyHandler.fade;
        delete this.facade.keyHandler;
        
    };
    
    
    scope.better.KeyHandlerService = Service;


})(this); // the 'this' parameter will resolve to global scope in all environments